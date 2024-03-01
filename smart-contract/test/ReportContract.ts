import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
  import { expect } from "chai";
  import { ethers } from "hardhat";
  
  describe("ReportContract", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployOneYearLockFixture() {

      // Contracts are deployed using the first signer/account by default
      const [owner, addr1, addr2, otherAccount] = await ethers.getSigners();
  
      const ReportContract = await ethers.getContractFactory("ReportContract");
      const reportContract = await ReportContract.deploy();
  
      return { reportContract, owner, addr1, addr2,otherAccount };
    }


    
    describe("Deployment", function () {


        it('Should deploy with the correct owner', async function () {
            const { reportContract, owner } = await loadFixture(deployOneYearLockFixture);
    
            expect(await reportContract.owner()).to.equal(owner.address);
        });


    });    


//   it('Should allow owner to set the whitelist contract address', async function () {
//     await reportContract.setWhitelistContract(auditor1.address);
//     expect(await reportContract.whitelistContractAddress()).to.equal(auditor1.address);
//   });

//   it('Should allow owner to add function report', async function () {
//     const smartContractAddress = ethers.constants.AddressZero;
//     const functionName = 'exampleFunction';
//     const tag = 0; // Tag.High

//     await reportContract.setWhitelistContract(auditor1.address);
//     await reportContract.connect(auditor1).addFunctionReport(smartContractAddress, functionName, tag);

//     const reports = await reportContract.getFunctionReports(smartContractAddress);
//     expect(reports.length).to.equal(1);
//     expect(reports[0].functionName).to.equal(functionName);
//     expect(reports[0].tag).to.equal(tag);
//   });

//   it('Should revert when non-whitelisted user tries to add function report', async function () {
//     const smartContractAddress = ethers.constants.AddressZero;
//     const functionName = 'exampleFunction';
//     const tag = 0; // Tag.High

//     await expect(reportContract.connect(auditor2).addFunctionReport(smartContractAddress, functionName, tag)).to.be.revertedWith(
//       'Not whitelisted'
//     );
//   });

//   it('Should retrieve function reports correctly', async function () {
//     const smartContractAddress = ethers.constants.AddressZero;
//     const functionName1 = 'function1';
//     const functionName2 = 'function2';
//     const tag1 = 0; // Tag.High
//     const tag2 = 1; // Tag.Low

//     await reportContract.setWhitelistContract(auditor1.address);
//     await reportContract.connect(auditor1).addFunctionReport(smartContractAddress, functionName1, tag1);
//     await reportContract.connect(auditor1).addFunctionReport(smartContractAddress, functionName2, tag2);

//     const reports = await reportContract.getFunctionReports(smartContractAddress);
//     expect(reports.length).to.equal(2);
//     expect(reports[0].functionName).to.equal(functionName1);
//     expect(reports[0].tag).to.equal(tag1);
//     expect(reports[1].functionName).to.equal(functionName2);
//     expect(reports[1].tag).to.equal(tag2);
//   });
});
