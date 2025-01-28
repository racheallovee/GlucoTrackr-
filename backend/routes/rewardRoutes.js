// const express = require("express");
// const { checkBalance } = require("../controllers/rewardController");

// const router = express.Router();

// // Define the route for checking token balance
// router.get("/checkBalance/:walletAddress", checkBalance);

// module.exports = router;

const express = require("express");
const rewardController = require("../controllers/rewardController");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

router.post("/reward", authenticateToken, rewardController.issueReward);
router.get("/rewards", authenticateToken, rewardController.getRewards);

module.exports = router;
