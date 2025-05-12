
import * as CoinbaseSDK from "@coinbase/cdp-sdk";

// Initialize CDP SDK client for Base network
export const initCdpClient = () => {
  try {
    // Create a CDP client instance
    // The SDK structure might be different than we initially assumed
    // Let's try using the CDP class directly if it exists
    if (CoinbaseSDK.CDP) {
      return new CoinbaseSDK.CDP({
        network: "base",
        apiKey: process.env.COINBASE_CDP_API_KEY || "demo", // Use demo key if not provided
      });
    } else {
      // Fallback to try other potential initialization methods
      console.warn("CoinbaseSDK.CDP not found, trying alternative initialization");
      
      // For debugging, log what properties are available
      console.log("Available CoinbaseSDK properties:", Object.keys(CoinbaseSDK));
      
      // Try a more generic approach
      const cdpClient = CoinbaseSDK.createClient ? 
        CoinbaseSDK.createClient({
          network: "base",
          apiKey: process.env.COINBASE_CDP_API_KEY || "demo",
        }) : null;
      
      if (!cdpClient) {
        console.error("Could not initialize CDP client - SDK methods not found");
      }
      
      return cdpClient;
    }
  } catch (error) {
    console.error("Error initializing CDP client:", error);
    return null;
  }
};

// CDP client instance
export const cdpClient = initCdpClient();
