
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from '@/components/ui/sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAccount, useConnect, useDisconnect, useBalance, useChainId } from 'wagmi';
import { openWeb3Modal } from '@reown/appkit/modal';

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
      
      // Use Reown AppKit modal for connecting
      await openWeb3Modal();
      
      // The modal will handle the connection process
      // We just need to set isConnecting to false
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
