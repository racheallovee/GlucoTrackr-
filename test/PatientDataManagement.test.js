const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PatientDataManagement", function () {
  let patientDataManagement;
  let owner, patient;

  beforeEach(async function () {
    [owner, patient] = await ethers.getSigners();
    const PatientDataManagement = await ethers.getContractFactory(
      "PatientDataManagement"
    );
    patientDataManagement = await PatientDataManagement.deploy(
      "0xRewardTokenAddress"
    );
  });

  it("Should log health data and emit an event", async function () {
    await expect(
      patientDataManagement
        .connect(patient)
        .logHealthData(120, "Insulin", "Low-carb breakfast", "30-minute walk")
    )
      .to.emit(patientDataManagement, "DataLogged")
      .withArgs(patient.address, await ethers.provider.getBlockNumber());
  });
});
