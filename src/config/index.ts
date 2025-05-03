
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
// The AppKitNetwork type is likely exported from a different location
// Let's use 'any' type as a temporary workaround until we find the correct import
// This will allow the code to compile while maintaining functionality

export const projectId = "b416daa29430acf394a8a82ba73e007f";

export const metadata = {
  name: 'SafeSage',
  description: 'SafeSage – Your AI Guide for DeFi Risk',
  url: 'https://safesage-main.vercel.app',
  icons: ['https://avatars.githubusercontent.com/u/179229932']
};

// Define networks with the correct structure
export const networks: [any, ...any[]] = [
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
  },
  {
    id: 148,
    name: 'ShimmerEVM',
    rpcUrls: {
      default: {
        http: ['https://json-rpc.evm.testnet.shimmer.network']
      }
    },
    nativeCurrency: {
      name: 'SMR',
      symbol: 'SMR',
      decimals: 18
    }
  },
  {
    id: 137,
    name: 'Polygon',
    rpcUrls: {
      default: {
        http: ['https://polygon-rpc.com']
      }
    },
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    }
  },
  {
    id: 8453,
    name: 'Base',
    rpcUrls: {
      default: {
        http: ['https://mainnet.base.org']
      }
    },
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    }
  },
  {
    id: 10,
    name: 'Optimism',
    rpcUrls: {
      default: {
        http: ['https://mainnet.optimism.io']
      }
    },
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    }
  }
] as [any, ...any[]];

export const ethersAdapter = new EthersAdapter();
