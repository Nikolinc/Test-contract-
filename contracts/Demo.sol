// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Demo{

    address owner;
    constructor(){
        owner = msg.sender;
    }

    event Paid(address indexed _from, uint _amount, uint _timestamp);

    receive() external payable{
        pay();
    }

    function pay() public payable {
       emit Paid(msg.sender, msg.value, block.timestamp);
    } 

    modifier onlyOwner(){
        require(msg.sender == owner, "you are not an owner!");
         _;
    }

      modifier notNull(address _to){
        require(_to != address(0), "incorrect address!");
         _;
    }

    function withdraw(address payable _to) external onlyOwner notNull(_to){       
        _to.transfer(address(this).balance);
    }
}