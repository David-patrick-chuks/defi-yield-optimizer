import { API_ENDPOINTS } from "@/config/api";

// Remove hardcoded API key for production
interface TokenData {
  name: string;
  symbol: string;
  balance?: number;
  price?: number;
}

interface TokenAnalysisResult {
  name: string;
  symbol: string;
  riskScore: number;
  explanation: string;
  suggestions?: string;
}

export const analyzeTokens = async (tokens: TokenData[]): Promise<TokenAnalysisResult[]> => {
  try {
    console.log("Starting token analysis with backend API...");
    
    const response = await fetch(`${API_ENDPOINTS.analyzeTokens}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tokens }),
    });

    if (!response.ok) {
      throw new Error(`API error with status ${response.status}`);
    }

    const data = await response.json();
    return data.analysis;
    
  } catch (error) {
    console.error("Error analyzing tokens with API:", error);
    throw new Error("Failed to analyze tokens with AI service");
  }
};

export const compareTokensWithAI = async (tokenA: string, tokenB: string) => {
  const response = await fetch(API_ENDPOINTS.compareTokens, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tokenA, tokenB }),
  });

  if (!response.ok) {
    throw new Error("Failed to get comparison from AI.");
  }

  return await response.json();
};
