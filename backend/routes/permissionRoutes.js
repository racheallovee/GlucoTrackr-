const express = require("express");
const router = express.Router();

// POST /permissions/grant
router.post("/grant", async (req, res) => {
  const { patientAddress, accessorAddress } = req.body;
  try {
    const tx = await contract.grantAccess(patientAddress, accessorAddress);
    await tx.wait();
    res.status(200).send("Access granted successfully");
  } catch (err) {
    res.status(500).send("Error granting access: " + err.message);
  }
});

// POST /permissions/revoke
router.post("/revoke", async (req, res) => {
  const { patientAddress, accessorAddress } = req.body;
  try {
    const tx = await contract.revokeAccess(patientAddress, accessorAddress);
    await tx.wait();
    res.status(200).send("Access revoked successfully");
  } catch (err) {
    res.status(500).send("Error revoking access: " + err.message);
  }
});

module.exports = router;
