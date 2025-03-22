import React from "react";
import WalletConnect from "../components/WalletConnect";

const Home = ({ walletAddress, setWalletAddress, signer, setSigner }) => {
  return (
    <div className="text-center p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to VeriFurb</h1>
      {!walletAddress ? (
        <WalletConnect
          setWalletAddress={setWalletAddress}
          setSigner={setSigner}
        />
      ) : (
        <p className="text-lg text-gray-700">
          Wallet Connected: {walletAddress}
        </p>
      )}
    </div>
  );
};

export default Home;
