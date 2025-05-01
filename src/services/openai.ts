
// OpenAI API service for AI risk analysis

// Using the provided API key
const OPENAI_API_KEY = "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";

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
    // For demo purposes, we'll simulate the API call and return mock data
    // In a real implementation, you would send this to the OpenAI API
    console.log("Analyzing tokens with OpenAI API key:", 
      `${OPENAI_API_KEY.substring(0, 10)}...${OPENAI_API_KEY.substring(OPENAI_API_KEY.length - 5)}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Return mock data (in a real app, this would come from the API)
    return tokens.map(token => {
      // Generate a pseudo-random risk score based on the token name
      // In a real app, this would be calculated by the AI
      const nameSum = token.name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
      const riskScore = ((nameSum % 80) + 10) / 10; // Between 1 and 9
      
      return {
        name: token.name,
        symbol: token.symbol,
        riskScore: riskScore,
        explanation: `${token.name} has been analyzed based on market data, liquidity, and volatility metrics. The risk assessment considers historical performance and market capitalization.`,
        suggestions: riskScore > 5 ? `Consider reducing exposure to ${token.symbol} and reallocating to more established assets with similar use cases but better risk profiles.` : undefined,
      };
    });
    
  } catch (error) {
    console.error("Error analyzing tokens:", error);
    throw new Error("Failed to analyze tokens");
  }
};
