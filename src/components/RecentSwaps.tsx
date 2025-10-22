import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Clock } from 'lucide-react';

interface Swap {
  id: string;
  from: string;
  to: string;
  amount: string;
  points: number;
  timestamp: Date;
}

interface RecentSwapsProps {
  swaps: Swap[];
}

export const RecentSwaps = ({ swaps }: RecentSwapsProps) => {
  const formatTime = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  return (
    <Card className="glass-card p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5" />
        Recent Activity
      </h2>
      
      {swaps.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No swaps yet. Start trading to earn points!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {swaps.map((swap) => (
            <div
              key={swap.id}
              className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="font-mono text-sm">
                  <span className="font-bold">{swap.amount}</span>
                  <span className="text-muted-foreground mx-2">→</span>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">{swap.from}</Badge>
                  <span className="text-muted-foreground">→</span>
                  <Badge variant="secondary">{swap.to}</Badge>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-bold text-primary">+{swap.points} pts</p>
                  <p className="text-xs text-muted-foreground">{formatTime(swap.timestamp)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
