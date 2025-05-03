
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { ActionButtonList } from '@/components/ActionButtonList';
import { SmartContractActionButtonList } from '@/components/SmartContractActionButtonList';
import { InfoList } from '@/components/InfoList';

const WalletDemo = () => {
  const [transactionHash, setTransactionHash] = useState('');
  const [signedMsg, setSignedMsg] = useState('');
  const [balance, setBalance] = useState('');

  const receiveHash = (hash: string) => {
    setTransactionHash(hash);
  };

  const receiveSignedMsg = (signedMsg: string) => {
    setSignedMsg(signedMsg);
  };

  const receiveBalance = (balance: string) => {
    setBalance(balance);
  };

  return (
    <MainLayout>
      <div className="safe-container py-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-6">AppKit Wallet Demo</h1>
          
          <div className="mb-8">
            <appkit-button></appkit-button>
          </div>
          
          <ActionButtonList 
            sendHash={receiveHash}
            sendSignMsg={receiveSignedMsg}
            sendBalance={receiveBalance}
          />
          
          <SmartContractActionButtonList />
          
          <InfoList 
            hash={transactionHash}
            signedMsg={signedMsg}
            balance={balance}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default WalletDemo;
