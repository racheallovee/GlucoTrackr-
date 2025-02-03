// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "contracts/RewardToken.sol";

contract PatientDataManagement {
    struct HealthData {
        uint256 timestamp;
        uint256 glucoseLevel;
        bytes32 medicationHash; // Hash of medication data
        bytes32 mealsHash;      // Hash of meals data
        bytes32 exerciseHash;   // Hash of exercise data
    }

    mapping(address => HealthData[]) private patientData;
    mapping(address => mapping(address => bool)) private accessPermissions;
    mapping(address => bool) private emergencyAccessors;
    RewardToken private rewardToken;
    uint256 private rewardAmount;
    address private owner;

    event DataLogged(address indexed patient, uint256 timestamp, uint256 glucoseLevel, bytes32 medicationHash, bytes32 mealsHash, bytes32 exerciseHash);
    event AccessUpdated(address indexed patient, address indexed accessor, bool isGranted);
    event RewardIssued(address indexed patient, uint256 amount);

    modifier onlyPatient(address _patient) {
        require(_patient == msg.sender, "Only the patient can perform this action");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor(address _rewardTokenAddress, uint256 _initialRewardAmount) {
        rewardToken = RewardToken(_rewardTokenAddress);
        owner = msg.sender;
        rewardAmount = _initialRewardAmount;
    }

    function logHealthData(
        uint256 _glucoseLevel,
        bytes32 _medicationHash,
        bytes32 _mealsHash,
        bytes32 _exerciseHash
    ) public {
        HealthData memory newData = HealthData({
            timestamp: block.timestamp,
            glucoseLevel: _glucoseLevel,
            medicationHash: _medicationHash,
            mealsHash: _mealsHash,
            exerciseHash: _exerciseHash
        });
        patientData[msg.sender].push(newData);
        require(rewardToken.transfer(msg.sender, rewardAmount), "Reward transfer failed");
        emit RewardIssued(msg.sender, rewardAmount);
        emit DataLogged(msg.sender, block.timestamp, _glucoseLevel, _medicationHash, _mealsHash, _exerciseHash);
    }

    function updateAccess(address _accessor, bool _isGranted) public onlyPatient(msg.sender) {
        accessPermissions[msg.sender][_accessor] = _isGranted;
        emit AccessUpdated(msg.sender, _accessor, _isGranted);
    }

    function viewHealthDataEntry(address _patient, uint256 _index) public view returns (HealthData memory) {
        require(
            _patient == msg.sender || accessPermissions[_patient][msg.sender],
            "Access not authorized"
        );
        require(_index < patientData[_patient].length, "Invalid index");
        return patientData[_patient][_index];
    }

    function setRewardAmount(uint256 _newRewardAmount) public onlyOwner {
        rewardAmount = _newRewardAmount;
    }

    

function grantEmergencyAccess(address _accessor) public onlyOwner {
    emergencyAccessors[_accessor] = true;
}

function revokeEmergencyAccess(address _accessor) public onlyOwner {
    emergencyAccessors[_accessor] = false;
}


function viewHealthData(address _patient) public view returns (HealthData[] memory) {
    require(
        _patient == msg.sender || accessPermissions[_patient][msg.sender] || emergencyAccessors[msg.sender],
        "Access not authorized"
    );
    return patientData[_patient];
}

function deleteHealthData(uint256 _index) public {
    require(_index < patientData[msg.sender].length, "Invalid index");
    delete patientData[msg.sender][_index];
}
}
function getAverageGlucoseLevel(address _patient, uint256 _startTime, uint256 _endTime) public view returns (uint256) {
    require(
        _patient == msg.sender || accessPermissions[_patient][msg.sender],
        "Access not authorized"
    );
    uint256 total = 0;
    uint256 count = 0;
    for (uint256 i = 0; i < patientData[_patient].length; i++) {
        if (patientData[_patient][i].timestamp >= _startTime && patientData[_patient][i].timestamp <= _endTime) {
            total += patientData[_patient][i].glucoseLevel;
            count++;
        }
    }
    require(count > 0, "No data in the specified range");
    return total / count;
}

function viewMultiplePatientsData(address[] memory _patients) public view returns (HealthData[][] memory) {
    HealthData[][] memory allData = new HealthData[][](_patients.length);
    for (uint256 i = 0; i < _patients.length; i++) {
        require(
            accessPermissions[_patients[i]][msg.sender],
            "Access not authorized"
        );
        allData[i] = patientData[_patients[i]];
    }
    return allData;
}
