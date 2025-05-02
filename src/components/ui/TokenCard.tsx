
import { useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown } from 'lucide-react';

interface TokenCardProps {
  name: string;
  symbol: string;
  balance: string;
  value: string;
  logoUrl?: string;
  priceChange24h?: string;
  riskScore?: number;
  onClick?: () => void;
}

const TokenCard = ({
  name,
  symbol,
  balance,
  value,
  logoUrl,
  priceChange24h,
  riskScore = 5,
  onClick,
}: TokenCardProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  const isPriceUp = priceChange24h && parseFloat(priceChange24h) >= 0;
  
  const getRiskLabel = () => {
    if (riskScore <= 3) return 'Low Risk';
    if (riskScore <= 6) return 'Moderate Risk';
    return 'High Risk';
  };

  const getRiskColor = () => {
    if (riskScore <= 3) return 'bg-green-100';
    if (riskScore <= 6) return 'bg-yellow-100';
    return 'bg-red-100';
  };
  
  return (
    <div 
      className="bg-white rounded-lg border border-slate-200 hover:border-sage-300 transition-colors"
      onClick={onClick}
    >
      <div className="p-4 flex items-center justify-between cursor-pointer" onClick={toggleExpanded}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center overflow-hidden">
            {logoUrl ? (
              <img src={logoUrl} alt={symbol} className="w-6 h-6" />
            ) : (
              <span className="font-medium text-sage-700">{symbol.substring(0, 3)}</span>
            )}
          </div>
          
          <div>
            <h3 className="font-medium text-slate-800">{name}</h3>
            <p className="text-sm text-slate-500">{symbol}</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="font-medium">{balance} {symbol}</p>
          <p className="text-sm text-slate-500">${value}</p>
        </div>
        
        <div className="ml-2">
          {expanded ? (
            <ChevronUp className="h-5 w-5 text-slate-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-slate-400" />
          )}
        </div>
      </div>
      
      {expanded && (
        <div className="p-4 border-t border-slate-100 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-slate-500">Current Price</p>
              <p className="font-medium">${(parseFloat(value) / parseFloat(balance)).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-slate-500">24h Change</p>
              <div className="flex items-center">
                {priceChange24h ? (
                  <>
                    {isPriceUp ? (
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <p className={`font-medium ${isPriceUp ? 'text-green-600' : 'text-red-600'}`}>
                      {isPriceUp ? '+' : ''}{priceChange24h}%
                    </p>
                  </>
                ) : (
                  <p className="font-medium text-slate-600">--</p>
                )}
              </div>
            </div>
            <div className="col-span-2 mt-2">
              <p className="text-slate-500 mb-1">Risk Score</p>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div 
                  className={`${riskScore <= 3 ? 'bg-green-500' : riskScore <= 6 ? 'bg-yellow-500' : 'bg-red-500'} h-2 rounded-full`}
                  style={{ width: `${(riskScore / 10) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 mt-1">{getRiskLabel()} ({riskScore.toFixed(1)})</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenCard;
