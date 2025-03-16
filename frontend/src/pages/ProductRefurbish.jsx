import React, { useState } from "react";
import { ethers } from "ethers";
import contractABI from "../../ProductLifecycle.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const ProductRefurbish = ({ signer }) => {
  const [formData, setFormData] = useState({
    productId: "",
    details: "",
    replacedComponents: "",
    technicianName: "",
    certificateHash: "",
    warrantyExtension: "",
    refurbishmentCost: "",
    newSerialNumber: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const refurbishProduct = async () => {
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
      const tx = await contract.refurbishProduct(
        parseInt(formData.productId),
        formData.details,
        formData.replacedComponents.split(","),
        formData.technicianName,
        formData.certificateHash,
        parseInt(formData.warrantyExtension),
        parseInt(formData.refurbishmentCost),
        formData.newSerialNumber
      );
      await tx.wait();
      alert(`Product ${formData.productId} refurbished successfully!`);
    } catch (error) {
      alert("Error refurbishing product: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto animate-fadeIn space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Refurbish Product</h2>

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
        onClick={refurbishProduct}
        className={`bg-indigo-600 text-white px-6 py-2 rounded-md transition-all duration-300 hover:bg-indigo-800 focus:ring-2 focus:ring-indigo-500 w-full ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Processing..." : "Refurbish"}
      </button>
    </div>
  );
};

export default ProductRefurbish;
