// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IWhitelist {
    function isWhitelisted(address _account) external view returns (bool);
}

contract ReportContract {
    address public owner;
    address public whitelistContractAddress;

    enum Tag { High, Low }

    struct FunctionReport {
        string functionName;
        Tag tag;
    }

    mapping(address => FunctionReport[]) public functionReports;

    event FunctionReportAdded(address indexed smartContract, string functionName, Tag tag);

    modifier onlyWhitelisted() {
        require(IWhitelist(whitelistContractAddress).isWhitelisted(msg.sender), "Not whitelisted");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }


    function addFunctionReport(address _smartContract, string memory _functionName, Tag _tag) external onlyWhitelisted {
        
    }

    function getFunctionReports(address _smartContract) external view returns (FunctionReport[] memory) {
        return functionReports[_smartContract];
    }
}

