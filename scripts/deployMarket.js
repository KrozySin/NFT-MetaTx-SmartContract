// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { network } = require("hardhat");
const hre = require("hardhat");
const { NomicLabsHardhatPluginError } = require("hardhat/plugins");

async function main() {
  const signers = await ethers.getSigners();
  // Find deployer signer in signers.
  let deployer;
  signers.forEach((a) => {
    if (a.address === process.env.ADDRESS) {
      deployer = a;
    }
  });
  if (!deployer) {
    throw new Error(`${process.env.ADDRESS} not found in signers!`);
  }

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Network:", network.name);

  await deployNFT();
}

async function deployNFT() {
  console.log("-------------------------");
  console.log("Deploying NicoFT...");
  if (network.name === "testnet" || network.name === "mainnet") {
    console.log("-------Deploying Market Proxy-----------");
    const nftProxy = await ethers.getContractFactory("NicoFTMarketProxy");
    const nftProxyImplementation = await nftProxy.deploy(
      "0x41Add01f007308c356d22e872BC46C1193015667",
      []
    );

    await nftProxyImplementation.deployed();
    console.log(
      "Deployed Market Proxy Address: " + nftProxyImplementation.address
    );

    console.log("-------Deploying Market Logic-----------");
    const nftLogic = await ethers.getContractFactory("NicoFTMarketLogic");
    const nftLogicImplementation = await nftLogic.deploy();

    await nftLogicImplementation.deployed();
    console.log(
      "Deployed Market Logic Address: " + nftLogicImplementation.address
    );
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
