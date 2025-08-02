// Create: tests/performance/rag-load-test.js
import http from 'k6/http';
import { check } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m', target: 20 },
    { duration: '30s', target: 0 },
  ],
};

export default function() {
  const payload = JSON.stringify({
    question: 'What are the key points?',
    fileId: 'test-file-id'
  });

  const response = http.post('http://localhost:3000/api/chat-pdf', payload, {
    headers: { 'Content-Type': 'application/json' },
  });

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response contains answer': (r) => JSON.parse(r.body).answer !== undefined,
    'response time < 5s': (r) => r.timings.duration < 5000,
  });
}