import { prisma } from "@/lib/prisma";
import axios from "axios";
import { jsonrepair } from "jsonrepair";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import pdfParse from "pdf-parse";
import { gzipSync } from "zlib";
import { OpenAIResponse } from "../documents/[id]/route";

// IMPORTANT: Ensure GEMINI_API_KEY is set in your environment for multimodal file processing

async function generateContentFromMultimodal(fileType: string, base64Data: string) {
  const geminiApiKey = process.env.GEMINI_API_KEY || "";
  const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${geminiApiKey}`;

  const payload = {
    contents: [
      {
        parts: [
          {
            text: "Analyze the uploaded file (image, HTML, or SVG). Extract relevant text/code/data. Summarize key information. Output ONLY extracted/summarized text."
          },
          { inlineData: { mimeType: fileType, data: base64Data } },
        ],
      },
    ],
  };

  try {
    const response = await axios.post(geminiApiUrl, payload, {
      headers: { "Content-Type": "application/json" },
    });
    const generatedText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!generatedText) throw new Error("Gemini API failed to return text content.");
    return generatedText;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Gemini API error:", error.response?.data || error.message);
    } else if (error instanceof Error) {
      console.error("Gemini API error:", error.message);
    } else {
      console.error("Unknown Gemini API error:", error);
    }
    throw new Error("Multimodal analysis failed. Check server console for details.");
  }
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const fileType = formData.get("type") as string | null;
  const summaryLength = formData.get("summaryLength") as string | null;

  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  if (!file) return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 });
  if (!fileType) return new Response(JSON.stringify({ error: "Type is not provided" }), { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64Data = buffer.toString("base64");

  try {
    let textContent = "";

    // 1. Multimodal (image, SVG, HTML)
    if (fileType.startsWith("image/") || fileType === "image/svg+xml" || fileType === "text/html") {
      try {
        textContent = await generateContentFromMultimodal(fileType, base64Data);
      } catch (err: unknown) {
        console.error("Multimodal processing failed");
        if (err instanceof Error) console.error(err.message);
        if (fileType === "text/html") {
          textContent = buffer.toString("utf-8");
        } else {
          const message = err instanceof Error ? err.message : "Multimodal analysis failed";
          return new Response(JSON.stringify({ error: message }), { status: 500 });
        }
      }

    // 2. PDF
    } else if (fileType === "application/pdf") {
      const data = await pdfParse(buffer);
      textContent = data.text;

    // 3. Plain Text / DOCX
    } else if (
      fileType === "text/plain" ||
      fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      textContent = buffer.toString("utf-8");

    // 4. Unsupported
    } else {
      return new Response(JSON.stringify({ error: `Unsupported file type: ${fileType}` }), { status: 415 });
    }

    if (!textContent.trim()) {
      return new Response(JSON.stringify({ error: "Could not extract any content from the file." }), { status: 400 });
    }

    const dataToSave = gzipSync(textContent).toString("base64");
    const savedDoc = await prisma.parsedDocument.create({
      data: {
        docName: file.name,
        content: dataToSave,
        generationStatus: "processing",
        user: { connect: { email: token.email || "" } },
      },
    });

    // Determine points for summary
    const getPointCount = (length: string | null) => {
      switch (length) {
        case "short": return { min: 3, max: 4 };
        case "medium": return { min: 6, max: 8 };
        case "long": return { min: 9, max: 10 };
        default: return { min: 3, max: 4 };
      }
    };
    const pointCount = getPointCount(summaryLength);

    const generateMainPointsStructure = (count: { min: number; max: number }) => {
      return Array.from({ length: count.max }, () => '{ "keyPoint": "..." }').join(",\n      ");
    };

    const prompt = `You are a strict assistant. Output only valid JSON. No markdown. No explanation. No text before or after.

Generate ${pointCount.min}-${pointCount.max} main points based on input. 

{
  "summary": {
    "mainPoints": [${generateMainPointsStructure(pointCount)}],
    "keyInsights": "...",
    "recommendations": [
      { "statement": "..." },
      { "statement": "..." },
      { "statement": "..." }
    ]
  }
}

INPUT TEXT:
${textContent}`;

    const openRouterPayload = {
      model: "deepseek/deepseek-chat-v3.1:free",
      messages: [
        { role: "system", content: "You are a strict JSON generator assistant. Always reply with valid JSON only." },
        { role: "user", content: prompt },
      ],
    };

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_AI_URL}`, openRouterPayload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.AI_API_KEY}`,
        },
      });

      const rawResponse = response.data;
      let extractedContent: string | object = rawResponse;
      let responseFormat: "json" | "text" = "text";
      let validJson = false;

      try {
        let parsed: object | null = null;

        if (typeof rawResponse === "string") {
          const match = rawResponse.match(/\{[\s\S]*\}/);
          if (!match) throw new Error("No JSON object found in response string.");
          parsed = JSON.parse(match[0]);
        } else if (typeof rawResponse === "object") {
          parsed = rawResponse;
        }

        const content = (parsed as OpenAIResponse)?.choices?.[0]?.message?.content ?? parsed;
        if (typeof content === "string") {
          try {
            parsed = JSON.parse(jsonrepair(content));
            validJson = true;
          } catch {
            console.warn("JSON repair failed, storing raw string");
          }
        } else {
          parsed = content;
          validJson = true;
        }

        if (parsed) {
          extractedContent = parsed;
          responseFormat = "json";
        }
      } catch (parseErr) {
        console.warn("Failed to extract JSON:", parseErr);
      }

      const dataToCompress = typeof extractedContent === "string" ? extractedContent : JSON.stringify(extractedContent);
      const generatedContent = gzipSync(dataToCompress).toString("base64");

      await prisma.parsedDocument.update({
        where: { id: savedDoc.id },
        data: {
          generatedContent,
          generationStatus: validJson ? "success" : "error",
          responseFormat,
        },
      });

      return new Response(JSON.stringify({ id: savedDoc.id, status: "success" }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    } catch (apiErr: unknown) {
      console.error("OpenRouter API error:", apiErr);
      await prisma.parsedDocument.update({
        where: { id: savedDoc.id },
        data: { generationStatus: "error" },
      });
      return new Response(JSON.stringify({ error: "API call failed" }), { status: 500 });
    }
  } catch (err: unknown) {
    console.error("File parsing error:", err);
    const message = err instanceof Error ? err.message : "Failed to parse file";
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}
