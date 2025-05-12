
import React from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { YieldPool } from '@/services/yieldService';

interface YieldCardProps {
  pool: YieldPool;
  onDeposit?: () => void;
}

const YieldCard = ({ pool, onDeposit }: YieldCardProps) => {
  const { protocol, name, tokens, apy, tvl, risk } = pool;

  const riskColors = {
    low: "bg-risk-low text-green-800",
    moderate: "bg-risk-moderate text-amber-800",
    high: "bg-risk-high text-red-800"
  };

  const formatTVL = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{protocol}</CardDescription>
          </div>
          <div className={cn("px-2 py-1 rounded-full text-xs font-medium", riskColors[risk])}>
            {risk} risk
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Annual Yield</p>
            <p className="text-2xl font-bold text-sage-500">{apy.toFixed(2)}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Value Locked</p>
            <p className="text-xl font-semibold">{formatTVL(tvl)}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Assets</p>
          <div className="flex gap-2">
            {tokens.map((token) => (
              <div key={token} className="bg-slate-100 rounded-full px-2 py-1 text-xs">
                {token}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onDeposit} 
          className="w-full"
        >
          Deposit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default YieldCard;
