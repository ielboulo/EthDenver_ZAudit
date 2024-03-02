// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

 import "@openzeppelin/contracts/access/AccessControl.sol";


contract ReportContract  is AccessControl{
    // company auditors 
    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");
    string public reportURI;
    string public projectName;
    string public comitHash;
    bool public isFinished;

    enum Severity { High, Medium, Low, Informational, BestPractice, Undetermined}

    struct IssueReport {
        string issueURI;
        Severity tag; 
       //string proofOfVulnerability;
        address submittedBy; 
    }

    mapping(bytes4 => IssueReport[])  public issueReports; // address : smart contract + string : functionName // FunctionReport[]

    event FunctionReportAdded(address indexed smartContract, bytes4 functionSelector, Severity tag);

 

 

    constructor( address _owner, string memory _projectName, string memory _comitHash)  {
        _grantRole(AUDITOR_ROLE, _owner);
        reportURI = _reportURI;
        projectName = _projectName;
        comitHash = _comitHash;
    }

// only auditors can submit issues 
function submitIssue(bytes4[] memory _functionSelectors, string [] memory _issueURIs, Severity [] memory _tag) public {
    require(hasRole(AUDITOR_ROLE, msg.sender), "Caller is not an auditor");
    require(_functionSelectors.length == _issueURIs.length && _issueURIs.length == _tag.length, "LenghtDoNotMatch");
    for (uint i = 0; i < _functionSelectors.length; i++) {
        issueReports[_functionSelectors[i]].push(IssueReport(_issueURIs[i], _tag[i], msg.sender));
        emit FunctionReportAdded(address(this), _functionSelectors[i], _tag[i]);
    }
    
}
    
function publishReport( string memory _reportURI) public {
    require(hasRole(AUDITOR_ROLE, msg.sender), "Caller is not an auditor");
    reportURI = _reportURI;
    isFinished = true;
}

error LenghtDoNotMatch();
error NotAllowedAuditor();
}