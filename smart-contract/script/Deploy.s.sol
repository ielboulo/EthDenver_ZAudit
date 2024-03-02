// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/Script.sol";
import "../contracts/RegisteryHub.sol";
import "../contracts/ReportContract.sol";
import "../contracts/ISeverity.sol";

contract Deployer is Script, ISeverity{
  bytes4[] public exampleFunctionSelectors;
  string[] public exampleIssueURIs  ;
  // Severity[] public exampleTags = [Severity.Low, Severity.High];
  string private _auditorName = "Code4Arena";
  string private _uri = "https://code4arena.com";

  // address private _auditor = _owner; // Uncomment and replace _owner with the actual variable or address
  string private issueUri = "ipfs://QmPwfbvA91JEvnjKdnHoLTr6Tx6US9bagUQKppYd4qMsqF/";
  bytes32[] private bytecodeHash;
  string private projectName = "Uniswap";
  string private comitHash = "0x8c2b1f3d8d2e1a4d9f5e7c6d2f3d6a4d9f5e7c6d";
  Severity[] public exampleTags;
  function run() external {
    uint256 senderPrivateKey = vm.envUint("PRIVATE_KEY");
    address pubkey = address(bytes20(abi.encode(("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"))));

    vm.startBroadcast(senderPrivateKey);
    exampleFunctionSelectors.push( bytes4(0x12345678));
    exampleFunctionSelectors.push( bytes4(0x87654321));
    exampleIssueURIs.push("https://example.com/issue1");
    exampleIssueURIs.push("https://example.com/issue2");
    exampleTags.push(Severity.Low);
    exampleTags.push(Severity.High);
    // address private _auditor = _owner; // Uncomment and replace _owner with the actual variable or address
    bytecodeHash.push( bytes32(0x1ceb0b64c15e1a07636bd37f7a8fc7e5273d7f4ee26f01ff201a1e0087a8c4a6));
    bytecodeHash.push( bytes32(0x1ceb0b64c15e1a07636bd37f7a8fc7e5273d7f4ee26f01ff201a1e0087a8c4a6));
    RegisteryHub registryHub = new RegisteryHub(pubkey);

    // Add a new auditor
    registryHub.addAuditor(msg.sender, _auditorName, _uri);

    // Add a new audit
    address auditAddress = registryHub.addAudit(bytecodeHash, projectName, comitHash);

    // Add a report
    ReportContract reportContract = ReportContract(auditAddress);
    // submit issue
    reportContract.submitIssue(exampleFunctionSelectors, exampleIssueURIs, exampleTags);

    vm.stopBroadcast();
  }
}
