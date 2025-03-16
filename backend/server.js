require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");

const app = express();
app.use(cors());
app.use(express.json());

const contractABI = require("./ProductLifecycle.json").abi; // Smart contract ABI
const contractAddress = process.env.CONTRACT_ADDRESS; // Load contract address from .env
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545"); // Local Ethereum RPC
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAddress, contractABI, signer);

// Register Product
app.post("/products", async (req, res) => {
    try {
        const { name } = req.body;
        const tx = await contract.registerProduct(name);
        await tx.wait();
        res.json({ success: true, message: "Product registered successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Product Details
app.get("/products/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const product = await contract.getProduct(id);

        // Convert BigInt values to strings
        const formattedProduct = {
            id: product.id.toString(), 
            name: product.name,
            owner: product.owner,
            isRefurbished: product.isRefurbished,
            certificateHash: product.certificateHash
        };

        res.json(formattedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
