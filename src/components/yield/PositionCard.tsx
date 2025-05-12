
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from "lucide-react";

interface PositionCardProps {
  protocol: string;
  pool: string;
  invested: number;
  currentValue: number;
  apy: number;
  tokens: string[];
  onWithdraw?: () => void;
}

const PositionCard = ({ 
  protocol,
  pool,
  invested,
  currentValue,
  apy,
  tokens,
  onWithdraw
}: PositionCardProps) => {
  const profit = currentValue - invested;
  const profitPercentage = (profit / invested) * 100;
  const isProfitable = profit >= 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{pool}</CardTitle>
        <p className="text-sm text-muted-foreground">{protocol}</p>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Current Value</p>
            <p className="text-xl font-bold">${currentValue.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Invested</p>
            <p className="text-lg">${invested.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="flex justify-between mb-2">
          <div>
            <p className="text-sm text-muted-foreground">APY</p>
            <p className="text-lg font-medium text-sage-500">{apy.toFixed(2)}%</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Profit/Loss</p>
            <div className={`flex items-center justify-end ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
              {isProfitable ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
              <span className="font-medium">
                ${Math.abs(profit).toFixed(2)} ({Math.abs(profitPercentage).toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-3">
          <p className="text-xs text-muted-foreground mb-1">Assets</p>
          <div className="flex gap-1">
            {tokens.map((token) => (
              <div key={token} className="bg-slate-100 rounded-full px-2 py-0.5 text-xs">
                {token}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={onWithdraw}
        >
          Withdraw
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PositionCard;
