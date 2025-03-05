require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.0", // Use your Solidity version
  networks: {
    "lisk-sepolia": {
      url: "https://rpc.sepolia-api.lisk.com", // Lisk Sepolia RPC URL
      accounts: [process.env.PRIVATE_KEY], // Use your wallet's private key
    },
  },
};
