
import * as CoinbaseSDK from "@coinbase/cdp-sdk";

// Initialize CDP SDK client for Base network
export const initCdpClient = () => {
  try {
    // Create a CDP client instance
    // Note: The SDK might not expose CDP directly, so we need to access it differently
    return new CoinbaseSDK.default({
      network: "base",
      apiKey: process.env.COINBASE_CDP_API_KEY || "demo", // Use demo key if not provided
    });
  } catch (error) {
    console.error("Error initializing CDP client:", error);
    return null;
  }
};

// CDP client instance
export const cdpClient = initCdpClient();
