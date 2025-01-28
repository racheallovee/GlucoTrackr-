const Reward = require("../models/Reward");

exports.issueReward = async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const reward = new Reward({ userId, amount });
    await reward.save();
    res.status(201).json({ message: "Reward issued successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error issuing reward" });
  }
};

exports.getRewards = async (req, res) => {
  try {
    const rewards = await Reward.find({ userId: req.user.userId });
    res.status(200).json(rewards);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving rewards" });
  }
};
// const web3 = require("../utils/web3");
// const rewardTokenABI = require("../contracts/RewardTokenABI.json"); // Import the RewardToken ABI
// const rewardTokenAddress = process.env.REWARD_TOKEN_ADDRESS; // Use environment variable for the contract address

// // Function to check the token balance of a wallet
// const checkBalance = async (req, res) => {
//   const { walletAddress } = req.params;

//   try {
//     const contract = new web3.eth.Contract(rewardTokenABI, rewardTokenAddress);
//     const balance = await contract.methods.balanceOf(walletAddress).call();

//     res.status(200).json({ success: true, balance });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error checking balance" });
//   }
// };

// module.exports = { checkBalance };
