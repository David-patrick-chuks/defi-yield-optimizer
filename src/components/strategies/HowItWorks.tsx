
import React from 'react';

const HowItWorks = () => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
      <h3 className="text-lg font-medium mb-3">How It Works</h3>
      <p className="text-slate-600 mb-4">
        Our DeFi Yield Optimizer Agent processes multiple data streams to make informed investment decisions:
      </p>
      <ol className="list-decimal list-inside space-y-2 text-slate-600">
        <li>
          <span className="font-medium">Protocol Analysis:</span> The agent scans Base DeFi protocols to identify
          yield-generating opportunities, analyzing TVL, APY rates, and protocol risk scores.
        </li>
        <li>
          <span className="font-medium">Strategy Generation:</span> Based on your risk preferences and market conditions,
          the agent generates optimal strategies for your stablecoin assets.
        </li>
        <li>
          <span className="font-medium">Smart Contract Execution:</span> When you approve a strategy, the agent
          interacts with DeFi smart contracts to deploy your capital efficiently.
        </li>
        <li>
          <span className="font-medium">Portfolio Monitoring:</span> The agent continuously monitors your positions
          and market conditions, suggesting rebalances when better opportunities arise.
        </li>
      </ol>
    </div>
  );
};

export default HowItWorks;
