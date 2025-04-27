import React, { useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

const WalletConnect = ({ setWalletAddress, setSigner }) => {
  const [connected, setConnected] = useState(false);

  const connectWallet = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(connection);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setWalletAddress(address);
      setSigner(signer);
      setConnected(true);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  return (
    <div>
      <button
        onClick={connectWallet}
        className="bg-indigo-600 text-white px-6 py-2 rounded-md transition-all duration-300 hover:bg-indigo-800 focus:ring-2 focus:ring-indigo-500 shadow-md"
      >
        {connected ? "Wallet Connected" : "Connect Wallet"}
      </button>
    </div>
  );
};

export default WalletConnect;
