//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0; 

//creating a class
contract Transactions {
  //number variable for transactions
  uint256 transactionCount; 

  //event function
  event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

  //delcare type and properties of Transfer Structure
  struct TransferStruct {
    address sender;
    address receiver; 
    uint amount; 
    string message; 
    uint256 timestamp;
    string keyword;
  }

  //array of objects of diff transactions
  TransferStruct[] transactions; 

  //since this is a class must specify public
  function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public{
    //increment transaction count
    transactionCount += 1;
    //pushing specific transaction into transactions array
    transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));

    //invoke transfer event
    emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
  }

  function getAllTransactions() public view returns (TransferStruct[] memory){
    return transactions;

  }

  function getTransactionCount() public view returns (uint256){
    return transactionCount;
  }

}