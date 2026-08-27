import { prisma } from "@/lib/prisma";
import { jsonrepair } from "jsonrepair";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { gunzipSync } from "zlib";
import mammoth from "mammoth";
import fs from "fs";

// ----------------------
// Types
// ----------------------
export interface OpenAIChoice {
  message: {
    content: string;
  };
}

export interface OpenAIResponse {
  choices: OpenAIChoice[];
}

interface DocumentResponse {
  id: string;
  docName: string;
  generatedContent?: object | null;
  shared: boolean;
  responseFormat: string | null;
  generationStatus?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// ----------------------
// Utility: Try parsing JSON
// ----------------------
function extractAndParseJson(text: string): unknown | null {
  try {
    return JSON.parse(text);
  } catch (e: unknown) {
    console.warn(e);
  }

  const match = text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
  if (match) {
    try {
      return JSON.parse(match[0]);
    } catch {
      try {
        const repaired = jsonrepair(match[0]);
        return JSON.parse(repaired);
      } catch {
        return null;
      }
    }
  }

  try {
    const repairedWhole = jsonrepair(text);
    return JSON.parse(repairedWhole);
  } catch {
    return null;
  }
}

// ----------------------
// GET: Fetch document
// ----------------------
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<DocumentResponse | { error: string }>> {
  try {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Document ID is required" },
        { status: 400 }
      );
    }

    const document = await prisma.parsedDocument.findUnique({
      where: { id },
      include: {
        user: {
          select: { email: true },
        },
      },
    });

    if (
      !document ||
      (!document.shared && document.user?.email !== token?.email)
    ) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    const response: DocumentResponse = {
      id: document.id,
      docName: document.docName,
      generatedContent: null,
      shared: document.shared,
      responseFormat: document.responseFormat ?? null,
      generationStatus: document.generationStatus ?? null,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };

    if (document.generatedContent && typeof document.generatedContent === "string") {
      try {
        const decompressed = gunzipSync(
          Buffer.from(document.generatedContent, "base64")
        ).toString("utf-8");

        let parsed = extractAndParseJson(decompressed);

        if (!parsed) {
          try {
            const maybeObj = JSON.parse(decompressed);
            if (maybeObj && typeof maybeObj === "object" && "choices" in maybeObj) {
              const openAIResp = maybeObj as OpenAIResponse;
              const aiContent = openAIResp.choices?.[0]?.message?.content;
              if (typeof aiContent === "string") {
                parsed = extractAndParseJson(aiContent);
              }
            }
          } catch {
            // ignore
          }
        }

        if (!parsed) {
          try {
            const repaired = jsonrepair(decompressed);
            parsed = JSON.parse(repaired);
          } catch {
            response.generatedContent = { raw: decompressed };
            return NextResponse.json(response, { status: 200 });
          }
        }

        response.generatedContent = parsed as object;
        response.responseFormat = "json";
      } catch (err) {
        console.warn("Failed to decompress/parse generatedContent:", err);
        response.generationStatus = document.generationStatus ?? "error";
        response.responseFormat = document.responseFormat ?? "text";
      }
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching document:", error);
    return NextResponse.json(
      { error: "Failed to fetch document" },
      { status: 500 }
    );
  }
}

// ----------------------
// POST: Upload new file
// ----------------------
export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    if (!token?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let extractedText = "";

    if (file.type === "application/pdf") {
      // TODO: use pdf-parse or your existing PDF handler
      extractedText = buffer.toString("utf-8");
    } else if (file.type === "text/plain") {
      extractedText = buffer.toString("utf-8");
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // Save file temporarily
      const path = `./tmp/${file.name}`;
      fs.writeFileSync(path, buffer);

      const result = await mammoth.extractRawText({ path });
      fs.unlinkSync(path); // cleanup

      extractedText = result.value;
    } else {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 400 }
      );
    }

    const newDoc = await prisma.parsedDocument.create({
      data: {
        docName: file.name,
        generatedContent: extractedText,
        shared: false,
        responseFormat: "text",
        user: {
          connect: { email: token.email },
        },
      },
    });

    return NextResponse.json(
      { message: "File uploaded successfully", id: newDoc.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading document:", error);
    return NextResponse.json(
      { error: "Failed to upload document" },
      { status: 500 }
    );cd
  }
}
