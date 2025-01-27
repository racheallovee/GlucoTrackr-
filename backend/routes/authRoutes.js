const express = require("express");
const router = express.Router();
const ethers = require("ethers");

// Store nonces temporarily (for testing purposes)
const nonces = {};

// Step 1: Request a Nonce
router.post("/request-nonce", (req, res) => {
  const { walletAddress } = req.body;

  if (!walletAddress) {
    return res.status(400).json({ message: "Wallet address is required" });
  }

  // Generate a random nonce (for demonstration)
  const nonce = Math.floor(Math.random() * 1000000).toString();
  nonces[walletAddress] = nonce;

  res.json({ nonce });
});

// Step 2: Verify the Signed Message
router.post("/verify", async (req, res) => {
  const { walletAddress, signature } = req.body;

  if (!walletAddress || !signature) {
    return res
      .status(400)
      .json({ message: "Wallet address and signature are required" });
  }

  const nonce = nonces[walletAddress];
  if (!nonce) {
    return res
      .status(400)
      .json({ message: "Nonce not found for this wallet address" });
  }

  try {
    // Recover the signer address from the signature
    const recoveredAddress = ethers.utils.verifyMessage(nonce, signature);

    if (recoveredAddress.toLowerCase() === walletAddress.toLowerCase()) {
      return res.json({
        success: true,
        message: "Authentication successful",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Authentication failed",
      });
    }
  } catch (error) {
    console.error("Verification error:", error);
    return res
      .status(500)
      .json({ message: "Server error during verification" });
  }
});

module.exports = router;
