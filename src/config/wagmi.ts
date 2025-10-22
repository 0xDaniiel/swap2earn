import { http, createConfig } from 'wagmi';
import { mainnet, polygon, arbitrum, optimism } from 'wagmi/chains';
import { walletConnect, injected, coinbaseWallet } from 'wagmi/connectors';

// WalletConnect Project ID - In production, get this from cloud.walletconnect.com
const projectId = 'YOUR_PROJECT_ID';

export const config = createConfig({
  chains: [mainnet, polygon, arbitrum, optimism],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    coinbaseWallet({ appName: 'Swap2Earn' }),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
  },
});
