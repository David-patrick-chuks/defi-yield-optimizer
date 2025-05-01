
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

const Report = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tokenAnalysis, setTokenAnalysis] = useState([]);
  
  // Load and analyze tokens
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock token data that would come from wallet/dashboard in a real app
        const mockTokens = [
          { name: "Ethereum", symbol: "ETH", balance: 1.5 },
          { name: "Bitcoin", symbol: "BTC", balance: 0.25 },
          { name: "USD Coin", symbol: "USDC", balance: 1000 },
          { name: "DeFi Token", symbol: "DFI", balance: 150 },
          { name: "TokenXYZ", symbol: "XYZ", balance: 500 },
        ];
        
        // Analyze tokens using the OpenAI service
        const analysis = await analyzeTokens(mockTokens);
        setTokenAnalysis(analysis);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching token analysis:", error);
        toast.error("Failed to generate report. Please try again.");
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
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

  return (
    <MainLayout isConnected={true}>
      <div className="safe-container py-8">
        {isLoading ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 min-h-[70vh] flex items-center justify-center">
            <LoadingAI />
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
                  <Button variant="outline" size="sm" onClick={downloadReport}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" onClick={shareReport}>
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
