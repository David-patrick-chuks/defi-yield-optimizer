
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import TokenCard from '@/components/ui/TokenCard';
import { Button } from '@/components/ui/button';
import { CircleArrowRight, Wallet, FileSearch } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWallet } from '@/context/WalletContext';
import { toast } from '@/components/ui/sonner';
import { SupportBot } from '@/components/ui/support-bot';

// Define interface for our token data
interface TokenData {
  name: string;
  symbol: string;
  balance: string;
  value: string;
  logoUrl?: string;
}

const Dashboard = () => {
  const { isConnected, address, connectWallet, balance, chainId } = useWallet();
  const [walletTokens, setWalletTokens] = useState<TokenData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Function to fetch real token data when connected
  const fetchTokenData = async () => {
    if (!isConnected || !address) return;
    
    setIsLoading(true);
    try {
      // Use Moralis API to get token balances for the connected address
      const chain = chainId ? chainId.toString() : '1'; // Default to Ethereum mainnet
      
      // For native token (ETH), we use the balance from WalletContext
      const nativeToken = { 
        name: "Ethereum", 
        symbol: "ETH", 
        balance: balance, 
        value: (parseFloat(balance) * 2500).toLocaleString() // Mocked price for demo
      };
      
      // Fetch ERC20 tokens
      // In a production app, call an API like Moralis or Alchemy for a complete list
      // For now, we'll just use the native token
      const tokens: TokenData[] = [nativeToken];
      
      setWalletTokens(tokens);
      toast.success("Portfolio data loaded");
    } catch (error) {
      console.error("Error fetching token data:", error);
      toast.error("Failed to fetch token data");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch token data when wallet connects
  useEffect(() => {
    if (isConnected) {
      fetchTokenData();
    } else {
      setWalletTokens([]);
    }
  }, [isConnected, address, balance]);
  
  return (
    <MainLayout>
      <div className="safe-container py-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-6">Portfolio Dashboard</h1>
          
          {isConnected ? (
            <>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="mb-4 md:mb-0">
                  <p className="text-sm text-slate-500 mb-1">Connected Wallet {chainId && `(Chain ID: ${chainId})`}</p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center mr-2">
                      <Wallet className="h-4 w-4 text-slate-600" />
                    </div>
                    <p className="font-mono text-slate-800">
                      {address && `${address.substring(0, 6)}...${address.substring(address.length - 4)}`}
                    </p>
                  </div>
                </div>
                
                <Link to="/report">
                  <Button className="w-full md:w-auto gradient-bg-secondary">
                    <FileSearch className="h-4 w-4 mr-2" />
                    Analyze Portfolio Risk
                  </Button>
                </Link>
              </div>
              
              <div className="mb-4">
                <h2 className="text-xl font-medium text-slate-800 mb-4">Your Tokens</h2>
                {isLoading && (
                  <div className="text-center py-6 text-slate-500">
                    Loading portfolio data...
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                {!isLoading && walletTokens.length > 0 ? (
                  walletTokens.map((token) => (
                    <TokenCard
                      key={token.symbol}
                      name={token.name}
                      symbol={token.symbol}
                      balance={token.balance}
                      value={token.value}
                      logoUrl={token.logoUrl}
                      onClick={() => {}}
                    />
                  ))
                ) : !isLoading && (
                  <div className="text-center py-6 text-slate-500">
                    No tokens found in your wallet
                  </div>
                )}
              </div>
              
              <div className="mt-8 flex flex-col md:flex-row gap-4">
                <Link to="/report" className="flex-1">
                  <Button className="w-full gradient-bg-secondary">
                    Generate Risk Report
                  </Button>
                </Link>
                <Link to="/compare" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Compare Tokens
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <Wallet className="h-8 w-8 text-slate-400" />
              </div>
              <h2 className="text-xl font-medium text-slate-800 mb-2">Connect Your Wallet</h2>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                Connect your cryptocurrency wallet to view your portfolio and analyze risks.
              </p>
              <Button onClick={connectWallet} className="gradient-bg-secondary">
                <Wallet className="h-4 w-4 mr-2" />
                Connect Wallet
              </Button>
            </div>
          )}
        </div>
        
        <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-sage-100 rounded-full text-sage-600">
              <CircleArrowRight className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-slate-800">Looking to compare specific tokens?</h3>
              <p className="text-slate-600 mb-3">
                Use our comparison tool to evaluate risk factors between any two tokens.
              </p>
              <Link to="/compare">
                <Button variant="outline" size="sm">
                  Open Comparison Tool
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Support Bot Component */}
      <SupportBot />
    </MainLayout>
  );
};

export default Dashboard;
