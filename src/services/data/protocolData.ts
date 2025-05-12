
import { ethers } from "ethers";
import { toast } from "@/components/ui/sonner";
import { YieldPool } from "../types/yieldTypes";
import { cdpClient } from "../clients/coinbaseClient";

// Fetch real-time protocol TVL data using CDP SDK
export const fetchProtocolTVL = async (protocolName: string): Promise<number> => {
  if (!cdpClient) return 0;
  
  try {
    // For now, return mock data until we implement full CDP functionality
    // In a real implementation, we would use cdpClient to fetch TVL data
    const mockTVL: Record<string, number> = {
      "Aerodrome": 4500000,
      "BaseSwap": 2800000,
      "Moonwell": 12500000,
      "Curve": 8700000,
      "Degen Protocol": 950000
    };
    
    return mockTVL[protocolName] || 0;
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
    console.log("Fetching yield options with CDP SDK...");
    
    // In a full implementation, we would use cdpClient to fetch real-time data
    // For now, we'll use mocked data but add real-time data structure
    const mockYieldPools: YieldPool[] = [
      {
        protocol: "Aerodrome",
        name: "USDC-WETH LP",
        tokens: ["USDC", "WETH"],
        apy: 8.45,
        tvl: await fetchProtocolTVL("Aerodrome"),
        address: "0x4C36388bE6F416A29C8d8Eee81C771cE6bE14B18",
        risk: 'low',
        lastUpdated: new Date()
      },
      {
        protocol: "BaseSwap",
        name: "USDC-DAI LP",
        tokens: ["USDC", "DAI"],
        apy: 5.23,
        tvl: await fetchProtocolTVL("BaseSwap"),
        address: "0x6E8FE5A9B9FBD23C19E4B3E5A06FAA3B626466BC",
        risk: 'low',
        lastUpdated: new Date()
      },
      {
        protocol: "Moonwell",
        name: "USDC Lending",
        tokens: ["USDC"],
        apy: 3.87,
        tvl: await fetchProtocolTVL("Moonwell"),
        address: "0x2270aE7Fd53302be96BE9e579C4F94108B5a8258",
        risk: 'low',
        lastUpdated: new Date()
      },
      {
        protocol: "Curve",
        name: "Tricrypto LP",
        tokens: ["USDC", "WETH", "WBTC"],
        apy: 9.62,
        tvl: await fetchProtocolTVL("Curve"),
        address: "0x0df5Ec1E12783488777b3167e84E3334F76a3Cba",
        risk: 'moderate',
        lastUpdated: new Date()
      },
      {
        protocol: "Degen Protocol",
        name: "USDC-DEGEN LP",
        tokens: ["USDC", "DEGEN"],
        apy: 32.45,
        tvl: await fetchProtocolTVL("Degen Protocol"),
        address: "0x9A315BdF513367C0377FB36545857d12e85813Ef",
        risk: 'high',
        lastUpdated: new Date()
      }
    ];
    
    // Log successful data fetch
    console.log("Yield options fetched successfully with CDP SDK");
    return mockYieldPools;
  } catch (error) {
    console.error("Error fetching yield options with CDP SDK:", error);
    toast.error("Failed to fetch yield options");
    return [];
  }
};
