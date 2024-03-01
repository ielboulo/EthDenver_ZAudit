 
// deploy/00_deploy_my_contract.js
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()
 
  const _owner = deployer// 0xac701BB1557F6c06070Bc114Ca6Ace4a358D3A84
  await deploy('ReportContract', {
    from: deployer,
    args: [
     
        ],
    log: true,
  })
 }
module.exports.tags = ['ReportContract']