import { NextRequest, NextResponse } from 'next/server';
import { ChromaService } from '@/lib/rag/chroma-service';
import { TextChunker } from '@/lib/rag/text-chunker';
import { prisma } from '@/lib/prisma';
import axios from 'axios';

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
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    console.log(`🔄 Processing file: ${file.name}, type: ${file.type}`);

    // Step 1: Extract text from file
    const textContent = await extractTextFromFile(file);
    
    if (!textContent || textContent.length < 100) {
      return NextResponse.json({ 
        error: 'File contains insufficient text content (minimum 100 characters)' 
      }, { status: 400 });
    }

    console.log(`✅ Extracted ${textContent.length} characters from file`);

    // Step 2: Create document record in database
    const document = await prisma.document.create({
      data: {
        filename: file.name,
        content: textContent,
        // userId: userId, // Add if you have user authentication
      }
    });

    console.log(`✅ Created document record with ID: ${document.id}`);

    // Step 3: Initialize ChromaDB and text chunker
    const chromaService = new ChromaService();
    const textChunker = new TextChunker(800, 100); // 800 chars per chunk, 100 overlap
    
    // Step 4: Chunk the document text
    const chunks = textChunker.chunkText(textContent);
    console.log(`✅ Generated ${chunks.length} text chunks`);
    
    if (chunks.length === 0) {
      return NextResponse.json({ 
        error: 'Failed to generate valid chunks from document' 
      }, { status: 400 });
    }

    // Step 5: Store chunks in ChromaDB for RAG
    let chromaSuccess = false;
    try {
      console.log(`🔄 Storing chunks in ChromaDB for fileId: ${document.id}`);
      await chromaService.addDocumentChunks(document.id, chunks);
      console.log(`✅ Successfully stored ${chunks.length} chunks in ChromaDB`);
      chromaSuccess = true;
    } catch (chromaError) {
      console.error('❌ ChromaDB storage error:', chromaError);
      // Don't fail the entire process if ChromaDB fails
      console.log('⚠️ Continuing without ChromaDB storage - RAG features will be limited');
    }

    // Step 6: Generate AI content (summary, flashcards, quiz)
    let aiProcessingSuccess = false;
    let parseMessage = {
      summary: "Processing completed - summary generation failed",
      flashcards: [],
      quiz: []
    };

    try {
      const prompt = `Generate a comprehensive JSON response with:
      {
        "summary": "A detailed summary of the key points, main topics, and important insights from the document",
        "flashcards": [
          {"front": "Key concept or question", "back": "Answer or explanation"},
          {"front": "Important term", "back": "Definition and context"}
        ],
        "quiz": [
          {
            "question": "Multiple choice question about the content",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correct": 0,
            "explanation": "Why this answer is correct"
          }
        ]
      }
      
      Create at least 5 flashcards and 3 quiz questions based on the content.
      
      INPUT TEXT: ${textContent.substring(0, 8000)}`;

      const openRouterPayload = {
        model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
        response_format: { type: "json_object" },
        messages: [
          { 
            role: "system", 
            content: "You are a helpful educational assistant that creates comprehensive summaries, flashcards, and quizzes. Always respond with valid JSON." 
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2000
      };

      console.log(`🔄 Generating AI content for document...`);
      
      const response = await axios.post(`${process.env.NEXT_PUBLIC_AI_URL}`, openRouterPayload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.AI_API_KEY}`
        },
        timeout: 30000 // 30 second timeout
      });

      parseMessage = JSON.parse(response.data.choices[0].message.content);
      aiProcessingSuccess = true;
      console.log(`✅ AI content generation completed`);
      
    } catch (aiError) {
      console.error('❌ AI processing error:', aiError);
      // Continue with basic response even if AI processing fails
    }

    // Step 7: Return comprehensive response
    return NextResponse.json({
      success: true,
      fileId: document.id,
      filename: file.name,
      
      // Document processing info
      textLength: textContent.length,
      chunksCount: chunks.length,
      
      // RAG status
      ragEnabled: chromaSuccess,
      chromaDbStatus: chromaSuccess ? 'connected' : 'failed',
      
      // AI content
      summary: parseMessage.summary,
      flashcards: parseMessage.flashcards || [],
      quiz: parseMessage.quiz || [],
      
      // Processing status
      aiProcessingSuccess,
      
      // Debug info (remove in production)
      processingTime: new Date().toISOString(),
      chunkSizes: chunks.map(chunk => chunk.length)
    });

  } catch (error) {
    console.error('❌ Document processing error:', error);
    return NextResponse.json({ 
      error: 'Failed to process document',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
