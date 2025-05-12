
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Menu, X, Wallet, LogOut, Bot, Coins, TrendingUp } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    isConnected, 
    connectWallet, 
    disconnectWallet, 
    address, 
    isConnecting,
  } = useWallet();
  const isMobile = useIsMobile();
  
  const handleWalletConnect = () => {
    if (!isConnected) {
      connectWallet();
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };
  
  return (
    <nav className="py-4 border-b border-slate-200 bg-white/70 backdrop-blur-md sticky top-0 z-50">
      <div className="safe-container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center">
              <Bot className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-slate-800">DeFi Yield Optimizer</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="text-slate-600 hover:text-slate-900">Dashboard</Link>
            <Link to="/strategies" className="text-slate-600 hover:text-slate-900">Strategies</Link>
            <Link to="/compare" className="text-slate-600 hover:text-slate-900">Compare</Link>
            <Link to="/about" className="text-slate-600 hover:text-slate-900">About</Link>
            
            {isConnected ? (
              <div className="flex items-center gap-2">
                <Button 
                  className="bg-blue-500 hover:bg-blue-600" 
                  size="sm"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  {formatAddress(address || '')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={disconnectWallet}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button 
                className="gradient-bg-secondary" 
                size="sm"
                onClick={handleWalletConnect}
                disabled={isConnecting}
              >
                <Wallet className="h-4 w-4 mr-2" />
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-3">
            <Link 
              to="/dashboard" 
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/strategies" 
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100"
              onClick={() => setIsOpen(false)}
            >
              Strategies
            </Link>
            <Link 
              to="/compare" 
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100"
              onClick={() => setIsOpen(false)}
            >
              Compare
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            
            <div className="pt-2 px-3">
              {isConnected ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between bg-blue-50 p-2 rounded-md">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-mono">{formatAddress(address || '')}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        disconnectWallet();
                        setIsOpen(false);
                      }}
                      className="text-red-600 hover:bg-red-50 p-1 h-auto"
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <Button 
                  className="w-full gradient-bg-secondary" 
                  size="sm"
                  onClick={() => {
                    handleWalletConnect();
                    setIsOpen(false);
                  }}
                  disabled={isConnecting}
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  {isConnecting ? "Connecting..." : "Connect Wallet"}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
