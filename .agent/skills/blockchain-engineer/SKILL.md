---
name: blockchain-engineer
type: skill
domain: blockchain
status: stable
version: "2.0.0"
estimated_tokens: 30000
description: Smart contracts, protocol architecture, and security auditing. Use for EVM/Solana, tokenomics, and DeFi.
---

# Blockchain Engineer

Decentralized systems with focus on security, scalability, and economic robustness.

## Knowledge Graph

- **extends**: [[backend-developer]]
- **requires**: []
- **suggests**: [[devops-engineer]], [[lead-architect]]
- **conflicts**: []
- **enhances**: [[backend-developer]] (web3 integration)
- **moc**: [[blockchain-moc]]

---

## 1. Blockchain Fundamentals

### 1.1 Consensus Mechanisms

| Mechanism | Throughput | Finality | Use Case |
|:----------|:-----------|:---------|:---------|
| **Proof of Work (PoW)** | ~7 TPS | Probabilistic | Bitcoin, high security |
| **Proof of Stake (PoS)** | ~1000 TPS | Probabilistic | Ethereum 2.0, energy efficient |
| **Delegated PoS (DPoS)** | ~3000 TPS | Fast | EOS, governance focused |
| **Proof of Authority (PoA)** | ~1000 TPS | Immediate | Private/consortium chains |
| **Byzantine Fault Tolerant** | ~10k TPS | Immediate | Enterprise (Hyperledger) |

### 1.2 EVM Architecture

```
┌─────────────────────────────────────────┐
│           Smart Contract                │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │Storage  │  │Memory   │  │Stack    │ │
│  │Persistent│  │Temporary│  │256-bit  │ │
│  │$20k/32B │  │$3/gas   │  │1024 max │ │
│  └─────────┘  └─────────┘  └─────────┘ │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│           EVM Execution                 │
│  - Turing complete                      │
│  - Gas-metered (10M gas limit/block)    │
│  - Deterministic                        │
└─────────────────────────────────────────┘
```

**Gas Costs (Berlin/London)**
- `SSTORE` (new slot): 20,000 gas
- `SSTORE` (update): 5,000 gas
- `SLOAD`: 2,100 gas (warm) / 2,100 gas (cold)
- `CALL`: 2,600 gas + memory
- `CREATE`: 32,000 gas + code deposit

### 1.3 Account Model

**Ethereum (Account-Based)**
```solidity
// Externally Owned Account (EOA)
{
  nonce: 42,
  balance: 1.5 ether,
  codeHash: 0x0,  // Empty for EOA
  storageRoot: ...
}

// Contract Account
{
  nonce: 0,
  balance: 10 ether,
  codeHash: keccak256(bytecode),
  storageRoot: merkleRoot(storage)
}
```

**Bitcoin (UTXO-Based)**
- Each output is a coin that can be spent
- Transaction consumes inputs, creates outputs
- No account state, just coin ownership

---

## 2. Smart Contract Development

### 2.1 Solidity Best Practices

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SecureToken
 * @notice Example of secure ERC20 implementation
 */
