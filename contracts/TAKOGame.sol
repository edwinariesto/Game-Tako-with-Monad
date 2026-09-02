// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract TAKOGame {

    // ============================================
    // STATE VARIABLES
    // ============================================

    uint256 public constant MAX_PLAYS_PER_DAY = 3;
    uint256 public constant LOCK_DURATION = 24 hours;
    uint256 public constant POINTS_TO_CLAIM = 1000;
    uint256 public constant SUBSCRIPTION_FEE = 0.1 ether;

    address public owner;

    struct PlayerData {
        uint256 playsToday;
        uint256 lastPlayTimestamp;
        uint256 points;
        uint256 totalClaimed;
        bool subscribed;
        uint256 subscriptionExpiry;
    }

    struct ClaimRecord {
        uint256 amount;
        uint256 timestamp;
        bytes32 txHash;
    }

    mapping(address => PlayerData) public players;
    mapping(address => ClaimRecord[]) public claimHistory;
    mapping(address => bool) public blockedPlayers;

    // ============================================
    // EVENTS
    // ============================================

    event PlayStarted(address indexed player, uint256 playCount, uint256 timestamp);
    event PlayEnded(address indexed player, uint256 pointsEarned, uint256 totalPoints);
    event PointsClaimed(address indexed player, uint256 amount, bytes32 txHash, uint256 timestamp);
    event SubscriptionPaid(address indexed player, uint256 amount, uint256 expiry);
    event PlayerBlockedEvent(address indexed player, string reason);
    event PlayLockReset(address indexed player, uint256 newPlaysAvailable);

    // ============================================
    // ERRORS
    // ============================================

    error NotEnoughPlays();
    error PlayLocked();
    error NotSubscribed();
    error PlayerIsBlocked();
    error InvalidAmount();
    error TransferFailed();
    error Unauthorized();

    // ============================================
    // MODIFIERS
    // ============================================

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier notBlocked() {
        require(!blockedPlayers[msg.sender], "Player blocked");
        _;
    }

    modifier isSubscribedPlayer() {
        PlayerData storage player = players[msg.sender];
        require(player.subscribed && block.timestamp <= player.subscriptionExpiry, "Not subscribed");
        _;
    }

    // ============================================
    // CONSTRUCTOR
    // ============================================

    constructor() {
        owner = msg.sender;
    }

    // ============================================
    // INTERNAL HELPERS (must be before using functions)
    // ============================================

    function _getAvailablePlays(address playerAddress) internal view returns (uint256) {
        PlayerData storage player = players[playerAddress];
        if (block.timestamp >= player.lastPlayTimestamp + LOCK_DURATION) {
            return MAX_PLAYS_PER_DAY;
        }
        if (player.playsToday >= MAX_PLAYS_PER_DAY) {
            return 0;
        }
        return MAX_PLAYS_PER_DAY - player.playsToday;
    }

    function _getRemainingLockTime(address playerAddress) internal view returns (uint256) {
        PlayerData storage player = players[playerAddress];
        if (player.playsToday < MAX_PLAYS_PER_DAY) return 0;
        uint256 unlockTime = player.lastPlayTimestamp + LOCK_DURATION;
        if (block.timestamp >= unlockTime) return 0;
        return unlockTime - block.timestamp;
    }

    // ============================================
    // GAME FUNCTIONS
    // ============================================

    function startGame() external notBlocked isSubscribedPlayer {
        PlayerData storage player = players[msg.sender];
        uint256 playsAvailable = _getAvailablePlays(msg.sender);
        require(playsAvailable > 0, "No plays left");

        if (player.playsToday >= MAX_PLAYS_PER_DAY) {
            require(block.timestamp >= player.lastPlayTimestamp + LOCK_DURATION, "Play locked");
            player.playsToday = 0;
            emit PlayLockReset(msg.sender, MAX_PLAYS_PER_DAY);
        }

        player.playsToday += 1;
        player.lastPlayTimestamp = block.timestamp;

        emit PlayStarted(msg.sender, player.playsToday, block.timestamp);
    }

    function endGame(uint256 pointsEarned) external notBlocked isSubscribedPlayer {
        PlayerData storage player = players[msg.sender];
        player.points += pointsEarned;
        emit PlayEnded(msg.sender, pointsEarned, player.points);
    }

    // ============================================
    // VIEW FUNCTIONS
    // ============================================

    function getAvailablePlays(address playerAddress) public view returns (uint256) {
        return _getAvailablePlays(playerAddress);
    }

    function getRemainingLockTime(address playerAddress) external view returns (uint256) {
        return _getRemainingLockTime(playerAddress);
    }

    function getPlayerData(address playerAddress) external view returns (
        uint256 playsToday,
        uint256 points,
        uint256 totalClaimed,
        bool subscribed,
        uint256 remainingLock
    ) {
        PlayerData storage player = players[playerAddress];
        return (
            player.playsToday,
            player.points,
            player.totalClaimed,
            player.subscribed && block.timestamp <= player.subscriptionExpiry,
            _getRemainingLockTime(playerAddress)
        );
    }

    function getPlaysToday(address playerAddress) external view returns (uint256) {
        return players[playerAddress].playsToday;
    }

    function getPoints(address playerAddress) external view returns (uint256) {
        return players[playerAddress].points;
    }

    // ============================================
    // SUBSCRIPTION FUNCTIONS
    // ============================================

    function subscribe(address player, uint256 duration) external payable {
        require(msg.value >= SUBSCRIPTION_FEE, "Insufficient fee");

        PlayerData storage p = players[player];
        uint256 newExpiry = block.timestamp + duration;

        if (p.subscriptionExpiry > block.timestamp) {
            p.subscriptionExpiry += duration;
        } else {
            p.subscriptionExpiry = newExpiry;
        }
        p.subscribed = true;

        emit SubscriptionPaid(player, msg.value, p.subscriptionExpiry);
    }

    function sponsorSubscription(address player, uint256 duration) external onlyOwner {
        PlayerData storage p = players[player];
        uint256 newExpiry = block.timestamp + duration;

        if (p.subscriptionExpiry > block.timestamp) {
            p.subscriptionExpiry += duration;
        } else {
            p.subscriptionExpiry = newExpiry;
        }
        p.subscribed = true;

        emit SubscriptionPaid(player, 0, p.subscriptionExpiry);
    }

    // ============================================
    // CLAIM FUNCTIONS
    // ============================================

    function claimPoints(address player, uint256 amount) external onlyOwner {
        PlayerData storage p = players[player];

        uint256 claimable = p.points / POINTS_TO_CLAIM;
        require(amount <= claimable, "Invalid amount");

        p.points -= (amount * POINTS_TO_CLAIM);
        p.totalClaimed += amount;

        ClaimRecord memory record = ClaimRecord({
            amount: amount,
            timestamp: block.timestamp,
            txHash: blockhash(block.number - 1)
        });
        claimHistory[player].push(record);

        emit PointsClaimed(player, amount, record.txHash, block.timestamp);
    }

    function getClaimHistory(address playerAddress) external view returns (ClaimRecord[] memory) {
        return claimHistory[playerAddress];
    }

    // ============================================
    // OWNER FUNCTIONS
    // ============================================

    function blockPlayer(address player, string memory reason) external onlyOwner {
        blockedPlayers[player] = true;
        emit PlayerBlockedEvent(player, reason);
    }

    function unblockPlayer(address player) external onlyOwner {
        blockedPlayers[player] = false;
    }

    function adjustPoints(address player, int256 amount) external onlyOwner {
        PlayerData storage p = players[player];
        if (amount < 0) {
            require(p.points >= uint256(-amount), "Insufficient points");
            p.points = uint256(int256(p.points) + amount);
        } else {
            p.points += uint256(amount);
        }
    }

    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    receive() external payable {}
}