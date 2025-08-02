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

      start = Math.max(start + this.chunkSize - this.chunkOverlap, end);
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