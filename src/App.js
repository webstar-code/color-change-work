import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Invest from "./pages/Invest";
import Referrals from "./pages/Referrals";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import ChangedValue from "./pages/valueChanged/ChangedValue";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

// 1. Get projectId
const projectId = "6bf42b45eaf1cf5dad51ca5109dcf569";

// 2. Set chains
const bsc = {
  chainId: 56,
  name: "Binance Smart Chain",
  currency: "BNB",
  explorerUrl: "https://bscscan.com",
  rpcUrl: "https://bsc.drpc.org",
};

// 3. Create a metadata object
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [bsc],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

function App() {
  const [navData, setNavdata] = useState({
    activeUsers: "34",
    stakedValue: "43",
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Invest navData={navData} />} />
        <Route path="/referrals" element={<Referrals />} />
        <Route
          path="/change-value"
          element={<ChangedValue setNavdata={setNavdata} />}
        />
      </Routes>
      <Toaster toastOptions={{ duration: 1000 }} />
    </BrowserRouter>
  );
}

export default App;