contract SecureToken is ERC20, ReentrancyGuard, Ownable {
    // ============ State Variables ============
    
    // Use private with getter functions
    mapping(address => uint256) private _stakes;
    
    // Immutable for gas savings
    uint256 public immutable maxSupply;
    
    // Constant for compile-time values
    uint256 public constant REWARD_RATE = 100; // basis points
    
    // Gap for upgradeable contracts
    uint256[50] private __gap;
    
    // ============ Events ============
    
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount, uint256 reward);
    
    // ============ Errors (Gas Efficient) ============
    
    error InsufficientBalance(uint256 available, uint256 required);
    error StakeLocked(uint256 unlockTime);
    error InvalidAmount();
    
    // ============ Modifiers ============
    
    modifier validAmount(uint256 amount) {
        if (amount == 0) revert InvalidAmount();
        _;
    }
    
    // ============ Constructor ============
    
    constructor(
        string memory name,
        string memory symbol,
        uint256 _maxSupply
    ) ERC20(name, symbol) {
        maxSupply = _maxSupply;
        _mint(msg.sender, _maxSupply / 10); // 10% to deployer
    }
    
    // ============ External Functions ============
    
    /**
     * @notice Stake tokens to earn rewards
     * @param amount Amount to stake
     */
    function stake(uint256 amount) 
        external 
        nonReentrant 
        validAmount(amount) 
    {
        if (balanceOf(msg.sender) < amount) {
            revert InsufficientBalance(balanceOf(msg.sender), amount);
        }
        
        // Update state before external calls (Checks-Effects-Interactions)
        _stakes[msg.sender] += amount;
        _updateStakeTime(msg.sender);
        
        // External call last
        _transfer(msg.sender, address(this), amount);
        
        emit Staked(msg.sender, amount);
    }
    
    /**
     * @notice Unstake tokens and claim rewards
     */
    function unstake() external nonReentrant {
        uint256 staked = _stakes[msg.sender];
        if (staked == 0) revert InvalidAmount();
        
        uint256 reward = _calculateReward(msg.sender);
        
        // Effects
        _stakes[msg.sender] = 0;
        
        // Interactions (external calls last)
        _transfer(address(this), msg.sender, staked);
        _mint(msg.sender, reward);
        
        emit Unstaked(msg.sender, staked, reward);
    }
    
    // ============ View Functions ============
    
    function getStakeInfo(address user) 
        external 
        view 
        returns (uint256 staked, uint256 pendingReward) 
    {
        staked = _stakes[user];
        pendingReward = _calculateReward(user);
    }
    
    // ============ Internal Functions ============
    
    function _calculateReward(address user) internal view returns (uint256) {
        // Implementation
        return (_stakes[user] * REWARD_RATE * _getStakeDuration(user)) / 10000;
    }
}
```

### 2.2 Security Patterns

**Checks-Effects-Interactions**
```solidity
// ❌ WRONG: External call before state update
function withdraw() external {
    (bool success, ) = msg.sender.call{value: balances[msg.sender]}("");
    require(success, "Transfer failed");
    balances[msg.sender] = 0; // Too late!
}

// ✅ CORRECT: Checks -> Effects -> Interactions
function withdraw() external {
    uint256 amount = balances[msg.sender];  // Check
    require(amount > 0, "No balance");
    
    balances[msg.sender] = 0;               // Effect
    
    (bool success, ) = msg.sender.call{value: amount}("");  // Interaction
    require(success, "Transfer failed");
}
```

**Reentrancy Guard**
```solidity
// Using OpenZeppelin
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Secure is ReentrancyGuard {
    function withdraw() external nonReentrant {
        // Safe from reentrancy
    }
}

// Manual implementation
modifier nonReentrant() {
    require(!_locked, "Reentrant call");
    _locked = true;
    _;
    _locked = false;
}
```

**Pull Over Push**
```solidity
// ❌ WRONG: Push payments (can fail, block execution)
function distributeRewards() external {
    for (uint i = 0; i < users.length; i++) {
        users[i].call{value: rewards[users[i]]}(""); // Can fail
    }
}

// ✅ CORRECT: Pull payments (user withdraws)
function claimReward() external {
    uint256 reward = pendingRewards[msg.sender];
    require(reward > 0, "No reward");
    pendingRewards[msg.sender] = 0;
    (bool success, ) = msg.sender.call{value: reward}("");
    require(success, "Transfer failed");
}
```

**Integer Overflow Protection**
```solidity
// Solidity 0.8+ has built-in overflow checks
// For 0.8+, explicit checks not needed

// For unchecked blocks (gas optimization)
function batchTransfer(address[] calldata recipients, uint256 amount) external {
    uint256 total = recipients.length * amount;  // Can overflow!
    require(balanceOf[msg.sender] >= total, "Insufficient balance");
    
    unchecked {
        for (uint i = 0; i < recipients.length; i++) {
            _transfer(msg.sender, recipients[i], amount);
        }
    }
}
```

### 2.3 Access Control

```solidity
// Role-based access control
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Governed is AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }
    
    function mint(address to, uint256 amount) external onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }
    
    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
    }
}

