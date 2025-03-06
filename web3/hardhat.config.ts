import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.7",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: process.env.WALLET_KEY ? [process.env.WALLET_KEY] : [],
    },
  },
};

export default config;

// import { HardhatUserConfig } from "hardhat/config";
// import "@nomicfoundation/hardhat-toolbox";

// require("dotenv").config();

// const config: HardhatUserConfig = {
//   solidity: "0.8.23",
//   networks: {
//     // for testnet
//     "lisk-sepolia": {
//       url: "https://rpc.sepolia-api.lisk.com",
//       accounts: [process.env.WALLET_KEY as string],
//       gasPrice: 1000000000,
//     },
//   },
// };

// export default config;
