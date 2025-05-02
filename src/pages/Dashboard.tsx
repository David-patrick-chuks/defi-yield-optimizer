
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
  priceChange24h?: string;
  riskScore?: number;
}

// Complete list of supported tokens
const SUPPORTED_TOKENS = [
  { name: "Ethereum", symbol: "ETH", coingeckoId: "ethereum" },
  { name: "Bitcoin", symbol: "BTC", coingeckoId: "bitcoin" },
  { name: "MoveVM", symbol: "MOVE", coingeckoId: "move-vm" },
  { name: "IOTA", symbol: "MIOTA", coingeckoId: "iota" },
  { name: "Solana", symbol: "SOL", coingeckoId: "solana" },
  { name: "Cardano", symbol: "ADA", coingeckoId: "cardano" },
  { name: "Polkadot", symbol: "DOT", coingeckoId: "polkadot" },
  { name: "Chainlink", symbol: "LINK", coingeckoId: "chainlink" },
  { name: "Uniswap", symbol: "UNI", coingeckoId: "uniswap" },
  { name: "Avalanche", symbol: "AVAX", coingeckoId: "avalanche-2" },
  { name: "Polygon", symbol: "MATIC", coingeckoId: "matic-network" },
  { name: "Near Protocol", symbol: "NEAR", coingeckoId: "near" },
  { name: "Cosmos", symbol: "ATOM", coingeckoId: "cosmos" },
  { name: "Algorand", symbol: "ALGO", coingeckoId: "algorand" },
  { name: "Filecoin", symbol: "FIL", coingeckoId: "filecoin" },
  { name: "Tezos", symbol: "XTZ", coingeckoId: "tezos" }
];

const Dashboard = () => {
  const { isConnected, address, connectWallet, connectMetaMask, connectWalletConnect, connectCoinbaseWallet, balance, chainId } = useWallet();
  const [walletTokens, setWalletTokens] = useState<TokenData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Function to fetch real token data
  const fetchTokenData = async () => {
    if (!isConnected || !address) return;
    
    setIsLoading(true);
    try {
      // For native token (ETH), we use the balance from WalletContext
      const nativeToken: TokenData = { 
        name: "Ethereum", 
        symbol: "ETH", 
        balance: balance, 
        value: "0",
        priceChange24h: "0",
        riskScore: 2.5
      };

      // Get current market data from CoinGecko
      const ids = SUPPORTED_TOKENS.map(token => token.coingeckoId).join(',');
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`);
      
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      
      const marketData = await response.json();
      
      if (!Array.isArray(marketData)) {
        throw new Error('Invalid market data format');
      }
      
      console.log("Fetched market data:", marketData.length, "tokens");
      
      // Calculate ETH USD value using real market data
      const ethMarketData = marketData.find((coin: any) => coin.symbol.toLowerCase() === 'eth');
      if (ethMarketData) {
        const ethPrice = ethMarketData.current_price;
        nativeToken.value = (parseFloat(balance) * ethPrice).toLocaleString();
        nativeToken.priceChange24h = ethMarketData.price_change_percentage_24h?.toFixed(2);
        nativeToken.logoUrl = ethMarketData.image;
      }
      
      // Create tokens array starting with native token
      const tokens: TokenData[] = [nativeToken];
      
      // Generate consistent pseudo-random balances based on wallet address
      const getRandomBalance = (symbol: string) => {
        // Using a hash of address + symbol to generate consistent "random" balance
        let hash = 0;
        const str = `${address}-${symbol}`;
        for (let i = 0; i < str.length; i++) {
          hash = ((hash << 5) - hash) + str.charCodeAt(i);
          hash |= 0;
        }
        // Generate value between 0.05 and 15
        return Math.abs((hash % 1495 + 5) / 100).toFixed(4);
      };
      
      // Add other supported tokens with real market data
      for (const supportedToken of SUPPORTED_TOKENS) {
        // Skip ETH as it's already handled
        if (supportedToken.symbol === 'ETH') continue;
        
        const tokenMarketData = marketData.find((coin: any) => 
          coin.symbol.toLowerCase() === supportedToken.symbol.toLowerCase() ||
          coin.id === supportedToken.coingeckoId
        );
        
        if (tokenMarketData) {
          const simulatedBalance = getRandomBalance(supportedToken.symbol);
          tokens.push({
            name: supportedToken.name,
            symbol: supportedToken.symbol,
            balance: simulatedBalance,
            value: (parseFloat(simulatedBalance) * tokenMarketData.current_price).toLocaleString(),
            logoUrl: tokenMarketData.image,
            priceChange24h: tokenMarketData.price_change_percentage_24h?.toFixed(2),
            riskScore: parseFloat((Math.random() * 8 + 1).toFixed(1)) // Random risk score between 1 and 9
          });
        }
      }
      
      setWalletTokens(tokens);
      toast.success("Portfolio data loaded");
    } catch (error) {
      console.error("Error fetching token data:", error);
      toast.error("Failed to fetch real-time token data. Using fallback data.");
      
      // Fallback to static data if API call fails
      const fallbackTokens: TokenData[] = [
        { name: "Ethereum", symbol: "ETH", balance: balance, value: (parseFloat(balance) * 3500).toLocaleString(), riskScore: 2.5 },
        { name: "Bitcoin", symbol: "BTC", balance: "0.0123", value: (0.0123 * 65000).toLocaleString(), riskScore: 2.1 },
        { name: "MoveVM", symbol: "MOVE", balance: "1250", value: (1250 * 0.85).toLocaleString(), riskScore: 5.8 },
        { name: "IOTA", symbol: "MIOTA", balance: "500", value: (500 * 0.42).toLocaleString(), riskScore: 4.2 },
        { name: "Solana", symbol: "SOL", balance: "8.5", value: (8.5 * 110).toLocaleString(), riskScore: 3.8 },
        { name: "Cardano", symbol: "ADA", balance: "2500", value: (2500 * 0.45).toLocaleString(), riskScore: 3.5 },
        { name: "Polkadot", symbol: "DOT", balance: "75", value: (75 * 6).toLocaleString(), riskScore: 4.0 }
      ];
      setWalletTokens(fallbackTokens);
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
                      priceChange24h={token.priceChange24h}
                      riskScore={token.riskScore}
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
              
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button onClick={connectWallet} className="gradient-bg-secondary">
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
                </Button>
                
                <Button onClick={connectMetaMask} variant="outline">
                  MetaMask
                </Button>
                
                <Button onClick={connectWalletConnect} variant="outline">
                  WalletConnect
                </Button>
                
                <Button onClick={connectCoinbaseWallet} variant="outline">
                  Coinbase Wallet
                </Button>
              </div>
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
