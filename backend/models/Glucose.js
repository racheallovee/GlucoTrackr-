const mongoose = require("mongoose");

// Define the Glucose schema
const glucoseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  glucoseLevel: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Automatically set to the current date and time
  },
});

// Create the Glucose model
const Glucose = mongoose.model("Glucose", glucoseSchema);

module.exports = Glucose;
