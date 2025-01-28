// const express = require("express");
// const { logHealthData } = require("../controllers/dataController");

// const router = express.Router();

// router.post("/logHealthData", logHealthData);

// module.exports = router;

const express = require("express");
const dataController = require("../controllers/dataController");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

router.post("/glucose", authenticateToken, dataController.submitGlucoseData);
router.get("/glucose", authenticateToken, dataController.getGlucoseData);

module.exports = router;
