const express = require("express");
const { logHealthData } = require("../controllers/dataController");

const router = express.Router();

router.post("/logHealthData", logHealthData);

module.exports = router;
