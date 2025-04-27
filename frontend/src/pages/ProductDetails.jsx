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
            <strong>Refurbished:</strong> {product.isRefurbished ? "Yes" : "No"}
          </p>

          <h3 className="text-lg font-semibold mt-4">Status</h3>
          {product.status && (
            <>
              <p>
                <strong>Battery Health:</strong> {product.status.batteryHealth}
              </p>
              <p>
                <strong>Screen Condition:</strong>{" "}
                {product.status.screenCondition}
              </p>
              <p>
                <strong>Storage Capacity:</strong>{" "}
                {product.status.storageCapacity}
              </p>
              <p>
                <strong>RAM Size:</strong> {product.status.ramSize}
              </p>
              <p>
                <strong>Network Status:</strong> {product.status.networkStatus}
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
            </>
          )}

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
