import { prisma } from "@/lib/prisma";
import { jsonrepair } from "jsonrepair";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { gunzipSync, gzipSync } from "zlib";

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
    content?: never;
    user?: never;
    userId?: never;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse<DocumentResponse | { error: string }>> {
    try {
        const token = await getToken({ req, secret: process.env.AUTH_SECRET });
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: "Document ID is required" }, { status: 400 });
        }

        const document = await prisma.parsedDocument.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        email: true,
                    },
                },
            },
        });

        if (!document || (document.shared === false && document.user?.email !== token?.email)) {
            return NextResponse.json({ error: "Document not found" }, { status: 404 });
        }

        const response: DocumentResponse = {
            id: document.id,
            docName: document.docName,
            generatedContent: null,
            shared: document.shared,
            responseFormat: document.responseFormat,
            generationStatus: document.generationStatus,
            createdAt: document.createdAt,
            updatedAt: document.updatedAt,
        };

        if (document.generatedContent) {
            try {
                const decompressedContent = gunzipSync(Buffer.from(document.generatedContent, "base64")).toString("utf-8");

                let parsedContent: unknown;

                try {
                    parsedContent = JSON.parse(decompressedContent);
                    response.generatedContent = parsedContent as object;
                } catch {}

                if (parsedContent && typeof parsedContent === "object" && "choices" in parsedContent) {
                    const openAIResponse = parsedContent as OpenAIResponse;

                    if (Array.isArray(openAIResponse.choices) && openAIResponse.choices[0]?.message?.content) {
                        try {
                            const repairedJson = jsonrepair(openAIResponse.choices[0].message.content);
                            const finalContent = JSON.parse(repairedJson);

                            await prisma.parsedDocument.update({
                                where: { id: document.id },
                                data: {
                                    generatedContent: gzipSync(JSON.stringify(finalContent)).toString("base64"),
                                    responseFormat: "json",
                                    generationStatus: "success",
                                },
                            });

                            response.generatedContent = finalContent;
                            response.responseFormat = "json";
                        } catch (jsonError) {
                            console.error("Failed to parse OpenAI content as JSON:", jsonError);
                        }
                    }
                }
            } catch {
                if (document.generationStatus !== "error") {
                    await prisma.parsedDocument.update({
                        where: { id: document.id },
                        data: {
                            responseFormat: "text",
                            generationStatus: "error",
                        },
                    });
                    response.responseFormat = "text";
                    response.generationStatus = "error";
                }
            }
        }

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("Error fetching document:", error);
        return NextResponse.json({ error: "Failed to fetch document" }, { status: 500 });
    }
}
