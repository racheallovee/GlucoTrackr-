const web3 = require("../utils/web3"); // Import your Web3 instance
const rewardTokenABI = require("../contracts/RewardTokenABI.json"); // Import the RewardToken ABI
const rewardTokenAddress = process.env.REWARD_TOKEN_ADDRESS; // Use environment variable for the contract address

// Function to check the token balance of a wallet
const checkBalance = async (req, res) => {
  const { walletAddress } = req.params;

  try {
    const contract = new web3.eth.Contract(rewardTokenABI, rewardTokenAddress);
    const balance = await contract.methods.balanceOf(walletAddress).call();

    res.status(200).json({ success: true, balance });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error checking balance" });
  }
};

module.exports = { checkBalance };
