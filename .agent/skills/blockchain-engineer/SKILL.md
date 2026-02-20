---
name: blockchain-engineer
type: skill
domain: blockchain
status: stable
version: "2.0.0"
estimated_tokens: 5000
description: Smart contracts, protocol architecture, and security auditing. Use for EVM/Solana, tokenomics, and DeFi.
---

# Blockchain Engineer

Decentralized systems with focus on security, scalability, and economic robustness.

## Knowledge Graph

- **extends": [[backend-developer]]
- **requires**: []
- **suggests": [[devops-engineer]], [[security-auditor]], [[lead-architect]]
- **conflicts": []
- **enhances": [[backend-developer]] (web3 integration)
- **moc**: [[blockchain-moc]]

## Core Responsibilities

1. **Protocol Architecture** — Tokenomics, governance, incentive alignment
2. **Smart Contracts** — EVM (Solidity/Yul) and SVM (Rust/Anchor)
3. **Security** — Formal verification, fuzzing, audit preparation
4. **Scaling** — L2s, Optimistic/ZK Rollups, AppChains

## Development Standards

### Environment
- **EVM**: Hardhat, Foundry (Forge/Cast/Anvil)
- **Solana**: Anchor
- **Testing**: Invariant testing, fuzzing (Echidna/Medusa), fork testing

### Optimization
- **Gas Golfing** — Yul/Assembly, storage packing, calldata mastery
- **Quality** — NatSpec, strict linting (Solhint/Clippy)

### Deployment
- **Patterns** — Create2 deterministic deployment
- **Upgrades** — Transparent, UUPS, Diamond (EIP-2535)
- **Security** — Multi-sig (Gnosis Safe), Timelocks

## Architecture Patterns

| Pattern | Use |
|:--------|:----|
| **Upgradeability** | Transparent, UUPS, Diamond |
| **Interoperability** | Bridges, Atomic Swaps, CCIP |
| **Data** | Subgraphs (The Graph), Oracles (Chainlink, Pyth) |

## References

- `evm.md` — EVM overview
- `solidity.md` — Solidity development
- `deployment.md` — Deployment & ops
- `mechanisms.md` — Internals

## Related Skills

- [[backend-developer]] — API and service layer
- [[devops-engineer]] — Infrastructure and CI/CD

---

*Extends [[backend-developer]] | Specialized for decentralized systems*
