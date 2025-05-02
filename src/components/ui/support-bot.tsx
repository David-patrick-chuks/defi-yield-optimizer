
import { useState, useRef, useEffect } from 'react';
import { Bot, SendHorizontal, X, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';
import { api, ChatMessage } from '@/services/api';
import LoadingAI from '@/components/ui/LoadingAI';

export function SupportBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Welcome to SafeSage! 👋 I\'m your personal AI assistant, ready to help with any questions about crypto risk assessment, DeFi safety practices, or how to use our platform effectively. How can I assist you today?',
      timestamp: new Date().toISOString()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      role: 'user' as const,
      content: message,
      timestamp: new Date().toISOString()
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);
    
    try {
      // Send message to backend API
      const response = await api.sendMessage(message, chatHistory);
      
      // Add response to chat
      setChatHistory(prev => [...prev, userMessage, {
        role: 'assistant',
        content: response.response,
        timestamp: response.timestamp
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to get a response. Please try again.');
      
      // Add fallback response
      setChatHistory(prev => [...prev, userMessage, {
        role: 'assistant',
        content: "I apologize for the inconvenience. I'm having trouble connecting right now. Please try again later or contact our support team if this issue persists.",
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  return (
    <>
      {/* Floating chat button */}
      <Button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 rounded-full p-3 shadow-lg z-40 ${isOpen ? 'bg-slate-700' : 'gradient-bg-secondary'}`}
        aria-label="Support Chat"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 sm:w-96 bg-white rounded-lg shadow-xl z-40 border border-slate-200 flex flex-col max-h-[70vh]">
          {/* Chat header */}
          <div className="p-3 border-b border-slate-200 bg-sage-50 rounded-t-lg flex items-center">
            <Bot className="h-5 w-5 text-sage-600 mr-2" />
            <div>
              <h3 className="font-medium text-slate-800">SafeSage Assistant</h3>
              <p className="text-xs text-slate-500">Your crypto risk analysis expert</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
              onClick={toggleChat}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`flex ${
                  chat.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    chat.role === 'user'
                      ? 'bg-slate-100 text-slate-800'
                      : 'bg-sage-100 text-slate-800'
                  }`}
                >
                  <p className="text-sm">{chat.content}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-lg bg-sage-50 text-slate-800">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-sage-400 animate-pulse"></div>
                    <div className="h-2 w-2 rounded-full bg-sage-400 animate-pulse delay-75"></div>
                    <div className="h-2 w-2 rounded-full bg-sage-400 animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Message input */}
          <form onSubmit={handleSendMessage} className="border-t border-slate-200 p-3">
            <div className="flex items-center gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about SafeSage..."
                className="flex-1"
                disabled={isLoading}
                autoFocus={isOpen}
              />
              <Button 
                type="submit" 
                size="icon"
                disabled={!message.trim() || isLoading}
                className="gradient-bg-secondary"
              >
                <SendHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
