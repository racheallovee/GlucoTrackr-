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
