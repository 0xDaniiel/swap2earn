import { useState } from 'react';
import { WalletConnect } from '@/components/WalletConnect';
import { SwapInterface } from '@/components/SwapInterface';
import { PointsDisplay } from '@/components/PointsDisplay';
import { RecentSwaps } from '@/components/RecentSwaps';
import { Leaderboard } from '@/components/Leaderboard';
import { Zap } from 'lucide-react';

interface Swap {
  id: string;
  from: string;
  to: string;
  amount: string;
  points: number;
  timestamp: Date;
}

const Index = () => {
  const [points, setPoints] = useState(0);
  const [totalSwaps, setTotalSwaps] = useState(0);
  const [swaps, setSwaps] = useState<Swap[]>([]);

  const handleSwap = (fromAmount: string, fromToken: string, toToken: string) => {
    const earnedPoints = Math.floor(parseFloat(fromAmount) * 10);
    
    const newSwap: Swap = {
      id: Date.now().toString(),
      from: fromToken,
      to: toToken,
      amount: fromAmount,
      points: earnedPoints,
      timestamp: new Date(),
    };

    setPoints(prev => prev + earnedPoints);
    setTotalSwaps(prev => prev + 1);
    setSwaps(prev => [newSwap, ...prev].slice(0, 10));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Swap2Earn</h1>
                <p className="text-sm text-muted-foreground">Trade & Earn Rewards</p>
              </div>
            </div>
            <WalletConnect />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Points Display */}
        <PointsDisplay points={points} rank={142} totalSwaps={totalSwaps} />

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <SwapInterface onSwap={handleSwap} />
            <RecentSwaps swaps={swaps} />
          </div>
          <div>
            <Leaderboard />
          </div>
        </div>

        {/* Info Section */}
        <div className="grid md:grid-cols-3 gap-6 pt-8">
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">10x</div>
            <p className="text-sm text-muted-foreground">Points per $1 swapped</p>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-2">4</div>
            <p className="text-sm text-muted-foreground">Supported networks</p>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold text-success mb-2">0.1%</div>
            <p className="text-sm text-muted-foreground">Trading fee</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
