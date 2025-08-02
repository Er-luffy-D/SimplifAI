import { NextRequest, NextResponse } from 'next/server';
import { ChromaService } from '@/lib/rag/chroma-service';
import { TextChunker } from '@/lib/rag/text-chunker';
import { prisma } from '@/lib/prisma';
import axios from 'axios';

async function extractTextFromFile(file: File): Promise<string> {
  const fileType = file.type;
  
  switch (fileType) {
    case 'text/plain':
      return await file.text();
      
    case 'application/pdf':
      const pdfParse = require('pdf-parse');
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const pdfData = await pdfParse(buffer);
      return pdfData.text;
      
    default:
      throw new Error(`Unsupported file type: ${fileType}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    console.log(`Processing file: ${file.name}, type: ${file.type}`);

    // Extract text from file
    const textContent = await extractTextFromFile(file);
    
    if (!textContent || textContent.length < 100) {
      return NextResponse.json({ 
        error: 'File contains insufficient text content' 
      }, { status: 400 });
    }

    // Create document record in database
    let document;
    try {
      document = await prisma.document.create({
        data: {
          filename: file.name,
          content: textContent,
          // userId: userId, // Add if you have user authentication
        }
      });

      console.log(`Created document record with ID: ${document.id}`);
    } catch (dbError) {
      console.log('Database error:', dbError);
      return NextResponse.json({ 
        error: 'Failed to save document to database' 
      }, { status: 500 });
    }

    // Initialize ChromaDB and text chunker
    const chromaService = new ChromaService();
    const textChunker = new TextChunker(800, 100);
    
    // Chunk the document
    const chunks = textChunker.chunkText(textContent);
    console.log(`Generated ${chunks.length} chunks`);
    
    // Store chunks in ChromaDB for RAG
    try {
      await chromaService.addDocumentChunks(document.id, chunks);
      console.log(`Stored chunks in ChromaDB for fileId: ${document.id}`);
    } catch (chromaError) {
      console.error('ChromaDB error:', chromaError);
      // Continue processing even if ChromaDB fails
    }

    // Generate AI content (summary, flashcards, quiz)
    const prompt = `Generate a JSON response with:
    {
      "summary": "A comprehensive summary of the key points and insights",
      "flashcards": [{"front": "question", "back": "answer"}],
      "quiz": [{"question": "...", "options": ["A", "B", "C", "D"], "correct": 0, "explanation": "..."}]
    }
    
    INPUT TEXT: ${textContent.substring(0, 8000)}`;

    const openRouterPayload = {
      model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You are a strict JSON generator assistant." },
        { role: "user", content: prompt }
      ]
    };

    const response = await axios.post(`${process.env.NEXT_PUBLIC_AI_URL}`, openRouterPayload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AI_API_KEY}`
      }
    });

    const parseMessage = JSON.parse(response.data.choices[0].message.content);

    return NextResponse.json({
      success: true,
      fileId: document.id,
      summary: parseMessage.summary,
      flashcards: parseMessage.flashcards,
      quiz: parseMessage.quiz,
      chunksCount: chunks.length,
      ragEnabled: true,
      filename: file.name
    });

  } catch (error) {
    console.error('Error processing document:', error);
    return NextResponse.json({ 
      error: 'Failed to process document',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}