
import { cn } from "@/lib/utils";

interface TokenInfo {
  name: string;
  symbol: string;
  value: number;
}

interface ComparisonCardProps {
  title: string;
  tokenA: TokenInfo;
  tokenB: TokenInfo;
  isBetter: "A" | "B" | "equal";
  metric: string;
  explanation: string;
}

const ComparisonCard = ({
  title,
  tokenA,
  tokenB,
  isBetter,
  metric,
  explanation,
}: ComparisonCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-100">
        <h3 className="font-medium text-slate-800">{title}</h3>
      </div>
      <div className="p-4">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div 
            className={cn(
              "p-4 rounded-lg",
              isBetter === "A" ? "bg-sage-50 border border-sage-300" : "bg-slate-50 border border-slate-200"
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium">
                  {tokenA.symbol}
                </div>
                <span className="font-medium">{tokenA.name}</span>
              </div>
              {isBetter === "A" && (
                <div className="text-xs font-medium px-2 py-1 bg-sage-100 text-sage-800 rounded-full">
                  Lower Risk
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">{metric}</span>
              <span className={cn(
                "font-medium",
                tokenA.value <= 3 ? "text-green-600" :
                tokenA.value <= 6 ? "text-amber-600" :
                "text-red-600"
              )}>
                {tokenA.value.toFixed(1)}
              </span>
            </div>
          </div>
          
          <div 
            className={cn(
              "p-4 rounded-lg",
              isBetter === "B" ? "bg-sage-50 border border-sage-300" : "bg-slate-50 border border-slate-200"
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium">
                  {tokenB.symbol}
                </div>
                <span className="font-medium">{tokenB.name}</span>
              </div>
              {isBetter === "B" && (
                <div className="text-xs font-medium px-2 py-1 bg-sage-100 text-sage-800 rounded-full">
                  Lower Risk
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">{metric}</span>
              <span className={cn(
                "font-medium",
                tokenB.value <= 3 ? "text-green-600" :
                tokenB.value <= 6 ? "text-amber-600" :
                "text-red-600"
              )}>
                {tokenB.value.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-lg">
          <p className="text-sm text-slate-600">
            {explanation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComparisonCard;
