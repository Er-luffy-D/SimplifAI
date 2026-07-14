import { prisma } from '@/lib/prisma';
import axios from 'axios';
import { jsonrepair } from 'jsonrepair';
import { NextRequest } from 'next/server';
import { gzipSync } from 'zlib';
import { gunzipSync } from 'zlib';
// import { unzipSync } from 'zlib';
import { OpenAIResponse } from '../documents/[id]/route';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const fileId = formData.get('fileId') as string;

  const fileContent = await prisma.parsedDocument.findUnique({
    where: { id: fileId },
    select: {
      content: true
    },
  });
  if (!fileContent) {
    throw new Error('File not found');
  }
  const text = gunzipSync(Buffer.from(fileContent.content, 'base64')).toString('utf-8');

  try {
    const prompt = `You are a strict assistant. Output only valid JSON. No markdown. No explanation. No text before or after.

Return the following structure filled with meaningful, well-written content based on the input. Extract the content into 10 slide objects.Each slide should have a short, clear title.The content should be an array of plain strings (not objects, no subheadings).Split information into bullet points that fit in a presentation slide (max 3–5 per slide).Do not add extra explanations beyond the source text.

  "notes": [
  {
    title: "...",
    content: [
      "...",
      "...",
	  "...",
	  "...",
	  "...",
    ]
  },
  {
    title: "...",
    content: [
      "...",
      "...",
	  "...",
	  "...",
	  "...",
    ]
  },
  {
    title: "...",
    content: [
      "...",
      "...",
	  "...",
	  "...",
	  "...",
    ]
  },
  {
    title: "...",
    content: [
      "...",
      "...",
	  "...",
	  "...",
	  "...",
    ]
  },
  {
    title: "...",
    content: [
      "...",
      "...",
	  "...",
	  "...",
	  "...",
    ]
  },
  {
    title: "...",
    content: [
      "...",
      "...",
	  "...",
	  "...",
	  "...",
    ]
  },
  {
    title: "...",
    content: [
      "...",
      "...",
	  "...",
	  "...",
	  "...",
    ]
  },
  {
    title: "...",
    content: [
      "...",
      "...",
	  "...",
	  "...",
	  "...",
    ]
  },
  {
    title: "...",
    content: [
      "...",
      "...",
	  "...",
	  "...",
	  "...",
    ]
  },
  {
    title: "...",
    content: [
      "...",
      "...",
	  "...",
	  "...",
	  "...",
    ]
  }
]


INPUT TEXT:
${text}`;

    const openRouterPayload = {
      model: 'deepseek/deepseek-chat-v3.1:free',
      messages: [
        {
          role: 'system',
          content:
            'You are a strict JSON generator assistant. Always reply with valid JSON only.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_AI_URL}`,
        openRouterPayload,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${process.env.AI_API_KEY}`,
          },
        }
      );

      const rawResponse = response.data;
      let SlideContent: any = null;
      let validJson = false;

      try {
        if (rawResponse) {
          let parsed: object | null = null;
          if (typeof rawResponse === 'string') {
            const match = rawResponse.match(/\{[\s\S]*\}/);
            if (!match)
              throw new Error('No JSON object found in response string.');
            parsed = JSON.parse(match[0]);
          } else if (typeof rawResponse === 'object') {
            parsed = rawResponse;
          }
          const openAiContent =
            (parsed as OpenAIResponse)?.choices?.[0]?.message?.content ??
            parsed;
          if (typeof openAiContent === 'string') {
            try {
              const repaired = jsonrepair(openAiContent);
              // try to parse the repaired JSON
              parsed = JSON.parse(repaired);
              validJson = true;
            } catch (repairErr) {
              console.warn(
                'JSON repair failed, storing raw string:',
                repairErr
              );
            }
          } else {
            parsed = openAiContent;
            validJson = true;
          }
          if (parsed) {
            SlideContent = parsed;
          }
        }
      } catch (parseErr) {
        console.warn('Failed to extract clean JSON from response:', parseErr);
      }

      return new Response(JSON.stringify({ id: fileId, status: 'success', slides: SlideContent}), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
    } catch (apiErr) {
      console.error('OpenRouter API error:', apiErr);

      return new Response(JSON.stringify({ error: 'API call failed' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      });
    }
  } catch (err) {
    console.error('File parsing error:', err);
    return new Response(JSON.stringify({ error: 'Failed to parse file' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}