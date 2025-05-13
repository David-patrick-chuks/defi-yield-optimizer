
import { ethers } from "ethers";
import { toast } from "@/components/ui/sonner";
import { YieldPool } from "../types/yieldTypes";
import { cdpClient } from "../clients/coinbaseClient";

// Fetch real-time protocol TVL data using CDP client
export const fetchProtocolTVL = async (protocolName: string): Promise<number> => {
  if (!cdpClient) return 0;
  
  try {
    // Use the CDP client to fetch TVL data
    const data = await cdpClient.getProtocolData(protocolName);
    return parseFloat(data.tvl);
  } catch (error) {
    console.error(`Error fetching TVL for ${protocolName}:`, error);
    return 0;
  }
};

// Fetch available yield options with real-time data
export const fetchYieldOptions = async (
  provider: ethers.BrowserProvider
): Promise<YieldPool[]> => {
  try {
    console.log("Fetching yield options with CDP client...");
    
    if (!cdpClient) {
      toast.error("CDP client not initialized");
      return [];
    }
    
    // Use CDP client to fetch real yield options
    const yieldOptions = await cdpClient.fetchYieldOptions();
    
    // Transform to YieldPool type
    const pools: YieldPool[] = yieldOptions.map(pool => ({
      protocol: pool.protocol,
      name: pool.name,
      tokens: pool.tokens,
      apy: pool.apy,
      tvl: pool.tvl,
      address: pool.address,
      risk: pool.risk as 'low' | 'moderate' | 'high',
      lastUpdated: pool.lastUpdated
    }));
    
    // Log successful data fetch
    console.log("Yield options fetched successfully with CDP client");
    return pools;
  } catch (error) {
    console.error("Error fetching yield options with CDP client:", error);
    toast.error("Failed to fetch yield options");
    return [];
  }
};
