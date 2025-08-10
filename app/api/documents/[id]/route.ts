import { prisma } from "@/lib/prisma";
import { jsonrepair } from "jsonrepair";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { gunzipSync } from "zlib";

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

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }): Promise<NextResponse<DocumentResponse | { error: string }>> {
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
					select: { email: true },
				},
			},
		});

		if (!document || (!document.shared && document.user?.email !== token?.email)) {
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
				const decompressed = gunzipSync(Buffer.from(document.generatedContent, "base64")).toString("utf-8");

				// Try to parse decompressed directly or extract JSON
				let parsed = extractAndParseJson(decompressed);

				// If parsed not found but it looks like an OpenAI-style object (choices...), try to parse that structure
				if (!parsed) {
					try {
						const maybeObj = JSON.parse(decompressed);
						if (maybeObj && typeof maybeObj === "object" && "choices" in maybeObj) {
							const openAIResp = maybeObj as OpenAIResponse ;
							const aiContent = openAIResp.choices?.[0]?.message?.content;
							if (typeof aiContent === "string") {
								parsed = extractAndParseJson(aiContent);
							}
						}
					} catch {
						// ignore
					}
				}

				// If still not parsed, attempt to use jsonrepair on the decompressed raw text
				if (!parsed) {
					try {
						const repaired = jsonrepair(decompressed);
						parsed = JSON.parse(repaired);
					} catch {
						// give up — leave generatedContent as raw string in response (safe fallback)
						response.generatedContent = { raw: decompressed };
						return NextResponse.json(response, { status: 200 });
					}
				}

				// If parsed successfully:
				response.generatedContent = parsed as object;
				response.responseFormat = "json";
			} catch (err) {
				console.warn("Failed to decompress/parse generatedContent:", err);
				// fallback: return that generation had an error but don't throw
				response.generationStatus = document.generationStatus ?? "error";
				response.responseFormat = document.responseFormat ?? "text";
			}
		}

		return NextResponse.json(response, { status: 200 });
	} catch (error) {
		console.error("Error fetching document:", error);
		return NextResponse.json({ error: "Failed to fetch document" }, { status: 500 });
	}
}
