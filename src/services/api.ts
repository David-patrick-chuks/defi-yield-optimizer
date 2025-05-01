
import { API_ENDPOINTS } from "@/config/api";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ChatResponse {
  response: string;
  timestamp: string;
  chatHistory: ChatMessage[];
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Something went wrong");
    }

    return response.json();
  }

  // Send chat message
  async sendMessage(message: string, chatHistory: ChatMessage[]): Promise<ChatResponse> {
    try {
      // In a real app, this would be an API call to the backend
      // For now, simulate a response based on the message content
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
      
      const timestamp = new Date().toISOString();
      
      // Simple response generation based on keywords
      let response = "I'm not sure how to help with that. Could you try rephrasing your question?";
      
      const lowercaseMsg = message.toLowerCase();
      
      if (lowercaseMsg.includes('hello') || lowercaseMsg.includes('hi') || lowercaseMsg.includes('hey')) {
        response = "Hello there! How can I help you with crypto risk analysis today?";
      } else if (lowercaseMsg.includes('help') || lowercaseMsg.includes('how to')) {
        response = "I'd be happy to help! You can analyze your token portfolio by connecting your wallet on the dashboard page. Once connected, you can generate a risk report or compare specific tokens.";
      } else if (lowercaseMsg.includes('risk') || lowercaseMsg.includes('safe')) {
        response = "Our risk analysis considers multiple factors: market capitalization, trading volume, liquidity, smart contract audits, team background, and historical performance. Lower scores (1-3) indicate lower risk, while higher scores (7-10) suggest higher risk investments.";
      } else if (lowercaseMsg.includes('ethereum') || lowercaseMsg.includes('eth') || lowercaseMsg.includes('bitcoin') || lowercaseMsg.includes('btc')) {
        response = "Bitcoin and Ethereum are generally considered lower risk in the crypto ecosystem due to their large market caps, established histories, and widespread adoption. However, they still carry more volatility than traditional financial assets.";
      } else if (lowercaseMsg.includes('defi') || lowercaseMsg.includes('protocol')) {
        response = "DeFi protocols can vary widely in risk profile. Key factors to consider include: TVL (Total Value Locked), audit history, team transparency, code quality, and governance structure. Never invest more than you can afford to lose in any DeFi protocol.";
      } else if (lowercaseMsg.includes('wallet')) {
        response = "We support various wallets including MetaMask and any WalletConnect compatible wallets. Your wallet connection is read-only - we never have access to your private keys or ability to move your funds.";
      } else if (lowercaseMsg.includes('thank')) {
        response = "You're welcome! If you have any more questions about crypto risks or using SafeSage, feel free to ask.";
      }
      
      return {
        response,
        timestamp,
        chatHistory: [
          ...chatHistory,
          {
            role: 'assistant',
            content: response,
            timestamp
          }
        ]
      };
    } catch (error) {
      console.error("Error in sendMessage:", error);
      throw error;
    }
  }
}

export const api = new ApiService();
