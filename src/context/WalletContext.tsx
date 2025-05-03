
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from '@/components/ui/sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { AppKit } from '@reown/appkit';
import { ethers } from 'ethers';

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
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [balance, setBalance] = useState('0');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [chainId, setChainId] = useState<number | undefined>(undefined);
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

  // Set up AppKit event listeners
  useEffect(() => {
    if (!appKit) return;
    
    // Check if already connected
    const checkConnection = async () => {
      try {
        const account = await appKit.getAccount();
        if (account && account.address) {
          handleAccountChange(account);
        }
      } catch (error) {
        console.error("Error checking existing connection:", error);
      }
    };
    
    checkConnection();
    
    // Set up listeners for connection events
    const accountChangeHandler = (account: any) => {
      console.log("Account changed:", account);
      if (account && account.address) {
        handleAccountChange(account);
      } else {
        setIsConnected(false);
        setAddress(undefined);
        setBalance('0');
        setChainId(undefined);
      }
    };
    
    // Use the SDK's event emitter method if available
    if (appKit.subscribeEvents) {
      appKit.subscribeEvents({
        update: accountChangeHandler
      });
    }
    
    return () => {
      // Cleanup if needed
      if (appKit.unsubscribeEvents) {
        appKit.unsubscribeEvents();
      }
    };
  }, [appKit]);
  
  // Handle account info changes
  const handleAccountChange = async (account: any) => {
    if (!account || !account.address) {
      setIsConnected(false);
      setAddress(undefined);
      return;
    }
    
    setAddress(account.address);
    setIsConnected(true);
    
    if (account.chainId) {
      setChainId(Number(account.chainId));
    }
    
    // Fetch balance
    try {
      const provider = await appKit.getProvider();
      if (provider) {
        // Use provider to get balance for the connected address
        const balanceResult = await provider.getBalance(account.address);
        const formattedBalance = ethers.formatEther(balanceResult);
        setBalance(parseFloat(formattedBalance).toFixed(4));
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
      setBalance('0');
    }
  };

  const connectWallet = async () => {
    if (isConnecting) return;
    
    setIsConnecting(true);
    try {
      console.log("Opening Reown AppKit modal...");
      await appKit.connect();
    } catch (error) {
      console.error("Error in connectWallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    try {
      appKit.disconnect();
      setIsConnected(false);
      setAddress(undefined);
      setBalance('0');
      setChainId(undefined);
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
        isConnected,
        isConnecting,
        connectWallet,
        disconnectWallet,
        balance,
        chainId,
        isMetaMaskInstalled
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
