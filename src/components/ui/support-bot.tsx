
import * as React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircleQuestion } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function SupportBot() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([
    {
      type: "bot",
      text: "Hello! How can I help you with your DeFi risk assessment today?"
    }
  ]);
  const [input, setInput] = React.useState("");
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Common predefined responses
  const commonResponses = {
    wallet: `To connect your wallet, click the "Connect Wallet" button in the navigation bar.\n\n${
      isMobile 
        ? "Since you're on a mobile device, the Reown AppKit will provide options suitable for mobile wallets." 
        : "On desktop, you can use browser extensions like MetaMask or other options provided by Reown AppKit."
    }`,
    error: "If you're experiencing a 'Failed to connect wallet' error, please ensure you have a compatible wallet installed. We're using Reown AppKit which supports most major wallets.",
    help: "You can use SafeSage to analyze and compare different DeFi tokens, get risk assessment reports, and make informed decisions about your investments."
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { type: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    
    // Process response
    const lowerInput = input.toLowerCase();
    let botResponse;
    
    if (lowerInput.includes("wallet") || lowerInput.includes("connect")) {
      botResponse = { type: "bot", text: commonResponses.wallet };
    } else if (lowerInput.includes("error") || lowerInput.includes("fail")) {
      botResponse = { type: "bot", text: commonResponses.error };
    } else {
      botResponse = { type: "bot", text: commonResponses.help };
    }
    
    // Add bot response after a small delay
    setTimeout(() => {
      setMessages(prev => [...prev, botResponse]);
    }, 500);
    
    // Clear input
    setInput("");
  };

  // Scroll to bottom of messages when new ones are added
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Support bot button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          className="h-12 w-12 rounded-full shadow-lg bg-sage-500 hover:bg-sage-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MessageCircleQuestion className="h-5 w-5" />
          <span className="sr-only">Open support chat</span>
        </Button>
      </div>
      
      {/* Support chat panel - only shown when open */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 md:w-96 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden">
          <div className="bg-sage-500 text-white p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">SafeSage Support</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-sage-600" 
                onClick={() => setIsOpen(false)}
              >
                ×
              </Button>
            </div>
          </div>
          <div className="p-4 h-80 overflow-y-auto">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`${
                  msg.type === "bot" 
                    ? "bg-slate-100 rounded-lg p-3 mb-3 max-w-[80%]" 
                    : "flex justify-end mb-4"
                }`}
              >
                {msg.type === "bot" ? (
                  <p className="text-sm">
                    {msg.text}
                  </p>
                ) : (
                  <div className="bg-sage-100 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">
                      {msg.text}
                    </p>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t border-slate-200">
            <div className="flex">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your question..."
                className="flex-1 px-3 py-2 border border-slate-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-sage-500"
              />
              <Button 
                className="rounded-l-none"
                onClick={handleSend}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
