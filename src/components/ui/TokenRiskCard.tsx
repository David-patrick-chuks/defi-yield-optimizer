
import { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle, ShieldCheck } from 'lucide-react';

interface TokenRiskCardProps {
  name: string;
  symbol: string;
  riskScore: number;
  explanation: string;
  suggestions?: string;
}

const TokenRiskCard = ({
  name,
  symbol,
  riskScore,
  explanation,
  suggestions,
}: TokenRiskCardProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  const getRiskLabel = () => {
    if (riskScore <= 3) return 'Low Risk';
    if (riskScore <= 6) return 'Moderate Risk';
    return 'High Risk';
  };
  
  const getRiskColor = () => {
    if (riskScore <= 3) return 'bg-risk-low text-green-800';
    if (riskScore <= 6) return 'bg-risk-medium text-amber-800';
    return 'bg-risk-high text-red-800';
  };
  
  const getRiskIcon = () => {
    if (riskScore <= 3) return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (riskScore <= 6) return <ShieldCheck className="h-5 w-5 text-amber-600" />;
    return <AlertTriangle className="h-5 w-5 text-red-600" />;
  };
  
  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer" 
        onClick={toggleExpanded}
      >
        <div className="flex items-center gap-3">
          {getRiskIcon()}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-slate-800">{name}</h3>
              <span className="text-sm text-slate-500">{symbol}</span>
            </div>
            <div className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1 ${getRiskColor()}`}>
              {getRiskLabel()}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-center">
            <p className="text-2xl font-bold">{riskScore.toFixed(1)}</p>
            <p className="text-xs text-slate-500">Risk Score</p>
          </div>
          {expanded ? (
            <ChevronUp className="h-5 w-5 text-slate-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-slate-400" />
          )}
        </div>
      </div>
      
      {expanded && (
        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <p className="text-sm text-slate-600 mb-4">{explanation}</p>
          
          {suggestions && (
            <>
              <h4 className="text-sm font-medium text-slate-700 mb-2">Suggestions</h4>
              <div className="bg-sage-50 border border-sage-200 rounded p-3">
                <p className="text-sm text-sage-700">{suggestions}</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TokenRiskCard;
