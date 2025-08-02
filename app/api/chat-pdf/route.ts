import { NextRequest, NextResponse } from 'next/server';
import { ChromaService } from '@/lib/rag/chroma-service';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const { question, fileId } = await req.json();

    if (!question || !fileId) {
      return NextResponse.json({ 
        error: 'Question and fileId are required' 
      }, { status: 400 });
    }

    console.log(`RAG Chat query: "${question}" for fileId: ${fileId}`);

    // Initialize ChromaDB service
    const chromaService = new ChromaService();
    
    // Check if collection exists
    const collectionExists = await chromaService.collectionExists(fileId);
    if (!collectionExists) {
      return NextResponse.json({
        success: false,
        error: "Document not found or not processed for RAG. Please upload the document first."
      }, { status: 404 });
    }
    
    // Retrieve relevant chunks using semantic search
    const searchResults = await chromaService.queryDocuments(fileId, question, 5);
    
    if (!searchResults.documents.length) {
      return NextResponse.json({
        success: true,
        answer: "I couldn't find relevant information in the document to answer your question. Please try rephrasing your question or ask about different topics covered in the document.",
        sources: [],
        query: question
      });
    }

    // Filter out null documents and combine relevant context from retrieved chunks
    const validDocuments = searchResults.documents.filter((doc): doc is string => doc !== null && doc !== undefined);
    
    if (validDocuments.length === 0) {
      return NextResponse.json({
        success: true,
        answer: "I couldn't find relevant information in the document to answer your question. Please try rephrasing your question or ask about different topics covered in the document.",
        sources: [],
        query: question
      });
    }

    const context = validDocuments
      .map((doc, index) => `[Source ${index + 1}]: ${doc}`)
      .join('\n\n');

    console.log(`Retrieved ${validDocuments.length} relevant chunks`);

    // Build RAG prompt with retrieved context
    const systemPrompt = `You are a helpful AI assistant. Answer questions based ONLY on the provided document context. 
    If the answer isn't clearly in the context, say so. Always be accurate and cite which source number you're referencing when possible.
    Be comprehensive but concise in your answers.`;

    const userPrompt = `Context from document:
${context}

Question: ${question}

Please provide a comprehensive answer based on the context above. If you reference specific information, mention which source number it came from.`;

    const openRouterPayload = {
      model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.3, // Lower temperature for more focused answers
      max_tokens: 1000
    };

    const response = await axios.post(`${process.env.NEXT_PUBLIC_AI_URL}`, openRouterPayload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AI_API_KEY}`
      }
    });

    // Prepare sources with relevance scores and metadata
    // Filter out null documents and map with proper null checking
    const sources = searchResults.documents
      .map((doc, index) => {
        if (!doc) return null; // Skip null documents
        
        return {
          content: doc.length > 200 ? doc.substring(0, 200) + '...' : doc,
          fullContent: doc,
          relevanceScore: 1 - (searchResults.distances?.[index] || 0), // Convert distance to similarity
          metadata: searchResults.metadatas?.[index] || {},
          sourceNumber: index + 1
        };
      })
      .filter((source): source is NonNullable<typeof source> => source !== null); // Remove null sources

    const answer = response.data.choices[0].message.content;

    console.log(`Generated RAG response for question: "${question}"`);

    return NextResponse.json({
      success: true,
      answer,
      sources,
      query: question,
      retrievedChunks: validDocuments.length,
      ragEnabled: true
    });

  } catch (error) {
    console.error('ChromaDB RAG chat error:', error);
    return NextResponse.json({ 
      error: 'Failed to process chat request',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}