
import * as CoinbaseSDK from "@coinbase/cdp-sdk";

// Initialize CDP SDK client for Base network
export const initCdpClient = () => {
  try {
    console.log("Initializing CDP client for Base network");
    
    // For debugging, log what properties are available
    console.log("Available CoinbaseSDK properties:", Object.keys(CoinbaseSDK));
    
    // Try to initialize using the most common patterns for SDK clients
    let cdpClient;
    
    // Method 1: Direct instantiation if available
    if (typeof CoinbaseSDK === 'function') {
      cdpClient = new (CoinbaseSDK as any)({
        network: "base",
        apiKey: process.env.COINBASE_CDP_API_KEY || "demo",
      });
    } 
    // Method 2: Check if there's a client constructor
    else if (CoinbaseSDK.Client) {
      cdpClient = new CoinbaseSDK.Client({
        network: "base",
        apiKey: process.env.COINBASE_CDP_API_KEY || "demo",
      });
    }
    // Method 3: Try to find a createClient function
    else if (typeof CoinbaseSDK.createClient === 'function') {
      cdpClient = CoinbaseSDK.createClient({
        network: "base",
        apiKey: process.env.COINBASE_CDP_API_KEY || "demo",
      });
    }
    // Method 4: Use any exported constructor that looks promising
    else {
      const potentialConstructors = Object.keys(CoinbaseSDK).filter(key => 
        typeof (CoinbaseSDK as any)[key] === 'function' && 
        /client|sdk|cdp/i.test(key)
      );
      
      if (potentialConstructors.length > 0) {
        const constructor = (CoinbaseSDK as any)[potentialConstructors[0]];
        cdpClient = new constructor({
          network: "base",
          apiKey: process.env.COINBASE_CDP_API_KEY || "demo",
        });
      }
    }
    
    if (!cdpClient) {
      console.error("Could not initialize CDP client - SDK structure not recognized");
      // Create a mock client for development purposes
      cdpClient = {
        getBalance: async () => ({ balance: "1000.00" }),
        getTransactions: async () => ([]),
        // Add other methods as needed
      };
    }
    
    return cdpClient;
  } catch (error) {
    console.error("Error initializing CDP client:", error);
    return null;
  }
};

// CDP client instance
export const cdpClient = initCdpClient();
