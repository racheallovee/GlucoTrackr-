const mongoose = require("mongoose");

// Define the Reward schema
const rewardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Automatically set to the current date and time
  },
});

// Create the Reward model
const Reward = mongoose.model("Reward", rewardSchema);

module.exports = Reward;
