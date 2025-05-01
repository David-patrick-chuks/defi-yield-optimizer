
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from '@/components/ui/sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAccount, useConnect, useDisconnect, useBalance, useNetwork } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

// Define the AppKit type for the global window object
type AppKit = {
  open: () => void;
};

declare global {
  interface Window {
    reownAppKit?: AppKit;
    ethereum?: any;
  }
}

interface WalletContextType {
  address: string | undefined;
  isConnected: boolean;
  isConnecting: boolean;
  connectWallet: () => void;
  connectMetaMask: () => void;
  disconnectWallet: () => void;
  balance: string;
  chainId: number | undefined;
  isMetaMaskInstalled: boolean;
}

const WalletContext = createContext<WalletContextType>({
  address: undefined,
  isConnected: false,
  isConnecting: false,
  connectWallet: () => {},
  connectMetaMask: () => {},
  disconnectWallet: () => {},
  balance: '0',
  chainId: undefined,
  isMetaMaskInstalled: false
});

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState('0');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const isMobile = useIsMobile();
  
  // Using wagmi hooks
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const chainId = chain?.id;
  const { disconnect } = useDisconnect();
  const { connectAsync, connectors } = useConnect();
  const { data: balanceData } = useBalance({
    address,
  });

  // Check if MetaMask is installed
  useEffect(() => {
    const checkMetaMaskInstalled = () => {
      const { ethereum } = window;
      const isMetaMask = ethereum && ethereum.isMetaMask;
      setIsMetaMaskInstalled(!!isMetaMask);
      console.log("MetaMask detected:", !!isMetaMask);
    };

    checkMetaMaskInstalled();
    // Check again after a short delay to ensure MetaMask extension has fully loaded
    const timeout = setTimeout(checkMetaMaskInstalled, 1000);
    
    return () => clearTimeout(timeout);
  }, []);

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
      console.log("Attempting to connect wallet via AppKit...");
      
      // Debugging: Log AppKit instance and available connectors
      const appkit = window.reownAppKit;
      console.log("AppKit instance:", appkit);
      console.log("Available connectors:", connectors);

      if (appkit) {
        appkit.open();
      } else {
        console.error("AppKit instance not available");
        toast.error("Wallet connection UI not available");
      }
      
    } catch (error) {
      console.error("Error in connectWallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  // Direct MetaMask connection method
  const connectMetaMask = async () => {
    if (isConnecting) return;
    
    setIsConnecting(true);
    try {
      console.log("Attempting to connect directly to MetaMask...");
      
      // Find the injected connector (MetaMask)
      const injectedConnector = connectors.find(
        connector => connector instanceof InjectedConnector
      );
      
      if (!injectedConnector) {
        console.error("Injected connector not found");
        toast.error("MetaMask connector not available");
        return;
      }
      
      // Connect to MetaMask
      const result = await connectAsync({ connector: injectedConnector });
      console.log("MetaMask connection result:", result);
      
      if (result?.account) {
        toast.success("MetaMask connected successfully!");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      toast.error("Failed to connect MetaMask. Please try again.");
    } finally {
      setIsConnecting(false);
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
        connectMetaMask,
        disconnectWallet,
        balance: balance,
        chainId,
        isMetaMaskInstalled
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
