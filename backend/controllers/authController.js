const express = require("express");
const Web3 = require("web3");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const web3 = new Web3("https://rpc.sepolia-api.lisk.com/");

app.post("/authenticate", async (req, res) => {
  const { walletAddress, signature } = req.body;

  try {
    const recoveredAddress = web3.eth.accounts.recover(
      "Welcome to GlucoTrackr",
      signature
    );

    if (recoveredAddress.toLowerCase() === walletAddress.toLowerCase()) {
      res
        .status(200)
        .json({ success: true, message: "Authentication successful" });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Authentication failed" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error during authentication" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const jwt = require("jsonwebtoken");
