# Decentralized Voting DApp

This is a basic smart contract voting system using Solidity and Hardhat.

## Features

- Only allows each address to vote once
- Dynamically defined candidates
- Vote counting on-chain

## Commands

```bash
npx hardhat compile         # Compile contracts
npx hardhat test            # Run tests
npx hardhat node            # start a node
npx hardhat run scripts/deploy.js --network localhost #部署本地链
