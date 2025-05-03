
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "./context/WalletContext";

import { createAppKit } from "@reown/appkit";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Report from "./pages/Report";
import Compare from "./pages/Compare";
import About from "./pages/About";
import Disclaimer from "./pages/Disclaimer";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

// 🆔 Reown Project ID
const projectId = 'b416daa29430acf394a8a82ba73e007f';

// Set metadata for appkit
const metadata = {
  name: 'SafeSage',
  description: 'Your AI Guide for DeFi Risk',
  url: 'https://safesage.com',
  icons: ['https://safesage.com/icon.png']
};

// Initialize Reown AppKit with chain configurations
const modal = createAppKit({
  projectId,
  // Define networks directly without using wagmi/chains imports
  networks: [
    {
      id: 1, // Ethereum Mainnet
      name: 'Ethereum',
      rpcUrl: 'https://eth-mainnet.public.blastapi.io'
    },
    {
      id: 42161, // Arbitrum
      name: 'Arbitrum',
      rpcUrl: 'https://arb1.arbitrum.io/rpc'
    }
  ],
  metadata,
  features: {
    email: true,
    socials: [
      "google",
      "x",
      "github",
      "discord",
      "apple",
      "facebook",
      "farcaster",
    ],
    emailShowWallets: true,
  },
  allWallets: "SHOW",
  themeVariables: {
    "--w3m-accent": "#5E9C76",
  },
});

// Store AppKit instance globally
if (typeof window !== "undefined") {
  (window as any).reownAppKit = modal;
}

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <WalletProvider appKit={modal}>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/report" element={<Report />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/about" element={<About />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </WalletProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
