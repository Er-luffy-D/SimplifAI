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
  // 1. Authentication (matching existing system)
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const fileType = formData.get('type') as string | null;
    
    if (!file) {
      return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });
    }

    if (!fileType) {
      return new Response(JSON.stringify({ error: 'Type is not provided' }), { status: 400 });
    }

    console.log(`🔄 Processing file: ${file.name}, type: ${file.type}`);

    // Step 1: Extract text from file
    const textContent = await extractTextFromFile(file);
    
    if (!textContent || textContent.length < 100) {
      return new Response(JSON.stringify({ 
        error: 'File contains insufficient text content (minimum 100 characters)' 
      }), { status: 400 });
    }

    console.log(`✅ Extracted ${textContent.length} characters from file`);

    // Step 2: RAG Processing (NEW)
    let chromaSuccess = false;
    try {
      const chromaService = new ChromaService();
      const textChunker = new TextChunker(800, 100);
      const chunks = textChunker.chunkText(textContent);
      
      if (chunks.length > 0) {
        // Use file name as document ID for now
        const documentId = `doc_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9]/g, '_')}`;
        await chromaService.addDocumentChunks(documentId, chunks);
        console.log(`✅ RAG: Stored ${chunks.length} chunks in ChromaDB`);
        chromaSuccess = true;
      }
    } catch (chromaError) {
      console.error('❌ ChromaDB storage error:', chromaError);
      // Continue without RAG
    }

    // Step 3: Generate AI content (matching existing format)
    const prompt = `You are a strict assistant. Output only valid JSON. No markdown. No explanation.

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
    
    const response = await axios.post(`${process.env.NEXT_PUBLIC_AI_URL}`, openRouterPayload, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
      },
    });

    // Step 4: Save to database (matching existing model)
    const dataToSave = gzipSync(textContent).toString("base64");
    await prisma.document.create({
      data: {
        filename: file.name,
        content: dataToSave,
        userId: token.sub || undefined,
      },
    });

    // Step 5: Return response in expected format
    const result = {
      choices: [
        {
          message: {
            content: response.data.choices[0].message.content
          }
        }
      ],
      // Add RAG metadata
      rag_enabled: chromaSuccess,
      chroma_status: chromaSuccess ? 'connected' : 'failed'
    };

    return new Response(JSON.stringify({ result }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('❌ Document processing error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process document'
    }), { status: 500 });
  }
}