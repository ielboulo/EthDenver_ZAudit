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
 
// role for auditors 
bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");
 // mapping of contract bytecode hash to list of audits addresses
    mapping(bytes32 => address[]) public audits;
    // event emitted when a new audit is added
    event AuditAdded(string uri, bytes32 bytecodeHash, string projectName, address auditAddress);

    constructor( address _owner)  {
        _grantRole(DEFAULT_ADMIN_ROLE, _owner);
     }

/// @notice : this function is used to add a new audit to the registry
/// @param uri : the uri of the audit report
/// @param bytecodeHash : list of  hashs of the bytecodes of the audited contract
/// @param projectName : the name of the project
     function addAudit(string memory uri, bytes32[] calldata bytecodeHash, string memory projectName) public {
         // only auditors can add audits
        require(hasRole(AUDITOR_ROLE, msg.sender), "Caller is not an auditor");
        // address auditAddress= new ReportContract(uri,  projectName, msg.sender);
        address auditAddress= address(new ReportContract());
        for (uint i = 0; i < bytecodeHash.length; i++) {
            audits[bytecodeHash[i]].push(auditAddress);
        }

    }

}
