// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

 

interface ReportContract {
 

    enum Tag { High, Low }

    struct FunctionReport {
        string functionName;
        Tag tag;
    }

 

    function addFunctionReport(address _smartContract, string memory _functionName, Tag _tag) external ;
    function getFunctionReports(address _smartContract) external view returns (FunctionReport[] memory) ;
}

