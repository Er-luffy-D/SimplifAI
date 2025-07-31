import axios from "axios";
import { NextRequest } from "next/server";
import pdfParse from "pdf-parse";

export async function POST(req: NextRequest) {
	const formData = await req.formData();
	const file = formData.get("file") as File | null;
	const fileType = formData.get("type") as string | null;
	const summaryLength = formData.get("summaryLength") as string | null;

	if (!file) {
		return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 });
	}
	if (!fileType) {
		return new Response(JSON.stringify({ error: "Type is not provided" }), { status: 400 });
	}

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

Return the following structure filled with meaningful, well-written content based on the input. Generate ${
			pointCount.min
		}-${
			pointCount.max
		} main points for the summary. Each quiz question must have four options, and one must be correct. Set "correct" to 1, 2, 3, or 4 based on the position of the correct option in the array (1-based index). Flashcard difficulties must be "easy", "medium", or "hard". Questions must vary naturally in structure and tone.

{
  "summary": {
    "mainPoints": [
      ${generateMainPointsStructure(pointCount)}
    ],
    "keyInsights": "...",
    "recommendations": [
      { "statement": "..." },
      { "statement": "..." },
      { "statement": "..." }
    ]
  },
  "flashcards": [
    { "question": "...", "answer": "...", "difficulty": "easy" },
    { "question": "...", "answer": "...", "difficulty": "medium" },
    { "question": "...", "answer": "...", "difficulty": "hard" },
    { "question": "...", "answer": "...", "difficulty": "medium" }
  ],
  "quiz": [
    {
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "correct": 1
    },
    {
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "correct": 3
    },
    {
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "correct": 2
    },
    {
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "correct": 4
    },
    {
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "correct": 2
    },
    {
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "correct": 1
    },
    {
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "correct": 3
    },
    {
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "correct": 1
    },
    {
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "correct": 4
    },
    {
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "correct": 2
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

		try {
			const response = await axios.post(`${process.env.NEXT_PUBLIC_AI_URL}`, openRouterPayload, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${process.env.AI_API_KEY}`,
				},
			});

			// Fallback: Extract only JSON if explanation sneaks in
			const raw = response.data;
			let jsonOnly = raw;
			try {
				const match = typeof raw === "string" ? raw.match(/\{[\s\S]*\}/) : null;
				if (match) jsonOnly = JSON.parse(match[0]);
			} catch (jsonParseErr) {
				console.warn("Could not extract clean JSON:", jsonParseErr);
			}

			return new Response(JSON.stringify({ result: jsonOnly }), {
				headers: { "Content-Type": "application/json" },
				status: 200,
			});
		} catch (apiErr) {
			console.error("OpenRouter API error:", apiErr);
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
