import { jsonrepair } from "jsonrepair";
import { NextRequest } from "next/server";
import pdfParse from "pdf-parse";
import { OpenAIResponse } from "../documents/[id]/route";

import { NextRequest } from 'next/server';
import { ChromaService } from '@/lib/rag/chroma-service';
import { TextChunker } from '@/lib/rag/text-chunker';
import { prisma } from '@/lib/prisma';
import { getToken } from 'next-auth/jwt';
import axios from 'axios';
import { gzipSync } from 'zlib';

async function extractTextFromFile(file: File): Promise<string> {
  const fileType = file.type;
  
  try {
    switch (fileType) {
      case 'text/plain':
        return await file.text();
        
      case 'application/pdf':
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const { default: pdfParse } = await import('pdf-parse');
        const pdfData = await pdfParse(buffer);
        return pdfData.text;
        
      default:
        throw new Error(`Unsupported file type: ${fileType}`);
    }
  } catch (error) {
    console.error('Error extracting text:', error);
    throw new Error(`Failed to extract text from ${fileType} file`);
  }
}



export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const fileType = formData.get("type") as string | null;
    const summaryLength = formData.get("summaryLength") as string | null;

    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    if (!token) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
        });
    }

    if (!file) {
        return new Response(JSON.stringify({ error: "No file uploaded" }), {
            status: 400,
        });
    }
    if (!fileType) {
        return new Response(JSON.stringify({ error: "Type is not provided" }), {
            status: 400,
        });
    }
    
     const textContent = await extractTextFromFile(file);
    
    if (!textContent || textContent.length < 100) {
      return new Response(JSON.stringify({ 
        error: 'File contains insufficient text content (minimum 100 characters)' 
      }), { status: 400 });
    }

    console.log(`✅ Extracted ${textContent.length} characters from file`);
    try{
    // RAG Processing
    let chromaSuccess = false;
    try {
      const chromaService = new ChromaService();
      const textChunker = new TextChunker(800, 100);
      const chunks = textChunker.chunkText(textContent);
      
      if (chunks.length > 0) {
        const documentId = `doc_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9]/g, '_')}`;
        await chromaService.addDocumentChunks(documentId, chunks);
        console.log(`✅ RAG: Stored ${chunks.length} chunks in ChromaDB`);
        chromaSuccess = true;
      }
    } catch (chromaError) {
      console.error('❌ ChromaDB storage error:', chromaError);
    }}catch(){
    console.log("Ignoring Rag because any error occured")}

    const buffer = Buffer.from(await file.arrayBuffer());

    try {
        let textContent = "";

        if (fileType === "application/pdf") {
            const data = await pdfParse(buffer);
            textContent = data.text;
        } else if (fileType === "text/plain") {
            textContent = buffer.toString("utf-8");
        } else {
            return new Response(JSON.stringify({ error: "Unsupported file type" }), { status: 415 });
        }

        // save the raw document content
        const dataToSave = gzipSync(textContent).toString("base64");
        const savedDoc = await prisma.parsedDocument.create({
            data: {
                docName: file.name,
                content: dataToSave,
                generationStatus: "processing",
                user: {
                    connect: {
                        email: token?.email || "",
                    },
                },
            },
        });

        // Determine the number of points based on summary length
        const getPointCount = (length: string | null) => {
            switch (length) {
                case "short":
                    return { min: 3, max: 4 };
                case "medium":
                    return { min: 6, max: 8 };
                case "long":
                    return { min: 9, max: 10 };
                default:
                    return { min: 3, max: 4 }; // default to short
            }
        };

        const pointCount = getPointCount(summaryLength);

        // Generate the mainPoints array for the prompt
        const generateMainPointsStructure = (count: { min: number; max: number }) => {
            const points = [];
            for (let i = 0; i < count.max; i++) {
                points.push('{ "keyPoint": "..." }');
            }
            return points.join(",\n      ");
        };

        const prompt = `You are a strict assistant. Output only valid JSON. No markdown. No explanation. No text before or after.

Return the following structure filled with meaningful, well-written content based on the input. Generate ${pointCount.min}-${
            pointCount.max
        } main points for the summary. Each quiz question must have four options, and one must be correct. Set "correct" to 1, 2, 3, or 4 based on the position of the correct option in the array (1-based index). Flashcard difficulties must be "easy", "medium", or "hard". Questions must vary naturally in structure and tone.

{
  "summary": {
    "mainPoints": [
      { "keyPoint": "..." },
      { "keyPoint": "..." },
      { "keyPoint": "..." }
    ],
    "keyInsights": "...",
    "recommendations": [
      { "statement": "..." },
      { "statement": "..." }
    ]
  },
  "flashcards": [
    { "question": "...", "answer": "...", "difficulty": "easy" }
  ],
  "quiz": [
    {
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "correct": 1
    }
  ]
}

INPUT TEXT:
${textContent}`;
        const openRouterPayload = {
            model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
            response_format: "json",
            messages: [
                {
                    role: "system",
                    content: "You are a strict JSON generator assistant. Always reply with valid JSON only.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
        };
          console.log(`🔄 Generating AI content...`);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_AI_URL}`, openRouterPayload, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${process.env.AI_API_KEY}`,
                },
            });
          
           // Save to database
      const dataToSave = gzipSync(textContent).toString("base64");
      await prisma.ParsedDocument.create({
        data: {
          filename: file.name,
          content: dataToSave,
          userId: token.sub || undefined,
        },
      });

            const rawResponse = response.data;
            let extractedContent: string | object = rawResponse;
            let responseFormat: "json" | "text" = "text";
            let validJson = false;

            try {
                if (rawResponse) {
                    let parsed: object | null = null;
                    if (typeof rawResponse === "string") {
                        const match = rawResponse.match(/\{[\s\S]*\}/);
                        if (!match) throw new Error("No JSON object found in response string.");
                        parsed = JSON.parse(match[0]);
                    } else if (typeof rawResponse === "object") {
                        parsed = rawResponse;
                    }
                    const openAiContent = (parsed as OpenAIResponse)?.choices?.[0]?.message?.content ?? parsed;
                    if (typeof openAiContent === "string") {
                        try {
                            const repaired = jsonrepair(openAiContent);
                            // try to parse the repaired JSON
                            parsed = JSON.parse(repaired);
                            validJson = true;
                        } catch (repairErr) {
                            console.warn("JSON repair failed, storing raw string:", repairErr);
                        }
                    } else {
                        parsed = openAiContent;
                        validJson = true;
                    }
                    if (parsed) {
                        extractedContent = parsed;
                        responseFormat = "json";
                    }
                }
            } catch (parseErr) {
                console.warn("Failed to extract clean JSON from response:", parseErr);
            }

            // update the document with the generated content
            const dataToCompress = typeof extractedContent === "string" ? extractedContent : JSON.stringify(extractedContent);
            const generatedContent = gzipSync(dataToCompress).toString("base64");

            await prisma.parsedDocument.update({
                where: { id: savedDoc.id },
                data: {
                    generatedContent: generatedContent,
                    generationStatus: validJson ? "success" : "error",
                    responseFormat: responseFormat,
                },
            });

            return new Response(JSON.stringify({ id: savedDoc.id, status: "success" ,  rag_enabled: chromaSuccess,
      chroma_status: chromaSuccess ? 'connected' : 'failed'}), {
                headers: { "Content-Type": "application/json" },
                status: 200,
            });
        } catch (apiErr) {
            console.error("OpenRouter API error:", apiErr);

            // Update the document with error status
            await prisma.parsedDocument.update({
                where: { id: savedDoc.id },
                data: {
                    generationStatus: "error",
                },
            });

            return new Response(JSON.stringify({ error: "API call failed" }), {
                headers: { "Content-Type": "application/json" },
                status: 500,
            });
        }
    } catch (err) {
        console.error("File parsing error:", err);
        return new Response(JSON.stringify({ error: "Failed to parse file" }), {
            headers: { "Content-Type": "application/json" },
            status: 500,
        });
    }
}
