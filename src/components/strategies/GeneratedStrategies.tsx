
import React from 'react';
import StrategyCard from '@/components/yield/StrategyCard';

interface Strategy {
  title: string;
  description: string;
  currentApy: number;
  targetApy: number;
  riskLevel: 'low' | 'moderate' | 'high';
  action: string;
}

interface GeneratedStrategiesProps {
  strategies: Strategy[];
  onExecute: (action: string) => void;
}

const GeneratedStrategies = ({ strategies, onExecute }: GeneratedStrategiesProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {strategies.map((strategy) => (
          <StrategyCard
            key={strategy.title}
            title={strategy.title}
            description={strategy.description}
            currentApy={strategy.currentApy}
            targetApy={strategy.targetApy}
            riskLevel={strategy.riskLevel}
            onExecute={() => onExecute(strategy.action)}
          />
        ))}
      </div>
      
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mt-6">
        <h3 className="text-lg font-medium mb-2">How It Works</h3>
        <p className="text-slate-600 text-sm">
          Our AI agent analyzes on-chain data across multiple DeFi protocols on Base to identify the most efficient yield strategies for your stablecoin assets. When you execute a strategy, the agent will automatically rebalance your portfolio by interacting with the relevant smart contracts to optimize your returns.
        </p>
      </div>
    </div>
  );
};

export default GeneratedStrategies;
