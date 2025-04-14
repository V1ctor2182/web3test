# 🗳️ Web3 去中心化投票系统 DApp

这是一个基于 Solidity + React 的全栈 Web3 应用。用户可以通过连接钱包参与投票，所有投票数据都记录在链上，确保公开、公正、不可篡改。

---

## 📁 项目结构

web3/ ├── voting-dapp/ # 智能合约部分，基于 Hardhat └── voting-frontend/ # 前端项目，基于 React + Vite + Ethers.js
---

## 🛠️ 技术栈

- [Solidity](https://soliditylang.org/) 智能合约语言  
- [Hardhat](https://hardhat.org/) 合约开发与测试框架  
- [React](https://react.dev/) 前端框架  
- [Vite](https://vitejs.dev/) 前端构建工具  
- [Ethers.js](https://docs.ethers.org/) 区块链交互库  
- [Tailwind CSS](https://tailwindcss.com/) 快速美化 UI  

---

## 🚀 快速开始（本地开发）

确保你已经安装了：

- Node.js（建议版本 >= 18）
- npm 或 pnpm/yarn
- [Metamask 浏览器插件](https://metamask.io/)

---

### ✅ 1. 启动本地区块链 & 编译合约

```bash
cd voting-dapp
npm install                 # 安装依赖
npx hardhat compile         # 编译合约
npx hardhat node            # 启动本地链
```

2. 部署合约（另开终端）

```bash
npx hardhat run scripts/deploy.js --network localhost
```

## Features

- Only allows each address to vote once
- Dynamically defined candidates
- Vote counting on-chain


3. 启动前端项目

```bash
cd ../voting-frontend
npm install
npm run dev
```