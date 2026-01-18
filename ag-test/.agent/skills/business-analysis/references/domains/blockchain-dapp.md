# Blockchain & dApp Domain Reference

## Core Concepts

### Blockchain Fundamentals

- **Consensus mechanisms**: PoW, PoS, DPoS, PBFT
- **Networks**: Mainnet, Testnet, Devnet
- **Chains**: Ethereum, Solana, Polygon, BNB Chain, Arbitrum, Base

### Smart Contracts

- Self-executing code on blockchain
- Immutable after deployment (upgradeable patterns available)
- Gas fees for execution
- Common languages: Solidity (EVM), Rust (Solana), Move

### Wallets

- **Types**: Hot (MetaMask, Phantom), Cold (Ledger, Trezor)
- **Connection**: WalletConnect, browser extensions
- **Multi-sig**: Multiple signatures required for transactions

## dApp Architecture

### Frontend

- React/Next.js with wallet adapters
- Web3 libraries: ethers.js, web3.js, @solana/web3.js
- State management for wallet connection

### Backend (if needed)

- Indexers for blockchain data
- Caching layer for performance
- Off-chain storage (IPFS, Arweave)

### Smart Contract Layer

- Core business logic on-chain
- Upgradeable proxy patterns
- Access control (roles, permissions)

## Common dApp Types

### DeFi (Decentralized Finance)

- DEX (decentralized exchanges): AMM, order book
- Lending/borrowing protocols
- Yield farming, staking
- Liquidity pools

### NFT (Non-Fungible Tokens)

- Minting, burning
- Marketplaces, auctions
- Royalties, creator fees
- Metadata (on-chain vs. off-chain)

### GameFi / Play-to-Earn

- In-game assets as NFTs
- Token rewards
- Staking mechanics

### DAO (Decentralized Autonomous Organizations)

- Governance tokens
- Proposal and voting systems
- Treasury management

## Security Considerations

- Smart contract audits
- Reentrancy attacks
- Flash loan attacks
- Oracle manipulation
- Private key management

## Key Metrics

- TVL (Total Value Locked)
- Daily Active Users (DAU)
- Transaction volume
- Gas efficiency
- Token price, market cap
