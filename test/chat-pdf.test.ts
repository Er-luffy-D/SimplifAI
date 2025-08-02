// Create: tests/chat-pdf.test.ts
import { POST } from '@/app/api/chat-pdf/route';
import { NextRequest } from 'next/server';

describe('/api/chat-pdf', () => {
  test('should retrieve and use document context', async () => {
    const requestBody = {
      question: 'What is this document about?',
      fileId: 'existing-test-doc-id'
    };
    
    const request = new NextRequest('http://localhost:3000/api/chat-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });
    
    const response = await POST(request);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.answer).toBeDefined();
    expect(data.sources).toBeDefined();
    expect(data.retrievedChunks).toBeGreaterThan(0);
    expect(data.ragEnabled).toBe(true);
  });
});