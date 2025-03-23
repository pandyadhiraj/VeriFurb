import React, { useState } from "react";
import { ethers } from "ethers";
import contractABI from "../../../blockchain/artifacts/contracts/ProductLifecycle.sol/ProductLifecycle.json";

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
    softwareUpdateVersion: "",
    batteryReplaced: false,
    screenReplaced: false,
    motherboardReplaced: false,
    refurbishmentGrade: "",
    physicalCondition: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
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
      const tx = await contract.refurbishSmartphone(
        parseInt(formData.productId),
        {
          timestamp: Math.floor(Date.now() / 1000),
          details: formData.details,
          replacedComponents: formData.replacedComponents
            .split(",")
            .map((item) => item.trim()),
          technicianName: formData.technicianName,
          certificateHash: formData.certificateHash,
          warrantyExtension: parseInt(formData.warrantyExtension),
          refurbishmentCost: parseInt(formData.refurbishmentCost),
          newSerialNumber: formData.newSerialNumber,
          softwareUpdateVersion: formData.softwareUpdateVersion,
          batteryReplaced: formData.batteryReplaced,
          screenReplaced: formData.screenReplaced,
          motherboardReplaced: formData.motherboardReplaced,
          refurbishmentGrade: formData.refurbishmentGrade,
          physicalCondition: formData.physicalCondition,
        }
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

      <input
        type="text"
        name="productId"
        placeholder="Product ID"
        value={formData.productId}
        onChange={handleChange}
        className="border border-gray-400 px-4 py-2 rounded-md w-full"
      />
      <input
        type="text"
        name="details"
        placeholder="Details"
        value={formData.details}
        onChange={handleChange}
        className="border border-gray-400 px-4 py-2 rounded-md w-full"
      />
      <input
        type="text"
        name="replacedComponents"
        placeholder="Replaced Components"
        value={formData.replacedComponents}
        onChange={handleChange}
        className="border border-gray-400 px-4 py-2 rounded-md w-full"
      />
      <input
        type="text"
        name="technicianName"
        placeholder="Technician Name"
        value={formData.technicianName}
        onChange={handleChange}
        className="border border-gray-400 px-4 py-2 rounded-md w-full"
      />
      <input
        type="text"
        name="certificateHash"
        placeholder="Certificate Hash"
        value={formData.certificateHash}
        onChange={handleChange}
        className="border border-gray-400 px-4 py-2 rounded-md w-full"
      />
      <input
        type="number"
        name="warrantyExtension"
        placeholder="Warranty Extension (months)"
        value={formData.warrantyExtension}
        onChange={handleChange}
        className="border border-gray-400 px-4 py-2 rounded-md w-full"
      />
      <input
        type="number"
        name="refurbishmentCost"
        placeholder="Refurbishment Cost (₹)"
        value={formData.refurbishmentCost}
        onChange={handleChange}
        className="border border-gray-400 px-4 py-2 rounded-md w-full"
      />
      <input
        type="text"
        name="newSerialNumber"
        placeholder="New Serial Number"
        value={formData.newSerialNumber}
        onChange={handleChange}
        className="border border-gray-400 px-4 py-2 rounded-md w-full"
      />
      <input
        type="text"
        name="softwareUpdateVersion"
        placeholder="Software Update Version"
        value={formData.softwareUpdateVersion}
        onChange={handleChange}
        className="border border-gray-400 px-4 py-2 rounded-md w-full"
      />
      <input
        type="text"
        name="refurbishmentGrade"
        placeholder="Refurbishment Grade"
        value={formData.refurbishmentGrade}
        onChange={handleChange}
        className="border border-gray-400 px-4 py-2 rounded-md w-full"
      />
      <input
        type="text"
        name="physicalCondition"
        placeholder="Physical Condition"
        value={formData.physicalCondition}
        onChange={handleChange}
        className="border border-gray-400 px-4 py-2 rounded-md w-full"
      />

      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="batteryReplaced"
            checked={formData.batteryReplaced}
            onChange={handleChange}
            className="mr-2"
          />
          Battery Replaced
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="screenReplaced"
            checked={formData.screenReplaced}
            onChange={handleChange}
            className="mr-2"
          />
          Screen Replaced
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="motherboardReplaced"
            checked={formData.motherboardReplaced}
            onChange={handleChange}
            className="mr-2"
          />
          Motherboard Replaced
        </label>
      </div>

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
