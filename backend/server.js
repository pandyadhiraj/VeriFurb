require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");

const app = express();
app.use(cors());
app.use(express.json());

const contractABI =
  require("../blockchain/artifacts/contracts/ProductLifecycle.sol/ProductLifecycle.json").abi;
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
    const [smartphone, status] = await contract.getSmartphone(id);
    if (smartphone.id == 0) {
      return res.status(404).json({ error: "Smartphone not found" });
    }

    const refurbishments = await contract.getRefurbishments(id);

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
      status: {
        batteryHealth: status.batteryHealth,
        screenCondition: status.screenCondition,
        storageCapacity: status.storageCapacity,
        ramSize: status.ramSize,
        networkStatus: status.networkStatus,
        activationStatus: status.activationStatus,
        blacklistStatus: status.blacklistStatus,
        physicalCondition: status.physicalCondition,
      },
      refurbishments: refurbishments.map((ref) => ({
        timestamp: ref.timestamp.toString(),
        details: ref.details,
        technicianName: ref.technicianName,
        certificateHash: ref.certificateHash,
        warrantyExtension: ref.warrantyExtension.toString(),
        refurbishmentCost: ref.refurbishmentCost.toString(),
        newSerialNumber: ref.newSerialNumber,
        softwareUpdateVersion: ref.softwareUpdateVersion,
        batteryReplaced: ref.batteryReplaced,
        screenReplaced: ref.screenReplaced,
        motherboardReplaced: ref.motherboardReplaced,
        refurbishmentGrade: ref.refurbishmentGrade,
        physicalCondition: ref.physicalCondition,
        replacedComponents: ref.replacedComponents,
      })),
    };

    res.json(formattedSmartphone);
  } catch (error) {
    console.error("Error fetching smartphone:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Set smartphone status
app.post("/smartphones/status", async (req, res) => {
  try {
    const {
      id,
      batteryHealth,
      screenCondition,
      storageCapacity,
      ramSize,
      networkStatus,
      activationStatus,
      blacklistStatus,
      physicalCondition,
    } = req.body;

    const tx = await contract.setSmartphoneStatus(id, {
      batteryHealth,
      screenCondition,
      storageCapacity,
      ramSize,
      networkStatus,
      activationStatus,
      blacklistStatus,
      physicalCondition,
    });

    await tx.wait();
    res.json({
      success: true,
      message: "Smartphone status updated successfully!",
    });
  } catch (error) {
    console.error("Status update error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Refurbish a smartphone (🔴 FIXED STRUCT PASSING)
app.post("/smartphones/refurbish", async (req, res) => {
  try {
    const {
      id,
      details,
      technicianName,
      certificateHash,
      warrantyExtension,
      refurbishmentCost,
      newSerialNumber,
      softwareUpdateVersion,
      batteryReplaced,
      screenReplaced,
      motherboardReplaced,
      refurbishmentGrade,
      physicalCondition,
      replacedComponents,
    } = req.body;

    if (!Array.isArray(replacedComponents)) {
      return res
        .status(400)
        .json({ error: "replacedComponents must be an array" });
    }

    // 🔥 Call refurbishSmartphone first
    const tx1 = await contract.refurbishSmartphone(id, [
      Math.floor(Date.now() / 1000), // Timestamp
      details,
      technicianName,
      certificateHash,
      warrantyExtension,
      refurbishmentCost,
      newSerialNumber,
      softwareUpdateVersion,
      batteryReplaced,
      screenReplaced,
      motherboardReplaced,
      refurbishmentGrade,
      physicalCondition,
      replacedComponents,
    ]);
    await tx1.wait();

    // 🔥 THEN call markAsRefurbished
    const tx2 = await contract.markAsRefurbished(id);
    await tx2.wait();

    res.json({
      success: true,
      message: "Smartphone refurbished successfully!",
    });
  } catch (error) {
    console.error("Refurbishment error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Mark smartphone as refurbished
app.post("/smartphones/mark-refurbished", async (req, res) => {
  try {
    const { id } = req.body;

    const tx = await contract.markAsRefurbished(id);
    await tx.wait();

    res.json({ success: true, message: "Smartphone marked as refurbished!" });
  } catch (error) {
    console.error("Error marking refurbished:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
