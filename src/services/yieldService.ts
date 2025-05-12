
import { ethers } from "ethers";
import { toast } from "@/components/ui/sonner";

// Basic ABI for ERC20 interactions
const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function transfer(address to, uint amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)"
];

// Basic ABI for yield protocol interactions
const YIELD_PROTOCOL_ABI = [
  "function deposit(uint256 _amount) returns (uint256)",
  "function withdraw(uint256 _shares) returns (uint256)",
  "function balanceOf(address account) view returns (uint256)",
  "function getPricePerShare() view returns (uint256)",
  "function totalAssets() view returns (uint256)",
  "function totalSupply() view returns (uint256)"
];

// Protocol addresses on Base
const PROTOCOLS = {
  aerodrome: {
    name: "Aerodrome",
    logo: "/aerodrome.png",
    pools: {
      "USDC-WETH": {
        address: "0x4C36388bE6F416A29C8d8Eee81C771cE6bE14B18",
        tokens: ["USDC", "WETH"]
      }
    },
    router: "0xcF77a3Ba9A5CA399B7c97c74d54e5b1Beb874E43"
  },
  baseswap: {
    name: "BaseSwap",
    logo: "/baseswap.png",
    pools: {
      "USDC-DAI": {
        address: "0x6E8FE5A9B9FBD23C19E4B3E5A06FAA3B626466BC",
        tokens: ["USDC", "DAI"]
      }
    },
    router: "0xFDf5Ed2D354e05cF9040120d5079F0d3058B7143"
  },
  // Add more protocols as needed
};

// Token addresses on Base
const TOKENS = {
  USDC: {
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    decimals: 6
  },
  DAI: {
    address: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
    decimals: 18
  },
  WETH: {
    address: "0x4200000000000000000000000000000000000006",
    decimals: 18
  }
};

export interface YieldPool {
  protocol: string;
  name: string;
  tokens: string[];
  apy: number;
  tvl: number;
  address: string;
  risk: 'low' | 'moderate' | 'high';
}

// Fetch available yield options
export const fetchYieldOptions = async (
  provider: ethers.BrowserProvider
): Promise<YieldPool[]> => {
  try {
    console.log("Fetching yield options...");
    
    // In a real implementation, this would fetch on-chain data
    // For now, returning mock data
    const mockYieldPools: YieldPool[] = [
      {
        protocol: "Aerodrome",
        name: "USDC-WETH LP",
        tokens: ["USDC", "WETH"],
        apy: 8.45,
        tvl: 4500000,
        address: PROTOCOLS.aerodrome.pools["USDC-WETH"].address,
        risk: 'low'
      },
      {
        protocol: "BaseSwap",
        name: "USDC-DAI LP",
        tokens: ["USDC", "DAI"],
        apy: 5.23,
        tvl: 2800000,
        address: PROTOCOLS.baseswap.pools["USDC-DAI"].address,
        risk: 'low'
      },
      {
        protocol: "Moonwell",
        name: "USDC Lending",
        tokens: ["USDC"],
        apy: 3.87,
        tvl: 12500000,
        address: "0x2270aE7Fd53302be96BE9e579C4F94108B5a8258",
        risk: 'low'
      },
      {
        protocol: "Curve",
        name: "Tricrypto LP",
        tokens: ["USDC", "WETH", "WBTC"],
        apy: 9.62,
        tvl: 8700000,
        address: "0x0df5Ec1E12783488777b3167e84E3334F76a3Cba",
        risk: 'moderate'
      },
      {
        protocol: "Degen Protocol",
        name: "USDC-DEGEN LP",
        tokens: ["USDC", "DEGEN"],
        apy: 32.45,
        tvl: 950000,
        address: "0x9A315BdF513367C0377FB36545857d12e85813Ef",
        risk: 'high'
      }
    ];
    
    return mockYieldPools;
  } catch (error) {
    console.error("Error fetching yield options:", error);
    toast.error("Failed to fetch yield options");
    return [];
  }
};

// Calculate estimated yield for a given amount and APY
export const calculateEstimatedYield = (amount: number, apy: number): number => {
  // Daily yield (compound interest not considered in this simple calculation)
  const dailyYield = (amount * apy) / 100 / 365;
  return dailyYield;
};

// Deposit into a yield protocol
export const depositIntoProtocol = async (
  provider: ethers.BrowserProvider,
  poolAddress: string,
  tokenAddress: string,
  amount: string
): Promise<boolean> => {
  try {
    const signer = await provider.getSigner();
    
    // Create token contract instance
    const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
    
    // Create protocol contract instance
    const protocolContract = new ethers.Contract(poolAddress, YIELD_PROTOCOL_ABI, signer);
    
    // Approve token transfer
    console.log(`Approving ${amount} tokens...`);
    const approveTx = await tokenContract.approve(poolAddress, amount);
    await approveTx.wait();
    
    // Deposit tokens
    console.log(`Depositing ${amount} tokens...`);
    const depositTx = await protocolContract.deposit(amount);
    await depositTx.wait();
    
    toast.success("Deposit successful!");
    return true;
  } catch (error) {
    console.error("Error depositing into protocol:", error);
    toast.error("Failed to deposit");
    return false;
  }
};

// Withdraw from a yield protocol
export const withdrawFromProtocol = async (
  provider: ethers.BrowserProvider,
  poolAddress: string,
  shares: string
): Promise<boolean> => {
  try {
    const signer = await provider.getSigner();
    
    // Create protocol contract instance
    const protocolContract = new ethers.Contract(poolAddress, YIELD_PROTOCOL_ABI, signer);
    
    // Withdraw tokens
    console.log(`Withdrawing ${shares} shares...`);
    const withdrawTx = await protocolContract.withdraw(shares);
    await withdrawTx.wait();
    
    toast.success("Withdrawal successful!");
    return true;
  } catch (error) {
    console.error("Error withdrawing from protocol:", error);
    toast.error("Failed to withdraw");
    return false;
  }
};

export const getTokenBalances = async (
  provider: ethers.BrowserProvider,
  address: string
): Promise<{ [key: string]: string }> => {
  try {
    // Get token balances for the connected wallet
    const balances: { [key: string]: string } = {};
    
    for (const [symbol, token] of Object.entries(TOKENS)) {
      const tokenContract = new ethers.Contract(token.address, ERC20_ABI, provider);
      const balance = await tokenContract.balanceOf(address);
      
      // Format the balance based on token decimals
      balances[symbol] = ethers.formatUnits(balance, token.decimals);
    }
    
    return balances;
  } catch (error) {
    console.error("Error getting token balances:", error);
    return {};
  }
};

export const MOCK_USER_POSITIONS = [
  {
    protocol: "Aerodrome",
    pool: "USDC-WETH LP",
    invested: 5000,
    currentValue: 5235.75,
    apy: 8.45,
    tokens: ["USDC", "WETH"],
    risk: 'low' as const,
  },
  {
    protocol: "Moonwell",
    pool: "USDC Lending",
    invested: 3000,
    currentValue: 3058.25,
    apy: 3.87,
    tokens: ["USDC"],
    risk: 'low' as const,
  }
];

export const getTokenMockPrices = () => {
  return {
    USDC: 1.00,
    DAI: 0.999,
    WETH: 3425.76,
    WBTC: 102872.45
  };
};

export { PROTOCOLS, TOKENS };
