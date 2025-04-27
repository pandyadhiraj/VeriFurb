import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SmartphoneDetails = () => {
  const { id } = useParams();
  const [smartphone, setSmartphone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSmartphone = async () => {
      try {
        const response = await fetch(`http://localhost:5000/smartphones/${id}`);
        if (!response.ok) {
          throw new Error("Smartphone not found");
        }
        const data = await response.json();
        setSmartphone(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSmartphone();
  }, [id]);

  if (loading)
    return <div className="text-center mt-10 text-white">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;

  return (
    <div className="bg-gray-900 text-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto animate-fadeIn space-y-4 mt-10">
      <h2 className="text-2xl font-bold text-gray-100 text-center mb-6">
        Smartphone Details
      </h2>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Information Section */}
        <div className="bg-gray-800 p-4 rounded-md shadow-sm space-y-4 w-full">
          <h3 className="text-lg font-semibold">Product Information</h3>
          {smartphone && (
            <>
              <p>
                <strong>Brand:</strong> {smartphone.brand}
              </p>
              <p>
                <strong>Model:</strong> {smartphone.model}
              </p>
              <p>
                <strong>OS Version:</strong> {smartphone.osVersion}
              </p>
              <p>
                <strong>IMEI Number:</strong> {smartphone.imeiNumber}
              </p>
              <p>
                <strong>Manufacture Date:</strong> {smartphone.manufactureDate}
              </p>
              <p>
                <strong>Serial Number:</strong> {smartphone.serialNumber}
              </p>
              <p>
                <strong>Warranty Period:</strong> {smartphone.warrantyPeriod}{" "}
                months
              </p>
              <p>
                <strong>Condition:</strong> {smartphone.condition}
              </p>
              <p>
                <strong>Location of Registration:</strong>{" "}
                {smartphone.locationOfRegistration}
              </p>
              <p>
                <strong>Refurbished:</strong>{" "}
                {smartphone.isRefurbished ? "Yes" : "No"}
              </p>
            </>
          )}
        </div>

        {/* Refurbishment History Section */}
        <div className="bg-gray-800 p-4 rounded-md shadow-sm space-y-4 w-full">
          <h3 className="text-lg font-semibold">Refurbishment History</h3>
          {smartphone && smartphone.refurbishments.length > 0 ? (
            smartphone.refurbishments.map((event, index) => (
              <div
                key={index}
                className="mt-2 p-2 border rounded bg-gray-700 shadow-sm"
              >
                <p>
                  <strong>Date:</strong>{" "}
                  {event.timestamp
                    ? new Date(Number(event.timestamp) * 1000).toLocaleString()
                    : "N/A"}
                </p>
                <p>
                  <strong>Details:</strong> {event.details}
                </p>
                <p>
                  <strong>Replaced Components:</strong>{" "}
                  {event.replacedComponents &&
                  event.replacedComponents.length > 0
                    ? event.replacedComponents.join(", ")
                    : "None"}
                </p>
                <p>
                  <strong>Technician Name:</strong> {event.technicianName}
                </p>
                <p>
                  <strong>Certification Hash:</strong> {event.certificateHash}
                </p>
                <p>
                  <strong>Warranty Extension:</strong> {event.warrantyExtension}{" "}
                  months
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
                  <strong>Physical Condition:</strong> {event.physicalCondition}
                </p>
              </div>
            ))
          ) : (
            <p>No refurbishments found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartphoneDetails;