// Multi-sig pattern
contract MultiSig {
    address[] public owners;
    uint256 public required;
    
    mapping(bytes32 => bool) public executed;
    mapping(bytes32 => mapping(address => bool)) public confirmed;
    
    modifier onlyOwner() {
        require(isOwner[msg.sender], "Not owner");
        _;
    }
    
    function submitTransaction(address to, uint256 value, bytes calldata data) 
        external 
        onlyOwner 
        returns (bytes32 txHash) 
    {
        txHash = keccak256(abi.encode(to, value, data, nonce++));
        // ... implementation
    }
    
    function confirmTransaction(bytes32 txHash) external onlyOwner {
        confirmed[txHash][msg.sender] = true;
        if (getConfirmationCount(txHash) >= required) {
            executeTransaction(txHash);
        }
    }
}
```

---

## 3. Gas Optimization

### 3.1 Storage Optimization

```solidity
// ❌ WRONG: Inefficient packing
contract Inefficient {
    uint256 a;  // 32 bytes
    uint128 b;  // 16 bytes - new slot
    uint128 c;  // 16 bytes - same slot as b
    uint256 d;  // 32 bytes - new slot
    // Total: 3 slots = 96 bytes
}

// ✅ CORRECT: Pack variables
contract Efficient {
    uint128 b;  // 16 bytes
    uint128 c;  // 16 bytes - packed with b
    uint256 a;  // 32 bytes
    uint256 d;  // 32 bytes
    // Total: 2 slots = 64 bytes
}

// Mappings vs Arrays
contract DataStructure {
    // Array: O(n) search, can have duplicates
    address[] public users;
    
    // Mapping: O(1) lookup, no duplicates
    mapping(address => bool) public isUser;
    
    // Combination for iteration + lookup
    address[] public userList;
    mapping(address => uint256) public userIndex;
}
```

### 3.2 Memory vs Storage

```solidity
contract MemoryOptimization {
    uint256[] public data;
    
    // ❌ WRONG: Storage read in loop
    function sum() external view returns (uint256) {
        uint256 total;
        for (uint i = 0; i < data.length; i++) {
            total += data[i];  // SLOAD each iteration
        }
        return total;
    }
    
    // ✅ CORRECT: Cache in memory
    function sumOptimized() external view returns (uint256) {
        uint256 total;
        uint256[] memory _data = data;  // One SLOAD
        for (uint i = 0; i < _data.length; i++) {
            total += _data[i];  // MLOAD (much cheaper)
        }
        return total;
    }
    
    // Unchecked for counters
    function process() external {
        uint256 len = items.length;
        for (uint256 i = 0; i < len; ) {
            processItem(items[i]);
            unchecked { ++i; }  // Save overflow check gas
        }
    }
}
```

### 3.3 Calldata Optimization

```solidity
// Use calldata for read-only external function params
function processArray(uint256[] calldata data) external pure {
    // calldata is cheaper than memory for external calls
    for (uint i = 0; i < data.length; i++) {
        // process data[i]
    }
}

// Short circuit evaluation
modifier onlyAuthorized() {
    require(
        isAdmin[msg.sender] || hasRole[OPERATOR][msg.sender],
        "Not authorized"
    );
    _;
    // Put most likely condition first
}
```

---

## 4. Upgradeability Patterns

### 4.1 Proxy Patterns

**Transparent Proxy**
```solidity
// Proxy contract
contract TransparentProxy {
    address public implementation;
    address public admin;
    
    constructor(address _implementation) {
        implementation = _implementation;
        admin = msg.sender;
    }
    
    fallback() external payable {
        require(msg.sender != admin, "Admin cannot call fallback");
        _delegate(implementation);
    }
    
    function upgradeTo(address newImplementation) external {
        require(msg.sender == admin, "Only admin");
        implementation = newImplementation;
    }
    
    function _delegate(address impl) internal {
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), impl, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }
}

// Implementation (Logic) contract
contract LogicV1 is Initializable {
    uint256 public value;
    
    function initialize(uint256 _value) public initializer {
        value = _value;
    }
    
    function setValue(uint256 _value) external {
        value = _value;
    }
}
```

**UUPS (Universal Upgradeable Proxy Standard)**
```solidity
// UUPS puts upgrade logic in implementation
// More gas efficient, but requires careful implementation

