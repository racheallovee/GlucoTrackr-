//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

//A Function Modifier is code that can be run before and/or after a function call.

contract Modifiers {
address owner = 0x5B4CBA0BdafFB8C8A24cEef4e86aF88bC5942255;
address a;
address b;
address c;


modifier onlyOwner() {
    require(msg.sender == owner, "Youre NOT the owner");
_;
// count++;
}


function example1() public onlyOwner {
    a= msg.sender;

}

function example2() public onlyOwner {
    a= msg.sender;

}

function example3() public onlyOwner {
    a= msg.sender;

}

}