// Create: tests/parse-pdf.test.ts
import { POST } from '@/app/api/parse-pdf/route';
import { NextRequest } from 'next/server';

describe('/api/parse-pdf', () => {
  test('should process PDF and store in ChromaDB', async () => {
    // Create test file
    const testFile = new File(['Test PDF content'], 'test.txt', {
      type: 'text/plain'
    });
    
    const formData = new FormData();
    formData.append('file', testFile);
    
    const request = new NextRequest('http://localhost:3000/api/parse-pdf', {
      method: 'POST',
      body: formData
    });
    
    const response = await POST(request);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.fileId).toBeDefined();
    expect(data.ragEnabled).toBe(true);
    expect(data.chunksCount).toBeGreaterThan(0);
  });
});