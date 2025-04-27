import React, { useState } from "react";
import { ethers } from "ethers";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductRegistration from "./pages/ProductRegistration";
import ProductRefurbish from "./pages/ProductRefurbish";
import ProductDetails from "./pages/ProductDetails";

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [signer, setSigner] = useState(null);

  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-6 pt-20">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                walletAddress={walletAddress}
                setWalletAddress={setWalletAddress}
                signer={signer}
                setSigner={setSigner}
              />
            }
          />
          <Route
            path="/register"
            element={<ProductRegistration signer={signer} />}
          />
          <Route
            path="/refurbish"
            element={<ProductRefurbish signer={signer} />}
          />
          <Route path="/details" element={<ProductDetails signer={signer} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
