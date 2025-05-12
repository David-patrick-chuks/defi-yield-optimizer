
import { Position } from '../types/yieldTypes';

export const MOCK_USER_POSITIONS: Position[] = [
  {
    protocol: "Aerodrome",
    pool: "USDC-WETH LP",
    invested: 5000,
    currentValue: 5235.75,
    apy: 8.45,
    tokens: ["USDC", "WETH"],
    risk: 'low',
  },
  {
    protocol: "Moonwell",
    pool: "USDC Lending",
    invested: 3000,
    currentValue: 3058.25,
    apy: 3.87,
    tokens: ["USDC"],
    risk: 'low',
  }
];
