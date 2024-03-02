// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract ReportContract is AccessControl {
    // company auditors
    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");
    string public reportURI;
    string public projectName;
    string public comitHash;
    bool public isFinished;
    address[] public auditors;
    bytes4[] public functionSelectors;
    enum Severity {
        High,
        Medium,
        Low,
        Informational,
        BestPractice,
        Undetermined
    }

    struct IssueReport {
        string issueURI;
        Severity tag;
        //string proofOfVulnerability;
        address submittedBy;
    }

    mapping(bytes4 => IssueReport[]) public issueReports; // address : smart contract + string : functionName // FunctionReport[]

    event FunctionReportAdded(address indexed smartContract, bytes4 functionSelector, Severity tag);

    constructor(address _owner, string memory _projectName, string memory _comitHash) {
        _grantRole(AUDITOR_ROLE, _owner);
        projectName = _projectName;
        comitHash = _comitHash;
    }

    // only auditors can submit issues
    function submitIssue(bytes4[] memory _functionSelectors, string[] memory _issueURIs, Severity[] memory _tag)
        public
    {
        // shouldn't be able to submit issues if the report is already published

        if (isFinished) {
            revert ReportAlreadyPublished();
        }
        if (!hasRole(AUDITOR_ROLE, msg.sender)) {
            revert NotAllowedAuditor();
        }
        if (_functionSelectors.length != _issueURIs.length || _functionSelectors.length != _tag.length) {
            revert LenghtDoNotMatch();
        }
        for (uint256 i = 0; i < _functionSelectors.length; i++) {
            if (issueReports[_functionSelectors[i]].length == 0) {
                functionSelectors.push(_functionSelectors[i]);
            }
            issueReports[_functionSelectors[i]].push(IssueReport(_issueURIs[i], _tag[i], msg.sender));
            emit FunctionReportAdded(address(this), _functionSelectors[i], _tag[i]);
        }
    }

    function grantRole(bytes32 role, address account) public override {
        if (!hasRole(role, account)) {
            auditors.push(account);
            super.grantRole(role, account);
        }
    }

    function publishReport(string memory _reportURI) public {
        if (!hasRole(AUDITOR_ROLE, msg.sender)) {
            revert NotAllowedAuditor();
        }
            if (isFinished) {
            revert ReportAlreadyPublished();
        }
        // check if the url is not empty
        if (bytes(_reportURI).length == 0) {
            revert ReportURIEmpty();
        }
        reportURI = _reportURI;
        isFinished = true;
    }

    error LenghtDoNotMatch();
    error NotAllowedAuditor();
    error ReportAlreadyPublished();
    error ReportURIEmpty();
}