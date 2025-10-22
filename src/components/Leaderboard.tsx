import { Card } from './ui/card';
import { Trophy } from 'lucide-react';

interface LeaderboardEntry {
  address: string;
  points: number;
  swaps: number;
}

const mockLeaderboard: LeaderboardEntry[] = [
  { address: '0x742d...C2F8', points: 15420, swaps: 89 },
  { address: '0x1A3b...9D4E', points: 12350, swaps: 76 },
  { address: '0x9C7F...3B21', points: 9870, swaps: 54 },
  { address: '0x4E82...7A19', points: 8230, swaps: 48 },
  { address: '0xB5D9...6F0C', points: 6950, swaps: 41 },
];

export const Leaderboard = () => {
  const getRankColor = (index: number) => {
    if (index === 0) return 'text-yellow-400';
    if (index === 1) return 'text-gray-300';
    if (index === 2) return 'text-orange-400';
    return 'text-muted-foreground';
  };

  return (
    <Card className="glass-card p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Trophy className="h-5 w-5 text-primary" />
        Top Traders
      </h2>
      
      <div className="space-y-3">
        {mockLeaderboard.map((entry, index) => (
          <div
            key={entry.address}
            className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className={`text-2xl font-bold w-8 ${getRankColor(index)}`}>
                #{index + 1}
              </span>
              <div>
                <p className="font-mono font-bold">{entry.address}</p>
                <p className="text-sm text-muted-foreground">{entry.swaps} swaps</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold font-mono text-primary">
                {entry.points.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">points</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
