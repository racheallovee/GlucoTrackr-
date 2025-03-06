//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract ErrorHandling {
    //require 
    // used to check any input or external condition before executing a function. 


address a;
address owner = 0x5B4CBA0BdafFB8C8A24cEef4e86aF88bC5942255;

    function example1() public {
        a= msg.sender;
        require(msg.sender == owner , "Youre not the owner");
    }

    //revert
    //We use the if keyword along with it as shown below

    // function example2() public {
    //     if (msg.sender != owner){
    //         revert ("You're NOT the owner");
    //     }

    // }

    //assert 
    // usually used to check for a condition that should never be false

    uint num1 = 1;
  uint num2 = 4;

  function assertNum() public view {
    uint num3 = num1+num2;
    assert(num3==5 );
  }

}