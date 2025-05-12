
import MainLayout from '@/components/layout/MainLayout';
import { Database, Brain, Bot, Coins, TrendingUp, Code, CircleCheck, CircleDollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FeatureCard } from '@/components/ui/FeatureCard';

const About = () => {
  const techList = [
    { name: "Base Network", category: "Blockchain" },
    { name: "CDP SDK", category: "Blockchain" },
    { name: "AgentKit", category: "AI Agent" },
    { name: "CoinGecko API", category: "Market Data" },
    { name: "Express JS", category: "Backend" },
    { name: "Gemini", category: "AI Engine" },
    { name: "React", category: "Frontend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "Tailwind CSS", category: "Design" },
  ];

  return (
    <MainLayout>
      <div className="safe-container py-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">DeFi Yield Optimizer Agent</h1>
          <p className="text-slate-600 mb-8">
            Your AI agent for optimizing DeFi yield farming strategies.
          </p>
          
          <div className="mb-8">
            <h2 className="text-xl font-medium text-slate-800 mb-4 flex items-center gap-2">
              <Bot className="h-5 w-5 text-sage-600" />
              What is DeFi Yield Optimizer?
            </h2>
            <div className="prose text-slate-600 max-w-none">
              <p>
                DeFi Yield Optimizer is an AI-powered agent designed to analyze DeFi protocols on Base to 
                identify and execute optimal yield farming strategies for stablecoins like USDC. The agent 
                uses AgentKit to autonomously deploy capital, monitor market conditions, and rebalance 
                investments for maximum returns while minimizing gas fees.
              </p>
              <p>
                Our mission is to simplify yield farming for DeFi users by automating strategy selection,
                capital deployment, and portfolio rebalancing to maximize returns while minimizing risk
                and transaction costs.
              </p>
              <p>
                The agent operates autonomously, analyzing real-time market data and executing transactions
                based on predefined risk parameters and optimization goals. You maintain full control over
                your investment strategy and can override agent decisions at any time.
              </p>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-medium text-slate-800 mb-4 flex items-center gap-2">
              <Brain className="h-5 w-5 text-sage-600" />
              How Does the AI Agent Work?
            </h2>
            <div className="prose text-slate-600 max-w-none">
              <p>
                Our DeFi Yield Optimizer agent processes multiple data streams to make informed investment decisions:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Protocol Analysis</strong>: The agent scans Base DeFi protocols to identify
                  yield-generating opportunities, analyzing TVL, APY rates, and protocol risk scores.
                </li>
                <li>
                  <strong>Gas Optimization</strong>: Transactions are timed and batched to minimize
                  gas fees on the Base network, ensuring more yield goes to your wallet.
                </li>
                <li>
                  <strong>Yield Comparison</strong>: The agent continuously compares yields across
                  different protocols to identify the most profitable options given your risk tolerance.
                </li>
                <li>
                  <strong>Auto-Rebalancing</strong>: When market conditions change, the agent can
                  automatically rebalance your portfolio to maintain optimal returns.
                </li>
              </ul>
              <p>
                Using AgentKit, our agent interacts with smart contracts to stake, unstake, or swap tokens
                as needed to execute the optimal strategy. All actions are transparent, with detailed
                transaction logs and performance reports available through the dashboard.
              </p>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-medium text-slate-800 mb-4 flex items-center gap-2">
              <Coins className="h-5 w-5 text-sage-600" />
              Key Features
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <FeatureCard
                icon={<Database className="h-5 w-5" />}
                title="Real-time DeFi Analysis"
                description="Continuous analysis of Base DeFi pools using CDP SDK for onchain data, ensuring you always have the latest market intelligence."
              />
              
              <FeatureCard
                icon={<Bot className="h-5 w-5" />}
                title="Autonomous Agent Actions"
                description="AgentKit-powered automation for deploying capital, monitoring conditions, and rebalancing investments without manual intervention."
              />
              
              <FeatureCard
                icon={<Code className="h-5 w-5" />}
                title="Smart Contract Automation"
                description="Automated interactions to stake, unstake, or swap tokens across various Base protocols with optimal timing."
              />
              
              <FeatureCard
                icon={<CircleCheck className="h-5 w-5" />}
                title="Risk Management"
                description="Customizable risk parameters to ensure your capital is deployed according to your risk tolerance and investment goals."
              />
              
              <FeatureCard
                icon={<TrendingUp className="h-5 w-5" />}
                title="Yield Optimization"
                description="Sophisticated algorithms to identify the highest yield opportunities while accounting for impermanent loss and other DeFi-specific risks."
              />
              
              <FeatureCard
                icon={<CircleDollarSign className="h-5 w-5" />}
                title="Gas Fee Minimization"
                description="Transaction batching and timing optimization to reduce gas fees on the Base network, maximizing your net returns."
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-medium text-slate-800 mb-4 flex items-center gap-2">
              <Code className="h-5 w-5 text-sage-600" />
              Tech Stack
            </h2>
            <div className="prose text-slate-600 max-w-none mb-6">
              <p>
                DeFi Yield Optimizer is built on a robust technology stack combining blockchain, AI, and data technologies:
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {["Blockchain", "AI Agent", "Market Data", "Backend", "AI Engine", "Frontend", "Design"].map(category => (
                <div key={category} className="border border-slate-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-slate-800 mb-2">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {techList
                      .filter(tech => tech.category === category)
                      .map(tech => (
                        <span 
                          key={tech.name}
                          className={cn(
                            "text-xs px-2 py-1 rounded-full",
                            category === "Blockchain" && "bg-blue-50 text-blue-700",
                            category === "AI Agent" && "bg-purple-50 text-purple-700",
                            category === "Market Data" && "bg-green-50 text-green-700",
                            category === "Backend" && "bg-amber-50 text-amber-700",
                            category === "AI Engine" && "bg-indigo-50 text-indigo-700",
                            category === "Frontend" && "bg-orange-50 text-orange-700",
                            category === "Design" && "bg-rose-50 text-rose-700"
                          )}
                        >
                          {tech.name}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-slate-50 rounded-lg border border-slate-200 p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-sage-100 rounded-full text-sage-600">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-slate-800">Data Security & Custody</h3>
              <p className="text-slate-600 text-sm">
                DeFi Yield Optimizer Agent never takes custody of your assets. The agent interacts with protocols through
                read and write operations but your assets remain controlled by you. All wallet connections are
                secured with advanced encryption to protect your data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
