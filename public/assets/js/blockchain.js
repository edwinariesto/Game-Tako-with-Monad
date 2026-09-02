// Blockchain Configuration
// Auto-generated on deployment
const BLOCKCHAIN_CONFIG = {
  CONTRACT_ADDRESS: "0x0000000000000000000000000000000000000000", // Update after deployment
  NETWORK_NAME: "monadTestnet",
  CHAIN_ID: 10143,
  RPC_URL: "https://rpc.testednet.monad.xyz"
};

// ============================================
// BLOCKCHAIN MANAGER
// ============================================

class BlockchainManager {
  constructor() {
    this.contract = null;
    this.signer = null;
    this.isInitialized = false;
  }

  async initialize() {
    if (typeof window.ethereum === 'undefined') {
      console.error('MetaMask not installed');
      return false;
    }

    try {
      // Get provider and signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await provider.getSigner();

      // Load contract ABI
      const abi = await this.getContractABI();

      // Create contract instance
      this.contract = new ethers.Contract(
        BLOCKCHAIN_CONFIG.CONTRACT_ADDRESS,
        abi,
        this.signer
      );

      this.isInitialized = true;
      console.log('Blockchain initialized:', BLOCKCHAIN_CONFIG.CONTRACT_ADDRESS);
      return true;
    } catch (error) {
      console.error('Failed to initialize blockchain:', error);
      return false;
    }
  }

  async getContractABI() {
    // Minimal ABI for the functions we need
    return [
      // Game Functions
      "function startGame() external",
      "function endGame(uint256 pointsEarned) external",
      "function getAvailablePlays(address playerAddress) external view returns (uint256)",
      "function getRemainingLockTime(address playerAddress) external view returns (uint256)",
      "function getPlayerData(address playerAddress) external view returns (uint256, uint256, uint256, uint256, bool, uint256, uint256)",

      // Subscription Functions
      "function subscribe(address player, uint256 duration) external payable",
      "function sponsorSubscription(address player, uint256 duration) external",

      // Claim Functions
      "function claimPoints(address player, uint256 amount) external onlyOwner",
      "function getClaimHistory(address playerAddress) external view returns (tuple(uint256 amount, uint256 timestamp, bytes32 txHash)[])",

      // Owner Functions
      "function blockPlayer(address player, string memory reason) external",
      "function unblockPlayer(address player) external",
      "function adjustPoints(address player, int256 amount) external",
      "function withdraw() external",

      // View Functions
      "function players(address) external view returns (uint256 playsToday, uint256 lastPlayTimestamp, uint256 points, uint256 totalClaimed, bool subscribed, uint256 subscriptionExpiry)",
      "function isBlocked(address) external view returns (bool)",
      "function MAX_PLAYS_PER_DAY() external view returns (uint256)",
      "function POINTS_TO_CLAIM() external view returns (uint256)",

      // Events
      "event PlayStarted(address indexed player, uint256 playCount, uint256 timestamp)",
      "event PlayEnded(address indexed player, uint256 pointsEarned, uint256 totalPoints)",
      "event PointsClaimed(address indexed player, uint256 amount, bytes32 txHash, uint256 timestamp)",
      "event SubscriptionPaid(address indexed player, uint256 amount, uint256 expiry)",
      "event PlayerBlocked(address indexed player, string reason)"
    ];
  }

  // ============================================
  // GAME FUNCTIONS
  // ============================================

  async startGame() {
    if (!this.isInitialized) await this.initialize();
    try {
      const tx = await this.contract.startGame();
      console.log('startGame tx:', tx.hash);
      return { success: true, hash: tx.hash };
    } catch (error) {
      console.error('startGame error:', error);
      return { success: false, error: error.message };
    }
  }

  async endGame(pointsEarned) {
    if (!this.isInitialized) await this.initialize();
    try {
      const tx = await this.contract.endGame(pointsEarned);
      console.log('endGame tx:', tx.hash);
      return { success: true, hash: tx.hash };
    } catch (error) {
      console.error('endGame error:', error);
      return { success: false, error: error.message };
    }
  }

