// Create: tests/text-chunker.test.ts
import { TextChunker } from '@/lib/rag/text-chunker';

describe('TextChunker', () => {
  const chunker = new TextChunker(100, 20);
  
  test('should chunk text properly', () => {
    const text = 'A'.repeat(250);
    const chunks = chunker.chunkText(text);
    
    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks[0].length).toBeLessThanOrEqual(100);
  });

  test('should handle empty text', () => {
    const chunks = chunker.chunkText('');
    expect(chunks).toEqual([]);
  });
});