import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyContract is Initializable, OwnableUpgradeable, UUPSUpgradeable {
    function initialize() public initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
    }
    
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}
```

**Diamond Pattern (EIP-2535)**
```solidity
// Multiple implementation contracts (facets)
// Unlimited contract size, granular upgrades

struct DiamondStorage {
    mapping(bytes4 => address) facets;
    address owner;
}

function diamondStorage() internal pure returns (DiamondStorage storage ds) {
    bytes32 position = keccak256("diamond.storage");
    assembly {
        ds.slot := position
    }
}

// Add/replace/remove functions dynamically
function diamondCut(FacetCut[] calldata cuts) external {
    // Implementation
}
```

---

## 5. DeFi Protocols

### 5.1 Automated Market Maker (AMM)

```solidity
// Constant Product AMM (Uniswap V2 style)
contract SimpleAMM {
    IERC20 public token0;
    IERC20 public token1;
    
    uint256 public reserve0;
    uint256 public reserve1;
    
    // k = x * y (constant product)
    function getK() public view returns (uint256) {
        return reserve0 * reserve1;
    }
    
    // Swap with 0.3% fee
    function swap(address tokenIn, uint256 amountIn) external returns (uint256 amountOut) {
        require(tokenIn == address(token0) || tokenIn == address(token1), "Invalid token");
        
        bool isToken0 = tokenIn == address(token0);
        (uint256 reserveIn, uint256 reserveOut) = isToken0 
            ? (reserve0, reserve1) 
            : (reserve1, reserve0);
        
        // Calculate output with fee
        uint256 amountInWithFee = amountIn * 997 / 1000;
        amountOut = (reserveOut * amountInWithFee) / (reserveIn + amountInWithFee);
        
        // Update reserves
        if (isToken0) {
            reserve0 += amountIn;
            reserve1 -= amountOut;
        } else {
            reserve1 += amountIn;
            reserve0 -= amountOut;
        }
        
        // Transfer tokens
        IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);
        IERC20(isToken0 ? token1 : token0).transfer(msg.sender, amountOut);
    }
    
    // Add liquidity
    function addLiquidity(uint256 amount0, uint256 amount1) external {
        if (reserve0 == 0 && reserve1 == 0) {
            // Initial liquidity
            reserve0 = amount0;
            reserve1 = amount1;
        } else {
            // Maintain ratio
            require(
                amount0 * reserve1 == amount1 * reserve0,
                "Invalid ratio"
            );
            reserve0 += amount0;
            reserve1 += amount1;
        }
        
        token0.transferFrom(msg.sender, address(this), amount0);
        token1.transferFrom(msg.sender, address(this), amount1);
    }
}
```

### 5.2 Lending Protocol

```solidity
// Simplified lending with over-collateralization
contract SimpleLending {
    struct Market {
        IERC20 token;
        uint256 collateralFactor;  // e.g., 7500 = 75%
        uint256 supplyIndex;
        uint256 borrowIndex;
        uint256 totalSupplies;
        uint256 totalBorrows;
    }
    
    struct Account {
        uint256 supplyBalance;
        uint256 borrowBalance;
    }
    
    mapping(address => Market) public markets;
    mapping(address => mapping(address => Account)) public accounts;
    
    // Supply assets to earn interest
    function supply(address market, uint256 amount) external {
        accrueInterest(market);
        
        Market storage m = markets[market];
        Account storage a = accounts[market][msg.sender];
        
        a.supplyBalance = a.supplyBalance * m.supplyIndex / 1e18 + amount;
        m.totalSupplies += amount;
        
        m.token.transferFrom(msg.sender, address(this), amount);
    }
    
    // Borrow against collateral
    function borrow(address market, uint256 amount) external {
        accrueInterest(market);
        
        require(getAccountLiquidity(msg.sender) >= amount, "Insufficient collateral");
        
        Market storage m = markets[market];
        Account storage a = accounts[market][msg.sender];
        
        a.borrowBalance = a.borrowBalance * m.borrowIndex / 1e18 + amount;
        m.totalBorrows += amount;
        
        m.token.transfer(msg.sender, amount);
    }
    
    // Calculate account liquidity
    function getAccountLiquidity(address user) public view returns (uint256) {
        uint256 collateralValue;
        uint256 borrowValue;
        
        // Sum collateral across all markets
        // Sum borrows across all markets
        // Return collateral * factor - borrows
        
        return collateralValue * 7500 / 10000 - borrowValue;
    }
    
    // Liquidation
    function liquidate(address borrower, address market) external {
        require(getAccountLiquidity(borrower) < 0, "Account healthy");
        
        // Seize collateral at discount (e.g., 8%)
        // Repay borrow on behalf of borrower
    }
}
```

### 5.3 Yield Farming

```solidity
contract YieldFarm is ReentrancyGuard {
    IERC20 public stakingToken;
    IERC20 public rewardToken;
    
    uint256 public rewardPerBlock;
    uint256 public lastRewardBlock;
    uint256 public accRewardPerShare;
    
    struct UserInfo {
        uint256 amount;
        uint256 rewardDebt;
    }
    
    mapping(address => UserInfo) public users;
    uint256 public totalStaked;
    
    function updatePool() public {
        if (block.number <= lastRewardBlock) return;
        
        if (totalStaked == 0) {
            lastRewardBlock = block.number;
            return;
        }
        
        uint256 blocks = block.number - lastRewardBlock;
        uint256 reward = blocks * rewardPerBlock;
        accRewardPerShare += reward * 1e12 / totalStaked;
        lastRewardBlock = block.number;
    }
    
    function deposit(uint256 amount) external nonReentrant {
        updatePool();
        
        UserInfo storage user = users[msg.sender];
        
        // Claim pending rewards
        if (user.amount > 0) {
            uint256 pending = user.amount * accRewardPerShare / 1e12 - user.rewardDebt;
            rewardToken.transfer(msg.sender, pending);
        }
        
        stakingToken.transferFrom(msg.sender, address(this), amount);
        user.amount += amount;
        totalStaked += amount;
        user.rewardDebt = user.amount * accRewardPerShare / 1e12;
    }
    
    function withdraw(uint256 amount) external nonReentrant {
        updatePool();
        
        UserInfo storage user = users[msg.sender];
        require(user.amount >= amount, "Insufficient balance");
        
        // Claim rewards
        uint256 pending = user.amount * accRewardPerShare / 1e12 - user.rewardDebt;
        rewardToken.transfer(msg.sender, pending);
        
        user.amount -= amount;
        totalStaked -= amount;
        user.rewardDebt = user.amount * accRewardPerShare / 1e12;
        
        stakingToken.transfer(msg.sender, amount);
    }
}
```

---

## 6. Testing & Security

### 6.1 Testing Frameworks

**Foundry (Recommended)**
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/Token.sol";

contract TokenTest is Test {
    Token token;
    address alice = address(1);
    address bob = address(2);
    
    function setUp() public {
        token = new Token("Test", "TST", 1000000 ether);
        token.transfer(alice, 1000 ether);
    }
    
    function testTransfer() public {
        vm.prank(alice);
        token.transfer(bob, 100 ether);
        
        assertEq(token.balanceOf(bob), 100 ether);
        assertEq(token.balanceOf(alice), 900 ether);
    }
    
    function testTransferInsufficientBalance() public {
        vm.prank(bob);  // bob has 0 tokens
        vm.expectRevert("Insufficient balance");
        token.transfer(alice, 100 ether);
    }
    
    // Fuzz testing
    function testFuzzTransfer(uint256 amount) public {
        vm.assume(amount <= 1000 ether);  // Bound input
        
        vm.prank(alice);
        token.transfer(bob, amount);
        
        assertEq(token.balanceOf(bob), amount);
    }
    
    // Invariant testing
    function invariantTotalSupply() public {
        assertEq(token.totalSupply(), 1000000 ether);
    }
    
    // Fork testing
    function testWithMainnet() public {
        vm.createSelectFork("https://eth-mainnet.g.alchemy.com/v2/...");
        
        // Test against real mainnet state
        IERC20 usdc = IERC20(0xA0b86a33E6Cb19d3C91d8C8c3D0f1E62b68DEe34);
        // ...
    }
}
```

