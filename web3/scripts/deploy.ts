import { ethers } from "hardhat";

async function main() {
  const signers = await ethers.getSigners();
  if (signers.length === 0) {
    throw new Error("No deployer found. Check your .env and Hardhat config.");
  }

  const deployer = signers[0];
  console.log(
    `Deploying contracts with account: ${await deployer.getAddress()}`
  );

  const contracts = [
    "PatientDataManagement",
    "BookStore",
    "Boolean",
    "ErrorHandling",
    "Events",
    "Example",

    "GetNumber",
    "Inheritance",
    "Mapping",
    "Modifiers",
    "String",
    "Uint",
  ];

  const deployedContracts: { [key: string]: string } = {};

  for (const contractName of contracts) {
    console.log(`Deploying ${contractName}...`);

    const ContractFactory = await ethers.getContractFactory(
      contractName,
      deployer
    );
    let contract;

    if (contractName === "Constructor") {
      contract = await ContractFactory.deploy(100); // Pass constructor argument
    } else {
      contract = await ContractFactory.deploy();
    }

    await contract.waitForDeployment();
    const contractAddress = await contract.getAddress();

    deployedContracts[contractName] = contractAddress;
    console.log(`${contractName} deployed at: ${contractAddress}`);
  }

  console.log("\n✅ Deployment complete! Contracts:");
  console.table(deployedContracts);
}

// Run the deployment and handle errors
main().catch((error) => {
  console.error("Deployment error:", error);
  process.exit(1);
});

// import { ethers } from "hardhat";

// async function main() {
//   const contracts = [
//     "PatientDataManagement",
//     "BookStore",
//     "Boolean",

//     "ErrorHandling",
//     "Events",
//     "Example",
//     "GetNumber",
//     "Inheritance",
//     "Mapping",
//     "Modifiers",
//     "String",
//     "Uint",
//   ]; // All contract names from your 'contracts' folder

//   for (const contractName of contracts) {
//     console.log(`Deploying ${contractName}...`);

//     // Get the contract factory
//     const Contract = await ethers.getContractFactory(contractName);

//     // Deploy the contract
//     const contract = await Contract.deploy();

//     // Wait for deployment
//     await contract.waitForDeployment();

//     // Log the contract address
//     console.log(`${contractName} Contract Deployed at: ${contract.target}`);
//   }
// }

// // Run the deployment script and handle errors
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
