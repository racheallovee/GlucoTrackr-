//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

//events 
//Events are used to store any information regarding the smart contract in the transaction logs.
//Events are used to store any information regarding the smart contract in the transaction logs.
//

contract Events{
    event productDetails(uint productID, uint price);

    function addProduct(uint _productID, uint _price) public {
        emit productDetails(_productID, _price);
    }
}