require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");

const app = express();
app.use(cors());
app.use(express.json());

const contractABI =
  require("../blockchain/artifacts/contracts/ProductLifecycle.sol/ProductLifecycle.json").abi; // Updated ABI
const contractAddress = process.env.CONTRACT_ADDRESS; // Load contract address from .env
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545"); // Local Ethereum RPC
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAddress, contractABI, signer);

// ✅ Register a new smartphone
app.post("/smartphones", async (req, res) => {
  try {
    const {
      brand,
      model,
      osVersion,
      imeiNumber,
      manufactureDate,
      serialNumber,
      warrantyPeriod,
      condition,
      locationOfRegistration,
    } = req.body;

    const tx = await contract.registerSmartphone(
      brand,
      model,
      osVersion,
      imeiNumber,
      manufactureDate,
      serialNumber,
      warrantyPeriod,
      condition,
      locationOfRegistration
    );
    await tx.wait();

    res.json({ success: true, message: "Smartphone registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get smartphone details
app.get("/smartphones/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const smartphone = await contract.getSmartphone(id);
    if (smartphone.id == 0) {
      return res.status(404).json({ error: "Smartphone not found" });
    }

    const refurbishments = await contract.getRefurbishments(id); // Fetch refurbishments

    const formattedSmartphone = {
      id: smartphone.id.toString(),
      brand: smartphone.brand,
      model: smartphone.model,
      osVersion: smartphone.osVersion,
      imeiNumber: smartphone.imeiNumber,
      manufactureDate: smartphone.manufactureDate,
      serialNumber: smartphone.serialNumber,
      warrantyPeriod: smartphone.warrantyPeriod.toString(),
      condition: smartphone.condition,
      locationOfRegistration: smartphone.locationOfRegistration,
      isRefurbished: smartphone.isRefurbished,
      refurbishments: refurbishments.map((ref) => ({
        timestamp: ref.timestamp.toString(),
        details: ref.details,
        replacedComponents: ref.replacedComponents,
        technicianName: ref.technicianName,
        certificateHash: ref.certificateHash,
        warrantyExtension: ref.warrantyExtension.toString(),
        refurbishmentCost: ref.refurbishmentCost.toString(),
        newSerialNumber: ref.newSerialNumber,
      })),
    };

    res.json(formattedSmartphone);
  } catch (error) {
    console.error("Error fetching smartphone:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Refurbish a smartphone
app.post("/smartphones/refurbish", async (req, res) => {
  try {
    const {
      id,
      details,
      replacedComponents,
      technicianName,
      certificateHash,
      warrantyExtension,
      refurbishmentCost,
      newSerialNumber,
    } = req.body;

    if (!Array.isArray(replacedComponents)) {
      return res
        .status(400)
        .json({ error: "replacedComponents must be an array" });
    }

    const tx = await contract.refurbishSmartphone(
      id,
      details,
      replacedComponents,
      technicianName,
      certificateHash,
      warrantyExtension,
      refurbishmentCost,
      newSerialNumber
    );
    await tx.wait();

    res.json({
      success: true,
      message: "Smartphone refurbished successfully!",
    });
  } catch (error) {
    console.error("Refurbishment error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
