
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Menu, X, Wallet } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { 
    isConnected, 
    connectWallet, 
    connectMetaMask,
    disconnectWallet, 
    address, 
    isConnecting,
    isMetaMaskInstalled
  } = useWallet();
  const isMobile = useIsMobile();
  
  const handleWalletAction = () => {
    if (isConnected) {
      disconnectWallet();
    } else {
      setShowDialog(true);
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
              <Shield className="h-8 w-8 text-sage-600" />
              <span className="ml-2 text-xl font-semibold text-slate-800">SafeSage</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="text-slate-600 hover:text-slate-900">Dashboard</Link>
            <Link to="/report" className="text-slate-600 hover:text-slate-900">Reports</Link>
            <Link to="/compare" className="text-slate-600 hover:text-slate-900">Compare</Link>
            <Link to="/about" className="text-slate-600 hover:text-slate-900">About</Link>
            
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
              <DialogTrigger asChild>
                <Button 
                  className={isConnected ? "bg-sage-500 hover:bg-sage-600" : "gradient-bg-secondary"} 
                  size="sm"
                  onClick={handleWalletAction}
                  disabled={isConnecting}
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  {isConnecting ? "Connecting..." : 
                   isConnected ? formatAddress(address || '') : "Connect Wallet"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Connect Wallet</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Button 
                    onClick={() => {
                      connectWallet();
                      setShowDialog(false);
                    }}
                    className="w-full gradient-bg-secondary"
                  >
                    <Wallet className="h-4 w-4 mr-2" />
                    Choose from available wallets
                  </Button>
                  
                  <Button 
                    onClick={() => {
                      connectMetaMask();
                      setShowDialog(false);
                    }}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    disabled={!isMetaMaskInstalled}
                  >
                    Connect MetaMask directly
                  </Button>
                  
                  {!isMetaMaskInstalled && (
                    <p className="text-sm text-slate-500 text-center">
                      MetaMask not detected. Please install it first.
                    </p>
                  )}
                </div>
              </DialogContent>
            </Dialog>
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
              to="/report" 
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100"
              onClick={() => setIsOpen(false)}
            >
              Reports
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
              <Button 
                className={`w-full ${isConnected ? "bg-sage-500 hover:bg-sage-600" : "gradient-bg-secondary"}`} 
                size="sm"
                onClick={() => {
                  if (isConnected) {
                    disconnectWallet();
                  } else {
                    connectMetaMask();  // Direct MetaMask connection for mobile
                  }
                  setIsOpen(false);
                }}
                disabled={isConnecting || (!isConnected && !isMetaMaskInstalled)}
              >
                <Wallet className="h-4 w-4 mr-2" />
                {isConnecting ? "Connecting..." : 
                 isConnected ? formatAddress(address || '') : "Connect MetaMask"}
              </Button>
              
              {!isMetaMaskInstalled && !isConnected && (
                <p className="text-xs text-slate-500 text-center mt-2">
                  MetaMask not detected
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
