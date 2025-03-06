// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PatientDataManagement {
    struct HealthData {
        uint256 timestamp;
        uint256 glucoseLevel;
        bytes32 medicationHash;
        bytes32 mealsHash;
        bytes32 exerciseHash;
    }

    mapping(address => HealthData[]) private patientData;
    mapping(address => mapping(address => bool)) private accessPermissions;
    mapping(address => bool) private emergencyAccessors;
    address private owner;

    event DataLogged(address indexed patient, uint256 timestamp, uint256 glucoseLevel, bytes32 medicationHash, bytes32 mealsHash, bytes32 exerciseHash);
    event AccessUpdated(address indexed patient, address indexed accessor, bool isGranted);
    event EmergencyAccessUpdated(address indexed accessor, bool isGranted);

    modifier onlyPatient(address _patient) {
        require(_patient == msg.sender, "Only the patient can perform this action");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
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
        emit DataLogged(msg.sender, block.timestamp, _glucoseLevel, _medicationHash, _mealsHash, _exerciseHash);
    }

    function updateAccess(address _accessor, bool _isGranted) public onlyPatient(msg.sender) {
        accessPermissions[msg.sender][_accessor] = _isGranted;
        emit AccessUpdated(msg.sender, _accessor, _isGranted);
    }

    function grantEmergencyAccess(address _accessor) public onlyOwner {
        emergencyAccessors[_accessor] = true;
        emit EmergencyAccessUpdated(_accessor, true);
    }

    function revokeEmergencyAccess(address _accessor) public onlyOwner {
        emergencyAccessors[_accessor] = false;
        emit EmergencyAccessUpdated(_accessor, false);
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
}