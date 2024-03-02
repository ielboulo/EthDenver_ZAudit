import { log } from "console";

const hre = require("hardhat");

// deploy/00_deploy_my_contract.js
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy,execute, get } = deployments
  const { deployer } = await getNamedAccounts()
   const ReportContract = await hre.ethers.getContractFactory("ReportContract");

  const _owner = deployer// 0xac701BB1557F6c06070Bc114Ca6Ace4a358D3A84
  let _auditorName ="Code4Arena"
  let _uri = "https://code4arena.com"
   let _auditor =_owner// "0x8c2b1f3d8d2e1a4d9f5e7c6d2f3d6a4d9f5e7c6d"
   const issueUri = "ipfs://QmPwfbvA91JEvnjKdnHoLTr6Tx6US9bagUQKppYd4qMsqF/"
    const bytecodeHash  = [
      `0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470`,
      `0x1ceb0b64c15e1a07636bd37f7a8fc7e5273d7f4ee26f01ff201a1e0087a8c4a6`,
      `0x8f2db11943c96f12a5f7a7934e10ea1eb0b9fbb22ddcc36326d403b8f7eac7e5`
  ]
    const projectName= "Uniswap"
    const comitHash= "0x8c2b1f3d8d2e1a4d9f5e7c6d2f3d6a4d9f5e7c6d"
 await deploy('RegisteryHub', {
    from: deployer,
    args: [
      _owner
        ],
    log: true,
  })
  

 //addAuditor(address _auditor, string memory _name, string memory _uri)
 await execute('RegisteryHub', { from: _owner}, 'addAuditor', _auditor, _auditorName, _uri);
 // addAudit(bytes32[] calldata bytecodeHash, string memory _projectName, string memory _comitHash)
   await execute('RegisteryHub', { from: _owner}, 'addAudit', bytecodeHash, projectName, comitHash);
   const registeryHub = await get('RegisteryHub');
  log("registeryHub address is .. ", registeryHub)
  
  // const address =await registeryHub.getReportsByIndex(0);
  // log("report address is .. ", address)

  //  const reportContract = await ReportContract.attach(address);


 }

module.exports.tags = ['RegisteryHub']