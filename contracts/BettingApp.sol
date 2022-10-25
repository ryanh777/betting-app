// SPDX-License-Identifier: MIT

pragma solidity >= 0.8.17;

contract House {
    address payable private houseManager;

    constructor () {
        houseManager = payable(msg.sender);
    }

    receive() external payable {}

    function withdraw(uint amount) external {
        require(msg.sender == houseManager, "Only the house can call this method.");
        payable(msg.sender).transfer(amount);
    }

    function pay(address wallet, uint amount) external {
        payable(wallet).transfer(amount);
    }

    function getBalance() external view returns (uint) {
        return address(this).balance;
    }
}

// allow user to pay with metamask -- then create bet after successful payment
// set up nba api so bets automatically fulfill themselves (chainlink??)

contract Bet {
    House house = House(payable(0xc194f6e5e5B6Df0B00407dD5438F1A30cd92c0a0));
    string public name;
    address public bettor;
    uint public payout;

    constructor (string memory name_, address bettor_, uint payout_) {
        name = name_;
        bettor = bettor_;
        payout = payout_;
    }

    function payOut() external {
        house.pay(bettor, payout);
    }
}