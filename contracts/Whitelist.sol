// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Whitelist {
    address public owner;
    mapping(address => bool) public whitelisted;

    event AddressAdded(address indexed account);
    event AddressRemoved(address indexed account);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addAddressToWhitelist(address _account) external onlyOwner {
        require(!whitelisted[_account], "Address is already whitelisted");
        whitelisted[_account] = true;
        emit AddressAdded(_account);
    }

    function removeAddressFromWhitelist(address _account) external onlyOwner {
        require(whitelisted[_account], "Address is not whitelisted");
        whitelisted[_account] = false;
        emit AddressRemoved(_account);
    }

    function isWhitelisted(address _account) external view returns (bool) {
        return whitelisted[_account];
    }
}
