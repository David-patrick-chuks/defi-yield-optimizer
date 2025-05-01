
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import TokenCard from '@/components/ui/TokenCard';
import { Button } from '@/components/ui/button';
import { CircleArrowRight, Wallet, FileSearch } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [isConnected, setIsConnected] = useState(false);
  
  // Mock wallet data
  const walletAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F";
  const tokens = [
    { name: "Ethereum", symbol: "ETH", balance: "3.24", value: "8,125.32" },
    { name: "Bitcoin", symbol: "BTC", balance: "0.56", value: "18,975.42" },
    { name: "USD Coin", symbol: "USDC", balance: "2,500.00", value: "2,500.00" },
    { name: "DeFi Token", symbol: "DFI", balance: "450.75", value: "1,275.35" },
    { name: "TokenXYZ", symbol: "XYZ", balance: "1,200.00", value: "240.00" },
  ];
  
  const handleConnectWallet = () => {
    setIsConnected(true);
  };

  return (
    <MainLayout isConnected={isConnected}>
      <div className="safe-container py-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-6">Portfolio Dashboard</h1>
          
          {isConnected ? (
            <>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="mb-4 md:mb-0">
                  <p className="text-sm text-slate-500 mb-1">Connected Wallet</p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center mr-2">
                      <Wallet className="h-4 w-4 text-slate-600" />
                    </div>
                    <p className="font-mono text-slate-800">
                      {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
                    </p>
                  </div>
                </div>
                
                <Link to="/report">
                  <Button className="w-full md:w-auto gradient-bg-secondary">
                    <FileSearch className="h-4 w-4 mr-2" />
                    Analyze Portfolio Risk
                  </Button>
                </Link>
              </div>
              
              <div className="mb-4">
                <h2 className="text-xl font-medium text-slate-800 mb-4">Your Tokens</h2>
              </div>
              
              <div className="space-y-3">
                {tokens.map((token) => (
                  <TokenCard
                    key={token.symbol}
                    name={token.name}
                    symbol={token.symbol}
                    balance={token.balance}
                    value={token.value}
                    onClick={() => {}}
                  />
                ))}
              </div>
              
              <div className="mt-8 flex flex-col md:flex-row gap-4">
                <Link to="/report" className="flex-1">
                  <Button className="w-full gradient-bg-secondary">
                    Generate Risk Report
                  </Button>
                </Link>
                <Link to="/compare" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Compare Tokens
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <Wallet className="h-8 w-8 text-slate-400" />
              </div>
              <h2 className="text-xl font-medium text-slate-800 mb-2">Connect Your Wallet</h2>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                Connect your cryptocurrency wallet to view your portfolio and analyze risks.
              </p>
              <Button onClick={handleConnectWallet} className="gradient-bg-secondary">
                Connect Wallet
              </Button>
            </div>
          )}
        </div>
        
        <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-sage-100 rounded-full text-sage-600">
              <CircleArrowRight className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-slate-800">Looking to compare specific tokens?</h3>
              <p className="text-slate-600 mb-3">
                Use our comparison tool to evaluate risk factors between any two tokens.
              </p>
              <Link to="/compare">
                <Button variant="outline" size="sm">
                  Open Comparison Tool
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
