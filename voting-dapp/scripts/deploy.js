const { ethers } = require("hardhat");

async function main() {
  const Voting = await ethers.getContractFactory("Voting");

  const candidates = ["Alice", "Bob", "Charlie"];
  const voting = await Voting.deploy(candidates); // 合约部署
  await voting.waitForDeployment(); // ✅ 使用新版 Hardhat 的部署等待方法

  console.log("Voting contract deployed to:", await voting.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
