const ethers = require("ethers");
const PatientDataManagementABI = require("../contracts/PatientDataManagementABI.json");

const provider = new ethers.providers.JsonRpcProvider(
  process.env.LISK_SEPOLIA_RPC_URL
);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const patientDataManagement = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  PatientDataManagementABI,
  wallet
);

const logHealthData = async (req, res) => {
  const { glucoseLevel, medication, meals, exercise } = req.body;

  try {
    const tx = await patientDataManagement.logHealthData(
      glucoseLevel,
      medication,
      meals,
      exercise
    );
    await tx.wait();
    res.status(200).json({ success: true, transactionHash: tx.hash });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { logHealthData };
