
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
      else if (lowercaseMsg.includes('ethereum') || lowercaseMsg.includes('eth')) {
        response = "Ethereum is generally considered lower risk in the crypto ecosystem due to its established history, large market cap, high liquidity, and robust security records. It typically scores around 2.5 on our risk scale. As the leading smart contract platform, ETH benefits from widespread adoption and a large developer community. However, it faces challenges with scaling and competition from newer, more scalable blockchains.";
      }
      
      else if (lowercaseMsg.includes('bitcoin') || lowercaseMsg.includes('btc')) {
        response = "Bitcoin has the lowest risk profile among cryptocurrencies, typically scoring around 2.1 on our scale. As the first and largest cryptocurrency, it benefits from strong network effects, the highest liquidity, and widespread institutional adoption. Its well-established security model and limited supply make it a relatively safer store of value, though it still experiences significant volatility compared to traditional assets.";
      }
      
      // About MoveVM - expanded information
      else if (lowercaseMsg.includes('movevm') || lowercaseMsg.includes('move')) {
        response = "MoveVM is a virtual machine designed for secure digital asset management, originally developed by Facebook for the Libra/Diem blockchain. It's now utilized in several blockchain platforms including Aptos, Sui, and others. The Move language is specifically designed for smart contracts that handle digital assets securely.\n\nIn SafeSage's risk assessment, MoveVM typically scores around 5.8 (moderate-high risk). While its security-focused design and formal verification capabilities are strengths, it's still evolving with limited ecosystem maturity compared to more established blockchains. The token shows promising technological innovation but experiences higher volatility and lower liquidity than more established cryptocurrencies.";
      }
      
      // About IOTA - expanded information
      else if (lowercaseMsg.includes('iota') || lowercaseMsg.includes('miota')) {
        response = "IOTA uses a distinctive Directed Acyclic Graph (DAG) structure called 'The Tangle' rather than a traditional blockchain. This design enables fee-less transactions and high scalability, targeting Internet of Things (IoT) applications. The project has undergone significant protocol updates, including the Chrysalis update and working toward full decentralization with IOTA 2.0 (Coordicide).\n\nIn SafeSage's risk assessment, IOTA typically scores around 4.2 (moderate risk). Its strengths include the innovative fee-less structure, partnerships with industrial companies for IoT integration, and focused use case. However, it has faced technical delays, historical network outages, and presents a higher risk profile than more established cryptocurrencies. Consider it for exposure to IoT blockchain solutions but with appropriate position sizing.";
      }
      
      // Added detailed responses for other tokens
      else if (lowercaseMsg.includes('solana') || lowercaseMsg.includes('sol')) {
        response = "Solana is a high-performance blockchain focused on scalability and low transaction costs. It uses a unique Proof of History consensus mechanism alongside Proof of Stake to achieve high throughput (up to 65,000 TPS in theory). In SafeSage's assessment, Solana typically scores around 3.8 (moderate risk). Its strengths include high performance, growing ecosystem of DApps, and strong developer activity. Risks include past network outages, relatively higher centralization compared to other major chains, and considerable competition in the high-performance blockchain space.";
      }
      
      else if (lowercaseMsg.includes('cardano') || lowercaseMsg.includes('ada')) {
        response = "Cardano follows a research-first, peer-reviewed approach to blockchain development. It employs a Proof of Stake consensus algorithm called Ouroboros and has gone through careful development phases (Byron, Shelley, Goguen, etc.). In SafeSage's assessment, Cardano typically scores around 3.5 (moderate risk). Its strengths include strong academic foundation, energy-efficient consensus mechanism, and dedicated community. Challenges include slower deployment of features compared to competitors and questions about developer adoption and ecosystem growth. Its methodical development approach may provide more long-term stability but slower feature delivery.";
      }
      
      else if (lowercaseMsg.includes('polkadot') || lowercaseMsg.includes('dot')) {
        response = "Polkadot is a multi-chain platform enabling different blockchains to interoperate through a central relay chain. It was founded by Ethereum co-founder Dr. Gavin Wood and focuses on cross-chain communication through parachains. In SafeSage's assessment, Polkadot scores around 4.0 (moderate risk). Its strengths include strong interoperability focus, experienced development team, and innovative governance model. Risks involve complex technical architecture, competition from other interoperability solutions, and the relatively early stage of its ecosystem. Consider Polkadot as an investment in blockchain interoperability infrastructure.";
      }
      
      // About DeFi protocols
      else if (lowercaseMsg.includes('defi') || lowercaseMsg.includes('protocol') || lowercaseMsg.includes('yield') || lowercaseMsg.includes('staking')) {
        response = "DeFi protocols vary widely in risk profile. SafeSage evaluates key factors including: Total Value Locked (TVL), comprehensive audit history, governance structure, team transparency, decentralization level, and historical incidents. We recommend diversifying your DeFi exposure and using our platform to regularly monitor protocol risk scores as they can change rapidly with market conditions or protocol updates.";
      } 
      
      // About wallet connection
      else if (lowercaseMsg.includes('wallet') || lowercaseMsg.includes('connect') || lowercaseMsg.includes('metamask')) {
        response = "SafeSage supports various wallets including MetaMask, WalletConnect, Coinbase Wallet and other popular Web3 wallets. Your wallet connection is completely secure and read-only - we never have access to your private keys or the ability to move your funds. To connect, simply click the 'Connect Wallet' button on the dashboard page and select your preferred wallet provider. If you experience any issues connecting, try refreshing your browser or ensuring your wallet extension is up to date.";
      } 
      
      // About SafeSage features
      else if (lowercaseMsg.includes('feature') || lowercaseMsg.includes('what can') || lowercaseMsg.includes('do for me')) {
        response = "SafeSage offers several powerful features: 1) Portfolio Risk Analysis - get a complete risk assessment of all your held tokens including Bitcoin, Ethereum, MoveVM, IOTA and others, 2) Token Comparison - compare risk profiles across different cryptocurrencies, 3) Smart Contract Auditing - identify potential vulnerabilities in token contracts, 4) Risk Alerts - receive notifications about changing risk levels, and 5) Educational Resources - learn about best practices in DeFi security. Which feature would you like to explore further?";
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
