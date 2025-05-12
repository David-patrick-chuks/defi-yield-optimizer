
import { ethers } from "ethers";
import { toast } from "@/components/ui/sonner";
import { ERC20_ABI, YIELD_PROTOCOL_ABI } from "../constants/defiConstants";

// Automated smart contract interaction function for staking
export const stakeIntoProtocol = async (
  provider: ethers.BrowserProvider,
  poolAddress: string,
  tokenAddress: string,
  amount: string
): Promise<boolean> => {
  return depositIntoProtocol(provider, poolAddress, tokenAddress, amount);
};

// Automated smart contract interaction function for unstaking
export const unstakeFromProtocol = async (
  provider: ethers.BrowserProvider,
  poolAddress: string,
  shares: string
): Promise<boolean> => {
  return withdrawFromProtocol(provider, poolAddress, shares);
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
