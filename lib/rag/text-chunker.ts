export class TextChunker {
  private chunkSize: number;
  private chunkOverlap: number;

  constructor(chunkSize: number = 1000, chunkOverlap: number = 200) {
    this.chunkSize = chunkSize;
    this.chunkOverlap = chunkOverlap;
  }

  chunkText(text: string): string[] {
    if (!text || text.length === 0) {
      return [];
    }

    const chunks: string[] = [];
    let start = 0;

    while (start < text.length) {
      let end = start + this.chunkSize;
      
      // Try to break at a sentence or paragraph boundary
      if (end < text.length) {
        const sentenceEnd = text.lastIndexOf('.', end);
        const paragraphEnd = text.lastIndexOf('\n\n', end);
        const breakPoint = Math.max(sentenceEnd, paragraphEnd);
        
        if (breakPoint > start + this.chunkSize * 0.5) {
          end = breakPoint + 1;
        }
      }

      const chunk = text.slice(start, end).trim();
      if (chunk.length > 50) { // Only add substantial chunks
        chunks.push(chunk);
      }

      // Calculate next start position to avoid skipping text
      // If we broke early (end < start + chunkSize), advance from the break point with overlap
      // Otherwise, use normal advancement
      if (end < start + this.chunkSize) {
        // Early break: start from break point minus overlap, but ensure we don't go backwards
        start = Math.max(start + 1, end - this.chunkOverlap);
      } else {
        // Normal advancement: standard chunk progression
        start = start + this.chunkSize - this.chunkOverlap;
      }
    }

    return chunks;
  }

  chunkByParagraphs(text: string): string[] {
    return text
      .split(/\n\s*\n/)
      .filter(chunk => chunk.trim().length > 50)
      .map(chunk => chunk.trim());
  }
}