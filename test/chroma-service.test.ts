// Create: tests/chroma-service.test.ts
import { ChromaService } from '@/lib/rag/chroma-service';

describe('ChromaService', () => {
  let chromaService: ChromaService;
  const testFileId = 'test-doc-123';
  const testChunks = [
    'This is the first chunk about artificial intelligence.',
    'This is the second chunk about machine learning.',
    'This is the third chunk about neural networks.'
  ];

  beforeAll(() => {
    chromaService = new ChromaService();
  });

  afterAll(async () => {
    // Cleanup
    await chromaService.deleteCollection(testFileId);
  });

  test('should store document chunks', async () => {
    await chromaService.addDocumentChunks(testFileId, testChunks);
    const exists = await chromaService.collectionExists(testFileId);
    expect(exists).toBe(true);
  });

  test('should retrieve relevant chunks', async () => {
    const query = 'What is artificial intelligence?';
    const results = await chromaService.queryDocuments(testFileId, query, 3);
    
    expect(results.documents).toHaveLength(3);
    expect(results.documents[0]).toContain('artificial intelligence');
    expect(results.distances[0]).toBeLessThan(results.distances[1]);
  });
});