**Hardhat + TypeScript**
```typescript
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Token", function () {
  let token: Token;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy("Test", "TST", ethers.utils.parseEther("1000000"));
  });

  it("Should transfer tokens", async function () {
    await token.transfer(addr1.address, ethers.utils.parseEther("100"));
    expect(await token.balanceOf(addr1.address)).to.equal(
      ethers.utils.parseEther("100")
    );
  });

  // Time manipulation
  it("Should handle time-based functions", async function () {
    await network.provider.send("evm_increaseTime", [86400]); // +1 day
    await network.provider.send("evm_mine");
    
    // Test time-sensitive logic
  });
});
```

### 6.2 Security Tools

```bash
# Static analysis
slither contracts/ --solc-remaps @openzeppelin=node_modules/@openzeppelin

# Fuzzing
echidna contracts/Token.sol --contract Token

# Formal verification
# Certora, VerX for mathematical proofs

# Gas reporting
forge test --gas-report
```

### 6.3 Common Vulnerabilities

| Vulnerability | Prevention |
|:--------------|:-----------|
| **Reentrancy** | Checks-Effects-Interactions, ReentrancyGuard |
| **Integer Overflow** | Solidity 0.8+, SafeMath (pre-0.8) |
| **Access Control** | Ownable, AccessControl, custom modifiers |
| **Front-running** | Commit-reveal, time locks |
| **Oracle Manipulation** | Chainlink, TWAP, multi-source |
| **Flash Loan Attacks** | Stateful checks, time delays |
| **DoS** | Pull over push, gas limits |

