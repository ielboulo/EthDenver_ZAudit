import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
  import { expect } from "chai";
  import { ethers } from "hardhat";
  
  describe("Whitelist", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployOneYearLockFixture() {

      // Contracts are deployed using the first signer/account by default
      const [owner, addr1, addr2, otherAccount] = await ethers.getSigners();
  
      const Whitelist = await ethers.getContractFactory("Whitelist");
      const whitelist = await Whitelist.deploy();
  
      return { whitelist, owner, addr1, addr2,otherAccount };
    }
  

    
    describe("Deployment", function () {


    it('Should deploy with the correct owner', async function () {
        const { whitelist, owner } = await loadFixture(deployOneYearLockFixture);

        expect(await whitelist.owner()).to.equal(owner.address);
    });

    it('Should add address to whitelist', async function () {
        const { whitelist, owner, addr1 } = await loadFixture(deployOneYearLockFixture);

        await whitelist.connect(owner).addAddressToWhitelist(addr1.address);
        expect(await whitelist.isWhitelisted(addr1.address)).to.equal(true);
    });

    it('Should remove address from whitelist', async function () {
        const { whitelist, owner, addr1 } = await loadFixture(deployOneYearLockFixture);

        await whitelist.connect(owner).addAddressToWhitelist(addr1.address);
        expect(await whitelist.isWhitelisted(addr1.address)).to.equal(true);

        await whitelist.connect(owner).removeAddressFromWhitelist(addr1.address);
        expect(await whitelist.isWhitelisted(addr1.address)).to.equal(false);
    });


  it('Non-owner should not add address to whitelist', async function () {
    const { whitelist, owner, addr1, addr2 } = await loadFixture(deployOneYearLockFixture);

    await expect(whitelist.connect(addr1).addAddressToWhitelist(addr2.address)).to.be.revertedWith(
      'Not the contract owner'
    );
  });

  it('Non-owner should not remove address from whitelist', async function () {
    const { whitelist, owner, addr1 } = await loadFixture(deployOneYearLockFixture);

    await whitelist.connect(owner).addAddressToWhitelist(addr1.address);

    await expect(whitelist.connect(addr1).removeAddressFromWhitelist(addr1.address)).to.be.revertedWith(
      'Not the contract owner'
    );
  });

  it('Should emit AddressAdded event', async function () {
    const { whitelist, owner, addr1 } = await loadFixture(deployOneYearLockFixture);

    await expect(whitelist.connect(owner).addAddressToWhitelist(addr1.address))
      .to.emit(whitelist, 'AddressAdded')
      .withArgs(addr1.address);
  });

  it('Should emit AddressRemoved event', async function () {
    const { whitelist, owner, addr1 } = await loadFixture(deployOneYearLockFixture);

    await whitelist.connect(owner).addAddressToWhitelist(addr1.address);

    await expect(whitelist.connect(owner).removeAddressFromWhitelist(addr1.address))
      .to.emit(whitelist, 'AddressRemoved')
      .withArgs(addr1.address);
  });




  
        
      
    });
  });
  