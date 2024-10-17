import Head from "next/head";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, lightTheme, darkTheme, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ThemeProvider, useTheme } from "next-themes";
import WeaveDB from "weavedb-sdk";
import { getHuddleClient, HuddleClientProvider } from "@huddle01/huddle01-client";
import { metaMaskWallet, coinbaseWallet } from "@rainbow-me/rainbowkit/wallets";
import { useEffect, useState } from "react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";

// Initialize Huddle Client
const huddleClient = getHuddleClient(
  "1bc609a2c914912b57e4f3da0fdfc25e06fd643a87f3afe7dd159458b19fb412"
);

// Define Shardeum Chain
const shardeumChain = {
  id: 11155111,
  name: "Shardeum Liberty 2.X",
  network: "sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "Sepolia",
    symbol: "Sep",
  },
  rpcUrls: {
    default: {
      http: ["https://sepolia.gateway.tenderly.co"],
    },
    public: {
      http: ["https://sepolia.gateway.tenderly.co"],
    },
  },
  blockExplorers: {
    default: {
      name: "SnowTrace",
      url: "https://sepolia.etherscan.io/",
    },
  },
  testnet: true,
};

// Configure Chains and Providers
const { chains, provider } = configureChains(
  [shardeumChain],
  [publicProvider()]
);

// Initialize connectors with custom and default wallets
const { connectors: defaultConnectors } = getDefaultWallets({
  appName: "DeDoctor",
  chains,
});

const connectors = () => [
  new PhantomWalletAdapter(), // For Solana
  metaMaskWallet({ chains }), // Initialize MetaMask Wallet with chains
  coinbaseWallet({ chains }), // Initialize Coinbase Wallet with chains
  ...defaultConnectors(), // Spread the default connectors
];

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }) {
  const { theme } = useTheme();
  const [weaveDB, setWeaveDB] = useState(null);

  useEffect(() => {
    // Initialize WeaveDB
    const initWeaveDB = async () => {
      console.log("Contract TX ID:", process.env.NEXT_PUBLIC_WEAVEDB_CONTRACT_TX_ID);
      const db = new WeaveDB({ contractTxId: process.env.NEXT_PUBLIC_WEAVEDB_CONTRACT_TX_ID });
      await db.init();
      setWeaveDB(db);
    };

    initWeaveDB();
  }, []);

  return (
    <div className="dark:bg-gradient-to-br from-purple-900 to-gray-900 dark:text-gray-300">
      <Head>
        <title>DeDoctor</title>
        <meta name="description" content="DeDoctor is a web3-based Doctor appointment app." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo_2.ico" />
        <meta name="keywords" content="doctor,safe,medicine,blockchain" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dmed.vercel.app/" />
        <meta property="og:title" content="DeDoctor is a web3-based Doctor appointment app." />
        <meta property="og:description" content="DeDoctor helps with online consultation and payment with the Shardeum network, ensuring patient data is safe." />
        <meta property="og:image" content="/logo-no-background.svg" />
        <meta name="language" content="ES" />
        <meta name="author" content="Abraham Anavheoba, wisdomvolt@gmail.com" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://dmed.vercel.app/" />
        <meta property="twitter:title" content="DeDoctor is a web3-based Doctor appointment app." />
        <meta property="twitter:description" content="DeDoctor helps with online consultation and payment with the Shardeum network, ensuring patient data is safe." />
        <meta property="twitter:image" content="/logo-no-background.svg" />
        <meta name="url" content="https://dmed.vercel.app/" />
        <meta name="theme-color" content="#37055c" />
        <meta name="description" content="DeDoctor helps with online consultation and payment with the Shardeum network, ensuring patient data is safe." />
        <link rel="apple-touch-icon" href="/logo-no-background.svg" />
      </Head>
      <ThemeProvider enableSystem={true} attribute="class">
        <HuddleClientProvider value={huddleClient}>
          <Provider store={store}>
            <WagmiConfig client={wagmiClient}>
              <RainbowKitProvider chains={chains} theme={theme === 'light' ? lightTheme() : darkTheme()}>
                <Navbar />
                <Component {...pageProps} />
                <Footer />
              </RainbowKitProvider>
            </WagmiConfig>
          </Provider>
        </HuddleClientProvider>
      </ThemeProvider>
    </div>
  );
}
