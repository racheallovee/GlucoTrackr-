// Use CommonJS syntax throughout
const { HttpsProxyAgent } = require("https-proxy-agent"); // Correct import for https-proxy-agent
require("dotenv").config(); // Load environment variables from .env
require("@nomicfoundation/hardhat-toolbox");
const proxyUrl = "http://192.168.43.1:7071"; // Replace with your proxy details
const proxyAgent = new HttpsProxyAgent(proxyUrl);

if (!process.env.WALLET_KEY) {
  console.error("Error: WALLET_KEY is not defined in .env file!");
  process.exit(1); // Exit the process if WALLET_KEY is missing
}

module.exports = {
  solidity: "0.8.23", // Solidity version
  networks: {
    "lisk-sepolia": {
      url: "https://rpc.sepolia-api.lisk.com/", // RPC endpoint
      accounts: [process.env.WALLET_KEY], // Load private key from .env
      gasPrice: 1000000000, // Optional: Adjust gas price if needed
      httpOptions: {
        agent: proxyAgent, // Use the proxy agent
      },
      timeout: 200000, // Optional: Increase timeout for network calls
    },
  },
};
