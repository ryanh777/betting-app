// SPDX-License-Identifier: MIT

pragma solidity >= 0.8.17;

// import '@chainlink/contracts/src/v0.8/ChainlinkClient.sol';

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

    function createBet(address bettor, uint payout) external returns (Bet) {
        Bet bet = new Bet(bettor, payout, payable(address(this)));
        return bet;
    }
}

// contract Bet  is ChainlinkClient {
contract Bet {
    House house;
    address public bettor;
    uint public payout;

    constructor (address bettor_, uint payout_, address payable house_) {
        house = House(house_);
        bettor = bettor_;
        payout = payout_;
    }

    function payOut() external {
        house.pay(bettor, payout);
    }
}