require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");

const { deployContract } = require("./scripts/deploy.js");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("deployContract", "Deploy contracts with parameter name")
  .addPositionalParam("contractName")
  .addPositionalParam("parameterFile")
  .setAction(async (args, hre) => {
    const ethers = hre.ethers;
    const contractArgs = require(`./scripts/arguments/${args.parameterFile}.js`);

    try {
      await deployContract(args.contractName, contractArgs, hre, ethers);
    } catch (ex) {
      console.log(ex);
    }
  });

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.9",
  networks: {
    testnet: {
      url: "https://rpc-mumbai.matic.today/",
      chainId: 80001,
      gasPrice: 20000000000,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    mainnet: {
      url: "https://rpc-mainnet.matic.network",
      chainId: 137,
      gasPrice: 20000000000,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
};
