
// Protocol addresses on Base
export const PROTOCOLS = {
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
export const TOKENS = {
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

// Basic ABI for ERC20 interactions
export const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function transfer(address to, uint amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)"
];

// Basic ABI for yield protocol interactions
export const YIELD_PROTOCOL_ABI = [
  "function deposit(uint256 _amount) returns (uint256)",
  "function withdraw(uint256 _shares) returns (uint256)",
  "function balanceOf(address account) view returns (uint256)",
  "function getPricePerShare() view returns (uint256)",
  "function totalAssets() view returns (uint256)",
  "function totalSupply() view returns (uint256)"
];

export const getTokenMockPrices = () => {
  return {
    USDC: 1.00,
    DAI: 0.999,
    WETH: 3425.76,
    WBTC: 102872.45
  };
};
