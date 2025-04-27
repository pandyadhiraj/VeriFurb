import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductRegistration from "./pages/ProductRegistration";
import ProductRefurbish from "./pages/ProductRefurbish";
import ProductDetails from "./pages/ProductDetails";
import SmartphoneDetails from "./pages/SmartphoneDetails";

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [signer, setSigner] = useState(null);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <Navbar />
        <div className="flex-grow">
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
            <Route
              path="/details"
              element={<ProductDetails signer={signer} />}
            />
            <Route path="/details/:id" element={<SmartphoneDetails />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
