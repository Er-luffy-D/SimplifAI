import { ChromaClient, DefaultEmbeddingFunction, IncludeEnum } from 'chromadb';
import { v4 as uuidv4 } from 'uuid';
import { GoogleGenerativeAI } from '@google/generative-ai';

export class ChromaService {
  private client: ChromaClient;
  private genAI: GoogleGenerativeAI;
  private embeddingFunction: DefaultEmbeddingFunction;

  constructor() {
    this.client = new ChromaClient({
      path: process.env.CHROMA_URL || "http://localhost:8000"
    });
    
    this.embeddingFunction = new DefaultEmbeddingFunction();
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  }

  private async generateEmbedding(text: string): Promise<number[]> {
    try {
      const model = this.genAI.getGenerativeModel({ model: "text-embedding-004" });
      const result = await model.embedContent(text);
      return result.embedding.values;
    } catch (error) {
      console.error('Embedding generation error:', error);
      throw new Error(`Failed to generate embedding: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getOrCreateCollection(fileId: string) {
    const collectionName = `doc_${fileId.replace(/[^a-zA-Z0-9]/g, '_')}`;
    
    try {
      return await this.client.getCollection({
        name: collectionName,
        embeddingFunction: this.embeddingFunction
      });
    } catch (error) {
      console.log(`Collection ${collectionName} not found, creating new one...`);
      try {
        return await this.client.createCollection({
          name: collectionName,
          embeddingFunction: this.embeddingFunction,
          metadata: { 
            fileId,
            createdAt: new Date().toISOString(),
            description: `Document chunks for file ${fileId}`
          }
        });
      } catch (createError) {
        console.error('Failed to create collection:', createError);
        throw new Error(`Failed to create ChromaDB collection: ${createError instanceof Error ? createError.message : 'Unknown error'}`);
      }
    }
  }

  async addDocumentChunks(fileId: string, chunks: string[]): Promise<void> {
    if (!chunks || chunks.length === 0) {
      throw new Error('No chunks provided for storage');
    }

    try {
      console.log(`🔄 Adding ${chunks.length} chunks to ChromaDB for fileId: ${fileId}`);
      
      const collection = await this.getOrCreateCollection(fileId);
      
      // Generate embeddings for all chunks
      console.log(`🔄 Generating embeddings for ${chunks.length} chunks...`);
      const embeddings = await Promise.all(
        chunks.map((chunk, index) => {
          console.log(`Generating embedding ${index + 1}/${chunks.length}`);
          return this.generateEmbedding(chunk);
        })
      );
      
      const ids = chunks.map(() => uuidv4());
      const metadatas = chunks.map((chunk, index) => ({
        fileId,
        chunkIndex: index,
        chunkLength: chunk.length,
        timestamp: new Date().toISOString(),
        preview: chunk.substring(0, 100) + (chunk.length > 100 ? '...' : '')
      }));

      await collection.add({
        ids,
        documents: chunks,
        embeddings,
        metadatas
      });

      console.log(`✅ Successfully added ${chunks.length} chunks to ChromaDB`);
      
    } catch (error) {
      console.error('Error adding document chunks:', error);
      throw new Error(`Failed to store chunks in ChromaDB: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async queryDocuments(fileId: string, query: string, nResults: number = 5) {
    try {
      const collection = await this.getOrCreateCollection(fileId);
      
      // Generate embedding for the query
      const queryEmbedding = await this.generateEmbedding(query);
      
      const results = await collection.query({
        queryEmbeddings: [queryEmbedding],
        nResults,
        where: { fileId },
        include: [IncludeEnum.Documents, IncludeEnum.Distances, IncludeEnum.Metadatas]
      });

      return {
        documents: results.documents[0] || [],
        distances: results.distances?.[0] || [],
        metadatas: results.metadatas?.[0] || []
      };
      
    } catch (error) {
      console.error('Error querying documents:', error);
      throw new Error(`Failed to query ChromaDB: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async deleteCollection(fileId: string): Promise<void> {
    const collectionName = `doc_${fileId.replace(/[^a-zA-Z0-9]/g, '_')}`;
    try {
      await this.client.deleteCollection({ name: collectionName });
      console.log(`✅ Deleted collection: ${collectionName}`);
    } catch (error) {
      console.log(`⚠️ Collection ${collectionName} not found or already deleted`);
    }
  }

  async collectionExists(fileId: string): Promise<boolean> {
    try {
      await this.getOrCreateCollection(fileId);
      return true;
    } catch (error) {
      return false;
    }
  }
}