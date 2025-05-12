
import React from 'react';
import { Bot } from 'lucide-react';

const ConnectWalletPrompt = () => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
      <Bot size={48} className="mx-auto mb-4 text-blue-500" />
      <h2 className="text-xl font-semibold mb-2">Connect Your Wallet</h2>
      <p className="text-slate-600 mb-4">
        Please connect your wallet to generate personalized yield strategies.
      </p>
    </div>
  );
};

export default ConnectWalletPrompt;
