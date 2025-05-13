
import { ethers } from "ethers";

// Re-export constants
export { PROTOCOLS, TOKENS, getTokenMockPrices } from './constants/defiConstants';

// Re-export types
export type { YieldPool } from './types/yieldTypes';

// Re-export protocol data functions
export { fetchYieldOptions, fetchProtocolTVL } from './data/protocolData';

// Re-export token operation functions
export { 
  getTokenBalances, 
  swapTokens, 
  calculateEstimatedYield 
} from './operations/tokenOperations';

// Re-export protocol operation functions
export {
  stakeIntoProtocol,
  unstakeFromProtocol,
  depositIntoProtocol,
  withdrawFromProtocol
} from './operations/protocolOperations';
