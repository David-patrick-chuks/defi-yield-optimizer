
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Robot,
  TrendingUp,
  Coins,
  Exchange,
  Shield,
  Activity,
  Wallet,
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import FeatureCard from '@/components/ui/FeatureCard';
import StepCard from '@/components/ui/StepCard';

const Index = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sage-50 via-slate-50 to-sage-50 border-b">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
                AI-Powered DeFi Yield Optimization
              </h1>
              <p className="text-xl text-slate-600 mb-6">
                Maximize your stablecoin returns with our autonomous yield farming agent. 
                Analyze DeFi protocols on Base, deploy capital, and rebalance automatically 
                for optimal returns.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => navigate('/dashboard')} 
                  size="lg" 
                  className="bg-sage-600 hover:bg-sage-700"
                >
                  Launch App
                </Button>
                <Button 
                  onClick={() => navigate('/about')} 
                  variant="outline" 
                  size="lg"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Robot className="mr-2 text-sage-500" size={20} />
                    AI Yield Strategy Preview
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-slate-50 rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-700 font-medium">Current Average APY</span>
                        <span className="text-sage-600 font-bold">4.2%</span>
                      </div>
                      <div className="h-1 bg-slate-200 rounded-full mb-2">
                        <div className="h-1 bg-sage-500 rounded-full" style={{ width: '42%' }}></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center my-2">
                      <div className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center">
                        <TrendingUp size={18} className="text-sage-600" />
                      </div>
                    </div>
                    <div className="bg-sage-50 rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-700 font-medium">Optimized APY</span>
                        <span className="text-sage-600 font-bold">8.7%</span>
                      </div>
                      <div className="h-1 bg-slate-200 rounded-full mb-2">
                        <div className="h-1 bg-sage-500 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                      <div className="flex justify-end">
                        <span className="text-xs text-green-600 font-medium">+4.5%</span>
                      </div>
                    </div>
                    <div className="pt-4 text-center">
                      <Button 
                        onClick={() => navigate('/strategies')} 
                        className="w-full bg-sage-600 hover:bg-sage-700"
                      >
                        <Robot className="mr-2" size={16} />
                        Generate My Strategy
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Optimize Your DeFi Yields</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our AI-powered platform automatically manages your stablecoin investments
              to maximize returns while minimizing risks and gas fees.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Robot size={24} />}
              title="AI Strategy Generation"
              description="Our advanced AI analyzes yield opportunities across Base protocols to create optimized strategies for your portfolio."
            />
            <FeatureCard
              icon={<Exchange size={24} />}
              title="Automated Execution"
              description="Execute yield farming strategies with one click. The agent handles all contract interactions for staking, unstaking, and swapping."
            />
            <FeatureCard
              icon={<Activity size={24} />}
              title="Real-time Monitoring"
              description="Continuous monitoring of your positions, market conditions, and protocol changes to ensure optimal performance."
            />
            <FeatureCard
              icon={<Shield size={24} />}
              title="Risk Assessment"
              description="Comprehensive risk analysis of each protocol based on audits, TVL history, and protocol mechanics."
            />
            <FeatureCard
              icon={<Coins size={24} />}
              title="Gas Optimization"
              description="Intelligent transaction timing and batching to minimize gas costs and maximize your effective yield."
            />
            <FeatureCard
              icon={<TrendingUp size={24} />}
              title="Yield Comparison"
              description="Compare real APY across different protocols and strategies to make informed decisions."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-sage-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our platform makes yield optimization simple and efficient
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-8">
            <StepCard
              number={1}
              title="Connect Your Wallet"
              description="Securely connect your wallet to view your stablecoins and current yield positions."
              icon={<Wallet size={18} />}
            />
            <StepCard
              number={2}
              title="Generate AI Strategy"
              description="Our AI agent analyzes Base DeFi protocols and your portfolio to create optimized yield strategies."
              icon={<Robot size={18} />}
            />
            <StepCard
              number={3}
              title="Execute Strategy"
              description="One-click execution deploys your stablecoins to the recommended protocols with optimal allocations."
              icon={<Exchange size={18} />}
            />
            <StepCard
              number={4}
              title="Automatic Rebalancing"
              description="The agent continuously monitors yields and automatically rebalances when better opportunities arise."
              icon={<TrendingUp size={18} />}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-sage-500 to-sage-600 rounded-3xl overflow-hidden shadow-xl">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-2/3 mb-8 md:mb-0">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    Ready to optimize your stablecoin yields?
                  </h2>
                  <p className="text-xl text-sage-100 mb-6">
                    Start using our AI-powered yield optimizer today and maximize your returns on Base.
                  </p>
                  <Button 
                    onClick={() => navigate('/dashboard')} 
                    size="lg" 
                    className="bg-white text-sage-700 hover:bg-sage-50"
                  >
                    Launch App
                  </Button>
                </div>
                <div className="md:w-1/3 flex justify-center">
                  <div className="h-48 w-48 bg-white/10 rounded-full flex items-center justify-center">
                    <Robot size={96} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
