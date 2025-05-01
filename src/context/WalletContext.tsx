import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from '@/components/ui/sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAccount, useConnect, useDisconnect, useBalance, useChainId } from 'wagmi';
// Import the appkit
import { createAppKit } from '@reown/appkit';

declare global {
  interface Window {
    reownAppKit?: AppKit;
  }
}

interface WalletContextType {
  address: string | undefined;
  isConnected: boolean;
  isConnecting: boolean;
  connectWallet: () => void;
  disconnectWallet: () => void;
  balance: string;
  chainId: number | undefined;
}

const WalletContext = createContext<WalletContextType>({
  address: undefined,
  isConnected: false,
  isConnecting: false,
  connectWallet: () => {},
  disconnectWallet: () => {},
  balance: '0',
  chainId: undefined
});

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState('0');
  const [isConnecting, setIsConnecting] = useState(false);
  const isMobile = useIsMobile();
  
  // Using wagmi v2 hooks
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { disconnect } = useDisconnect();
  const { data: balanceData } = useBalance({
    address,
  });

  useEffect(() => {
    if (balanceData) {
      const formattedBalance = parseFloat(balanceData.formatted).toFixed(4);
      setBalance(formattedBalance);
    }
  }, [balanceData]);

  const connectWallet = async () => {
    if (isConnecting) return; // Prevent multiple connection attempts
    
    setIsConnecting(true);
    try {
      console.log("Attempting to connect wallet...");
      
      // Debugging: Log AppKit instance
      const appkit = window.reownAppKit;
      console.log("AppKit instance during connection:", appkit);

      if (appkit) {
        appkit.open();
      } else {
        console.error("AppKit instance not available");
        toast.error("Wallet connection not available");
      }
      
      setIsConnecting(false);
    } catch (error) {
      console.error("Error in connectWallet:", error);
      setIsConnecting(false);
      toast.error("Failed to connect wallet. Please try again.");
    }
  };

  const disconnectWallet = () => {
    try {
      disconnect();
      toast.success("Wallet disconnected");
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
      toast.error("Failed to disconnect wallet");
    }
  };

  // Show success message when wallet connects
  useEffect(() => {
    if (isConnected && address) {
      toast.success("Wallet connected successfully!");
    }
  }, [isConnected, address]);

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected: !!isConnected,
        isConnecting,
        connectWallet,
        disconnectWallet,
        balance: balance,
        chainId
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
