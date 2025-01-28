const express = require("express");
const { checkBalance } = require("../controllers/rewardController");

const router = express.Router();

// Define the route for checking token balance
router.get("/checkBalance/:walletAddress", checkBalance);

module.exports = router;
