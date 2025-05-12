import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useWallet } from './WalletContext';
import { ethers } from 'ethers';
import { fetchYieldOptions, getTokenBalances, YieldPool, MOCK_USER_POSITIONS, TOKENS } from '@/services/yieldService';
import { toast } from '@/components/ui/sonner';
import { useAppKitProvider } from '@reown/appkit/react';

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
  
  // Fetch user positions
  const refreshPositions = async () => {
    if (!isConnected || !address) {
      return;
    }
    
    setIsLoadingPositions(true);
    try {
      const provider = getProvider();
      
      // In a real implementation, this would fetch positions from contracts
      // For now, use mock data
      setUserPositions(MOCK_USER_POSITIONS);
      
      // Get token balances
      const balances = await getTokenBalances(provider, address);
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
    toast.info("AI analyzing yield opportunities...");
    
    // In a real implementation, this would use an AI model to optimize yield
    // For now, simulate with a timeout
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success("Yield optimization complete!");
    
    // Return empty to match Promise<void> return type
    return;
  };
  
  // Execute an optimized yield strategy
  const executeStrategy = async (strategy: string) => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    toast.info(`Executing strategy: ${strategy}`);
    
    // In a real implementation, this would execute transactions
    // For now, simulate with a timeout
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    toast.success("Strategy executed successfully!");
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
