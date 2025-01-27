// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;  
import "contracts/RewardToken.sol";
contract PatientDataManagement {
    struct HealthData {
        uint256 timestamp;
        uint256 glucoseLevel;  
        string medication;
        string meals;   
        string exercise;
    }

mapping(address => HealthData[]) private patientData;
mapping(address => mapping(address => bool)) private accessPermissions;
RewardToken private rewardToken;
uint256 private rewardAmount = 10 * 10**18; 

 event DataLogged(address indexed patient, uint256 timestamp);
 event AccessUpdated(address indexed patient, address indexed accessor, bool isGranted);
  event RewardIssued(address indexed patient, uint256 amount);

   constructor(address _rewardTokenAddress) {
        rewardToken = RewardToken(_rewardTokenAddress);
    }


    function logHealthData(
        uint256 _glucoseLevel,
        string memory _medication,
        string memory _meals,
        string memory _exercise
    ) public {
        HealthData memory newData = HealthData({
            timestamp: block.timestamp,
            glucoseLevel: _glucoseLevel,
            medication: _medication,
            meals: _meals,
            exercise: _exercise
        });
        patientData[msg.sender].push(newData);
         //rewards patient when they log in data 
        rewardToken.transfer(msg.sender, rewardAmount);
        emit RewardIssued(msg.sender, rewardAmount);
        emit DataLogged(msg.sender, block.timestamp);
    }

    function updateAccess(address _accessor, bool _isGranted) public {
        accessPermissions[msg.sender][_accessor] = _isGranted;
        emit AccessUpdated(msg.sender, _accessor, _isGranted);
    }

    function viewHealthData(address _patient) public view returns (HealthData[] memory) {
        require(
            _patient == msg.sender || accessPermissions[_patient][msg.sender],
            "Access not authorized"
        );
        return patientData[_patient];
    }
}
