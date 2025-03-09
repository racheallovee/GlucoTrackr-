// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


interface IPatientDataManagement {
    function grantDoctorAccess(address _doctor, address _patient) external;
    function revokeDoctorAccess(address _doctor, address _patient) external;
    function getPatientRecord(address _patient) external view returns (string memory);
}

contract DoctorManagement {
    address public admin;
    IPatientDataManagement public patientDataContract;
    
    struct Doctor {
        string name;
        string specialization;
        bool isVerified;
    }

    mapping(address => Doctor) public doctors;
    mapping(address => bool) public registeredDoctors;
    
    event DoctorRegistered(address indexed doctor, string name, string specialization);
    event DoctorVerified(address indexed doctor);
    event AccessRequested(address indexed doctor, address indexed patient);
    event AccessRevoked(address indexed doctor, address indexed patient);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyVerifiedDoctor() {
        require(doctors[msg.sender].isVerified, "Doctor is not verified");
        _;
    }

    constructor(address _patientDataContract) {
        admin = msg.sender;
        patientDataContract = IPatientDataManagement(_patientDataContract);
    }

    function registerDoctor(string memory _name, string memory _specialization) external {
        require(!registeredDoctors[msg.sender], "Doctor already registered");
        doctors[msg.sender] = Doctor(_name, _specialization, false);
        registeredDoctors[msg.sender] = true;
        emit DoctorRegistered(msg.sender, _name, _specialization);
    }

    function verifyDoctor(address _doctor) external onlyAdmin {
        require(registeredDoctors[_doctor], "Doctor is not registered");
        doctors[_doctor].isVerified = true;
        emit DoctorVerified(_doctor);
    }

    function requestAccessToPatient(address _patient) external onlyVerifiedDoctor {
        patientDataContract.grantDoctorAccess(msg.sender, _patient);
        emit AccessRequested(msg.sender, _patient);
    }

    function revokeAccessFromPatient(address _patient) external onlyVerifiedDoctor {
        patientDataContract.revokeDoctorAccess(msg.sender, _patient);
        emit AccessRevoked(msg.sender, _patient);
    }

    function viewPatientRecord(address _patient) external view onlyVerifiedDoctor returns (string memory) {
        return patientDataContract.getPatientRecord(_patient);
    }
}
