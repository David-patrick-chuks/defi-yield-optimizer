
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
    onConnect: ({ connector }) => {
      // Get chain ID from the connector if available
      if (connector) {
        connector.getChainId().then(id => {
          setChainId(id);
        }).catch(error => {
          console.error("Error getting chain ID:", error);
        });
      }
    }
  });
  
  const { connect } = useConnect({
    connector: new InjectedConnector(),
    onSuccess() {
      toast.success("Wallet connected successfully!");
      setIsConnecting(false);
    },
    onError(error) {
      console.error('Connection error:', error);
      toast.error("Failed to connect wallet. Please try again.");
      setIsConnecting(false);
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

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      await connect();
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    try {
      disconnect();
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
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