  async getAvailablePlays(address) {
    if (!this.isInitialized) await this.initialize();
    try {
      const plays = await this.contract.getAvailablePlays(address);
      return parseInt(plays.toString());
    } catch (error) {
      console.error('getAvailablePlays error:', error);
      return 0;
    }
  }

  async getRemainingLockTime(address) {
    if (!this.isInitialized) await this.initialize();
    try {
      const time = await this.contract.getRemainingLockTime(address);
      return parseInt(time.toString()) * 1000; // Convert to ms
    } catch (error) {
      console.error('getRemainingLockTime error:', error);
      return 0;
    }
  }

  async getPlayerData(address) {
    if (!this.isInitialized) await this.initialize();
    try {
      const data = await this.contract.getPlayerData(address);
      return {
        playsToday: parseInt(data[0].toString()),
        availablePlays: parseInt(data[1].toString()),
        points: parseInt(data[2].toString()),
        totalClaimed: parseInt(data[3].toString()),
        subscribed: data[4],
        subscriptionExpiry: parseInt(data[5].toString()),
        remainingLockTime: parseInt(data[6].toString()) * 1000
      };
    } catch (error) {
      console.error('getPlayerData error:', error);
      return null;
    }
  }

  async getPoints(address) {
    if (!this.isInitialized) await this.initialize();
    try {
      const data = await this.contract.players(address);
      return parseInt(data[2].toString()); // points is index 2
    } catch (error) {
      console.error('getPoints error:', error);
      return 0;
    }
  }

  async getClaimHistory(address) {
    if (!this.isInitialized) await this.initialize();
    try {
      const history = await this.contract.getClaimHistory(address);
      return history.map(record => ({
        amount: parseInt(record[0].toString()),
        timestamp: parseInt(record[1].toString()) * 1000,
        txHash: record[2]
      }));
    } catch (error) {
      console.error('getClaimHistory error:', error);
      return [];
    }
  }

  async isBlocked(address) {
    if (!this.isInitialized) await this.initialize();
    try {
      return await this.contract.isBlocked(address);
    } catch (error) {
      console.error('isBlocked error:', error);
      return false;
    }
  }

  async getClaimableMONAD(address) {
    const points = await this.getPoints(address);
    return Math.floor(points / 1000); // 1000 points = 1 MONAD
  }

  async getProgress(address) {
    const points = await this.getPoints(address);
    return Math.min(100, (points % 1000) / 10); // Percentage to next claim
  }

  async getTotalClaimed(address) {
    try {
      const data = await this.contract.players(address);
      return parseInt(data[3].toString());
    } catch (error) {
      console.error('getTotalClaimed error:', error);
      return 0;
    }
  }

  // ============================================
  // OWNER FUNCTIONS (Gasless/ Sponsored)
  // ============================================

  async sponsorSubscription(player, duration = 30 * 24 * 60 * 60) {
    // Owner only - gas sponsored
    try {
      const tx = await this.contract.sponsorSubscription(player, duration);
      console.log('sponsorSubscription tx:', tx.hash);
      return { success: true, hash: tx.hash };
    } catch (error) {
      console.error('sponsorSubscription error:', error);
      return { success: false, error: error.message };
    }
  }

  async claimPointsForPlayer(player, amount) {
    // Owner only - gas sponsored, sends MONAD to player
    try {
      const amountWei = ethers.parseEther(amount.toString());
      const tx = await this.contract.claimPoints(player, amountWei);
      console.log('claimPoints tx:', tx.hash);
      return { success: true, hash: tx.hash };
    } catch (error) {
      console.error('claimPoints error:', error);
      return { success: false, error: error.message };
    }
  }

  async blockPlayer(player, reason = "") {
    try {
      const tx = await this.contract.blockPlayer(player, reason);
      return { success: true, hash: tx.hash };
    } catch (error) {
      console.error('blockPlayer error:', error);
      return { success: false, error: error.message };
    }
  }

  async adjustPoints(player, amount) {
    try {
      const tx = await this.contract.adjustPoints(player, amount);
      return { success: true, hash: tx.hash };
    } catch (error) {
      console.error('adjustPoints error:', error);
      return { success: false, error: error.message };
    }
  }
}

// Create singleton instance
const blockchain = new BlockchainManager();