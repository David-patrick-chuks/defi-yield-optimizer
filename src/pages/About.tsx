
import MainLayout from '@/components/layout/MainLayout';
import { Shield, Brain, Database, Code } from 'lucide-react';
import { cn } from '@/lib/utils';

const About = () => {
  const techList = [
    { name: "Ethereum Virtual Machine (EVM)", category: "Blockchain" },
    { name: "Move Virtual Machine (MoveVM)", category: "Blockchain" },
    { name: "CoinGecko API", category: "Market Data" },
    { name: "Express JS", category: "Backend" },
    { name: "Gemini", category: "Backend" },
    { name: "React", category: "Frontend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "Tailwind CSS", category: "Design" },
  ];

  return (
    <MainLayout>
      <div className="safe-container py-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">About SafeSage</h1>
          <p className="text-slate-600 mb-8">
            Your AI guide for safer DeFi investment decisions.
          </p>
          
          <div className="mb-8">
            <h2 className="text-xl font-medium text-slate-800 mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-sage-600" />
              What is SafeSage?
            </h2>
            <div className="prose text-slate-600 max-w-none">
              <p>
                SafeSage is an AI-powered platform designed to help cryptocurrency investors 
                understand and mitigate risks in their DeFi portfolios. In the complex and 
                often unpredictable world of cryptocurrency, making informed decisions is crucial 
                for protecting your investments.
              </p>
              <p>
                Our mission is to act as a wise guide for your DeFi journey, providing clear, 
                accessible risk assessments and suggestions for safer alternatives. We believe 
                that with better information, investors can make more confident decisions.
              </p>
              <p>
                SafeSage doesn't store or move any of your tokens. We simply analyze the publicly 
                available information about the tokens in your portfolio to provide insights 
                about potential risks.
              </p>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-medium text-slate-800 mb-4 flex items-center gap-2">
              <Brain className="h-5 w-5 text-sage-600" />
              How Does the AI Work?
            </h2>
            <div className="prose text-slate-600 max-w-none">
              <p>
                SafeSage's AI engine analyzes multiple factors to provide comprehensive risk assessments:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Market Analysis</strong>: We evaluate market capitalization, trading volume, 
                  liquidity, and price volatility to gauge market-related risks.
                </li>
                <li>
                  <strong>Technical Risk Assessment</strong>: Our AI reviews smart contract audits, 
                  code quality metrics, and security incidents to identify technical vulnerabilities.
                </li>
                <li>
                  <strong>Protocol Analysis</strong>: For DeFi protocols, we examine total value locked, 
                  longevity, governance structure, and community engagement.
                </li>
                <li>
                  <strong>Historical Performance</strong>: We analyze historical price movements and 
                  correlations with broader market trends.
                </li>
              </ul>
              <p>
                After collecting and analyzing this data, our advanced AI models generate a risk score 
                and provide explanations in clear, non-technical language. The AI is continuously 
                learning from new market data and improving its assessment capabilities.
              </p>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-medium text-slate-800 mb-4 flex items-center gap-2">
              <Code className="h-5 w-5 text-sage-600" />
              Tech Stack
            </h2>
            <div className="prose text-slate-600 max-w-none mb-6">
              <p>
                SafeSage is built on a robust technology stack combining blockchain, data, and AI technologies:
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {["Blockchain", "Market Data", "Backend", "Frontend", "Design"].map(category => (
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
                            category === "Market Data" && "bg-green-50 text-green-700",
                            category === "Backend" && "bg-purple-50 text-purple-700",
                            category === "Frontend" && "bg-amber-50 text-amber-700",
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
              <h3 className="font-medium text-slate-800">Data Privacy & Security</h3>
              <p className="text-slate-600 text-sm">
                SafeSage values your privacy. We analyze on-chain data but never access your private keys or move your assets.
                All wallet connections are read-only, and we don't store your personal data beyond what's necessary for analysis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
