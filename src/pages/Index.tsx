
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import FeatureCard from '@/components/ui/FeatureCard';
import StepCard from '@/components/ui/StepCard';
import { Shield, TrendingUp, FileSearch, Link, Wallet } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { useWallet } from '@/context/WalletContext';

const Index = () => {
  const { connectWallet, isConnected, isConnecting } = useWallet();
  
  const handleConnectClick = () => {
    if (isConnected || isConnecting) return;
    connectWallet();
  };
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="safe-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight gradient-text">
                SafeSage – Your AI Guide for DeFi Risk
              </h1>
              <p className="text-xl text-slate-600 max-w-xl">
                AI acting as a wise guide for safe DeFi choices. Analyze your portfolio risks, 
                make informed decisions, and protect your investments.
              </p>
              <div className="pt-4">
                <Button 
                  className="gradient-bg-secondary text-white font-medium mr-4 px-6 py-5"
                  onClick={handleConnectClick}
                  disabled={isConnecting || isConnected}
                >
                  {isConnecting ? "Connecting..." : isConnected ? "Wallet Connected" : "Connect Wallet"}
                </Button>
                
                <RouterLink to="/about">
                  <Button variant="outline" className="px-6 py-5">
                    Learn More
                  </Button>
                </RouterLink>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 bg-white rounded-xl shadow-xl border border-slate-100 p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-sage-600" />
                    <h2 className="text-lg font-medium">Portfolio Risk Analysis</h2>
                  </div>
                  <div className="text-xs font-medium px-2 py-1 rounded-full bg-sage-100 text-sage-700">
                    AI Powered
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center text-sm">
                        ETH
                      </div>
                      <div>
                        <p className="font-medium">Ethereum</p>
                        <p className="text-xs text-slate-500">Low Risk</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">2.5</p>
                      <p className="text-xs text-slate-500">Risk Score</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center text-sm">
                        BTC
                      </div>
                      <div>
                        <p className="font-medium">Bitcoin</p>
                        <p className="text-xs text-slate-500">Low Risk</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">2.1</p>
                      <p className="text-xs text-slate-500">Risk Score</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center text-sm">
                        XYZ
                      </div>
                      <div>
                        <p className="font-medium">TokenXYZ</p>
                        <p className="text-xs text-slate-500">High Risk</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">8.7</p>
                      <p className="text-xs text-slate-500">Risk Score</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <RouterLink to="/dashboard">
                    <Button className="w-full">View Full Analysis</Button>
                  </RouterLink>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute inset-0 -translate-x-6 -translate-y-6 bg-sage-100 rounded-xl -z-10"></div>
              <div className="absolute inset-0 translate-x-6 translate-y-6 bg-slate-100 rounded-xl -z-20"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-slate-50">
        <div className="safe-container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Smart AI Protection for Your Portfolio</h2>
            <p className="text-slate-600">
              SafeSage uses advanced AI to identify risks in your token portfolio and suggests safer alternatives.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="h-6 w-6" />}
              title="Risk Assessment"
              description="AI-powered risk scoring for each token in your portfolio, identifying potential vulnerabilities."
            />
            
            <FeatureCard
              icon={<TrendingUp className="h-6 w-6" />}
              title="Market Analysis"
              description="Compare market performance and liquidity metrics to evaluate token stability and growth potential."
            />
            
            <FeatureCard
              icon={<FileSearch className="h-6 w-6" />}
              title="Smart Reports"
              description="Detailed reports with AI-generated explanations that help you understand risks in simple terms."
            />
            
            <FeatureCard
              icon={<Link className="h-6 w-6" />}
              title="Token Comparison"
              description="Side-by-side comparison of tokens to make informed decisions about your investments."
            />
            
            <FeatureCard
              icon={<Shield className="h-6 w-6" stroke="currentColor" />}
              title="Safer Alternatives"
              description="Get AI suggestions for safer tokens that match your investment criteria and risk tolerance."
              className="md:col-span-2 lg:col-span-1"
            />
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16">
        <div className="safe-container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">How SafeSage Works</h2>
            <p className="text-slate-600">
              Simple, secure, and intelligent analysis in just a few steps.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-12">
              <StepCard
                number={1}
                title="Connect Your Wallet"
                description="Securely connect your cryptocurrency wallet. We never access your funds or private keys."
                icon={<Wallet className="h-4 w-4" />}
              />
              
              <StepCard
                number={2}
                title="View Your Portfolio"
                description="See a complete overview of your token holdings and balances in one place."
                icon={<TrendingUp className="h-4 w-4" />}
              />
              
              <StepCard
                number={3}
                title="Generate AI Analysis"
                description="Let our advanced AI analyze the risk profile of each token in your portfolio."
                icon={<FileSearch className="h-4 w-4" />}
              />
              
              <StepCard
                number={4}
                title="Get Smart Recommendations"
                description="Receive personalized suggestions for safer alternatives based on your investment goals."
                icon={<Shield className="h-4 w-4" />}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-slate-800 text-white">
        <div className="safe-container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Secure Your DeFi Investments?</h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8">
            Connect your wallet now and get immediate AI-powered insights into your portfolio's risk profile.
          </p>
          <div>
            <Button 
              className="gradient-bg-secondary text-white font-medium px-8 py-6 text-lg"
              onClick={handleConnectClick}
              disabled={isConnecting || isConnected}
            >
              <Wallet className="h-5 w-5 mr-2" />
              {isConnecting ? "Connecting..." : isConnected ? "Wallet Connected" : "Connect Wallet & Start Analyzing"}
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
