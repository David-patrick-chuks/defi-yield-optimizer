
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useYield } from '@/context/YieldContext';
import { useWallet } from '@/context/WalletContext';
import LoadingAI from '@/components/ui/LoadingAI';
import { Database, Code, TrendingUp, Activity } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import ConnectWalletPrompt from '@/components/strategies/ConnectWalletPrompt';
import GenerateStrategyPrompt from '@/components/strategies/GenerateStrategyPrompt';
import FeatureSection from '@/components/strategies/FeatureSection';
import HowItWorks from '@/components/strategies/HowItWorks';
import GeneratedStrategies from '@/components/strategies/GeneratedStrategies';

const Strategies = () => {
  const { userPositions, optimizeYield, executeStrategy } = useYield();
  const { isConnected } = useWallet();
  const [generatingStrategy, setGeneratingStrategy] = useState(false);
  const [strategyGenerated, setStrategyGenerated] = useState(false);

  // Current average APY across all positions
  const currentAverageApy = userPositions.length > 0
    ? userPositions.reduce((sum, pos) => sum + pos.apy, 0) / userPositions.length
    : 0;

  const handleGenerateStrategy = async () => {
    setGeneratingStrategy(true);
    try {
      await optimizeYield();
      setStrategyGenerated(true);
    } catch (error) {
      console.error("Failed to generate strategy:", error);
      toast.error("Failed to generate strategy");
    } finally {
      setGeneratingStrategy(false);
    }
  };

  const handleExecuteStrategy = async (strategyName: string) => {
    try {
      await executeStrategy(strategyName);
      toast.success("Strategy execution initiated!");
    } catch (error) {
      console.error("Failed to execute strategy:", error);
      toast.error("Failed to execute strategy");
    }
  };

  // Key features for the FeatureSection component
  const features = [
    {
      icon: <Database size={20} />,
      title: "Real-time DeFi Analysis",
      description: "Continuous analysis of Base DeFi pools using CDP SDK for onchain data, ensuring you always have the latest market intelligence.",
      highlight: true
    },
    {
      icon: <Code size={20} />,
      title: "Automated Smart Contracts",
      description: "Automated interactions to stake, unstake, or swap tokens across various Base protocols with optimal timing.",
      highlight: true
    },
    {
      icon: <Activity size={20} />,
      title: "Market Monitoring",
      description: "Constant monitoring of market conditions to identify the best yield opportunities as they emerge in real-time."
    },
    {
      icon: <TrendingUp size={20} />,
      title: "Capital Rebalancing",
      description: "Autonomous rebalancing of your portfolio to maximize returns while respecting your risk preferences."
    },
  ];

  // Example strategies for the GeneratedStrategies component
  const strategies = [
    {
      title: "Balanced Yield Optimizer",
      description: "This strategy rebalances your portfolio to achieve higher yields while maintaining a low risk profile by allocating funds across established Base protocols.",
      currentApy: currentAverageApy,
      targetApy: currentAverageApy + 2.3,
      riskLevel: 'low' as const,
      action: "balanced"
    },
    {
      title: "Aggressive Growth Strategy",
      description: "Maximize your yield potential by redistributing assets to higher APY pools with a moderate risk tolerance, focusing on newer protocols with higher returns.",
      currentApy: currentAverageApy,
      targetApy: currentAverageApy + 5.8,
      riskLevel: 'moderate' as const,
      action: "aggressive"
    },
    {
      title: "Innovative Yield Farming",
      description: "Explore emerging opportunities in newly launched Base protocols with exceptional yield potential, while assuming higher risk for potentially superior returns.",
      currentApy: currentAverageApy,
      targetApy: currentAverageApy + 12.5,
      riskLevel: 'high' as const,
      action: "innovative"
    }
  ];

  // Render different content based on application state
  const renderContent = () => {
    if (!isConnected) {
      return <ConnectWalletPrompt />;
    } else if (generatingStrategy) {
      return (
        <div className="py-12">
          <LoadingAI text="AI Optimizing Your Yield Strategy" />
        </div>
      );
    } else if (!strategyGenerated) {
      return (
        <>
          <GenerateStrategyPrompt onGenerate={handleGenerateStrategy} />
          <FeatureSection features={features} />
          <HowItWorks />
        </>
      );
    } else {
      return <GeneratedStrategies strategies={strategies} onExecute={handleExecuteStrategy} />;
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Yield Strategies</h1>
          <p className="text-slate-600">
            Let our AI agent analyze your portfolio and generate optimized yield strategies to maximize your returns.
          </p>
        </div>

        {renderContent()}
      </div>
    </MainLayout>
  );
};

export default Strategies;
