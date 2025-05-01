
import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { api } from '@/services/api';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const STORAGE_KEY = 'safesage-chat-history';

export function SupportBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem(STORAGE_KEY);
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        return parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      } catch (e) {
        console.error('Error parsing saved messages:', e);
        return [{
          id: 1,
          role: "assistant",
          content: "Hi there! I'm SafeSage Support. How can I help you today?",
          timestamp: new Date()
        }];
      }
    }
    return [{
      id: 1,
      role: "assistant",
      content: "Hi there! I'm SafeSage Support. How can I help you today?",
      timestamp: new Date()
    }];
  });
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const messagesToStore = messages.map(msg => ({
      ...msg,
      timestamp: msg.timestamp.toISOString()
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messagesToStore));
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  };

  const clearChat = () => {
    setMessages([{
      id: 1,
      role: "assistant",
      content: "Hi there! I'm SafeSage Support. How can I help you today?",
      timestamp: new Date()
    }]);
    toast("Chat history cleared");
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    try {
      const chatHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp.toISOString(),
      }));

      const data = await api.sendMessage(newMessage, chatHistory);

      const botMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: data.response,
        timestamp: new Date(data.timestamp),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const botMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: "I apologize, but I'm having trouble connecting to our servers. Please try again shortly.",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      toast("Failed to send message", {
        description: "Please try again later",
        className: "bg-red-100 border-red-200",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-0 right-0 z-50 p-6">
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-safesage-primary text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-safesage-primary-dark transition-colors duration-300 group relative"
        >
          <Bot className="h-7 w-7" />
          <span className="absolute top-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
          <span className="absolute w-full h-full rounded-full bg-safesage-primary animate-ping opacity-20"></span>
        </button>
      )}

      {isOpen && (
        <div className="w-[350px] sm:w-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="bg-safesage-primary text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Bot className="h-6 w-6" />
                <span className="absolute -right-1 -bottom-1 h-3 w-3 bg-green-500 rounded-full border-2 border-safesage-primary"></span>
              </div>
              <div>
                <h3 className="font-bold">SafeSage Support</h3>
                <p className="text-xs text-white/80">Online | Usually replies instantly</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {messages.length > 1 && (
                <button 
                  onClick={clearChat}
                  className="text-white hover:text-white/80 p-1"
                  title="Clear chat history"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
              <button 
                onClick={toggleChat} 
                aria-label="Close chat"
                className="text-white hover:text-white/80 p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="h-[350px] overflow-y-auto p-4 bg-gray-50">
            {messages.map(msg => (
              <div 
                key={msg.id} 
                className={`mb-4 flex ${msg.role === "user" ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${msg.role === "user" 
                  ? 'bg-safesage-primary text-white rounded-t-2xl rounded-bl-2xl' 
                  : 'bg-white border border-gray-200 rounded-t-2xl rounded-br-2xl shadow-sm'}`}>

                  <div className="p-3 px-4">
                    {msg.role === "assistant" && (
                      <div className="flex items-center space-x-2 mb-1">
                        <Bot className="h-4 w-4 text-safesage-primary" />
                        <span className="text-xs font-medium text-safesage-primary">SafeSage Support</span>
                      </div>
                    )}
                    <div className="text-sm">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                    <div className={`text-xs mt-1 text-right ${msg.role === "user" ? 'text-white/70' : 'text-gray-500'}`}>
                      {formatTime(msg.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 flex items-center">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-safesage-primary focus:border-transparent"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button 
              type="submit" 
              size="icon"
              className="ml-2 bg-safesage-primary hover:bg-safesage-primary-dark rounded-full"
              disabled={!newMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
