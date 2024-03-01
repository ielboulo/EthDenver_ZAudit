
## Contract Architecture
- whitelist
    - manage whitelist auditors who can issue audit reports. to prevent fake reports that can ruin the reputation of good projects.
- AuditRegistry
    - manage audit reports. 
    - store the report and the auditor who issued the report.
    - store the report and the project that the report is about.
- ReportContract
    - soulbound token contract for each audit report.
    - the contract inherits from ERC721 where uri stores the report off chain location. e.g ipfs or ethstorage.
    - the contract inherits OZ access control to manage who can submit issues
    - the contract has list of issues that can be submitted by the project owner or the auditors.
    - the contact should accept new issues as long as the report is not finalized. but after updating the report to finalized, no more issues can be submitted.



## compile
- hardhat network  `npx hardhat compile`

## deploy 
- hardhat network  `npx hardhat deploy`
- other networks `npx hardhat deploy --network {networkName}`


## test
- hardhat network  `npx hardhat test`