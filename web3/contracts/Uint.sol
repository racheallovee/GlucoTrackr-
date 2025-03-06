// SPDX-License-Identifier: GPL-3.0
 pragma solidity ^0.8.7;

contract Uint{
    uint a =10;
    uint b=7;

    function answer() public view returns(uint){
        return a*b;
    }
}