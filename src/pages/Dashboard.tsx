import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { useYield } from '@/context/YieldContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import YieldCard from '@/components/yield/YieldCard';
import PositionCard from '@/components/yield/PositionCard';
import LoadingAI from '@/components/ui/LoadingAI';
import { Wallet, TrendingUp, Coins, Bot } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isConnected, address, balance } = useWallet();
  const { 
    availableYields, 
    userPositions, 
    tokenBalances,
    isLoadingYields,
    isLoadingPositions, 
  } = useYield();
  
  const [selectedTab, setSelectedTab] = useState('positions');

  // Calculate total portfolio value
  const totalPortfolioValue = userPositions.reduce((sum, pos) => sum + pos.currentValue, 0);
  
  // Calculate total APY (weighted average)
  const weightedApy = userPositions.reduce((sum, pos) => {
    return sum + (pos.apy * (pos.currentValue / totalPortfolioValue));
  }, 0);

  // Calculate total profit/loss
  const totalInvested = userPositions.reduce((sum, pos) => sum + pos.invested, 0);
  const totalProfit = totalPortfolioValue - totalInvested;
  const profitPercentage = totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;

  const handleGenerateStrategy = () => {
    navigate('/strategies');
  };

  const handleDepositClick = (poolId: string) => {
    console.log(`Deposit into pool: ${poolId}`);
    // This would typically open a deposit modal
  };

  const handleWithdrawClick = (poolId: string) => {
    console.log(`Withdraw from pool: ${poolId}`);
    // This would typically open a withdraw modal
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Yield Dashboard</h1>
          <p className="text-slate-600">
            Optimize your stablecoin yields and manage your DeFi portfolio on Base chain.
          </p>
        </div>

        {!isConnected ? (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
            <Wallet size={48} className="mx-auto mb-4 text-sage-500" />
            <h2 className="text-xl font-semibold mb-2">Connect Your Wallet</h2>
            <p className="text-slate-600 mb-4">
              Please connect your wallet to view your yield portfolio and optimize returns.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Portfolio Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-slate-900">${totalPortfolioValue.toFixed(2)}</p>
                  <div className={`flex items-center mt-1 ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    <TrendingUp size={16} className="mr-1" />
                    <span className="text-sm">
                      {totalProfit >= 0 ? '+' : '-'}${Math.abs(totalProfit).toFixed(2)} ({Math.abs(profitPercentage).toFixed(2)}%)
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Average APY</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-sage-500">{weightedApy.toFixed(2)}%</p>
                  <p className="text-sm text-slate-500 mt-1">Weighted across all positions</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Wallet Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-slate-900">{parseFloat(balance).toFixed(4)} ETH</p>
                  <p className="text-sm text-slate-500 mt-1 truncate">{address}</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Stablecoin Balances</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(tokenBalances).map(([symbol, amount]) => (
                  <Card key={symbol}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Coins className="mr-2 text-sage-500" size={20} />
                          <span className="font-medium">{symbol}</span>
                        </div>
                        <span className="font-semibold">{parseFloat(amount).toFixed(2)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">AI Strategy</h2>
                <Button 
                  onClick={handleGenerateStrategy}
                  className="flex items-center gap-2"
                >
                  <Bot size={18} />
                  Generate Strategy
                </Button>
              </div>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-shrink-0">
                      <div className="h-16 w-16 bg-sage-100 rounded-full flex items-center justify-center">
                        <Bot size={32} className="text-sage-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Optimize Your Yield</h3>
                      <p className="text-slate-600 mb-4">
                        Let our AI agent analyze your portfolio and generate optimized yield strategies to maximize your returns while respecting your risk preferences.
                      </p>
                      <Button onClick={handleGenerateStrategy}>
                        View AI Strategies
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Tabs defaultValue="positions" value={selectedTab} onValueChange={setSelectedTab}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold">Your Portfolio</h2>
                  <TabsList>
                    <TabsTrigger value="positions">Your Positions</TabsTrigger>
                    <TabsTrigger value="opportunities">Yield Opportunities</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="positions">
                  {isLoadingPositions ? (
                    <div className="py-12">
                      <LoadingAI text="Loading your positions" size="small" />
                    </div>
                  ) : userPositions.length === 0 ? (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <h3 className="text-xl font-medium mb-2">No Yield Positions</h3>
                        <p className="text-slate-600 mb-4">You don't have any active yield positions yet.</p>
                        <Button onClick={() => setSelectedTab('opportunities')}>
                          Explore Opportunities
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {userPositions.map((position, index) => (
                        <PositionCard
                          key={index}
                          protocol={position.protocol}
                          pool={position.pool}
                          invested={position.invested}
                          currentValue={position.currentValue}
                          apy={position.apy}
                          tokens={position.tokens}
                          onWithdraw={() => handleWithdrawClick(`${position.protocol}-${position.pool}`)}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="opportunities">
                  {isLoadingYields ? (
                    <div className="py-12">
                      <LoadingAI text="Analyzing yield opportunities" size="small" />
                    </div>
                  ) : availableYields.length === 0 ? (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <h3 className="text-xl font-medium mb-2">No Yield Opportunities</h3>
                        <p className="text-slate-600">
                          We couldn't find any yield opportunities at the moment. Please try again later.
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {availableYields.map((pool) => (
                        <YieldCard
                          key={pool.address}
                          pool={pool}
                          onDeposit={() => handleDepositClick(pool.address)}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
