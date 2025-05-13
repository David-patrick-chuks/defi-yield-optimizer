
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useWallet } from './WalletContext';
import { ethers } from 'ethers';
import { fetchYieldOptions } from '@/services/data/protocolData';
import { cdpClient } from '@/services/clients/coinbaseClient';
import { toast } from '@/components/ui/sonner';
import { useAppKitProvider } from '@reown/appkit/react';
import { YieldPool } from '@/services/types/yieldTypes';

interface Position {
  protocol: string;
  pool: string;
  invested: number;
  currentValue: number;
  apy: number;
  tokens: string[];
  risk: 'low' | 'moderate' | 'high';
}

interface YieldContextType {
  availableYields: YieldPool[];
  userPositions: Position[];
  tokenBalances: Record<string, string>;
  isLoadingYields: boolean;
  isLoadingPositions: boolean;
  refreshYields: () => Promise<void>;
  refreshPositions: () => Promise<void>;
  optimizeYield: () => Promise<void>;
  executeStrategy: (strategy: string) => Promise<void>;
}

interface YieldProviderProps {
  children: ReactNode;
}

const YieldContext = createContext<YieldContextType>({
  availableYields: [],
  userPositions: [],
  tokenBalances: {},
  isLoadingYields: false,
  isLoadingPositions: false,
  refreshYields: async () => {},
  refreshPositions: async () => {},
  optimizeYield: async () => {},
  executeStrategy: async () => {},
});

export const useYield = () => useContext(YieldContext);

export const YieldProvider = ({ children }: YieldProviderProps) => {
  const { address, isConnected } = useWallet();
  const { walletProvider } = useAppKitProvider('eip155');
  
  const [availableYields, setAvailableYields] = useState<YieldPool[]>([]);
  const [userPositions, setUserPositions] = useState<Position[]>([]);
  const [tokenBalances, setTokenBalances] = useState<Record<string, string>>({});
  const [isLoadingYields, setIsLoadingYields] = useState(false);
  const [isLoadingPositions, setIsLoadingPositions] = useState(false);
  
  // Initialize provider
  const getProvider = () => {
    if (!walletProvider) {
      throw new Error("Wallet provider not available");
    }
    return new ethers.BrowserProvider(walletProvider as ethers.Eip1193Provider);
  };
  
  // Fetch available yield options
  const refreshYields = async () => {
    if (!isConnected) {
      return;
    }
    
    setIsLoadingYields(true);
    try {
      const provider = getProvider();
      const yields = await fetchYieldOptions(provider);
      setAvailableYields(yields);
    } catch (error) {
      console.error("Failed to fetch yield options:", error);
      toast.error("Failed to fetch yield options");
    } finally {
      setIsLoadingYields(false);
    }
  };
  
  // Fetch token balances
  const getTokenBalances = async (address: string): Promise<Record<string, string>> => {
    try {
      if (!cdpClient) {
        throw new Error("CDP client not initialized");
      }
      
      // Use CDP client to fetch real token balances
      return await cdpClient.getTokenBalances(address);
    } catch (error) {
      console.error("Failed to fetch token balances:", error);
      toast.error("Failed to fetch token balances");
      return {};
    }
  };
  
  // Fetch user positions
  const refreshPositions = async () => {
    if (!isConnected || !address) {
      return;
    }
    
    setIsLoadingPositions(true);
    try {
      const provider = getProvider();
      
      // Use CDP client to fetch real positions
      if (!cdpClient) {
        throw new Error("CDP client not initialized");
      }
      
      const positions = await cdpClient.getUserPositions(address);
      setUserPositions(positions);
      
      // Get token balances
      const balances = await getTokenBalances(address);
      setTokenBalances(balances);
    } catch (error) {
      console.error("Failed to fetch positions:", error);
      toast.error("Failed to fetch your positions");
    } finally {
      setIsLoadingPositions(false);
    }
  };
  
  // AI optimization algorithm for yield strategy
  const optimizeYield = async () => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    toast.info("AI analyzing yield opportunities...");
    
    try {
      if (!cdpClient) {
        throw new Error("CDP client not initialized");
      }
      
      // Use CDP client to run real yield optimization
      await cdpClient.optimizeYield(address);
      
      toast.success("Yield optimization complete!");
    } catch (error) {
      console.error("Failed to optimize yield:", error);
      toast.error("Failed to optimize yield");
    }
  };
  
  // Execute an optimized yield strategy
  const executeStrategy = async (strategy: string) => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    toast.info(`Executing strategy: ${strategy}`);
    
    try {
      if (!cdpClient) {
        throw new Error("CDP client not initialized");
      }
      
      // Use CDP client to execute real strategy
      await cdpClient.executeStrategy(strategy, address);
      
      toast.success("Strategy executed successfully!");
      
      // Refresh positions after executing strategy
      await refreshPositions();
    } catch (error) {
      console.error("Failed to execute strategy:", error);
      toast.error("Failed to execute strategy");
    }
  };
  
  // Effect to fetch yields when wallet connects
  useEffect(() => {
    if (isConnected) {
      refreshYields();
      refreshPositions();
    } else {
      setAvailableYields([]);
      setUserPositions([]);
      setTokenBalances({});
    }
  }, [isConnected, address]);
  
  return (
    <YieldContext.Provider
      value={{
        availableYields,
        userPositions,
        tokenBalances,
        isLoadingYields,
        isLoadingPositions,
        refreshYields,
        refreshPositions,
        optimizeYield,
        executeStrategy,
      }}
    >
      {children}
    </YieldContext.Provider>
  );
};
