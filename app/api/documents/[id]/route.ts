import { prisma } from "@/lib/prisma";
import { jsonrepair } from "jsonrepair";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { gunzipSync, gzipSync } from "zlib";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } },
) {
    try {
        const token = await getToken({ req, secret: process.env.AUTH_SECRET });
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: "Document ID is required" },
                { status: 400 },
            );
        }

        let document = await prisma.parsedDocument.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        email: true,
                    },
                },
            },
        });

        if (
            !document ||
            (document.shared === false && document.user?.email !== token?.email)
        ) {
            return NextResponse.json(
                { error: "Document not found" },
                { status: 404 },
            );
        }

        if (document.generatedContent) {
            document.generatedContent = gunzipSync(
                Buffer.from(document.generatedContent, "base64"),
            ).toString("utf-8");

            try {
                console.log(
                    "Generated content uncompressed successfully",
                    document.generatedContent,
                );
                document.generatedContent = JSON.parse(
                    document.generatedContent,
                );

                // fallback method
                if (
                    Object.keys(document.generatedContent).includes("choices")
                ) {
                    // if in OpenAI format, convert to JSON
                    document.generatedContent = jsonrepair(
                        document.generatedContent.choices?.[0]?.message
                            ?.content,
                    );
                    document.generatedContent = JSON.parse(
                        document.generatedContent,
                    );
                    // if it is valid JSON, update the database
                    if (document.generatedContent) {
                        document.responseFormat = "json";
                        await prisma.parsedDocument.update({
                            where: { id: document.id },
                            data: {
                                generatedContent: gzipSync(
                                    JSON.stringify(document.generatedContent),
                                ).toString("base64"),
                                responseFormat: "json",
                                generationStatus: "success",
                            },
                        });
                    }
                }
            } catch (err) {
                if (document.responseFormat === "json") {
                    // should not happen if responseFormat is correct,
                    // but if it does, also update the database
                    console.error("The unspoken error occurred:", err);
                    document.responseFormat = "text";
                    await prisma.parsedDocument.update({
                        where: { id: document.id },
                        data: {
                            responseFormat: "text",
                        },
                    });
                }
            }
        }

        document.content = undefined;
        document.user = undefined;
        document.userId = undefined;

        return NextResponse.json(document, { status: 200 });
    } catch (err) {
        console.error("Error fetching document:", err);
        return NextResponse.json(
            { error: "Failed to fetch document" },
            { status: 500 },
        );
    }
}
