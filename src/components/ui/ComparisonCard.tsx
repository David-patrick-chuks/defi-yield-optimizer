
import { Progress } from '@/components/ui/progress';
import { CircleArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ComparisonCardProps {
  title: string;
  tokenA: {
    name: string;
    symbol: string;
    value: number;
    logoUrl?: string;
  };
  tokenB: {
    name: string;
    symbol: string;
    value: number;
    logoUrl?: string;
  };
  isBetter: 'A' | 'B';
  metric: string;
  explanation: string;
}

const ComparisonCard = ({
  title,
  tokenA,
  tokenB,
  isBetter,
  metric,
  explanation
}: ComparisonCardProps) => {
  const tokenAColor = isBetter === 'A' ? 'bg-risk-low' : 'bg-risk-high';
  const tokenBColor = isBetter === 'B' ? 'bg-risk-low' : 'bg-risk-high';
  
  return (
    <div className="ai-card p-5">
      <h3 className="text-lg font-medium text-slate-800 mb-4">{title}</h3>
      
      <div className="grid grid-cols-2 gap-6">
        <div className={cn("p-4 rounded-lg", 
                         isBetter === 'A' ? "bg-sage-50 border border-sage-200" : "")}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs">
              {tokenA.logoUrl ? (
                <img src={tokenA.logoUrl} alt={`${tokenA.name} logo`} className="w-6 h-6 rounded-full" />
              ) : (
                tokenA.symbol.slice(0, 2)
              )}
            </div>
            <div>
              <p className="font-medium text-slate-800">{tokenA.name}</p>
              <p className="text-xs text-slate-500">{tokenA.symbol}</p>
            </div>
            {isBetter === 'A' && (
              <div className="ml-auto">
                <div className="text-xs font-medium px-2 py-0.5 rounded-full bg-sage-100 text-sage-700">
                  Safer
                </div>
              </div>
            )}
          </div>
          
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-600">{metric}</span>
              <span className="font-medium">{tokenA.value.toFixed(1)}</span>
            </div>
            <Progress value={tokenA.value * 10} className="h-1.5" indicatorClassName={tokenAColor} />
          </div>
        </div>
        
        <div className={cn("p-4 rounded-lg", 
                         isBetter === 'B' ? "bg-sage-50 border border-sage-200" : "")}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs">
              {tokenB.logoUrl ? (
                <img src={tokenB.logoUrl} alt={`${tokenB.name} logo`} className="w-6 h-6 rounded-full" />
              ) : (
                tokenB.symbol.slice(0, 2)
              )}
            </div>
            <div>
              <p className="font-medium text-slate-800">{tokenB.name}</p>
              <p className="text-xs text-slate-500">{tokenB.symbol}</p>
            </div>
            {isBetter === 'B' && (
              <div className="ml-auto">
                <div className="text-xs font-medium px-2 py-0.5 rounded-full bg-sage-100 text-sage-700">
                  Safer
                </div>
              </div>
            )}
          </div>
          
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-600">{metric}</span>
              <span className="font-medium">{tokenB.value.toFixed(1)}</span>
            </div>
            <Progress value={tokenB.value * 10} className="h-1.5" indicatorClassName={tokenBColor} />
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-slate-100">
        <h4 className="text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
          <CircleArrowRight className="h-3.5 w-3.5 text-sage-500" />
          AI Analysis
        </h4>
        <p className="text-slate-600 text-sm">{explanation}</p>
      </div>
    </div>
  );
};

export default ComparisonCard;
