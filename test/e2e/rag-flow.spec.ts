// Create: tests/e2e/rag-flow.spec.ts (Playwright)
import { test, expect } from '@playwright/test';

test('RAG workflow end-to-end', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Upload document
  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles('test-document.pdf');
  
  // Wait for processing
  await expect(page.locator('[data-testid="rag-status"]')).toContainText('RAG enabled');
  
  // Test chat
  await page.fill('[data-testid="chat-input"]', 'What is this document about?');
  await page.click('[data-testid="send-button"]');
  
  // Verify RAG response
  await expect(page.locator('[data-testid="rag-badge"]')).toBeVisible();
  await expect(page.locator('[data-testid="sources-section"]')).toBeVisible();
});