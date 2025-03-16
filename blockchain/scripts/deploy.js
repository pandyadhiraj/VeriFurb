const hre = require("hardhat");

async function main() {
    const ProductLifecycle = await hre.ethers.getContractFactory("ProductLifecycle");

    // Deploy the contract
    const contract = await ProductLifecycle.deploy();  // Fix here: Awaiting deployment

    // Wait until the contract is actually deployed
    await contract.waitForDeployment();  // Fix here: Use waitForDeployment() instead of deployed()

    console.log(`Contract deployed at: ${await contract.getAddress()}`);  // Fix: getAddress()
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
