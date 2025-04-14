const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting Contract", function () {
  it("Should allow voting and get vote count", async function () {
    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy(["Alice", "Bob"]);

    await voting.waitForDeployment();  // 替代 deployed()

    await voting.vote("Alice");

    const votes = await voting.getVotes("Alice");
    expect(votes).to.equal(1);
  });
});
