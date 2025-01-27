const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ethers } = require("ethers");
const authRoutes = require("./routes/authRoutes");
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Temporary storage for nonces (In production, use a database)
const nonces = {};
app.use("/auth", authRoutes);

// Route 1: Generate a nonce for the user to sign
app.post("/auth/request-nonce", (req, res) => {
  const { walletAddress } = req.body;

  if (!ethers.utils.isAddress(walletAddress)) {
    return res.status(400).json({ error: "Invalid wallet address" });
  }

  // Generate a random nonce
  const nonce = Math.floor(Math.random() * 1000000).toString();

  // Store the nonce (in a real app, use a database)
  nonces[walletAddress] = nonce;

  res.json({ nonce });
});

// Route 2: Verify the signed message
app.post("/auth/verify", async (req, res) => {
  const { walletAddress, signature } = req.body;

  if (!walletAddress || !signature) {
    return res
      .status(400)
      .json({ error: "Missing walletAddress or signature" });
  }

  const nonce = nonces[walletAddress];
  if (!nonce) {
    return res
      .status(400)
      .json({ error: "No nonce found for this wallet address" });
  }

  try {
    // Recover the address from the signature
    const recoveredAddress = ethers.utils.verifyMessage(nonce, signature);

    if (recoveredAddress.toLowerCase() === walletAddress.toLowerCase()) {
      // Authentication successful
      delete nonces[walletAddress]; // Clear the nonce after successful verification
      return res.json({ success: true, message: "Authentication successful" });
    } else {
      return res
        .status(401)
        .json({ success: false, error: "Invalid signature" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to verify signature" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
