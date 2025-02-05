const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PatientDataManagement", function () {
  let PatientDataManagement;
  let patientDataManagement;
  let RewardToken;
  let rewardToken;
  let owner;
  let patient1;
  let patient2;
  let doctor;

  beforeEach(async function () {
    RewardToken = await ethers.getContractFactory("RewardToken");
    rewardToken = await RewardToken.deploy();
    await rewardToken.deployed();

    PatientDataManagement = await ethers.getContractFactory(
      "PatientDataManagement"
    );
    patientDataManagement = await PatientDataManagement.deploy(
      rewardToken.address,
      ethers.utils.parseEther("10")
    );
    await patientDataManagement.deployed();

    [owner, patient1, patient2, doctor] = await ethers.getSigners();

    await rewardToken.transfer(
      patientDataManagement.address,
      ethers.utils.parseEther("1000")
    );
  });

  describe("logHealthData", function () {
    it("should allow a patient to log health data and receive rewards", async function () {
      const glucoseLevel = 120;
      const medicationHash = ethers.utils.formatBytes32String("Medication A");
      const mealsHash = ethers.utils.formatBytes32String("Meal B");
      const exerciseHash = ethers.utils.formatBytes32String("Exercise C");

      await patientDataManagement
        .connect(patient1)
        .logHealthData(glucoseLevel, medicationHash, mealsHash, exerciseHash);

      const patient1Balance = await rewardToken.balanceOf(patient1.address);
      expect(patient1Balance).to.equal(ethers.utils.parseEther("10"));

      const data = await patientDataManagement.viewHealthDataEntry(
        patient1.address,
        0
      );
      expect(data.glucoseLevel).to.equal(glucoseLevel);
      expect(data.medicationHash).to.equal(medicationHash);
      expect(data.mealsHash).to.equal(mealsHash);
      expect(data.exerciseHash).to.equal(exerciseHash);
    });
  });

  describe("updateAccess", function () {
    it("should allow a patient to grant access to their data", async function () {
      await patientDataManagement
        .connect(patient1)
        .updateAccess(doctor.address, true);

      const hasAccess = await patientDataManagement
        .connect(doctor)
        .viewHealthDataEntry(patient1.address, 0);
      expect(hasAccess).to.not.be.reverted;
    });

    it("should not allow non-patients to update access", async function () {
      await expect(
        patientDataManagement.connect(doctor).updateAccess(doctor.address, true)
      ).to.be.revertedWith("Only the patient can perform this action");
    });
  });

  describe("viewHealthDataEntry", function () {
    it("should allow authorized users to view health data", async function () {
      const glucoseLevel = 120;
      const medicationHash = ethers.utils.formatBytes32String("Medication A");
      const mealsHash = ethers.utils.formatBytes32String("Meal B");
      const exerciseHash = ethers.utils.formatBytes32String("Exercise C");

      await patientDataManagement
        .connect(patient1)
        .logHealthData(glucoseLevel, medicationHash, mealsHash, exerciseHash);

      await patientDataManagement
        .connect(patient1)
        .updateAccess(doctor.address, true);

      const data = await patientDataManagement
        .connect(doctor)
        .viewHealthDataEntry(patient1.address, 0);
      expect(data.glucoseLevel).to.equal(glucoseLevel);
    });

    it("should not allow unauthorized users to view health data", async function () {
      const glucoseLevel = 120;
      const medicationHash = ethers.utils.formatBytes32String("Medication A");
      const mealsHash = ethers.utils.formatBytes32String("Meal B");
      const exerciseHash = ethers.utils.formatBytes32String("Exercise C");

      await patientDataManagement
        .connect(patient1)
        .logHealthData(glucoseLevel, medicationHash, mealsHash, exerciseHash);

      await expect(
        patientDataManagement
          .connect(patient2)
          .viewHealthDataEntry(patient1.address, 0)
      ).to.be.revertedWith("Access not authorized");
    });
  });

  describe("setRewardAmount", function () {
    it("should allow the owner to set the reward amount", async function () {
      const newRewardAmount = ethers.utils.parseEther("20");

      await patientDataManagement
        .connect(owner)
        .setRewardAmount(newRewardAmount);

      const glucoseLevel = 120;
      const medicationHash = ethers.utils.formatBytes32String("Medication A");
      const mealsHash = ethers.utils.formatBytes32String("Meal B");
      const exerciseHash = ethers.utils.formatBytes32String("Exercise C");

      await patientDataManagement
        .connect(patient1)
        .logHealthData(glucoseLevel, medicationHash, mealsHash, exerciseHash);

      const patient1Balance = await rewardToken.balanceOf(patient1.address);
      expect(patient1Balance).to.equal(newRewardAmount);
    });

    it("should not allow non-owners to set the reward amount", async function () {
      const newRewardAmount = ethers.utils.parseEther("20");

      await expect(
        patientDataManagement.connect(patient1).setRewardAmount(newRewardAmount)
      ).to.be.revertedWith("Only the owner can perform this action");
    });
  });
});
