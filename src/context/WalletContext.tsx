
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from '@/components/ui/sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { AppKit } from '@reown/appkit';
import { ethers } from 'ethers';
import { 
  useAppKitAccount, 
  useAppKitNetwork, 
  useAppKitNetworkCore, 
  useAppKitProvider 
} from '@reown/appkit/react';

interface WalletContextType {
  address: string | undefined;
  isConnected: boolean;
  isConnecting: boolean;
  connectWallet: () => void;
  disconnectWallet: () => void;
  balance: string;
  chainId: number | undefined;
  isMetaMaskInstalled: boolean;
}

interface WalletProviderProps {
  children: ReactNode;
  appKit: AppKit;
}

const WalletContext = createContext<WalletContextType>({
  address: undefined,
  isConnected: false,
  isConnecting: false,
  connectWallet: () => {},
  disconnectWallet: () => {},
  balance: '0',
  chainId: undefined,
  isMetaMaskInstalled: false
});

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children, appKit }: WalletProviderProps) => {
  // Use AppKit React hooks
  const { address, isConnected } = useAppKitAccount();
  const { chainId } = useAppKitNetworkCore();
  const { walletProvider } = useAppKitProvider('eip155');

  const [balance, setBalance] = useState('0');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const isMobile = useIsMobile();
  
  // Check if MetaMask is installed
  useEffect(() => {
    const checkMetaMaskInstalled = () => {
      const { ethereum } = window as any;
      const isMetaMask = ethereum && ethereum.isMetaMask;
      setIsMetaMaskInstalled(!!isMetaMask);
      console.log("MetaMask detected:", !!isMetaMask);
    };

    checkMetaMaskInstalled();
    const timeout = setTimeout(checkMetaMaskInstalled, 1000);
    
    return () => clearTimeout(timeout);
  }, []);

  // Update balance when address or chainId changes
  useEffect(() => {
    const updateBalance = async () => {
      if (isConnected && address && walletProvider) {
        try {
          // Fix for TS2345: Explicitly type assert walletProvider as ethers expects
          const provider = new ethers.BrowserProvider(walletProvider as ethers.Eip1193Provider);
          const balanceResult = await provider.getBalance(address);
          if (balanceResult) {
            const formattedBalance = ethers.formatEther(balanceResult);
            setBalance(parseFloat(formattedBalance).toFixed(4));
            console.log("Updated wallet balance:", formattedBalance);
          }
        } catch (error) {
          console.error("Error getting balance:", error);
          setBalance('0');
        }
      } else {
        setBalance('0');
      }
    };
    
    updateBalance();
  }, [address, chainId, isConnected, walletProvider]);

  // Show success message when wallet connects
  useEffect(() => {
    if (isConnected && address) {
      toast.success("Wallet connected successfully!");
    }
  }, [isConnected, address]);

  const connectWallet = async () => {
    if (isConnecting) return;
    
    setIsConnecting(true);
    try {
      console.log("Opening Reown AppKit modal...");
      await appKit.open();
    } catch (error) {
      console.error("Error in connectWallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    try {
      appKit.close();
      toast.success("Wallet disconnected");
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
      toast.error("Failed to disconnect wallet");
    }
  };

  // Export state and functions
  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected,
        isConnecting,
        connectWallet,
        disconnectWallet,
        balance,
        // Fix for TS2322: Ensure chainId is always a number or undefined
        chainId: typeof chainId === 'number' ? chainId : undefined,
        isMetaMaskInstalled
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
