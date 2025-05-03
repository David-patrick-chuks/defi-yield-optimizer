
import type { AppKitNetwork } from '@reown/appkit';
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
    },
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    }
  },
  {
    id: 42161,
    name: 'Arbitrum',
    rpcUrls: {
      default: {
        http: ['https://arb1.arbitrum.io/rpc']
      }
    },
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    }
  },
  {
    id: 11155111,
    name: 'Sepolia',
    rpcUrls: {
      default: {
        http: ['https://rpc.sepolia.org']
      }
    },
    nativeCurrency: {
      name: 'Sepolia Ether',
      symbol: 'ETH',
      decimals: 18
    }
  }
] as [AppKitNetwork, ...AppKitNetwork[]];

export const ethersAdapter = new EthersAdapter();
