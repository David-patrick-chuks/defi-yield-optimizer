
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "./context/WalletContext";

import { createAppKit } from "@reown/appkit";
import { projectId, metadata, networks, ethersAdapter } from './config/index';

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Report from "./pages/Report";
import Compare from "./pages/Compare";
import About from "./pages/About";
import Disclaimer from "./pages/Disclaimer";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

// Initialize Reown AppKit
const appKit = createAppKit({
  projectId,
  networks,
  metadata,
  adapters: [ethersAdapter],
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
  (window as any).reownAppKit = appKit;
}

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <WalletProvider appKit={appKit}>
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
