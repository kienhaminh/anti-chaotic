---
name: blockchain-moc
type: moc
domain: blockchain
status: stable
version: "2.0.0"
description: Hub for blockchain skills — smart contracts, Web3, DeFi, and protocol development.
---

# Blockchain MOC

Complete skill graph for Web3 and blockchain development.

## Overview

This domain covers:
- **Smart Contracts**: Solidity, Rust, security
- **Protocol Design**: Tokenomics, governance, consensus
- **Web3 Integration**: dApps, wallets, RPC
- **DeFi**: Lending, DEXs, yield farming
- **Infrastructure**: Nodes, indexing, oracles

## Skill Graph

```
                        [[blockchain-moc]]
                                │
                    ┌───────────┴───────────┐
                    ▼                       ▼
            [[blockchain-engineer]]   [[smart-contract-
                    │                   auditor]]
        ┌───────────┼───────────┐           │
        ▼           ▼           ▼           ▼
[[solidity]]  [[rust-      [[web3-    [[formal-
              anchor]]     integration]]  verification]]
        │                       │
        ▼                       ▼
[[defi-protocols]]      [[backend-developer]]
```

## Blockchain Stacks

### ⛓️ EVM Development
```
[[backend-developer]]           (~2k tokens)
    ↓ extends
[[blockchain-engineer]]         (~3k tokens)
    ↓ suggests
[[solidity]]                    (~3k tokens)
────────────────────────────────────────────
Total Context: ~8k tokens
```

### 🏦 DeFi Protocol
```
[[blockchain-engineer]]         (~3k tokens)
    ↓ suggests
[[defi-protocols]]              (~3k tokens)
    ↓ requires
[[security-auditor]]            (~2k tokens)
────────────────────────────────────────────
Total Context: ~8k tokens
```

### 🌐 Web3 dApp
```
[[frontend-developer]]          (~2k tokens)
    ↓ suggests
[[web3-integration]]            (~2k tokens)
    ↓ requires
[[blockchain-engineer]]         (~3k tokens)
────────────────────────────────────────────
Total Context: ~7k tokens
```

## Quick Reference

| I want to... | Start Here |
|:-------------|:-----------|
| Write smart contracts | [[blockchain-engineer]] |
| Build DeFi protocol | [[blockchain-engineer]] + security |
| Create Web3 dApp | [[blockchain-engineer]] + frontend |
| Audit contracts | [[security-auditor]] |

## Cross-Domain Skills

| Skill | Bridges To | Use Case |
|:------|:-----------|:---------|
| [[backend-developer]] | Infra | Node infrastructure |
| [[frontend-developer]] | Web | dApp frontend |
| [[devops-engineer]] | Infra | Chain deployment |

## Related MOCs

- [[infrastructure-moc]] — Node operations
- [[web-development-moc]] — dApp development

---

*Entry point for blockchain | [[agent-skills-index]]*
