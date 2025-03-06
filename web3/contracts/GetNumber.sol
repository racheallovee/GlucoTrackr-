// SPDX-License-Identifier: MIT
 pragma solidity ^0.8.7;
 
 contract GetNumber{
 
    uint public num;
  
    function setNumber(uint _num) public {
        num = _num;
    }
 
    function getSquare() public view returns(uint) {
        return num * num;
    }
 }