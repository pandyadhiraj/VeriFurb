const hre = require("hardhat");

async function main() {
  const ProductLifecycle = await hre.ethers.getContractFactory(
    "ProductLifecycle"
  );
  const productLifecycle = await ProductLifecycle.deploy(); // Deploy contract

  await productLifecycle.waitForDeployment(); // Wait for deployment

  console.log(
    `ProductLifecycle deployed to: ${await productLifecycle.getAddress()}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
