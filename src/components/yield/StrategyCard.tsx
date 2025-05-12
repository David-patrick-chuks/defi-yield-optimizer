import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, TrendingUp } from 'lucide-react';

interface StrategyCardProps {
  title: string;
  description: string;
  currentApy: number;
  targetApy: number;
  riskLevel: 'low' | 'moderate' | 'high';
  onExecute: () => void;
}

const StrategyCard = ({
  title,
  description,
  currentApy,
  targetApy,
  riskLevel,
  onExecute
}: StrategyCardProps) => {
  const apyIncrease = targetApy - currentApy;
  
  const getRiskBadgeColor = () => {
    switch (riskLevel) {
      case 'low':
        return 'bg-risk-low text-green-800';
      case 'moderate':
        return 'bg-risk-moderate text-amber-800';
      case 'high':
        return 'bg-risk-high text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="border-sage-200 shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-sage-50 to-gray-50 border-b border-sage-100">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Bot className="text-sage-500" size={20} />
            {title}
          </CardTitle>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskBadgeColor()}`}>
            {riskLevel} risk
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="bg-slate-50 p-3 rounded-lg mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Current APY</span>
            <span className="text-lg font-medium">{currentApy.toFixed(2)}%</span>
          </div>
          <div className="flex items-center justify-center my-2">
            <ArrowRight className="text-sage-500" size={24} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Target APY</span>
            <span className="text-lg font-bold text-sage-600">{targetApy.toFixed(2)}%</span>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-2 bg-sage-50 p-2 rounded-lg">
          <TrendingUp className="text-sage-600" size={18} />
          <span className="text-sm font-medium text-sage-700">
            Projected Increase: +{apyIncrease.toFixed(2)}% APY
          </span>
        </div>
      </CardContent>
      <CardFooter className="bg-gradient-to-r from-gray-50 to-sage-50 border-t border-sage-100">
        <Button className="w-full" onClick={onExecute}>
          Execute Strategy
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StrategyCard;
