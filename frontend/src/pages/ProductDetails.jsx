import React, { useState } from "react";

const ProductDetails = () => {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/smartphones/${productId}`
      );
      if (!response.ok) {
        throw new Error("Product not found");
      }

      const productData = await response.json();
      console.log("Fetched Product Data:", productData);

      setProduct(productData);
    } catch (error) {
      console.error("Error fetching product:", error);
      setProduct(null);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-900 text-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto animate-fadeIn space-y-4">
      <h2 className="text-2xl font-bold text-gray-100">
        Check Product Details
      </h2>

      <input
        type="text"
        placeholder="Enter Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        className="bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-full"
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

      {/* Product Information and Refurbishment History Sections */}
      {product && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Info */}
          <div className="bg-gray-800 p-4 rounded-md shadow-sm space-y-4 w-full">
            <h3 className="text-lg font-semibold">Product Information</h3>
            <p>
              <strong>ID:</strong> {product.id}
            </p>
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
            <p>
              <strong>Model:</strong> {product.model}
            </p>
            <p>
              <strong>OS Version:</strong> {product.osVersion}
            </p>
            <p>
              <strong>IMEI Number:</strong> {product.imeiNumber}
            </p>
            <p>
              <strong>Manufacture Date:</strong> {product.manufactureDate}
            </p>
            <p>
              <strong>Serial Number:</strong> {product.serialNumber}
            </p>
            <p>
              <strong>Warranty Period:</strong> {product.warrantyPeriod} months
            </p>
            <p>
              <strong>Condition:</strong> {product.condition}
            </p>
            <p>
              <strong>Location:</strong> {product.locationOfRegistration}
            </p>
            <p>
              <strong>Refurbished:</strong>{" "}
              {product.isRefurbished ? "Yes" : "No"}
            </p>

            {/* Status Section */}
            {product.status && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Status</h3>
                <p>
                  <strong>Battery Health:</strong>{" "}
                  {product.status.batteryHealth}%
                </p>
                <p>
                  <strong>Screen Condition:</strong>{" "}
                  {product.status.screenCondition}
                </p>
                <p>
                  <strong>Storage Capacity:</strong>{" "}
                  {product.status.storageCapacity} GB
                </p>
                <p>
                  <strong>RAM Size:</strong> {product.status.ramSize} GB
                </p>
                <p>
                  <strong>Network Status:</strong>{" "}
                  {product.status.networkStatus}
                </p>
                <p>
                  <strong>Activation Status:</strong>{" "}
                  {product.status.activationStatus}
                </p>
                <p>
                  <strong>Blacklist Status:</strong>{" "}
                  {product.status.blacklistStatus ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Physical Condition:</strong>{" "}
                  {product.status.physicalCondition}
                </p>
              </div>
            )}
          </div>

          {/* Refurbishment History */}
          <div className="bg-gray-800 p-4 rounded-md shadow-sm space-y-4 w-full">
            <h3 className="text-lg font-semibold">Refurbishment History</h3>
            {product.refurbishments.length > 0 ? (
              product.refurbishments.map((event, index) => (
                <div
                  key={index}
                  className="mt-2 p-2 border rounded bg-gray-700 shadow-sm"
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
                    {event.replacedComponents.join(", ")}
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
                    <strong>Battery Replaced:</strong>{" "}
                    {event.batteryReplaced ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Screen Replaced:</strong>{" "}
                    {event.screenReplaced ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Motherboard Replaced:</strong>{" "}
                    {event.motherboardReplaced ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Refurbishment Grade:</strong>{" "}
                    {event.refurbishmentGrade}
                  </p>
                  <p>
                    <strong>Physical Condition:</strong>{" "}
                    {event.physicalCondition}
                  </p>
                </div>
              ))
            ) : (
              <p>No refurbishments found.</p>
            )}
          </div>
        </div>
      )}

      {/* Error Message */}
      {!loading && product === null && (
        <p className="text-red-500 text-lg mt-4">
          ⚠ Product not found. Please check the ID.
        </p>
      )}
    </div>
  );
};

export default ProductDetails;
