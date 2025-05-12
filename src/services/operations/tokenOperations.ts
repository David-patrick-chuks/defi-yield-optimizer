
import { ethers } from "ethers";
import { toast } from "@/components/ui/sonner";
import { TOKENS } from "../constants/defiConstants";
import { ERC20_ABI } from "../constants/defiConstants";

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

// Automated smart contract interaction function for token swaps
export const swapTokens = async (
  provider: ethers.BrowserProvider,
  tokenFromAddress: string,
  tokenToAddress: string,
  amount: string
): Promise<boolean> => {
  try {
    const signer = await provider.getSigner();
    console.log(`Swapping ${amount} from ${tokenFromAddress} to ${tokenToAddress}...`);
    
    // In a real implementation, this would interact with a DEX router contract
    // For now, we'll simulate a successful swap with a timeout
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Token swap successful!");
    return true;
  } catch (error) {
    console.error("Error swapping tokens:", error);
    toast.error("Failed to swap tokens");
    return false;
  }
};

// Calculate estimated yield for a given amount and APY
export const calculateEstimatedYield = (amount: number, apy: number): number => {
  // Daily yield (compound interest not considered in this simple calculation)
  const dailyYield = (amount * apy) / 100 / 365;
  return dailyYield;
};
