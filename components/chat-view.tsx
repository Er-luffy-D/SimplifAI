import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  sources?: Array<{
    content: string;
    relevanceScore: number;
    sourceNumber: number;
    metadata: any;
  }>;
  retrievedChunks?: number;
}

interface ChatViewProps {
  fileId: string;
}

export function ChatView({ fileId }: ChatViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m ready to answer questions about your document. What would you like to know?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: currentInput, fileId })
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: data.answer,
          sources: data.sources,
          retrievedChunks: data.retrievedChunks
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your question. Please try again.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="space-y-4">
      <div className="h-96 overflow-y-auto space-y-4 p-4 border rounded-lg bg-background">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg ${
              message.role === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted'
            }`}>
              <p className="whitespace-pre-wrap">{message.content}</p>
              
              {message.retrievedChunks && (
                <div className="mt-2">
                  <Badge variant="secondary" className="text-xs">
                    RAG: {message.retrievedChunks} chunks retrieved
                  </Badge>
                </div>
              )}
              
              {message.sources && message.sources.length > 0 && (
                <div className="mt-3 space-y-2">
                  <h4 className="text-sm font-semibold">Sources from document:</h4>
                  {message.sources.map((source, i) => (
                    <Card key={i} className="p-2">
                      <CardContent className="p-0">
                        <div className="flex justify-between items-start mb-1">
                          <Badge variant="secondary" className="text-xs">
                            Source {source.sourceNumber}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            Relevance: {(source.relevanceScore * 100).toFixed(1)}%
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {source.content}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-muted p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask a question about the document..."
          disabled={loading}
          className="flex-1"
        />
        <Button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
        >
          {loading ? 'Thinking...' : 'Send'}
        </Button>
      </div>
    </div>
  );
}