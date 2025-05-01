
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { toast } from '@/components/ui/sonner';

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
  const [chainId, setChainId] = useState<number | undefined>(undefined);
  
  // The useAccount hook returns different properties in wagmi v1.x
  const { address, isConnected, connector } = useAccount({
    onConnect: ({ address, connector, isReconnected }) => {
      // Get chain ID from the connector if available
      if (connector) {
        connector.getChainId().then(id => {
          setChainId(id);
        }).catch(error => {
          console.error("Error getting chain ID:", error);
        });
      }
      
      // Show success message only if it's not a reconnect
      if (!isReconnected) {
        toast.success("Wallet connected successfully!");
      }
      setIsConnecting(false);
    },
    onDisconnect() {
      setChainId(undefined);
    },
  });
  
  const { connect, error: connectError } = useConnect({
    connector: new InjectedConnector(),
    onSettled(data, error) {
      setIsConnecting(false);
      if (error) {
        console.error('Connection error:', error);
        toast.error("Failed to connect wallet. Please try again.");
      }
    }
  });
  
  const { disconnect } = useDisconnect({
    onSuccess() {
      toast.success("Wallet disconnected");
    },
  });

  const { data: balanceData } = useBalance({
    address,
    watch: true,
  });

  useEffect(() => {
    if (balanceData) {
      const formattedBalance = parseFloat(balanceData.formatted).toFixed(4);
      setBalance(formattedBalance);
    }
  }, [balanceData]);

  // Update chainId when connector changes
  useEffect(() => {
    if (connector && isConnected) {
      connector.getChainId().then(id => {
        setChainId(id);
      }).catch(error => {
        console.error("Error getting chain ID:", error);
      });
    } else {
      setChainId(undefined);
    }
  }, [connector, isConnected]);

  // Show connection errors through toast
  useEffect(() => {
    if (connectError) {
      console.log("Connection error detected:", connectError);
      toast.error("Failed to connect wallet. Please try again.");
    }
  }, [connectError]);

  const connectWallet = async () => {
    if (isConnecting) return; // Prevent multiple connection attempts
    
    setIsConnecting(true);
    try {
      console.log("Attempting to connect wallet...");
      await connect();
    } catch (error) {
      console.error("Error in connectWallet:", error);
      setIsConnecting(false);
      toast.error("Failed to connect wallet. Please try again.");
    }
  };

  const disconnectWallet = () => {
    try {
      disconnect();
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
      toast.error("Failed to disconnect wallet");
    }
  };

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
