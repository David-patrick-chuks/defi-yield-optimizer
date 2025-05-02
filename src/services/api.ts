
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
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));
      
      const timestamp = new Date().toISOString();
      
      // Enhanced response generation based on keywords and context
      let response = "I don't have specific information about that. Could you rephrase your question about SafeSage or crypto risk analysis?";
      
      const lowercaseMsg = message.toLowerCase();
      
      // Welcome/Greeting responses
      if (lowercaseMsg.includes('hello') || lowercaseMsg.includes('hi') || lowercaseMsg.includes('hey')) {
        response = "Hello! I'm SafeSage's AI assistant here to help with any questions about crypto risk assessment, portfolio analysis, or using our platform. What would you like to know today?";
      } 
      
      // Help with platform usage
      else if (lowercaseMsg.includes('help') || lowercaseMsg.includes('how to') || lowercaseMsg.includes('guide')) {
        response = "I'd be happy to help! With SafeSage, you can analyze your token portfolio by connecting your wallet on the dashboard page. After connecting, you can generate comprehensive risk reports, compare specific tokens, and receive personalized risk mitigation recommendations. What specific feature would you like me to explain?";
      } 
      
      // About risk analysis methodology
      else if (lowercaseMsg.includes('risk') || lowercaseMsg.includes('safe') || lowercaseMsg.includes('analysis') || lowercaseMsg.includes('score')) {
        response = "SafeSage's risk analysis is comprehensive, examining multiple factors: market capitalization, liquidity depth, smart contract audits, team transparency, code quality, and historical behavior patterns. Our risk scores range from 1-10, with lower scores (1-3) indicating safer investments and higher scores (7-10) suggesting higher risk profiles. We also provide detailed explanations for each risk factor to help you make informed decisions.";
      } 
      
      // About specific cryptocurrencies
      else if (lowercaseMsg.includes('ethereum') || lowercaseMsg.includes('eth') || lowercaseMsg.includes('bitcoin') || lowercaseMsg.includes('btc')) {
        response = "Bitcoin and Ethereum are generally considered lower risk in the crypto ecosystem due to their established histories, large market caps, high liquidity, robust security records, and widespread adoption. However, they still carry more volatility than traditional financial assets. SafeSage can provide you with detailed risk metrics on these assets and compare them to other tokens in your portfolio.";
      } 
      
      // About DeFi protocols
      else if (lowercaseMsg.includes('defi') || lowercaseMsg.includes('protocol') || lowercaseMsg.includes('yield') || lowercaseMsg.includes('staking')) {
        response = "DeFi protocols vary widely in risk profile. SafeSage evaluates key factors including: Total Value Locked (TVL), comprehensive audit history, governance structure, team transparency, decentralization level, and historical incidents. We recommend diversifying your DeFi exposure and using our platform to regularly monitor protocol risk scores as they can change rapidly with market conditions or protocol updates.";
      } 
      
      // About wallet connection
      else if (lowercaseMsg.includes('wallet') || lowercaseMsg.includes('connect') || lowercaseMsg.includes('metamask')) {
        response = "SafeSage supports various wallets including MetaMask, WalletConnect, and other popular Web3 wallets. Your wallet connection is completely secure and read-only - we never have access to your private keys or the ability to move your funds. To connect, simply click the 'Connect Wallet' button on the dashboard page and select your preferred wallet provider.";
      } 
      
      // About SafeSage features
      else if (lowercaseMsg.includes('feature') || lowercaseMsg.includes('what can') || lowercaseMsg.includes('do for me')) {
        response = "SafeSage offers several powerful features: 1) Portfolio Risk Analysis - get a complete risk assessment of all your held tokens, 2) Token Comparison - compare risk profiles across different cryptocurrencies, 3) Smart Contract Auditing - identify potential vulnerabilities in token contracts, 4) Risk Alerts - receive notifications about changing risk levels, and 5) Educational Resources - learn about best practices in DeFi security. Which feature would you like to explore further?";
      }
      
      // About the company/platform
      else if (lowercaseMsg.includes('about') || lowercaseMsg.includes('company') || lowercaseMsg.includes('who are') || lowercaseMsg.includes('safesage')) {
        response = "SafeSage is a cutting-edge crypto risk analysis platform designed to help investors make safer decisions in the volatile DeFi ecosystem. Our mission is to bring institutional-grade risk assessment tools to everyday crypto users. We combine on-chain data analysis, smart contract auditing, and market intelligence to provide comprehensive risk profiles for thousands of tokens and protocols.";
      }
      
      // Pricing/subscription questions
      else if (lowercaseMsg.includes('price') || lowercaseMsg.includes('subscription') || lowercaseMsg.includes('cost') || lowercaseMsg.includes('free')) {
        response = "SafeSage offers a freemium model. Basic portfolio analysis and limited token risk assessments are available for free. Our premium subscription provides advanced features including real-time risk alerts, detailed smart contract auditing, unlimited token comparisons, and personalized risk mitigation strategies. Visit the pricing page for current subscription options and promotional offers.";
      }
      
      // Expressions of gratitude
      else if (lowercaseMsg.includes('thank') || lowercaseMsg.includes('thanks') || lowercaseMsg.includes('helpful')) {
        response = "You're welcome! I'm glad I could help. If you have any more questions about SafeSage's risk analysis tools or how to use our platform effectively, don't hesitate to ask. We're committed to helping you navigate the crypto ecosystem safely.";
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
