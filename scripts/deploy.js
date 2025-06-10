const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with account:", deployer.address);
    console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

    // Deploy NekoinsToken
    console.log("\n🚀 Deploying NekoinsToken...");
    const Token = await hre.ethers.getContractFactory("NekoinsToken");
    const token = await Token.deploy();
    await token.waitForDeployment();

    console.log("✅ NekoinsToken deployed to:", await token.getAddress());

    // Deploy DonaxBadgeNFT
    console.log("\n🚀 Deploying DonaxBadgeNFT...");
    const Badge = await hre.ethers.getContractFactory("DonaxBadgeNFT");
    const badge = await Badge.deploy();
    await badge.waitForDeployment();

    console.log("✅ DonaxBadgeNFT deployed to:", await badge.getAddress());

    // Verification info
    console.log("\n📝 Contract verification commands:");
    console.log(`npx hardhat verify --network sepolia ${await token.getAddress()}`);
    console.log(`npx hardhat verify --network sepolia ${await badge.getAddress()}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Deployment failed:");
        console.error(error);
        process.exit(1);
    });