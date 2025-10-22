import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, arbitrum, optimism } from 'wagmi/chains';

// WalletConnect Project ID - Get this from cloud.walletconnect.com
const projectId = 'YOUR_PROJECT_ID';

export const config = getDefaultConfig({
  appName: 'Swap2Earn',
  projectId,
  chains: [mainnet, polygon, arbitrum, optimism],
  ssr: false,
});
