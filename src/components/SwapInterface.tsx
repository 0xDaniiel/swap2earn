import { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ArrowDownUp, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { useAccount } from 'wagmi';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface Token {
  symbol: string;
  name: string;
  balance: string;
}

const tokens: Token[] = [
  { symbol: 'ETH', name: 'Ethereum', balance: '0.0' },
  { symbol: 'USDT', name: 'Tether USD', balance: '0.0' },
  { symbol: 'USDC', name: 'USD Coin', balance: '0.0' },
  { symbol: 'DAI', name: 'Dai', balance: '0.0' },
];

interface SwapInterfaceProps {
  onSwap: (fromAmount: string, fromToken: string, toToken: string) => void;
}

export const SwapInterface = ({ onSwap }: SwapInterfaceProps) => {
  const { isConnected } = useAccount();
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleSwap = () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }
    
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    onSwap(fromAmount, fromToken.symbol, toToken.symbol);
    
    // Simulate swap
    const points = Math.floor(parseFloat(fromAmount) * 10);
    toast.success(`Swap successful! +${points} points earned`, {
      description: `${fromAmount} ${fromToken.symbol} → ${toAmount || '~'} ${toToken.symbol}`,
    });

    // Reset form
    setFromAmount('');
    setToAmount('');
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    // Simulate exchange rate calculation
    if (value) {
      const rate = 0.998; // Example rate
      setToAmount((parseFloat(value) * rate).toFixed(6));
    } else {
      setToAmount('');
    }
  };

  return (
    <Card className="glass-card p-6 space-y-4">
      <h2 className="text-2xl font-bold">Swap Tokens</h2>

      {/* From Token */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>From</span>
          <span className="font-mono">Balance: {fromToken.balance}</span>
        </div>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="0.0"
            value={fromAmount}
            onChange={(e) => handleFromAmountChange(e.target.value)}
            className="text-2xl font-mono h-14 bg-secondary/50"
          />
          <Select
            value={fromToken.symbol}
            onValueChange={(value) => {
              const token = tokens.find(t => t.symbol === value);
              if (token && token.symbol !== toToken.symbol) {
                setFromToken(token);
              }
            }}
          >
            <SelectTrigger className="gap-2 min-w-[140px] h-14 bg-secondary/50">
              <SelectValue>
                <span className="font-bold">{fromToken.symbol}</span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {tokens.filter(t => t.symbol !== toToken.symbol).map((token) => (
                <SelectItem key={token.symbol} value={token.symbol}>
                  <div className="flex flex-col">
                    <span className="font-bold">{token.symbol}</span>
                    <span className="text-xs text-muted-foreground">{token.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Swap Direction Button */}
      <div className="flex justify-center">
        <Button
          variant="secondary"
          size="icon"
          onClick={handleSwapTokens}
          className="click-scale hover-glow rounded-full h-10 w-10"
        >
          <ArrowDownUp className="h-5 w-5" />
        </Button>
      </div>

      {/* To Token */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>To</span>
          <span className="font-mono">Balance: {toToken.balance}</span>
        </div>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="0.0"
            value={toAmount}
            readOnly
            className="text-2xl font-mono h-14 bg-secondary/50"
          />
          <Select
            value={toToken.symbol}
            onValueChange={(value) => {
              const token = tokens.find(t => t.symbol === value);
              if (token && token.symbol !== fromToken.symbol) {
                setToToken(token);
              }
            }}
          >
            <SelectTrigger className="gap-2 min-w-[140px] h-14 bg-secondary/50">
              <SelectValue>
                <span className="font-bold">{toToken.symbol}</span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {tokens.filter(t => t.symbol !== fromToken.symbol).map((token) => (
                <SelectItem key={token.symbol} value={token.symbol}>
                  <div className="flex flex-col">
                    <span className="font-bold">{token.symbol}</span>
                    <span className="text-xs text-muted-foreground">{token.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Rate Info */}
      {fromAmount && toAmount && (
        <div className="p-4 bg-secondary/30 rounded-lg space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Rate</span>
            <span className="font-mono">1 {fromToken.symbol} = {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(4)} {toToken.symbol}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Points Earned</span>
            <span className="font-bold text-primary">+{Math.floor(parseFloat(fromAmount) * 10)} pts</span>
          </div>
        </div>
      )}

      {/* Swap Button */}
      <Button
        onClick={handleSwap}
        disabled={!isConnected || !fromAmount}
        className="w-full h-12 text-lg font-bold click-scale hover-glow"
        size="lg"
      >
        {isConnected ? 'Swap' : 'Connect Wallet to Swap'}
      </Button>
    </Card>
  );
};
