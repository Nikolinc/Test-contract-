const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Tree", function () {
  let owner;
  let owner_addr;
  let contract;

  beforeEach(async function () {
    [owner, owner_addr] = await ethers.getSigners();
    const DemoContract = await ethers.getContractFactory("Tree", owner);
    contract = await DemoContract.deploy();
    await contract.deployed();
  });

  // should be able to verify
  it("should have 0 ether by default", async function () {
    const index = 2;
    const transaction = "TX3: John -> Mary";
    const root = await contract.hashes(6);
    const threeTx = await contract.hashes(3);
    const fourTx = await contract.hashes(4);
    const verify = await contract.verify(transaction, index, root, [
      String(threeTx),
      String(fourTx),
    ]);
    expect(verify).to.eq(true);
  });
});
