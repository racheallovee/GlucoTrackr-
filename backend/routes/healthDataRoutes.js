const express = require("express");
const { ethers } = require("ethers");

const router = express.Router();

// Setting up the provider and contract
const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);
const contractAddress = "<Your_Contract_Address>";
const abi = require("../artifacts/contracts/YourContract.json").abi;
const contract = new ethers.Contract(contractAddress, abi, wallet);

// Route to log health data
router.post("/log", async (req, res) => {
  const { glucoseLevel, medication, meals, exercise } = req.body;

  try {
    const tx = await contract.logHealthData(
      glucoseLevel,
      medication,
      meals,
      exercise
    );
    await tx.wait();
    res.status(200).send("Health data logged successfully");
  } catch (err) {
    res.status(500).send("Error logging health data: " + err.message);
  }
});

// Route to retrieve health data (example placeholder)
router.get("/view", async (req, res) => {
  try {
    const data = await contract.getHealthData(); // Replace with your contract's retrieval function
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("Error fetching health data: " + err.message);
  }
});

module.exports = router;
