// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IWhitelist {
    function isWhitelisted(address _account) external view returns (bool);
}

contract ReportContract {
    address public owner;
    address public whitelistContractAddress;

    enum Severity { High, Medium, Low, Informational, BestPractice, Undetermined}
/*
functionSelector : is a bytes4 elements obtained by applying a Keccak-256 on the function signature 
storageURI : the metadata of the details of a function 
*/
    struct IssueReport {
        Severity tag; // on-chain 
        string auditorName;
        string storageURI;  
        string proofOfVulnerability; // On-chain
        string gitHubCommitHash;// 
        string summary; 
        address submittedBy; //  on-chain 
    }

    // bytes32 ByteCodeHash : it's gonna be the netry point  
    mapping(address => mapping(bytes4 => IssueReport[]) ) public issueReports; // address : smart contract + string : functionName // FunctionReport[]

    mapping(address => mapping(bytes4 => string)) public functionNames; // mapping from function selector to function name

    event FunctionReportAdded(address indexed smartContract, bytes4 functionSelector, Severity tag);

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

    function addFunctionReport(
            address _smartContract,
            bytes4 _functionSelector,
            string memory _functionName, // Eman : is it needed ? 
            Severity _tag,
            string memory _auditorName,
            string memory _storageURI,
            string memory _proofOfVulnerability,
            string memory _gitHubCommitHash,
            string memory _summary
        ) external onlyWhitelisted {
            IssueReport memory newReport = IssueReport({
                tag: _tag,
                auditorName: _auditorName,
                storageURI: _storageURI,
                proofOfVulnerability: _proofOfVulnerability,
                gitHubCommitHash: _gitHubCommitHash,
                summary: _summary,
                submittedBy: msg.sender
            });

            issueReports[_smartContract][_functionSelector].push(newReport);
            functionNames[_smartContract][_functionSelector] = _functionName;
            emit FunctionReportAdded(_smartContract, _functionSelector, _tag);
        }

    function getFunctionReports(address _smartContract, bytes4 _functionSelector) external view returns (IssueReport[] memory) {
        return issueReports[_smartContract][_functionSelector];
    }

    function getFunctionReportsBySelector(address _smartContract, bytes4 _functionSelector) external view returns (IssueReport[] memory) {
        return issueReports[_smartContract][_functionSelector];
    }

    function getFunctionName(address _smartContract, bytes4 _functionSelector) external view returns (string memory) {
        return functionNames[_smartContract][_functionSelector];
    }
}

