import React, { useState } from "react";
import { ethers } from "ethers";
import { QRCodeCanvas } from "qrcode.react";
import contractABI from "../../../blockchain/artifacts/contracts/ProductLifecycle.sol/ProductLifecycle.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const ProductRegistration = ({ signer }) => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    osVersion: "",
    imeiNumber: "",
    manufactureDate: "",
    serialNumber: "",
    warrantyPeriod: "",
    condition: "",
    locationOfRegistration: "",
  });

  const [statusData, setStatusData] = useState({
    batteryHealth: "",
    screenCondition: "",
    storageCapacity: "",
    ramSize: "",
    networkStatus: "",
    activationStatus: "",
    blacklistStatus: false,
    physicalCondition: "",
  });

  const [loading, setLoading] = useState(false);
  const [qrValue, setQrValue] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStatusChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStatusData({
      ...statusData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const registerSmartphone = async () => {
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

      // Register the smartphone
      const tx = await contract.registerSmartphone(
        formData.brand,
        formData.model,
        formData.osVersion,
        formData.imeiNumber,
        formData.manufactureDate,
        formData.serialNumber,
        parseInt(formData.warrantyPeriod),
        formData.condition,
        formData.locationOfRegistration
      );
      const receipt = await tx.wait();

      // Get the newly registered smartphone ID from events
      const smartphoneId = receipt.logs[0].args.id.toString();

      // Set smartphone status
      const statusTx = await contract.setSmartphoneStatus(smartphoneId, {
        batteryHealth: statusData.batteryHealth,
        screenCondition: statusData.screenCondition,
        storageCapacity: statusData.storageCapacity,
        ramSize: statusData.ramSize,
        networkStatus: statusData.networkStatus,
        activationStatus: statusData.activationStatus,
        blacklistStatus: statusData.blacklistStatus,
        physicalCondition: statusData.physicalCondition,
      });

      await statusTx.wait();

      alert("Smartphone registered successfully with status!");
      setQrValue(`http://yourwebsite.com/details/${smartphoneId}`);
    } catch (error) {
      alert("Error registering smartphone: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto animate-fadeIn space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Register Smartphone</h2>

      {/* Core Smartphone Details */}
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

      <h2 className="text-xl font-bold text-gray-700 mt-4">
        Smartphone Status
      </h2>

      {/* Smartphone Status Fields */}
      {Object.keys(statusData).map((key) =>
        key === "blacklistStatus" ? (
          <div key={key} className="flex items-center space-x-2">
            <input
              type="checkbox"
              name={key}
              checked={statusData[key]}
              onChange={handleStatusChange}
              className="w-5 h-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
            />
            <label className="text-gray-700">
              {key.replace(/([A-Z])/g, " $1")}
            </label>
          </div>
        ) : (
          <input
            key={key}
            type="text"
            name={key}
            placeholder={key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
            value={statusData[key]}
            onChange={handleStatusChange}
            className="border border-gray-400 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-full"
          />
        )
      )}

      <button
        onClick={registerSmartphone}
        className={`bg-indigo-600 text-white px-6 py-2 rounded-md transition-all duration-300 hover:bg-indigo-800 focus:ring-2 focus:ring-indigo-500 w-full ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Processing..." : "Register Smartphone"}
      </button>

      {qrValue && (
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold">Smartphone QR Code</h3>
          <QRCodeCanvas value={qrValue} size={150} className="mt-2 mx-auto" />
        </div>
      )}
    </div>
  );
};

export default ProductRegistration;
