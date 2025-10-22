import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button } from './ui/button';
import { Wallet, LogOut } from 'lucide-react';
import { toast } from 'sonner';

export const WalletConnect = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = (connector: any) => {
    connect(
      { connector },
      {
        onSuccess: () => {
          toast.success('Wallet connected successfully!');
        },
        onError: (error) => {
          toast.error(`Connection failed: ${error.message}`);
        },
      }
    );
  };

  const handleDisconnect = () => {
    disconnect();
    toast.info('Wallet disconnected');
  };

  if (isConnected && address) {
    return (
      <Button
        variant="secondary"
        onClick={handleDisconnect}
        className="click-scale hover-glow gap-2"
      >
        <Wallet className="h-4 w-4" />
        <span className="font-mono">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        <LogOut className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {connectors.map((connector) => (
        <Button
          key={connector.id}
          onClick={() => handleConnect(connector)}
          variant="default"
          className="click-scale hover-glow"
        >
          <Wallet className="h-4 w-4 mr-2" />
          Connect {connector.name}
        </Button>
      ))}
    </div>
  );
};
