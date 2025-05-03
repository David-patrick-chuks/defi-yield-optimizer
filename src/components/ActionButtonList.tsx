
import { useAppKit, useAppKitNetwork, useAppKitAccount, useAppKitProvider, useAppKitNetworkCore, type Provider } from '@reown/appkit/react';
import { BrowserProvider, JsonRpcSigner, parseUnits, formatEther } from 'ethers';
import { networks } from '../config/index';
import { Button } from '@/components/ui/button';

// test transaction
const TEST_TX = {
  to: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",  // vitalik address
  value: parseUnits('0.0001', 'gwei')
};

interface ActionButtonListProps {
  sendHash: (hash: string) => void;
  sendSignMsg: (hash: string) => void;
  sendBalance: (balance: string) => void;
}

export const ActionButtonList = ({ sendHash, sendSignMsg, sendBalance }: ActionButtonListProps) => {
  const appKit = useAppKit();
  const { open } = useAppKit();
  const { chainId } = useAppKitNetworkCore();
  const { switchNetwork } = useAppKitNetwork();
  const { isConnected, address } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider<Provider>('eip155');

  const handleDisconnect = async () => {
    try {
      await appKit.close();
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  };

  // function to send a tx
  const handleSendTx = async () => {
    if (!walletProvider || !address) throw Error('user is disconnected');

    const provider = new BrowserProvider(walletProvider, chainId);
    const signer = new JsonRpcSigner(provider, address);
    
    const tx = await signer.sendTransaction(TEST_TX); 
    await tx.wait(); // This will wait for the transaction to be mined
  
    sendHash(tx.hash); 
  };

  // function to sign a msg 
  const handleSignMsg = async () => {
    if (!walletProvider || !address) throw Error('user is disconnected');

    const provider = new BrowserProvider(walletProvider, chainId);
    const signer = new JsonRpcSigner(provider, address);
    const sig = await signer?.signMessage('Hello Reown AppKit!');

    sendSignMsg(sig);
  };

  // function to get the balance
  const handleGetBalance = async () => {
    if (!walletProvider || !address) throw Error('user is disconnected');

    const provider = new BrowserProvider(walletProvider, chainId);
    const balance = await provider.getBalance(address);
    const eth = formatEther(balance);
    sendBalance(`${eth} ETH`);
  };

  return (
    <div className="space-y-2">
      {isConnected ? (
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => open()}>Open</Button>
          <Button onClick={handleDisconnect}>Disconnect</Button>
          <Button onClick={() => switchNetwork(networks[1])}>Switch Network</Button>
          <Button onClick={handleSignMsg}>Sign Message</Button>
          <Button onClick={handleSendTx}>Send Transaction</Button>
          <Button onClick={handleGetBalance}>Get Balance</Button>  
        </div>
      ) : null}
    </div>
  );
};
