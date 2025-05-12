
import { Link } from 'react-router-dom';
import { Shield, Twitter, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12">
      <div className="safe-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <Shield className="h-6 w-6 text-blue-600" />
              <span className="ml-2 text-lg font-semibold text-slate-800">DeFi Yield Optimizer</span>
            </Link>
            <p className="text-slate-500 text-sm max-w-xs">
              AI-powered platform that helps users maximize yield farming returns on Base network protocols.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://x.com/defiyieldopt" className="text-slate-400 hover:text-slate-600">
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-600">
                <Github size={18} />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-slate-900 mb-4">Pages</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-500 hover:text-slate-700 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-slate-500 hover:text-slate-700 text-sm">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/strategies" className="text-slate-500 hover:text-slate-700 text-sm">
                  Yield Strategies
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-slate-500 hover:text-slate-700 text-sm">
                  Compare Yields
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-500 hover:text-slate-700 text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-slate-500 hover:text-slate-700 text-sm">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-slate-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/disclaimer" className="text-slate-500 hover:text-slate-700 text-sm">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-500 hover:text-slate-700 text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-500 hover:text-slate-700 text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-slate-200">
          <p className="text-slate-500 text-sm text-center">
            &copy; {new Date().getFullYear()} DeFi Yield Optimizer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
