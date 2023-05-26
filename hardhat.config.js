require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("hardhat-faucet");
require("@nomiclabs/hardhat-etherscan");


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  etherscan: {
    url: "https://api.etherscan.io/api",
    apiKey: String(process.env.ETHERSCAN_API)
  },
  networks: {
    sepolia: {
      url: String(process.env.INFURA_SEPOLIA_ENDPOINT),
      accounts: [process.env.PRIVATE_KEY],
    }
  }
};