
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import LoadingAI from '@/components/ui/LoadingAI';
import TokenRiskCard from '@/components/ui/TokenRiskCard';
import { Button } from '@/components/ui/button';
import { Download, Share } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { downloadReport, shareReport } from '@/utils/reportUtils';
import { analyzeTokens } from '@/services/openai';
import { toast } from '@/components/ui/sonner';
import { useWallet } from '@/context/WalletContext';

// Define interfaces for token data
interface TokenData {
  name: string;
  symbol: string;
  balance: number;
  price?: number;
}

interface TokenAnalysis {
  name: string;
  symbol: string;
  riskScore: number;
  explanation: string;
  suggestions?: string;
}

const Report = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tokenAnalysis, setTokenAnalysis] = useState<TokenAnalysis[]>([]);
  const { isConnected, address, balance, chainId } = useWallet();
  
  // Load and analyze tokens
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isConnected || !address) {
          toast.error("Please connect your wallet first");
          setIsLoading(false);
          return;
        }
        
        toast.info("AI risk analysis starting...");
        
        // Get real token data from connected wallet
        // For now, we'll use the native token (ETH) from the wallet balance
        // In a production app, we would fetch all tokens using an API like Moralis or Covalent
        const realTokens: TokenData[] = [
          { 
            name: "Ethereum", 
            symbol: "ETH", 
            balance: parseFloat(balance), 
            price: 3500 // Mock price for now, in real app would use price API
          }
        ];
        
        // Add placeholder for chain-specific tokens based on chainId
        if (chainId) {
          if (chainId === 137 || chainId === 80001) {
            realTokens.push({ 
              name: "Polygon", 
              symbol: "MATIC", 
              balance: 100, 
              price: 0.8
            });
          } else if (chainId === 56) {
            realTokens.push({ 
              name: "BNB", 
              symbol: "BNB", 
              balance: 2, 
              price: 570
            });
          } else if (chainId === 10 || chainId === 42161) {
            realTokens.push({ 
              name: "Layer 2 Token", 
              symbol: "L2T", 
              balance: 50, 
              price: 2.5
            });
          }
        }

        console.log("Analyzing wallet tokens:", realTokens);
        
        // Analyze tokens using the OpenAI service
        const analysis = await analyzeTokens(realTokens);
        console.log("AI analysis completed:", analysis);
        
        setTokenAnalysis(analysis);
        setIsLoading(false);
        toast.success("AI risk analysis completed");
      } catch (error) {
        console.error("Error fetching token analysis:", error);
        toast.error("Failed to generate AI report. Please try again.");
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [isConnected, address, balance, chainId]);
  
  // Redirect to dashboard if not connected
  useEffect(() => {
    if (!isConnected && !isLoading) {
      toast.error("Please connect your wallet to view the risk analysis");
      // Add a small delay before redirecting
      const timeout = setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
      
      return () => clearTimeout(timeout);
    }
  }, [isConnected, isLoading]);
  
  const chartData = tokenAnalysis.map(token => ({
    name: token.symbol,
    riskScore: token.riskScore,
    fill: token.riskScore <= 3 ? '#68D391' : 
          token.riskScore <= 6 ? '#F6E05E' : 
          '#F56565'
  }));
  
  const overallRisk = tokenAnalysis.length > 0 
    ? tokenAnalysis.reduce((sum, token) => sum + token.riskScore, 0) / tokenAnalysis.length
    : 0;

  // Handle report downloads and sharing
  const handleDownloadReport = async () => {
    try {
      await downloadReport();
    } catch (error) {
      console.error("Error downloading report:", error);
      toast.error("Failed to download report");
    }
  };

  const handleShareReport = async () => {
    try {
      await shareReport();
    } catch (error) {
      console.error("Error sharing report:", error);
      toast.error("Failed to share report");
    }
  };

  return (
    <MainLayout>
      <div className="safe-container py-8">
        {isLoading ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 min-h-[70vh] flex items-center justify-center">
            <LoadingAI />
          </div>
        ) : !isConnected ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 min-h-[50vh] flex flex-col items-center justify-center">
            <h2 className="text-xl font-medium text-slate-800 mb-4">Wallet Connection Required</h2>
            <p className="text-slate-600 mb-6">Please connect your wallet to analyze your portfolio.</p>
            <Button onClick={() => window.location.href = '/dashboard'} className="gradient-bg-secondary">
              Go to Dashboard
            </Button>
          </div>
        ) : (
          <div id="report-content">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
              <div className="flex flex-col md:flex-row justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-slate-800 mb-2">AI Risk Analysis</h1>
                  <p className="text-slate-600">
                    Generated on {new Date().toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                  <Button variant="outline" size="sm" onClick={handleDownloadReport}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShareReport}>
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-lg font-medium text-slate-800 mb-4">Portfolio Risk Summary</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-50 p-5 rounded-lg">
                    <p className="text-sm text-slate-500 mb-1">Average Risk Score</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-3xl font-bold">{overallRisk.toFixed(1)}</h3>
                      <span className="text-sm font-medium px-2 py-0.5 rounded-full"
                        style={{ 
                          backgroundColor: overallRisk <= 3 ? '#68D391' : 
                                          overallRisk <= 6 ? '#F6E05E' : 
                                          '#F56565',
                          color: overallRisk <= 3 ? '#276749' : 
                                 overallRisk <= 6 ? '#975A16' : 
                                 '#9B2C2C' 
                        }}>
                        {overallRisk <= 3 ? 'Low' : overallRisk <= 6 ? 'Moderate' : 'High'} Risk
                      </span>
                    </div>
                    <p className="text-slate-600 mt-3 text-sm">
                      Your portfolio has an {overallRisk <= 3 ? 'low' : overallRisk <= 6 ? 'moderate' : 'high'} overall risk score. 
                      {overallRisk > 5 ? ' Consider rebalancing to reduce exposure to higher risk assets.' : ' Your current asset allocation is well-diversified.'}
                    </p>
                  </div>
                  
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip 
                          formatter={(value) => [`Risk Score: ${value}`, 'Risk Level']}
                          labelStyle={{ color: '#1a202c' }}
                          contentStyle={{ backgroundColor: 'white', borderRadius: '0.375rem', border: '1px solid #e2e8f0' }}
                        />
                        <Bar dataKey="riskScore" fill="#8884d8" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-medium text-slate-800 mb-4">Individual Token Assessment</h2>
              {tokenAnalysis.length > 0 ? (
                <div className="space-y-4">
                  {tokenAnalysis.map((token) => (
                    <TokenRiskCard
                      key={token.symbol}
                      name={token.name}
                      symbol={token.symbol}
                      riskScore={token.riskScore}
                      explanation={token.explanation}
                      suggestions={token.suggestions}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50 p-6 rounded-lg text-center">
                  <p className="text-slate-600">No tokens found in your wallet for analysis.</p>
                </div>
              )}
            </div>
            
            <div className="p-6 bg-sage-50 border border-sage-200 rounded-lg">
              <div className="mb-3 font-medium text-sage-800">AI Risk Recommendations</div>
              <ul className="space-y-2 text-sage-700">
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Consider reducing exposure to high-risk tokens and reallocating to more established assets.</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Your stablecoin allocation provides good stability to your portfolio. Consider maintaining this balance.</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>For moderate-risk DeFi exposure, explore established protocols with longer track records.</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Report;
