// SPDX-License-Identifier: GPL-3.0
 pragma solidity ^0.8.7;

 contract String {
    string message;

    function setMessage(string calldata _message) public{
        message = _message;
    }

    function getMessage() public view returns(string memory){
        return message;
    }

    function getMessageLength() public view returns(uint){
        return bytes(message).length;
    }
 }