const hre = require("hardhat");

async function main() {
    const contractAddress = "0x2DAadBe288e0fBE5f45f3AA492258ecDa801cE11"; // Replace with actual deployed address
    const ProductLifecycle = await hre.ethers.getContractAt("ProductLifecycle", contractAddress);

    const tx = await ProductLifecycle.registerProduct("Refurbished Laptop");
    await tx.wait(); // Wait for the transaction to be confirmed

    console.log("Product registered successfully!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
