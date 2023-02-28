const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Tree", function () {
  beforeEach(async function () {
    [owner, owner_addr] = await ethers.getSigners();
    const DemoContract = await ethers.getContractFactory("Tree", owner);
    demo = await DemoContract.deploy();
    await demo.deployed();
  });
});
