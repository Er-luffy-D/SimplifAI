
import { ChromaService } from '@/lib/rag/chroma-service';
describe('RAG Quality Tests', () => {
  test('should retrieve relevant chunks for specific queries', async () => {
    const chromaService = new ChromaService();
    
    // Test cases with expected relevance
    const testCases = [
      {
        query: 'artificial intelligence',
        expectedKeywords: ['AI', 'artificial', 'intelligence'],
        minRelevance: 0.7
      },
      {
        query: 'machine learning algorithms',
        expectedKeywords: ['machine', 'learning', 'algorithm'],
        minRelevance: 0.6
      }
    ];
    
    for (const testCase of testCases) {
      const results = await chromaService.queryDocuments('test-doc', testCase.query, 3);
      
      // Check relevance scores
      const relevanceScore = 1 - (results.distances[0] || 1);
      expect(relevanceScore).toBeGreaterThan(testCase.minRelevance);
      
      // Check keyword presence
      const hasKeywords = testCase.expectedKeywords.some(keyword => 
        results.documents[0]?.toLowerCase().includes(keyword.toLowerCase())
      );
      expect(hasKeywords).toBe(true);
    }
  });
});