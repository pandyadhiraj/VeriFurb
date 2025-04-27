import React, { useState } from "react";
import { ethers } from "ethers";
import { QRCodeCanvas } from "qrcode.react";
import contractABI from "../../../blockchain/artifacts/contracts/ProductLifecycle.sol/ProductLifecycle.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const placeholderMap = {
  brand: "Brand Name",
  model: "Model",
  osVersion: "OS Version",
  imeiNumber: "IMEI Number",
  manufactureDate: "Manufacture Date",
  serialNumber: "Serial Number",
  warrantyPeriod: "Warranty Period",
  condition: "Condition",
  locationOfRegistration: "Location of Registration",
  batteryHealth: "Battery Health",
  screenCondition: "Screen Condition",
  storageCapacity: "Storage Capacity",
  ramSize: "RAM Size",
  networkStatus: "Network Status",
  activationStatus: "Activation Status",
  blacklistStatus: "Check if Blacklisted",
  physicalCondition: "Physical Condition",
};

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
  const [successMessage, setSuccessMessage] = useState(""); // State to hold success message

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
    setSuccessMessage(""); // Reset success message before attempting registration

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

      const smartphoneId = receipt.logs[0].args.id.toString();

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

      // Set success message on successful registration
      setSuccessMessage("Smartphone registration successful!");

      setQrValue(`http://127.0.0.1:5173/details/${smartphoneId}`);
    } catch (error) {
      alert("Error registering smartphone: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-900 text-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto animate-fadeIn space-y-4">
      {/* Title Wrapper with Grid Layout */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-100 justify-self-start">
          Register Smartphone
        </h2>
        <h2 className="text-xl font-bold text-gray-200 justify-self">
          Smartphone Status
        </h2>
      </div>
      {/* Main Form Wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section: Smartphone Registration */}
        <div className="space-y-4">
          {Object.keys(formData).map((key) => (
            <input
              key={key}
              type="text"
              name={key}
              placeholder={placeholderMap[key] || key}
              value={formData[key]}
              onChange={handleChange}
              className="border border-gray-600 bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-full"
            />
          ))}
        </div>

        {/* Right Section: Smartphone Status */}
        <div className="space-y-4">
          {/* Smartphone Status Fields */}
          {Object.keys(statusData)
            .filter((key) => key !== "blacklistStatus")
            .map((key) => (
              <input
                key={key}
                type="text"
                name={key}
                placeholder={
                  placeholderMap[key] ||
                  key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())
                }
                value={statusData[key]}
                onChange={handleStatusChange}
                className="border border-gray-600 bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-full"
              />
            ))}

          {/* Blacklist Status Checkbox */}
          <div key="blacklistStatus" className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="blacklistStatus"
              checked={statusData.blacklistStatus}
              onChange={handleStatusChange}
              className="w-5 h-5 text-indigo-600 border-gray-500 focus:ring-indigo-500"
            />
            <label className="text-gray-200">
              {placeholderMap["blacklistStatus"]}
            </label>
          </div>
        </div>
      </div>
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
          <h3 className="text-lg font-semibold text-gray-200">
            Smartphone QR Code
          </h3>
          <QRCodeCanvas
            value={qrValue}
            size={150}
            className="mt-2 mx-auto"
            fgColor="#ffffff" // Set foreground (QR code) color to white
            bgColor="#000000" // Set background color to black
          />
        </div>
      )}
      {/* Success Message */}
      {successMessage && (
        <div className="mt-4 text-center">
          <div className="inline-block bg-green-30 bg-opacity-100 text-green-400 text-lg font-semibold rounded-lg px-6 py-3 shadow-lg border border-green-600">
            {successMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductRegistration;
