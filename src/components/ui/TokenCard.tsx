
import { CircleArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TokenCardProps {
  name: string;
  symbol: string;
  balance: string;
  value?: string;
  logoUrl?: string;
  onClick?: () => void;
}

const TokenCard = ({ 
  name, 
  symbol, 
  balance, 
  value = "N/A", 
  logoUrl, 
  onClick 
}: TokenCardProps) => {
  return (
    <div className="ai-card p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center bg-slate-100",
          "text-slate-500 font-medium text-sm"
        )}>
          {logoUrl ? (
            <img src={logoUrl} alt={`${name} logo`} className="w-8 h-8 rounded-full" />
          ) : (
            symbol.slice(0, 2)
          )}
        </div>
        
        <div>
          <h3 className="font-medium text-slate-800">{name}</h3>
          <p className="text-sm text-slate-500">{symbol}</p>
        </div>
      </div>
      
      <div className="text-right">
        <p className="font-medium text-slate-800">{balance} {symbol}</p>
        <p className="text-sm text-slate-500">${value}</p>
      </div>
      
      {onClick && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-2 text-slate-400 hover:text-slate-600"
          onClick={onClick}
        >
          <CircleArrowRight className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default TokenCard;
