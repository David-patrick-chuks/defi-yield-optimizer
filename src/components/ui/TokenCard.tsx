
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TokenCardProps {
  name: string;
  symbol: string;
  balance: string;
  value: string;
  logoUrl?: string;
  onClick?: () => void;
}

const TokenCard = ({
  name,
  symbol,
  balance,
  value,
  logoUrl,
  onClick,
}: TokenCardProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  return (
    <div 
      className="bg-white rounded-lg border border-slate-200 hover:border-sage-300 transition-colors"
      onClick={onClick}
    >
      <div className="p-4 flex items-center justify-between cursor-pointer" onClick={toggleExpanded}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center">
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
              <p className="font-medium text-green-600">+2.5%</p>
            </div>
            <div className="col-span-2 mt-2">
              <p className="text-slate-500 mb-1">Risk Score</p>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-sage-500 h-2 rounded-full" 
                  style={{ width: '25%' }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 mt-1">Low Risk (2.5)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenCard;
