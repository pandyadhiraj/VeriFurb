import React, { useState } from "react";
import WalletConnect from "../components/WalletConnect";

const Home = ({ walletAddress, setWalletAddress, signer, setSigner }) => {
  const [successMessage, setSuccessMessage] = useState(null);

  const handleWalletConnected = (address) => {
    setWalletAddress(address);
    setSuccessMessage(`Wallet Connected: ${address}`);
  };

  return (
    <div className="bg-gray-900 text-white flex flex-col justify-center items-center relative overflow-hidden p-6">
      {/* Content */}
      <div className="relative z-10 text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold text-sky-500 animate-fadeIn">
          Welcome to VeriFurb
        </h1>
        <p className="text-gray-300 text-lg md:text-2xl animate-fadeIn delay-100">
          Revolutionizing Trust in Refurbished Smartphones
        </p>

        {/* Wallet Connect Section */}
        {!walletAddress ? (
          <div className="mt-8 animate-fadeIn delay-200">
            <WalletConnect
              setWalletAddress={setWalletAddress}
              setSigner={setSigner}
              onWalletConnected={handleWalletConnected}
            />
          </div>
        ) : (
          <p className="text-green-400 font-semibold text-xl mt-8 animate-fadeIn delay-200">
            Wallet Connected!
          </p>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="mt-6 animate-fadeIn delay-300">
            <div className="inline-block bg-green-30 bg-opacity-100 text-green-400 text-lg font-semibold rounded-lg px-6 py-3 border border-green-400 backdrop-blur-md backdrop-filter">
              {successMessage}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
