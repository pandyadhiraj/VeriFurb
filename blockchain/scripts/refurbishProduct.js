const hre = require("hardhat");

async function main() {
    const contractAddress = "0x2DAadBe288e0fBE5f45f3AA492258ecDa801cE11"; // Replace with actual deployed address
    const ProductLifecycle = await hre.ethers.getContractAt("ProductLifecycle", contractAddress);

    const productId = 1; // The ID of the product we registered
    const certificateHash = "abc123def456"; // Mock certificate hash

    const tx = await ProductLifecycle.refurbishProduct(productId, certificateHash);
    await tx.wait();

    console.log(`Product ${productId} refurbished with certificate hash: ${certificateHash}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
