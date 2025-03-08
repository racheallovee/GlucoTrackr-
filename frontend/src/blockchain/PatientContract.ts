
import { ethers } from "ethers";

export const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Replace with actual deployed contract address

export const CONTRACT_ABI = [
  "function logHealthData(uint256 _glucoseLevel, bytes32 _medicationHash, bytes32 _mealsHash, bytes32 _exerciseHash)",
  "function updateAccess(address _accessor, bool _isGranted)",
  "function viewHealthData(address _patient) view returns (tuple(uint256 timestamp, uint256 glucoseLevel, bytes32 medicationHash, bytes32 mealsHash, bytes32 exerciseHash)[])",
  "function deleteHealthData(uint256 _index)",
  "function getAverageGlucoseLevel(address _patient, uint256 _startTime, uint256 _endTime) view returns (uint256)",
  "event DataLogged(address indexed patient, uint256 timestamp, uint256 glucoseLevel, bytes32 medicationHash, bytes32 mealsHash, bytes32 exerciseHash)",
  "event AccessUpdated(address indexed patient, address indexed accessor, bool isGranted)"
];

export interface HealthData {
  timestamp: number;
  glucoseLevel: number;
  medicationHash: string;
  mealsHash: string;
  exerciseHash: string;
}

export const getContract = async (provider: ethers.providers.Web3Provider) => {
  const signer = provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};

export const stringToBytes32 = (text: string): string => {
  return ethers.utils.formatBytes32String(text);
};

export const bytes32ToString = (bytes32: string): string => {
  return ethers.utils.parseBytes32String(bytes32);
};
