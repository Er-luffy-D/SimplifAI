import axios from "axios";
import { NextRequest } from "next/server";
import pdfParse from "pdf-parse";

export async function POST(req: NextRequest) {
	const formData = await req.formData();
	const file = formData.get("file") as File | null;
	const fileType = formData.get("type") as string | null;

	if (!file) {
		return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 });
	}
	if (!fileType) {
		return new Response(JSON.stringify({ error: "Type is not provided" }), { status: 400 });
	}

	// Convert to Buffer
	const buffer = Buffer.from(await file.arrayBuffer());

	// Same 48 000-character limit as parse-pdf to prevent timeouts.
	const MAX_CHARS = 48_000;

	try {
		if (fileType === "application/pdf") {
			const data = await pdfParse(buffer);

			if (data.text.length > MAX_CHARS) {
				return new Response(
					JSON.stringify({
						error: `Document is too long to process (${data.text.length.toLocaleString()} characters). Please upload a shorter document (maximum ~48 000 characters / ~12 000 tokens).`,
					}),
					{ status: 413, headers: { "Content-Type": "application/json" } },
				);
			}

			const openRouterPayload = {
				model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
				messages: [
					{
						role: "user",
						content: `Assume you are a old skilled professor who knows everything, A student given you a text of a book and a question related to that book, Now return a json format data in which consists an answer key whose value is the answer that you will give for the question (ensure whatever you give must satisfy with the book text). all these are retreived from the text that the student have provided. Here is the book :${data.text} and question`,
					},
					{
						role: "assistant",
						content: "{answer:...}",
					},
				],
			};
			try {
				const response = await axios.post(`${process.env.NEXT_PUBLIC_AI_URL}`, openRouterPayload, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${process.env.AI_API_KEY}`,
					},
				});
				// Log or use the response as needed
				console.log("OpenRouter response:", response.data);
				return new Response(JSON.stringify({ text: response.data }), {
					headers: { "Content-Type": "application/json" },
					status: 200,
				});
			} catch (apiErr) {
				console.error("OpenRouter API error:", apiErr);
				// Optional: return error to client
				return new Response(JSON.stringify({ error: apiErr }), {
					headers: { "Content-Type": "application/json" },
					status: 500,
				});
			}
		} else if (fileType === "text/plain") {
			const text = buffer.toString("utf-8");

			if (text.length > MAX_CHARS) {
				return new Response(
					JSON.stringify({
						error: `Document is too long to process (${text.length.toLocaleString()} characters). Please upload a shorter document (maximum ~48 000 characters / ~12 000 tokens).`,
					}),
					{ status: 413, headers: { "Content-Type": "application/json" } },
				);
			}

			const openRouterPayload = {
				model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
				messages: [
					{
						role: "user",
						content: `Assume you are a old skilled professor who knows everything, A student given you a text of a book and a question related to that book, Now return a json format data in which consists an answer key whose value is the answer that you will give for the question (ensure whatever you give must satisfy with the book text). all these are retreived from the text that the student have provided. Here is the book :${text} and question`,
					},
					{
						role: "assistant",
						content: "{answer:...}",
					},
				],
			};

			try {
				const response = await axios.post(`${process.env.NEXT_PUBLIC_AI_URL}`, openRouterPayload, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${process.env.AI_API_KEY}`,
					},
				});
				// Log or use the response as needed
				console.log("OpenRouter response:", response.data);
				return new Response(JSON.stringify({ text: response.data }), {
					headers: { "Content-Type": "application/json" },
					status: 200,
				});
			} catch (apiErr) {
				console.error("OpenRouter API error:", apiErr);
				// Optional: return error to client
				return new Response(JSON.stringify({ error: apiErr }), {
					headers: { "Content-Type": "application/json" },
					status: 500,
				});
			}
		} else {
			return new Response(JSON.stringify({ error: "Unsupported file type" }), { status: 415 });
		}
	} catch (err) {
		console.error("File parsing error:", err);
		return new Response(JSON.stringify({ error: "Failed to parse file" }), { status: 500 });
	}
}
