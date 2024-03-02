// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
// import oz ownable contract

import "@openzeppelin/contracts/access/Ownable.sol";

// Whitelist contract to manage the whitelisted addresses of approved auditors.
// only owner ( multi-sig wallet ) can add or remove addresses from the whitelist.
// Whitelisted addresses are allowed to publish audit reports.

contract Whitelist is Ownable {
    mapping(address => bool) public whitelisted;

    event AddressAdded(address indexed account);
    event AddressRemoved(address indexed account);

    constructor(address _owner) Ownable(_owner) {}

    /// @notice : this a temporary way to manage new address added to whitelist. this should be through a DAO approval

    function addAddressToWhitelist(address _account) external onlyOwner {
        if (whitelisted[_account]) revert AlreadyAddeded(_account);
        whitelisted[_account] = true;
        emit AddressAdded(_account);
    }

    /// @notice : this a temporary way to manage remove address from whitelist. this should be through a DAO approval
    function removeAddressFromWhitelist(address _account) external onlyOwner {
        // only approved auditors can be removed from the whitelist
        if (!whitelisted[_account]) revert NotExist(_account);
        whitelisted[_account] = false;
        emit AddressRemoved(_account);
    }

    function isWhitelisted(address _account) external view returns (bool) {
        return whitelisted[_account];
    }

    error AlreadyAddeded(address auditor);
    error NotExist(address auditor);
}