---

## 7. Cross-Chain Development

### 7.1 Bridge Patterns

```solidity
// Lock-and-Mint bridge
contract Bridge {
    mapping(bytes32 => bool) public processedHashes;
    
    // Lock on source chain
    function lock(uint256 amount, address recipient) external {
        token.transferFrom(msg.sender, address(this), amount);
        
        emit Lock(msg.sender, amount, recipient, block.chainid);
    }
    
    // Mint on destination (requires validators/MPC)
    function mint(
        address recipient,
        uint256 amount,
        bytes32 lockHash,
        bytes[] calldata signatures
    ) external {
        require(!processedHashes[lockHash], "Already processed");
        require(verifySignatures(lockHash, signatures), "Invalid signatures");
        
        processedHashes[lockHash] = true;
        wrappedToken.mint(recipient, amount);
    }
}
```

### 7.2 Layer 2 Integration

| L2 | Type | Key Features |
|:---|:-----|:-------------|
| **Optimism** | Optimistic Rollup | EVM equivalent, 7-day withdrawal |
| **Arbitrum** | Optimistic Rollup | Stylus (WASM), multi-round fraud proofs |
| **Base** | Optimistic Rollup | Coinbase, low fees |
| **zkSync** | ZK Rollup | Native account abstraction, Solidity |
| **StarkNet** | ZK Rollup | Cairo lang, STARK proofs |
| **Polygon zkEVM** | ZK Rollup | EVM equivalent, fast finality |

---

## 8. Development Workflow

### 8.1 Deployment

```bash
# Foundry
forge script script/Deploy.s.sol --rpc-url $RPC_URL --private-key $PK --broadcast --verify

# Hardhat
npx hardhat run scripts/deploy.ts --network mainnet

# Create2 deterministic deployment
# Same address on any chain
```

### 8.2 Verification

```bash
# Etherscan verification
forge verify-contract $ADDRESS src/Token.sol:Token --etherscan-api-key $KEY

# Sourcify (decentralized)
# Verifies on multiple explorers automatically
```

### 8.3 Monitoring

```solidity
// Events for indexing
event Transfer(address indexed from, address indexed to, uint256 value);
event Approval(address indexed owner, address indexed spender, uint256 value);

// Use Tenderly, Forta, OpenZeppelin Defender for monitoring
```

---

## Related Skills

- [[backend-developer]] — API and service layer integration
- [[devops-engineer]] — Infrastructure, CI/CD for smart contracts
- [[lead-architect]] — System design, tokenomics, protocol architecture
- [[security-auditor]] — Deep security analysis and formal verification

---

*Extends [[backend-developer]] | Part of [[blockchain-moc]]*
