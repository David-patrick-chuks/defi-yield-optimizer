
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import ComparisonCard from '@/components/ui/ComparisonCard';
import LoadingAI from '@/components/ui/LoadingAI';

const Compare = () => {
  const [tokenA, setTokenA] = useState('');
  const [tokenB, setTokenB] = useState('');
  const [isComparing, setIsComparing] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  
  const handleCompare = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenA && tokenB) {
      setIsComparing(true);
      setTimeout(() => {
        setIsComparing(false);
        setShowComparison(true);
      }, 2000);
    }
  };
  
  return (
    <MainLayout isConnected={true}>
      <div className="safe-container py-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-6">Compare Tokens</h1>
          
          <form onSubmit={handleCompare}>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="tokenA" className="block text-sm font-medium text-slate-700 mb-1">
                  First Token
                </label>
                <Input
                  id="tokenA"
                  placeholder="Enter token name or symbol (e.g. Ethereum or ETH)"
                  value={tokenA}
                  onChange={(e) => setTokenA(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="tokenB" className="block text-sm font-medium text-slate-700 mb-1">
                  Second Token
                </label>
                <Input
                  id="tokenB"
                  placeholder="Enter token name or symbol (e.g. Bitcoin or BTC)"
                  value={tokenB}
                  onChange={(e) => setTokenB(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              disabled={!tokenA || !tokenB || isComparing}
              className="gradient-bg-secondary w-full md:w-auto"
            >
              <Search className="h-4 w-4 mr-2" />
              Compare Tokens
            </Button>
          </form>
        </div>

        {isComparing && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 min-h-[60vh] flex items-center justify-center">
            <LoadingAI />
          </div>
        )}

        {showComparison && !isComparing && (
          <div className="space-y-6">
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-lg">
              <h2 className="font-medium text-slate-800 mb-3">
                Comparison: {tokenA} vs {tokenB}
              </h2>
              <p className="text-slate-600 text-sm">
                SafeSage AI has analyzed both tokens across several risk metrics. The safer option in each category is highlighted.
              </p>
            </div>
            
            <ComparisonCard
              title="Market Risk"
              tokenA={{
                name: "Ethereum",
                symbol: "ETH",
                value: 2.5,
              }}
              tokenB={{
                name: "Bitcoin",
                symbol: "BTC",
                value: 2.1,
              }}
              isBetter="B"
              metric="Risk Score"
              explanation="Bitcoin has a slightly lower market risk due to its larger market cap and established position as a store of value. Ethereum has slightly higher volatility due to its smart contract platform exposure."
            />
            
            <ComparisonCard
              title="Technical Risk"
              tokenA={{
                name: "Ethereum",
                symbol: "ETH",
                value: 3.1,
              }}
              tokenB={{
                name: "Bitcoin",
                symbol: "BTC",
                value: 2.5,
              }}
              isBetter="B"
              metric="Risk Score"
              explanation="Bitcoin has a simpler code architecture focused on security and reliability. Ethereum has higher technical complexity due to its smart contract functionality."
            />
            
            <ComparisonCard
              title="Liquidity Risk"
              tokenA={{
                name: "Ethereum",
                symbol: "ETH",
                value: 1.8,
              }}
              tokenB={{
                name: "Bitcoin",
                symbol: "BTC",
                value: 1.6,
              }}
              isBetter="B"
              metric="Risk Score"
              explanation="Both Bitcoin and Ethereum have extremely high liquidity across multiple exchanges and trading pairs. Bitcoin has slightly higher trading volume and broader global acceptance."
            />
            
            <div className="p-6 bg-sage-50 border border-sage-200 rounded-lg">
              <h3 className="font-medium text-sage-800 mb-3">AI Summary Assessment</h3>
              <p className="text-sage-700 mb-4">
                Based on comprehensive analysis across all risk metrics, <strong>Bitcoin (BTC)</strong> presents a slightly lower overall risk profile compared to Ethereum (ETH). However, both are established assets with strong fundamentals and relatively low risk compared to newer cryptocurrencies.
              </p>
              <div className="flex gap-2">
                <div className="px-3 py-1.5 rounded-full bg-risk-low text-sage-800 text-sm font-medium">
                  Bitcoin: Low Risk (2.1/10)
                </div>
                <div className="px-3 py-1.5 rounded-full bg-risk-low text-sage-800 text-sm font-medium">
                  Ethereum: Low Risk (2.5/10)
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Compare;
