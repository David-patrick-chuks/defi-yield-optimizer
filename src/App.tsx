
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "./context/WalletContext";

import { createAppKit } from "@reown/appkit";
import { createConfig, configureChains, WagmiConfig } from "wagmi";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";
import { mainnet, polygon, arbitrum, optimism } from "wagmi/chains";

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
const projectId = "b416daa29430acf394a8a82ba73e007f";

// ✅ Wagmi + Chains Setup
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, arbitrum, optimism],
  [publicProvider()]
);

// Debugging: Log the chains and clients
console.log("Configured Chains:", chains);
console.log("Public Client:", publicClient);
console.log("WebSocket Public Client:", webSocketPublicClient);

const connectors = [
  new WalletConnectConnector({
    chains,
    options: {
      projectId,
      showQrModal: true,
    },
  }),
];

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

// ✅ Initialize Reown AppKit and store in window
const appKitInstance = createAppKit({
  projectId,
  networks: [
    {
      id: mainnet.id,
      name: mainnet.name,
      nativeCurrency: mainnet.nativeCurrency,
      rpcUrls: mainnet.rpcUrls,
    },
    {
      id: polygon.id,
      name: polygon.name,
      nativeCurrency: polygon.nativeCurrency,
      rpcUrls: polygon.rpcUrls,
    },
    {
      id: arbitrum.id,
      name: arbitrum.name,
      nativeCurrency: arbitrum.nativeCurrency,
      rpcUrls: arbitrum.rpcUrls,
    },
    {
      id: optimism.id,
      name: optimism.name,
      nativeCurrency: optimism.nativeCurrency,
      rpcUrls: optimism.rpcUrls,
    },
  ],
  themeVariables: {
    "--w3m-accent": "#5E9C76",
  },
});

// Debugging: Log the AppKit instance
console.log("AppKit Instance:", appKitInstance);

// ✅ Store AppKit instance globally
if (typeof window !== "undefined") {
  (window as any).reownAppKit = appKitInstance;
}

const queryClient = new QueryClient();

const App = () => {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <WalletProvider>
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
    </WagmiConfig>
  );
};

export default App;
