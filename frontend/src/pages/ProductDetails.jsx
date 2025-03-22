import React, { useState } from "react";
import { ethers } from "ethers";
import contractABI from "../../../blockchain/artifacts/contracts/ProductLifecycle.sol/ProductLifecycle.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

const ProductDetails = ({ signer }) => {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
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
      const productData = await contract.getSmartphone(productId);

      if (!productData || productData.id.toString() === "0") {
        setProduct(null);
        setLoading(false);
        return;
      }

      setProduct({
        id: productData.id.toString(),
        name: productData.name,
        manufacturer: productData.manufacturer,
        manufactureYear: productData.manufactureYear.toString(),
        serialNumber: productData.serialNumber,
        warrantyPeriod: productData.warrantyPeriod.toString(),
        batteryHealth: productData.batteryHealth,
        screenCondition: productData.screenCondition,
        storageCapacity: productData.storageCapacity.toString(),
        ramSize: productData.ramSize.toString(),
        networkStatus: productData.networkStatus,
        activationStatus: productData.activationStatus,
        blacklistStatus: productData.blacklistStatus,
        physicalCondition: productData.physicalCondition,
        isRefurbished: productData.isRefurbished,
        refurbishments: productData.refurbishments.map((refurb) => ({
          timestamp: refurb.timestamp.toString(),
          details: refurb.details,
          replacedComponents: refurb.replacedComponents.join(", "),
          technicianName: refurb.technicianName,
          certificateHash: refurb.certificateHash,
          warrantyExtension: refurb.warrantyExtension.toString(),
          refurbishmentCost: refurb.refurbishmentCost.toString(),
          newSerialNumber: refurb.newSerialNumber || "N/A",
          softwareUpdateVersion: refurb.softwareUpdateVersion,
          batteryReplaced: refurb.batteryReplaced ? "Yes" : "No",
          screenReplaced: refurb.screenReplaced ? "Yes" : "No",
          motherboardReplaced: refurb.motherboardReplaced ? "Yes" : "No",
          refurbishmentGrade: refurb.refurbishmentGrade,
          updatedPhysicalCondition: refurb.updatedPhysicalCondition,
        })),
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      setProduct(null);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto animate-fadeIn space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">
        Check Product Details
      </h2>

      <input
        type="text"
        placeholder="Enter Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        className="border border-gray-400 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-full"
      />

      <button
        onClick={fetchProduct}
        className={`bg-indigo-600 text-white px-6 py-2 rounded-md transition-all duration-300 hover:bg-indigo-800 focus:ring-2 focus:ring-indigo-500 w-full ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Fetching..." : "Check"}
      </button>

      {product && (
        <div className="mt-4 bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold">Product Information</h3>
          <p>
            <strong>ID:</strong> {product.id}
          </p>
          <p>
            <strong>Name:</strong> {product.name}
          </p>
          <p>
            <strong>Manufacturer:</strong> {product.manufacturer}
          </p>
          <p>
            <strong>Manufacture Year:</strong> {product.manufactureYear}
          </p>
          <p>
            <strong>Serial Number:</strong> {product.serialNumber}
          </p>
          <p>
            <strong>Warranty Period:</strong> {product.warrantyPeriod} months
          </p>
          <p>
            <strong>Battery Health:</strong> {product.batteryHealth}%
          </p>
          <p>
            <strong>Screen Condition:</strong> {product.screenCondition}
          </p>
          <p>
            <strong>Storage:</strong> {product.storageCapacity} GB
          </p>
          <p>
            <strong>RAM:</strong> {product.ramSize} GB
          </p>
          <p>
            <strong>Network Status:</strong> {product.networkStatus}
          </p>
          <p>
            <strong>Activation Status:</strong> {product.activationStatus}
          </p>
          <p>
            <strong>Blacklist Status:</strong> {product.blacklistStatus}
          </p>
          <p>
            <strong>Physical Condition:</strong> {product.physicalCondition}
          </p>
          <p>
            <strong>Refurbished:</strong> {product.isRefurbished ? "Yes" : "No"}
          </p>

          {product.refurbishments.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Refurbishment History</h3>
              {product.refurbishments.map((event, index) => (
                <div
                  key={index}
                  className="mt-2 p-2 border rounded bg-white shadow-sm"
                >
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(Number(event.timestamp) * 1000).toLocaleString()}
                  </p>
                  <p>
                    <strong>Details:</strong> {event.details}
                  </p>
                  <p>
                    <strong>Replaced Components:</strong>{" "}
                    {event.replacedComponents}
                  </p>
                  <p>
                    <strong>Technician:</strong> {event.technicianName}
                  </p>
                  <p>
                    <strong>Certification Hash:</strong> {event.certificateHash}
                  </p>
                  <p>
                    <strong>Warranty Extension:</strong>{" "}
                    {event.warrantyExtension} months
                  </p>
                  <p>
                    <strong>Refurbishment Cost:</strong> ₹
                    {event.refurbishmentCost}
                  </p>
                  <p>
                    <strong>New Serial Number:</strong> {event.newSerialNumber}
                  </p>
                  <p>
                    <strong>Software Update Version:</strong>{" "}
                    {event.softwareUpdateVersion}
                  </p>
                  <p>
                    <strong>Battery Replaced:</strong> {event.batteryReplaced}
                  </p>
                  <p>
                    <strong>Screen Replaced:</strong> {event.screenReplaced}
                  </p>
                  <p>
                    <strong>Motherboard Replaced:</strong>{" "}
                    {event.motherboardReplaced}
                  </p>
                  <p>
                    <strong>Refurbishment Grade:</strong>{" "}
                    {event.refurbishmentGrade}
                  </p>
                  <p>
                    <strong>Updated Physical Condition:</strong>{" "}
                    {event.updatedPhysicalCondition}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {!loading && product === null && (
        <p className="text-red-500 text-lg mt-4">
          ⚠ Product not found. Please check the ID.
        </p>
      )}
    </div>
  );
};

export default ProductDetails;
