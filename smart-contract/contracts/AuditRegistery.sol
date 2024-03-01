// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
// import oz access control contract
import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title AuditRegistery 
/// @notice This contract is used to manage issuing new reports .

contract AuditRegistery is AccessControl {
    

    // roles 
    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");

    // mapping of contract bytecode hash to list of reports
    // some project has many audit reports from different companies for the same project

    mapping(bytes32 => address[]) public reports; 


 
    constructor( address _owner) {
         _grantRole(DEFAULT_ADMIN_ROLE, _owner);
    }


    /// approved auditor should be able to add a new report
    /// @param bytecodeHash the hash of the bytecode of the smart contract
    /// @param uri the uri of the report
    /// @param name the name of project audited
    /// @param symbol the symbol of soulbound token issued 
    function addReport(bytes32 bytecodeHash, string memory uri, string memory name, string memory symbol) public {
        require(hasRole(AUDITOR_ROLE, msg.sender), "Caller is not an auditor");

       //  reports[bytecodeHash].push(msg.sender);
        emit ReportAdded(msg.sender, bytecodeHash, uri, name, symbol);
    }



    

    error AlreadyAddeded(address auditor);
    error NotExist(address auditor);
}
