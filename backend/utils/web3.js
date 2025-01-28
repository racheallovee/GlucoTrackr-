const Web3 = require("web3");
const PatientDataManagementABI = require("../contracts/PatientDataManagementABI.json");
const RewardTokenABI = require("../contracts/RewardTokenABI.json");

const web3 = new Web3("http://localhost:8545"); // Replace with your Ethereum node URL
const patientDataManagementAddress = "0xYourPatientDataManagementAddress";
const rewardTokenAddress = "0xYourRewardTokenAddress";

const patientDataManagementContract = new web3.eth.Contract(
  PatientDataManagementABI,
  patientDataManagementAddress
);
const rewardTokenContract = new web3.eth.Contract(
  RewardTokenABI,
  rewardTokenAddress
);

module.exports = { web3, patientDataManagementContract, rewardTokenContract };
