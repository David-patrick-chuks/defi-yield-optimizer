
import type { AppKitNetwork } from '@reown/appkit/networks';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';

export const projectId = "b416daa29430acf394a8a82ba73e007f";

export const metadata = {
  name: 'SafeSage',
  description: 'SafeSage – Your AI Guide for DeFi Risk',
  url: 'http://localhost:8080',
  icons: ['https://avatars.githubusercontent.com/u/179229932']
};

// Define networks with the correct structure
export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [
  {
    id: 1,
    name: 'Ethereum',
    rpcUrls: {
      default: {
        http: ['https://eth-mainnet.public.blastapi.io']
      }
    }
  },
  {
    id: 42161,
    name: 'Arbitrum',
    rpcUrls: {
      default: {
        http: ['https://arb1.arbitrum.io/rpc']
      }
    }
  },
  {
    id: 11155111,
    name: 'Sepolia',
    rpcUrls: {
      default: {
        http: ['https://rpc.sepolia.org']
      }
    }
  }
] as [AppKitNetwork, ...AppKitNetwork[]];

export const ethersAdapter = new EthersAdapter();
