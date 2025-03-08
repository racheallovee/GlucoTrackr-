// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IPatientDataManagement {
    function grantResearcherAccess(address _researcher) external;
    function revokeResearcherAccess(address _researcher) external;
    function getAnonymizedPatientData() external view returns (string memory);
}

contract ResearcherManagement {
    address public admin;
    IPatientDataManagement public patientDataContract;
    
    struct Researcher {
        string name;
        string institution;
        bool isVerified;
    }

    mapping(address => Researcher) public researchers;
    mapping(address => bool) public registeredResearchers;
    
    event ResearcherRegistered(address indexed researcher, string name, string institution);
    event ResearcherVerified(address indexed researcher);
    event AccessGranted(address indexed researcher);
    event AccessRevoked(address indexed researcher);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyVerifiedResearcher() {
        require(researchers[msg.sender].isVerified, "Researcher is not verified");
        _;
    }

    constructor(address _patientDataContract) {
        admin = msg.sender;
        patientDataContract = IPatientDataManagement(_patientDataContract);
    }

    function registerResearcher(string memory _name, string memory _institution) external {
        require(!registeredResearchers[msg.sender], "Researcher already registered");
        researchers[msg.sender] = Researcher(_name, _institution, false);
        registeredResearchers[msg.sender] = true;
        emit ResearcherRegistered(msg.sender, _name, _institution);
    }

    function verifyResearcher(address _researcher) external onlyAdmin {
        require(registeredResearchers[_researcher], "Researcher is not registered");
        researchers[_researcher].isVerified = true;
        emit ResearcherVerified(_researcher);
    }

    function requestAccess() external onlyVerifiedResearcher {
        patientDataContract.grantResearcherAccess(msg.sender);
        emit AccessGranted(msg.sender);
    }

    function revokeAccess() external onlyVerifiedResearcher {
        patientDataContract.revokeResearcherAccess(msg.sender);
        emit AccessRevoked(msg.sender);
    }

    function viewAnonymizedData() external view onlyVerifiedResearcher returns (string memory) {
        return patientDataContract.getAnonymizedPatientData();
    }
}
