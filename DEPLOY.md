# TAKO Game - Blockchain Deployment Guide

## Prerequisites

1. **Node.js 18+** installed
2. **MetaMask** wallet with MONAD testnet tokens
3. **Private key** of owner wallet (for deployment)

## Setup

```bash
# 1. Navigate to project directory
cd monad-game-tako

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env

# 4. Edit .env and add your private key
# PRIVATE_KEY=0xyour_private_key_here
```

## Deploy Contract

```bash
# Deploy to Monad testnet
npm run deploy
```

Expected output:
```
Deploying contracts with account: 0x...
Account balance: ...
Deploying TAKOGame...
TAKOGame deployed to: 0x...
Deployment info saved
Frontend config updated
```

## Update Contract Address

After deployment, the contract address will be saved to:
- `public/assets/js/blockchain-config.js`
- Copy this address to your frontend config if needed

## Fund Contract for Payouts

The contract needs MONAD to pay out player claims:

```bash
# Send MONAD to contract (via owner wallet)
# Minimum recommended: 10 MONAD for initial funding
```

## Contract Functions

### Owner Functions (Gas Sponsored)
- `sponsorSubscription(address player, uint256 duration)` - Give free subscription to player
- `claimPoints(address player, uint256 amount)` - Send MONAD to player when they claim
- `blockPlayer(address player, string reason)` - Block cheaters
- `adjustPoints(address player, int256 amount)` - Manual point correction
- `withdraw()` - Withdraw contract balance

### Player Functions
- `startGame()` - Record play attempt on-chain
- `endGame(uint256 pointsEarned)` - Save earned points
- `getAvailablePlays(address)` - Check remaining plays
- `getRemainingLockTime(address)` - Check lock countdown
- `getPlayerData(address)` - Get all player stats
- `getClaimHistory(address)` - View claim history

## Frontend Integration

Include blockchain scripts in index.html:

```html
<script src="https://cdn.jsdelivr.net/npm/ethers@6.9.0/dist/ethers.umd.min.js"></script>
<script src="public/assets/js/blockchain-config.js"></script>
<script src="public/assets/js/blockchain-game.js"></script>
<script src="public/assets/js/app.js"></script>
```

## Testing

```bash
# Run local tests
npm test

# Or deploy to local network first
npx hardhat node
npm run deploy --network localhost
```

## Contract Security Notes

1. **Owner is the deployer** - Only owner can sponsor subscriptions and pay claims
2. **Gas sponsored** - Players don't pay gas, owner pays
3. **All data on-chain** - Cannot be manipulated client-side
4. **Upgradeable** - UUPS proxy pattern for future upgrades

## Troubleshooting

**"Contract not found"**
- Check CONTRACT_ADDRESS in blockchain-config.js
- Verify contract deployed successfully

**"Insufficient funds"**
- Fund the contract with MONAD
- Owner can withdraw excess balance

**"Player blocked"**
- Check if wallet address is blocked
- Owner can unblock with unblockPlayer()