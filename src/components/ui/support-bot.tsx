
import { useState, useRef, useEffect } from 'react';
import { Bot, SendHorizontal, X, MessageSquare, Home, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';
import { api, ChatMessage } from '@/services/api';
import LoadingAI from '@/components/ui/LoadingAI';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const [activeTab, setActiveTab] = useState('messages');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    // Focus the input when chat opens
    setTimeout(() => {
      if (inputRef.current && !isOpen) {
        inputRef.current.focus();
      }
    }, 100);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!message.trim() || isLoading) return;
    
    // Add user message to chat
    const userMessage = {
      role: 'user' as const,
      content: message,
      timestamp: new Date().toISOString()
    };
    
    // Clear input field immediately for better UX
    const currentMessage = message;
    setMessage('');
    
    // Update chat with user message
    setChatHistory(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Send message to backend API
      const response = await api.sendMessage(currentMessage, chatHistory);
      
      // Add bot response to chat
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: response.response,
        timestamp: response.timestamp
      }]);
      
      // Switch to messages tab if user is on a different tab
      if (activeTab !== 'messages') {
        setActiveTab('messages');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to get a response. Please try again.');
      
      // Add fallback response
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: "I apologize for the inconvenience. I'm having trouble connecting right now. Please try again later or contact our support team if this issue persists.",
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
      // Re-focus the input after sending
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Content for different tabs
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="p-4">
            <h3 className="text-lg font-medium text-slate-800 mb-2">Welcome to SafeSage</h3>
            <p className="text-sm text-slate-600 mb-4">
              Your personal assistant for crypto risk assessment and DeFi safety.
            </p>
            <div className="space-y-3">
              <div className="bg-sage-50 p-3 rounded-lg">
                <h4 className="font-medium text-slate-800">Risk Assessment</h4>
                <p className="text-xs text-slate-600">Get comprehensive analysis of your crypto portfolio</p>
              </div>
              <div className="bg-sage-50 p-3 rounded-lg">
                <h4 className="font-medium text-slate-800">Smart Contract Security</h4>
                <p className="text-xs text-slate-600">Learn about the security of your DeFi investments</p>
              </div>
              <div className="bg-sage-50 p-3 rounded-lg">
                <h4 className="font-medium text-slate-800">Market Intelligence</h4>
                <p className="text-xs text-slate-600">Stay updated on market trends and risks</p>
              </div>
            </div>
          </div>
        );
      case 'news':
        return (
          <div className="p-4">
            <h3 className="text-lg font-medium text-slate-800 mb-2">Latest Updates</h3>
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <p className="text-sm font-medium text-slate-800">New Risk Assessment Algorithm</p>
                <p className="text-xs text-slate-600 mb-1">
                  Our team has implemented an improved risk scoring system that provides more accurate assessments.
                </p>
                <span className="text-xs text-sage-600">2 days ago</span>
              </div>
              <div className="border-b border-slate-200 pb-3">
                <p className="text-sm font-medium text-slate-800">DeFi Protocol Integration</p>
                <p className="text-xs text-slate-600 mb-1">
                  SafeSage now supports risk analysis for major DeFi lending protocols.
                </p>
                <span className="text-xs text-sage-600">1 week ago</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">Mobile App Coming Soon</p>
                <p className="text-xs text-slate-600 mb-1">
                  We're excited to announce our mobile app will be launching next month.
                </p>
                <span className="text-xs text-sage-600">2 weeks ago</span>
              </div>
            </div>
          </div>
        );
      case 'messages':
      default:
        return (
          <>
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
                  ref={inputRef}
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
          </>
        );
    }
  };

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
          
          {/* Tab navigation */}
          <Tabs value={activeTab} className="w-full" onValueChange={(value) => setActiveTab(value)}>
            <div className="border-b border-slate-200">
              <TabsList className="w-full bg-transparent justify-between px-2">
                <TabsTrigger value="home" className="flex items-center data-[state=active]:bg-transparent data-[state=active]:text-sage-600">
                  <Home className="h-4 w-4 mr-1" />
                  <span className="text-xs">Home</span>
                </TabsTrigger>
                <TabsTrigger value="messages" className="flex items-center data-[state=active]:bg-transparent data-[state=active]:text-sage-600">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span className="text-xs">Chat</span>
                </TabsTrigger>
                <TabsTrigger value="news" className="flex items-center data-[state=active]:bg-transparent data-[state=active]:text-sage-600">
                  <Newspaper className="h-4 w-4 mr-1" />
                  <span className="text-xs">News</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="flex-1 flex flex-col overflow-hidden">
              {renderTabContent()}
            </div>
          </Tabs>
        </div>
      )}
    </>
  );
}
