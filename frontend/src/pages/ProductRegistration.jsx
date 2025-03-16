import React, { useState } from "react";
import { ethers } from "ethers";
import { QRCodeCanvas } from "qrcode.react"; // ✅ Ensure QR Code works
import contractABI from "../../ProductLifecycle.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const ProductRegistration = ({ signer }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    manufacturer: "",
    manufactureYear: "",
    serialNumber: "",
    warrantyPeriod: "",
    condition: "",
    locationOfRegistration: "",
  });

  const [loading, setLoading] = useState(false);
  const [qrValue, setQrValue] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const registerProduct = async () => {
    if (!signer) {
      alert("Connect MetaMask first!");
      return;
    }

    setLoading(true);
    try {
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractABI.abi,
        signer
      );
      const tx = await contract.registerProduct(
        formData.name,
        formData.category,
        formData.manufacturer,
        parseInt(formData.manufactureYear),
        formData.serialNumber,
        parseInt(formData.warrantyPeriod),
        formData.condition,
        formData.locationOfRegistration
      );
      await tx.wait();
      alert("Product registered successfully!");
      setQrValue(`http://yourwebsite.com/details/${formData.serialNumber}`);
    } catch (error) {
      alert("Error registering product: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto animate-fadeIn space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Register Product</h2>

      {Object.keys(formData).map((key) => (
        <input
          key={key}
          type="text"
          name={key}
          placeholder={key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
          value={formData[key]}
          onChange={handleChange}
          className="border border-gray-400 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-full"
        />
      ))}

      <button
        onClick={registerProduct}
        className={`bg-indigo-600 text-white px-6 py-2 rounded-md transition-all duration-300 hover:bg-indigo-800 focus:ring-2 focus:ring-indigo-500 w-full ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Processing..." : "Register Product"}
      </button>

      {qrValue && (
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold">Product QR Code</h3>
          <QRCodeCanvas value={qrValue} size={150} className="mt-2 mx-auto" />
        </div>
      )}
    </div>
  );
};

export default ProductRegistration;
