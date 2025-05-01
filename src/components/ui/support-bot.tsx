
import * as React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircleQuestion } from "lucide-react";

export function SupportBot() {
  const [isOpen, setIsOpen] = React.useState(false);

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
            <div className="bg-slate-100 rounded-lg p-3 mb-3 max-w-[80%]">
              <p className="text-sm">
                Hello! How can I help you with your DeFi risk assessment today?
              </p>
            </div>
            <div className="flex justify-end mb-4">
              <div className="bg-sage-100 rounded-lg p-3 max-w-[80%]">
                <p className="text-sm">
                  How do I connect my wallet?
                </p>
              </div>
            </div>
            <div className="bg-slate-100 rounded-lg p-3 mb-3 max-w-[80%]">
              <p className="text-sm">
                To connect your wallet, click the "Connect Wallet" button in the navigation bar. 
                <br /><br />
                On mobile devices, we use WalletConnect which will let you scan a QR code with your mobile wallet app. On desktop, you can use browser extensions like MetaMask.
              </p>
            </div>
          </div>
          <div className="p-3 border-t border-slate-200">
            <div className="flex">
              <input 
                type="text"
                placeholder="Type your question..."
                className="flex-1 px-3 py-2 border border-slate-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-sage-500"
              />
              <Button className="rounded-l-none">Send</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
