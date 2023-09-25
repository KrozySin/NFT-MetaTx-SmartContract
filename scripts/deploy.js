// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { NomicLabsHardhatPluginError } = require("hardhat/plugins");

async function main() {
  /*const signers = await ethers.getSigners();
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
  console.log("Network:", network.name);*/
}

async function validateEnvironment(hreModule, ethers) {
  const signers = await ethers.getSigners();
  // Find deployer signer in signers.
  let deployer;
  signers.forEach((a) => {
    if (a.address === process.env.ADDRESS) {
      deployer = a;
    }
  });
  if (!deployer) {
    console.log("error");
    throw new Error(`${process.env.ADDRESS} not found in signers!`);
  }

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Network:", hreModule.network.name);
}

async function deployContract(contractName, params, hreModule, ethers) {
  await validateEnvironment(hreModule, ethers);
  console.log("-------------------------");
  if (
    hreModule.network.name === "testnet" ||
    hreModule.network.name === "mainnet"
  ) {
    console.log(`-------Deploying ${contractName}-----------`);
    const nftContract = await ethers.getContractFactory(contractName);
    const nftContractImplementation = await nftContract.deploy(...params);

    await nftContractImplementation.deployed();
    console.log(
      `Deployed ${contractName} Address: ` + nftContractImplementation.address
    );
    console.log("-------------------------");
  }
}

module.exports = {
  deployContract,
};
