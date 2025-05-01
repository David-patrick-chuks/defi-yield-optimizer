
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Menu, X } from 'lucide-react';

const Navbar = ({ isConnected = false }: { isConnected?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  
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
            
            {isConnected ? (
              <Button className="bg-sage-500 hover:bg-sage-600" size="sm">Connected</Button>
            ) : (
              <Button className="gradient-bg-secondary" size="sm">Connect Wallet</Button>
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
              {isConnected ? (
                <Button className="w-full bg-sage-500 hover:bg-sage-600" size="sm">Connected</Button>
              ) : (
                <Button className="w-full gradient-bg-secondary" size="sm">Connect Wallet</Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
