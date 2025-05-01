
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
                name: "TokenXYZ",
                symbol: "XYZ",
                value: 8.7,
              }}
              isBetter="A"
              metric="Risk Score"
              explanation="Ethereum has significantly lower market risk due to its large market cap, high trading volume, and established history. TokenXYZ has much higher volatility and lower liquidity."
            />
            
            <ComparisonCard
              title="Technical Risk"
              tokenA={{
                name: "Ethereum",
                symbol: "ETH",
                value: 3.1,
              }}
              tokenB={{
                name: "TokenXYZ",
                symbol: "XYZ",
                value: 7.5,
              }}
              isBetter="A"
              metric="Risk Score"
              explanation="Ethereum has a robust, widely tested codebase with thousands of developers and regular security audits. TokenXYZ has a smaller development team and less rigorous security testing."
            />
            
            <ComparisonCard
              title="Liquidity Risk"
              tokenA={{
                name: "Ethereum",
                symbol: "ETH",
                value: 1.8,
              }}
              tokenB={{
                name: "TokenXYZ",
                symbol: "XYZ",
                value: 8.9,
              }}
              isBetter="A"
              metric="Risk Score"
              explanation="Ethereum has extremely high liquidity across multiple exchanges and trading pairs. TokenXYZ has limited trading volume and could face liquidity issues during market stress."
            />
            
            <div className="p-6 bg-sage-50 border border-sage-200 rounded-lg">
              <h3 className="font-medium text-sage-800 mb-3">AI Summary Assessment</h3>
              <p className="text-sage-700 mb-4">
                Based on comprehensive analysis across all risk metrics, <strong>Ethereum (ETH)</strong> presents a significantly lower risk profile compared to TokenXYZ (XYZ). If safety is a primary concern for your investment strategy, Ethereum is the recommended choice.
              </p>
              <div className="flex gap-2">
                <div className="px-3 py-1.5 rounded-full bg-risk-low text-sage-800 text-sm font-medium">
                  Ethereum: Low Risk (2.5/10)
                </div>
                <div className="px-3 py-1.5 rounded-full bg-risk-high text-red-800 text-sm font-medium">
                  TokenXYZ: High Risk (8.7/10)
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
