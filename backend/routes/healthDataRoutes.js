const express = require("express");
const { ethers, JsonRpcProvider } = require("ethers");
require("dotenv").config();

const router = express.Router();

//provider
const provider = new JsonRpcProvider(process.env.INFURA_URL);
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);
const contractAddress = process.env.CONTRACT_ADDRESS;
const abi = require("../artifacts/contracts/PatientDataManagement.json").abi;
const contract = new ethers.Contract(contractAddress, abi, wallet);

//health data
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

router.get("/view/:patientAddress", async (req, res) => {
  const patientAddress = req.params.patientAddress; // Address of the patient

  try {
    const data = await contract.viewHealthData(patientAddress);
    res.status(200).json(data); // Return the health data as JSON
  } catch (err) {
    res.status(500).send("Error fetching health data: " + err.message);
  }
});

//to log new health data:
router.post("/", async (req, res) => {
  const { glucoseLevel, medication, meals, exercise } = req.body;
  try {
    const tx = await contract.logHealthData(
      glucoseLevel,
      medication,
      meals,
      exercise
    );
    await tx.wait();
    res.status(200).send("Health data submitted successfully");
  } catch (err) {
    res.status(500).send("Error submitting health data: " + err.message);
  }
});

module.exports = router;
