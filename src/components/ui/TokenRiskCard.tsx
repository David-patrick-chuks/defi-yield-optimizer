
import { CircleArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface TokenRiskCardProps {
  name: string;
  symbol: string;
  riskScore: number;
  explanation: string;
  suggestions?: string;
  logoUrl?: string;
}

const getRiskColor = (score: number) => {
  if (score <= 3) return 'bg-risk-low';
  if (score <= 6) return 'bg-risk-moderate';
  return 'bg-risk-high';
};

const getRiskText = (score: number) => {
  if (score <= 3) return 'Low Risk';
  if (score <= 6) return 'Moderate Risk';
  return 'High Risk';
};

const TokenRiskCard = ({ 
  name, 
  symbol, 
  riskScore, 
  explanation, 
  suggestions,
  logoUrl 
}: TokenRiskCardProps) => {
  const riskColor = getRiskColor(riskScore);
  const riskText = getRiskText(riskScore);
  
  return (
    <div className="ai-card p-5">
      <div className="flex items-center justify-between mb-4">
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
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">{riskScore.toFixed(1)}</span>
            <div className="text-xs font-medium px-2 py-1 rounded-full" 
                 style={{ backgroundColor: riskColor === 'bg-risk-low' ? '#68D391' : 
                                         riskColor === 'bg-risk-moderate' ? '#F6E05E' : 
                                         '#F56565',
                          color: riskColor === 'bg-risk-low' ? '#276749' : 
                                 riskColor === 'bg-risk-moderate' ? '#975A16' : 
                                 '#9B2C2C' }}>
              {riskText}
            </div>
          </div>
          <Progress value={riskScore * 10} className="w-24 h-1.5 mt-1" 
                    style={{ backgroundColor: '#E2E8F0' }}
                    indicatorClassName={riskColor} />
        </div>
      </div>
      
      <div className="mt-4">
        <h4 className="text-sm font-medium text-slate-700 mb-1">AI Analysis</h4>
        <p className="text-slate-600 text-sm">{explanation}</p>
        
        {suggestions && (
          <div className="mt-3 pt-3 border-t border-slate-100">
            <h4 className="text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
              <CircleArrowRight className="h-3.5 w-3.5 text-sage-500" />
              Safer Alternatives
            </h4>
            <p className="text-slate-600 text-sm">{suggestions}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenRiskCard;
