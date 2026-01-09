import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';

import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  goerli,
} from 'wagmi/chains';

import { defineChain } from "viem";

export const anvilChain = defineChain({
  id: 31337,
  name: "Anvil Local",
  network: "anvil",
  nativeCurrency: { name: "TETH", symbol: "TETH", decimals: 18 },
  rpcUrls: { default: { http: ["http://127.0.0.1:8545"] } },
  testnet:true,
});


export const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [anvilChain,goerli,],
  ssr: true, 
});


