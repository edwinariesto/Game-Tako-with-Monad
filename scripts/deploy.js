const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "MONAD");

  // Deploy TAKOGame
  console.log("\nDeploying TAKOGame...");
  const TAKOGame = await hre.ethers.getContractFactory("TAKOGame", deployer);

  // Get fee data from network
  const feeData = await hre.ethers.provider.getFeeData();
  console.log("Fee data:", {
    gasPrice: feeData.gasPrice ? hre.ethers.formatUnits(feeData.gasPrice, 'gwei') + ' gwei' : 'N/A',
    maxFeePerGas: feeData.maxFeePerGas ? hre.ethers.formatUnits(feeData.maxFeePerGas, 'gwei') + ' gwei' : 'N/A',
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas ? hre.ethers.formatUnits(feeData.maxPriorityFeePerGas, 'gwei') + ' gwei' : 'N/A'
  });

  // Deploy with explicit gas settings
  const deployOptions = {};
  if (feeData.maxFeePerGas && feeData.maxPriorityFeePerGas) {
    deployOptions.maxFeePerGas = feeData.maxFeePerGas;
    deployOptions.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
  } else if (feeData.gasPrice) {
    deployOptions.gasPrice = feeData.gasPrice;
  }

  console.log("Deploy options:", deployOptions);
  const takoGame = await TAKOGame.deploy(deployOptions);
  console.log("Transaction sent, waiting for deployment...");
  await takoGame.waitForDeployment();
  const takoGameAddress = await takoGame.getAddress();
  console.log("TAKOGame deployed to:", takoGameAddress);

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    timestamp: new Date().toISOString(),
    deployer: deployer.address,
    contracts: {
      TAKOGame: takoGameAddress
    }
  };

  // Save to file
  const deployDir = path.join(__dirname, "..", "deployments");
  fs.mkdirSync(deployDir, { recursive: true });
  const deployPath = path.join(deployDir, `${hre.network.name}_${Date.now()}.json`);
  fs.writeFileSync(deployPath, JSON.stringify(deploymentInfo, null, 2));
  console.log("\nDeployment info saved to:", deployPath);

  // Update frontend config
  const frontendConfigPath = path.join(__dirname, "..", "public", "assets", "js", "blockchain-config.js");
  const frontendConfig = `// Blockchain Configuration
// Auto-generated on ${deploymentInfo.timestamp}
const BLOCKCHAIN_CONFIG = {
  CONTRACT_ADDRESS: "${takoGameAddress}",
  NETWORK_NAME: "${hre.network.name}",
  CHAIN_ID: 10143,
  RPC_URL: "https://testnet-rpc.monad.xyz"
};
`;
  fs.writeFileSync(frontendConfigPath, frontendConfig);
  console.log("Frontend config updated at:", frontendConfigPath);

  console.log("\n========================================");
  console.log("DEPLOYMENT COMPLETE!");
  console.log("========================================");
  console.log("TAKOGame:", takoGameAddress);
  console.log("\nOwner address:", deployer.address);
  console.log("\nNext steps:");
  console.log("1. Fund the contract with MONAD for payouts");
  console.log("2. Add CONTRACT_ADDRESS to frontend config");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });