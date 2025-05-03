import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import ComparisonCard from "@/components/ui/ComparisonCard";
import LoadingAI from "@/components/ui/LoadingAI";
import { compareTokensWithAI } from "@/services/openai";

const Compare = () => {
  const [tokenA, setTokenA] = useState("");
  const [tokenB, setTokenB] = useState("");
  const [isComparing, setIsComparing] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonData, setComparisonData] = useState(null);

  const handleCompare = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTokenA = tokenA.trim();
    const cleanTokenB = tokenB.trim();
    if (!cleanTokenA || !cleanTokenB) return;
  
    setIsComparing(true);
    setShowComparison(false);
  
    try {
      const result = await compareTokensWithAI(cleanTokenA, cleanTokenB);
      setComparisonData(result); // Save the response
      setShowComparison(true);
    } catch (err) {
      console.error("Comparison error:", err);
      alert("Failed to fetch comparison. Please try again.");
    } finally {
      setIsComparing(false);
    }
  };
  
  return (
    <MainLayout isConnected={true}>
      <div className="safe-container py-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-6">
            Compare Tokens
          </h1>

          <form onSubmit={handleCompare}>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label
                  htmlFor="tokenA"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  First Token
                </label>
                <Input
                  id="tokenA"
                  placeholder="Enter token name or symbol (e.g. Ethereum or ETH)"
                  value={tokenA}
                  onChange={(e) => setTokenA(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="tokenB"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Second Token
                </label>
                <Input
                  id="tokenB"
                  placeholder="Enter token name or symbol (e.g. Bitcoin or BTC)"
                  value={tokenB}
                  onChange={(e) => setTokenB(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={!tokenA || !tokenB || isComparing}
              className="gradient-bg-secondary w-full md:w-auto"
            >
              <Search className="h-4 w-4 mr-2" />
              Compare Tokens
            </Button>
          </form>
        </div>

        {isComparing && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 min-h-[60vh] flex items-center justify-center">
            <LoadingAI />
          </div>
        )}

        {showComparison && comparisonData && (
          <div className="space-y-6">
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-lg">
              <h2 className="font-medium text-slate-800 mb-3">
                Comparison: {tokenA} vs {tokenB}
              </h2>
              <p className="text-slate-600 text-sm">
                SafeSage AI has analyzed both tokens across several risk
                metrics. The safer option in each category is highlighted.
              </p>
            </div>

            <ComparisonCard
              title="Market Risk"
              tokenA={{
                name: comparisonData.marketRisk.tokenA.name,
                symbol: tokenA,
                value: comparisonData.marketRisk.tokenA.score,
              }}
              tokenB={{
                name: comparisonData.marketRisk.tokenB.name,
                symbol: tokenB,
                value: comparisonData.marketRisk.tokenB.score,
              }}
              isBetter={
                comparisonData.marketRisk.tokenA.score <
                comparisonData.marketRisk.tokenB.score
                  ? "A"
                  : "B"
              }
              metric="Risk Score"
              explanation={comparisonData.marketRisk.explanation}
            />

            <ComparisonCard
              title="Technical Risk"
              tokenA={{
                name: comparisonData.technicalRisk.tokenA.name,
                symbol: tokenA,
                value: comparisonData.technicalRisk.tokenA.score,
              }}
              tokenB={{
                name: comparisonData.technicalRisk.tokenB.name,
                symbol: tokenB,
                value: comparisonData.technicalRisk.tokenB.score,
              }}
              isBetter={
                comparisonData.technicalRisk.tokenA.score <
                comparisonData.technicalRisk.tokenB.score
                  ? "A"
                  : "B"
              }
              metric="Risk Score"
              explanation={comparisonData.technicalRisk.explanation}
            />

            <ComparisonCard
              title="Liquidity Risk"
              tokenA={{
                name: comparisonData.liquidityRisk.tokenA.name,
                symbol: tokenA,
                value: comparisonData.liquidityRisk.tokenA.score,
              }}
              tokenB={{
                name: comparisonData.liquidityRisk.tokenB.name,
                symbol: tokenB,
                value: comparisonData.liquidityRisk.tokenB.score,
              }}
              isBetter={
                comparisonData.liquidityRisk.tokenA.score <
                comparisonData.liquidityRisk.tokenB.score
                  ? "A"
                  : "B"
              }
              metric="Risk Score"
              explanation={comparisonData.liquidityRisk.explanation}
            />

            <div className="p-6 bg-sage-50 border border-sage-200 rounded-lg">
              <h3 className="font-medium text-sage-800 mb-3">
                AI Summary Assessment
              </h3>
              <p className="text-sage-700 mb-4">{comparisonData.summary}</p>
              <div className="flex gap-2">
                <div className="px-3 py-1.5 rounded-full bg-risk-low text-sage-800 text-sm font-medium">
                  {comparisonData.liquidityRisk.tokenA.name}:{" "}
                  {comparisonData.liquidityRisk.tokenA.score}/10
                </div>
                <div className="px-3 py-1.5 rounded-full bg-risk-low text-sage-800 text-sm font-medium">
                  {comparisonData.liquidityRisk.tokenB.name}:{" "}
                  {comparisonData.liquidityRisk.tokenB.score}/10
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Compare;
