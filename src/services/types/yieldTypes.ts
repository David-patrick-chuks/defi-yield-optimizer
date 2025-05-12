
export interface YieldPool {
  protocol: string;
  name: string;
  tokens: string[];
  apy: number;
  tvl: number;
  address: string;
  risk: 'low' | 'moderate' | 'high';
  lastUpdated?: Date;
}

export interface Position {
  protocol: string;
  pool: string;
  invested: number;
  currentValue: number;
  apy: number;
  tokens: string[];
  risk: 'low' | 'moderate' | 'high';
}
