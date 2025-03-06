//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;


//Using Inheritance, a child contract can inherit the properties of a parent contract. 
//A contract is inherited into another contract using the “is” keyword


contract  Inheritance{
    uint public num;

    function increment() public{
        num++;
    }
    
}

contract Child is Inheritance {
    function decrement() public{
        num--;
    }

    function incrementAndDecrement () public{
        increment();
        decrement();
    }
    
}