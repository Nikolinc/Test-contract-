const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Demo", function () {
  let owner;
  let owner_addr;
  let demo;

  beforeEach(async function () {
    [owner, owner_addr] = await ethers.getSigners();
    const DemoContract = await ethers.getContractFactory("Demo", owner);
    demo = await DemoContract.deploy();
    await demo.deployed();
  });

  async function sendMoney(sender) {
    const amount = 100;
    const txData = {
      to: demo.address,
      value: amount,
    };
    const tx = await sender.sendTransaction(txData);
    await tx.wait();
    return [tx, amount];
  }

  it("should allow to send money", async function () {
    const [sendMoneyTx, amount] = await sendMoney(owner_addr);
    await expect(() => sendMoneyTx).to.changeEtherBalance(demo, amount);

    const timestamp = (await ethers.provider.getBlock(sendMoneyTx.blockNumber))
      .timestamp;

    await expect(sendMoneyTx)
      .to.emit(demo, "Paid")
      .withArgs(owner_addr.address, amount, timestamp);
  });

  it("should allow owner to withdraw funds", async function () {
    const [_, amount] = await sendMoney(owner_addr);

    const tx = await demo.withdraw(owner.address);
    await expect(() => tx).to.changeEtherBalances(
      [demo, owner],
      [-amount, amount]
    );
  });

  it("should not allow owner to withdraw funds", async function () {
    await sendMoney(owner_addr);

    await expect(
      demo.connect(owner_addr).withdraw(owner_addr.address)
    ).to.be.revertedWith("you are not an owner!");
  });
});
