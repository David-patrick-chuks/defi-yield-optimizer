
import { useEffect, useState } from 'react';
import {
  useAppKitState,
  useAppKitTheme,
  useAppKitEvents,
  useAppKitAccount,
  useWalletInfo,
  useAppKitProvider, 
  useAppKitNetworkCore,
  type Provider 
} from '@reown/appkit/react';
import { BrowserProvider } from 'ethers';

interface InfoListProps {
  hash: string;
  signedMsg: string;
  balance: string;
}

export const InfoList = ({ hash, signedMsg, balance }: InfoListProps) => {
  const [statusTx, setStatusTx] = useState('');

  const { themeMode, themeVariables } = useAppKitTheme();
  const state = useAppKitState();
  const { chainId } = useAppKitNetworkCore();
  const { address, caipAddress, isConnected, embeddedWalletInfo } = useAppKitAccount();
  const events = useAppKitEvents();
  const walletInfo = useWalletInfo();
  const { walletProvider } = useAppKitProvider<Provider>('eip155');

  useEffect(() => {
    console.log("Events: ", events);
  }, [events]);

  useEffect(() => {
    const checkTransactionStatus = async () => {
      if (hash && walletProvider) {
        try {
          const provider = new BrowserProvider(walletProvider, chainId);
          const receipt = await provider.getTransactionReceipt(hash);
          setStatusTx(receipt?.status === 1 ? 'Success' : receipt?.status === 0 ? 'Failed' : 'Pending');
        } catch (err) {
          console.error('Error checking transaction status:', err);
          setStatusTx('Error');
        }
      }
    };

    checkTransactionStatus();
  }, [hash, walletProvider, chainId]);

  return (
    <div className="space-y-6 mt-6 p-4 border rounded-lg bg-slate-50">
      {balance && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Balance: {balance}</h2>
        </section>
      )}
      
      {hash && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Transaction</h2>
          <pre className="bg-white p-3 rounded border">
            Hash: {hash}<br />
            Status: {statusTx}<br />
          </pre>
        </section>
      )}
      
      {signedMsg && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Signed Message</h2>
          <pre className="bg-white p-3 rounded border whitespace-pre-wrap break-all">
            signedMsg: {signedMsg}<br />
          </pre>
        </section>
      )}
      
      <section>
        <h2 className="text-xl font-semibold mb-2">Account Info</h2>
        <pre className="bg-white p-3 rounded border">
          Address: {address}<br />
          CAIP Address: {caipAddress}<br />
          Connected: {isConnected.toString()}<br />
          Account Type: {embeddedWalletInfo?.accountType}<br />
          {embeddedWalletInfo?.user?.email && (`Email: ${embeddedWalletInfo?.user?.email}\n`)}
          {embeddedWalletInfo?.user?.username && (`Username: ${embeddedWalletInfo?.user?.username}\n`)}
          {embeddedWalletInfo?.authProvider && (`Provider: ${embeddedWalletInfo?.authProvider}\n`)}
        </pre>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Theme</h2>
        <pre className="bg-white p-3 rounded border whitespace-pre-wrap">
          Theme: {themeMode}<br />
          ThemeVariables: {JSON.stringify(themeVariables, null, 2)}<br />
        </pre>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">State</h2>
        <pre className="bg-white p-3 rounded border">
          activeChain: {state.activeChain}<br />
          loading: {state.loading.toString()}<br />
          open: {state.open.toString()}<br />
          selectedNetworkId: {state.selectedNetworkId?.toString()}<br />
        </pre>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Wallet Info</h2>
        <pre className="bg-white p-3 rounded border">
          Name: {walletInfo.walletInfo?.name?.toString()}<br />
        </pre>
      </section>
    </div>
  );
};
