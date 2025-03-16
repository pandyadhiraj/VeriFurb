const hre = require("hardhat");

async function main() {
    const contractAddress = "0x2DAadBe288e0fBE5f45f3AA492258ecDa801cE11"; // Replace with actual deployed address
    const ProductLifecycle = await hre.ethers.getContractAt("ProductLifecycle", contractAddress);

    const productId = 1; // The ID of the product we registered

    const product = await ProductLifecycle.getProduct(productId);
    console.log("Product Details:", product);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
