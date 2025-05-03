
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
        console.log("Checking existing connection...");
        const account = await appKit.getAccount();
        console.log("Connection check result:", account);
        
        if (account && account.address) {
          console.log("User already connected with address:", account.address);
          handleAccountChange(account);
        } else {
          console.log("No active wallet connection found");
        }
      } catch (error) {
        console.error("Error checking existing connection:", error);
      }
    };
    
    checkConnection();
    
    // Set up listeners for connection events
    const accountChangeHandler = (state: any) => {
      console.log("Account state changed:", state);
      const account = state?.account;
      if (account && account.address) {
        handleAccountChange(account);
      } else {
        console.log("Wallet disconnected or account changed to none");
        setIsConnected(false);
        setAddress(undefined);
        setBalance('0');
        setChainId(undefined);
      }
    };
    
    // Use the SDK's event emitter method if available
    if (typeof appKit.subscribeEvents === 'function') {
      appKit.subscribeEvents(accountChangeHandler);
    }
    
    return () => {
      // Cleanup if needed
      if (typeof appKit.unsubscribeEvents === 'function') {
        appKit.unsubscribeEvents(accountChangeHandler);
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
      // Use correct namespace parameter for getProvider
      const provider = await appKit.getProvider('eip155');
      if (provider) {
        try {
          // Use ethers to get balance for the connected address
          // We need to cast the provider to an ethers provider type
          const ethersProvider = provider as unknown as ethers.Provider;
          const balanceResult = await ethersProvider.getBalance(account.address);
          if (balanceResult) {
            const formattedBalance = ethers.formatEther(balanceResult);
            setBalance(parseFloat(formattedBalance).toFixed(4));
            console.log("Updated wallet balance:", formattedBalance);
          }
        } catch (balanceError) {
          console.error("Error in getBalance:", balanceError);
          setBalance('0');
        }
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
      // Use the open method for the modal
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
      // Using the close method instead of disconnect
      appKit.close();
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
        chainId,
        isMetaMaskInstalled
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
