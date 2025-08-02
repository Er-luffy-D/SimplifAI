import { ChromaClient, DefaultEmbeddingFunction } from 'chromadb';
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
    
    // Use consistent embedding function for all operations
    this.embeddingFunction = new DefaultEmbeddingFunction();
    
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  }

  private async generateEmbedding(text: string): Promise<number[]> {
    try {
      const model = this.genAI.getGenerativeModel({ model: "text-embedding-004" });
      const result = await model.embedContent(text);
      return result.embedding.values;
    } catch (error) {
      console.error('Error generating embedding:', error);
      throw error;
    }
  }

  async getOrCreateCollection(fileId: string) {
    const collectionName = `doc_${fileId.replace(/[^a-zA-Z0-9]/g, '_')}`;
    
    try {
      return await this.client.getCollection({
        name: collectionName,
        embeddingFunction: this.embeddingFunction
      });
    } catch {
      // Collection doesn't exist, create it
      return await this.client.createCollection({
        name: collectionName,
        embeddingFunction: this.embeddingFunction,
        metadata: { fileId }
      });
    }
  }

  async addDocumentChunks(fileId: string, chunks: string[]): Promise<void> {
    try {
      const collection = await this.getOrCreateCollection(fileId);
      
      // Generate embeddings for all chunks using Gemini
      const embeddings = await Promise.all(
        chunks.map(chunk => this.generateEmbedding(chunk))
      );
      
      const ids = chunks.map(() => uuidv4());
      const metadatas = chunks.map((_, index) => ({
        fileId,
        chunkIndex: index,
        timestamp: new Date().toISOString(),
        length: chunks[index].length
      }));

      await collection.add({
        ids,
        documents: chunks,
        embeddings,
        metadatas
      });

      console.log(`Added ${chunks.length} chunks to collection for fileId: ${fileId}`);
    } catch (error) {
      console.error('Error adding document chunks:', error);
      throw error;
    }
  }

  async queryDocuments(fileId: string, query: string, nResults: number = 5) {
    try {
      const collection = await this.getOrCreateCollection(fileId);
      
      // Generate embedding for the query using Gemini
      const queryEmbedding = await this.generateEmbedding(query);
      
      const results = await collection.query({
        queryEmbeddings: [queryEmbedding],
        nResults,
        where: { fileId }
      });

      return {
        documents: results.documents[0] || [],
        distances: results.distances?.[0] || [],
        metadatas: results.metadatas?.[0] || []
      };
    } catch (error) {
      console.error('Error querying documents:', error);
      throw error;
    }
  }

  async deleteCollection(fileId: string): Promise<void> {
    const collectionName = `doc_${fileId.replace(/[^a-zA-Z0-9]/g, '_')}`;
    try {
      await this.client.deleteCollection({ name: collectionName });
      console.log(`Deleted collection: ${collectionName}`);
    } catch {
      console.log(`Collection ${collectionName} not found or already deleted`);
    }
  }

  async collectionExists(fileId: string): Promise<boolean> {
    try {
      await this.getOrCreateCollection(fileId);
      return true;
    } catch {
      return false;
    }
  }
}