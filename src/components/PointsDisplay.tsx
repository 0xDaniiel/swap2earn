import { Card } from './ui/card';
import { Trophy, TrendingUp } from 'lucide-react';

interface PointsDisplayProps {
  points: number;
  rank: number;
  totalSwaps: number;
}

export const PointsDisplay = ({ points, rank, totalSwaps }: PointsDisplayProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="glass-card p-6 hover-glow">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Trophy className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Points</p>
            <p className="text-3xl font-bold font-mono">{points.toLocaleString()}</p>
          </div>
        </div>
      </Card>

      <Card className="glass-card p-6 hover-glow">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-accent/10 rounded-lg">
            <TrendingUp className="h-6 w-6 text-accent" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Global Rank</p>
            <p className="text-3xl font-bold font-mono">#{rank}</p>
          </div>
        </div>
      </Card>

      <Card className="glass-card p-6 hover-glow">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-success/10 rounded-lg">
            <div className="h-6 w-6 text-success font-bold text-lg">↔</div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Swaps</p>
            <p className="text-3xl font-bold font-mono">{totalSwaps}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
