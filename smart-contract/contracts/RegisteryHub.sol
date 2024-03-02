// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
// import oz access control contract

import "@openzeppelin/contracts/access/AccessControl.sol";
// let's make each report issued as soulbound token. import ERC721Storage.sol
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./ReportContract.sol";
/// @title RegisteryHub : this contract is a registry for all on chain audits
/// @notice : this contract act

contract RegisteryHub is AccessControl {
    struct Auditor {
        string name;
        string uri; // website?
        address authorAdminAddress;
    }
    // role for auditors

    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");
    // mapping of contract bytecode hash to list of audits addresses
    mapping(bytes32 => address[]) public audits;
    // array of auditors
    Auditor[] public auditors;
    // event emitted when a new audit is added

    event AuditAdded(string uri, bytes32 bytecodeHash, string projectName, address auditAddress);

    constructor(address _owner) {
        _grantRole(DEFAULT_ADMIN_ROLE, _owner);
    }

    /// @notice : this function is used to add a new audit to the registry
    /// @param bytecodeHash : list of  hashs of the bytecodes of the audited contract
    /// @param _projectName : the name of the project
    /// @param _comitHash : the commit hash of the audited code
    function addAudit(bytes32[] calldata bytecodeHash, string memory _projectName, string memory _comitHash) public {
        // only auditors can add audits
        if (!hasRole(AUDITOR_ROLE, msg.sender)) {
            revert UnauthorizedAccess();
        }
        address auditAddress = address(new ReportContract(msg.sender, _projectName, _comitHash));
        // address auditAddress= address(new ReportContract());
        for (uint256 i = 0; i < bytecodeHash.length; i++) {
            audits[bytecodeHash[i]].push(auditAddress);
        }
    }

    function addAuditor(address _auditor, string memory _name, string memory _uri) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Caller is not an admin");

        //auditors[_auditor] = Auditor(_name, _uri, msg.sender);
        if (!hasRole(AUDITOR_ROLE, _auditor)) {
            auditors.push(Auditor(_name, _uri, msg.sender));

            _grantRole(AUDITOR_ROLE, _auditor);
        }
    }

    function grantRole(bytes32 role, address account) public override {
        revert();
    }

    error UnauthorizedAccess();
}
