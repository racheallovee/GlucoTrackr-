const { ethers } = require("hardhat");

async function main() {
  const PatientDataManagement = await ethers.getContractFactory("NFT");
  const patientdatamanagement = await PatientDataManagement.deploy();

  await patientdatamanagement.deployed();

  console.log(
    "PatientdatamanagementContract Deployed at " + patientdatamanagement.address
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
