const express = require("express");
const router = express.Router();
const { ethers } = require("ethers");
require("dotenv").config();

// Set up provider and wallet
const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
const wallet = new ethers.Wallet(process.env.WALLET_KEY, provider);

// Load the contract
const contractAddress = process.env.CONTRACT_ADDRESS;
const abi = require("../artifacts/contracts/PatientDataManagement.json").abi;
const contract = new ethers.Contract(contractAddress, abi, wallet);

// GET /rewards/balance
router.get("/balance", async (req, res) => {
  const { address } = req.query; // Address passed in query string: /balance?address=0x...
  if (!ethers.utils.isAddress(address)) {
    return res.status(400).send("Invalid Ethereum address");
  }

  try {
    const balance = await contract.balanceOf(address); // Assuming ERC20 or similar contract
    res.status(200).json({ balance: ethers.utils.formatUnits(balance, 18) }); // Convert to readable format
  } catch (err) {
    res.status(500).send("Error fetching balance: " + err.message);
  }
});

// POST /rewards/earn
router.post("/earn", async (req, res) => {
  const { address, amount } = req.body;

  if (!ethers.utils.isAddress(address)) {
    return res.status(400).send("Invalid Ethereum address");
  }
  if (!amount || isNaN(amount)) {
    return res.status(400).send("Invalid amount");
  }

  try {
    const tx = await contract.transfer(
      address,
      ethers.utils.parseUnits(amount, 18) // Convert amount to smallest token unit
    );
    await tx.wait();
    res.status(200).send("Tokens earned successfully");
  } catch (err) {
    res.status(500).send("Error earning tokens: " + err.message);
  }
});

// POST /rewards/redeem
router.post("/redeem", async (req, res) => {
  const { address, amount } = req.body;

  if (!ethers.utils.isAddress(address)) {
    return res.status(400).send("Invalid Ethereum address");
  }
  if (!amount || isNaN(amount)) {
    return res.status(400).send("Invalid amount");
  }

  try {
    const tx = await contract.redeemTokens(
      address,
      ethers.utils.parseUnits(amount, 18)
    );
    await tx.wait();
    res.status(200).send("Tokens redeemed successfully");
  } catch (err) {
    res.status(500).send("Error redeeming tokens: " + err.message);
  }
});

module.exports = router;
