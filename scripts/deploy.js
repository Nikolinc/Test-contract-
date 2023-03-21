const hre = require("hardhat");
const ethers = hre.ethers;
const fs = require("fs");
const path = require("path");
const { network } = require("hardhat");

async function main() {
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contact to the Hardhat Network, which get automatically "+
      "crated and destroyed every time. Use the Hardhat option '--network localhost' "
    );
  }

  const [deploer] = await ethers.getSigners()
  console.log("Deploying with", await deploer.getAddress())


}
