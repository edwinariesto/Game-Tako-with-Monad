/**
 * TAKO Game - Blockchain Integration Layer
 */

const BlockchainGame = {
    contract: null,
    signer: null,
    address: null,
    isOwner: false,

    async init() {
        if (typeof window.ethereum === 'undefined') return false;
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            this.signer = await provider.getSigner();
            this.address = await this.signer.getAddress();
            this.contract = new ethers.Contract(BLOCKCHAIN_CONFIG.CONTRACT_ADDRESS, this.getABI(), this.signer);
            this.isOwner = this.address.toLowerCase() === CONFIG.OWNER_WALLET.toLowerCase();
            return true;
        } catch (e) { return false; }
    },

    getABI() {
        return [
            "function startGame() external",
            "function endGame(uint256 pointsEarned) external",
            "function getAvailablePlays(address playerAddress) view returns (uint256)",
            "function getRemainingLockTime(address playerAddress) view returns (uint256)",
            "function getPlayerData(address playerAddress) view returns (uint256,uint256,uint256,uint256,bool,uint256,uint256)",
            "function sponsorSubscription(address player, uint256 duration) external",
            "function subscribe(address player, uint256 duration) payable external",
            "function claimPoints(address player, uint256 amount) external",
            "function getClaimHistory(address playerAddress) view returns (tuple(uint256 amount, uint256 timestamp, bytes32 txHash)[])",
            "function blockPlayer(address player, string reason) external",
            "function unblockPlayer(address player) external",
            "function adjustPoints(address player, int256 amount) external",
            "function withdraw() external",
            "function players(address) view returns (uint256,uint256,uint256,uint256,bool,uint256)",
            "function isBlocked(address) view returns (bool)",
            "function MAX_PLAYS_PER_DAY() view returns (uint256)",
            "function POINTS_TO_CLAIM() view returns (uint256)",
            "function owner() view returns (address)"
        ];
    },

    async startGame() {
        try {
            const tx = await this.contract.startGame();
            await tx.wait();
            return { success: true, hash: tx.hash };
        } catch (e) { return { success: false, error: e.message }; }
    },

    async endGame(pointsEarned) {
        try {
            const tx = await this.contract.endGame(pointsEarned);
            await tx.wait();
            return { success: true, hash: tx.hash };
        } catch (e) { return { success: false, error: e.message }; }
    },

    async getAvailablePlays() {
        try { return parseInt((await this.contract.getAvailablePlays(this.address)).toString()); }
        catch (e) { return 0; }
    },

    async getRemainingLockTime() {
        try { return parseInt((await this.contract.getRemainingLockTime(this.address)).toString()) * 1000; }
        catch (e) { return 0; }
    },

    async getPoints() {
        try { return parseInt((await this.contract.players(this.address))[2].toString()); }
        catch (e) { return 0; }
    },

    async getPlayerData() {
        try {
            const d = await this.contract.getPlayerData(this.address);
            return { playsToday: parseInt(d[0].toString()), availablePlays: parseInt(d[1].toString()), points: parseInt(d[2].toString()), totalClaimed: parseInt(d[3].toString()), subscribed: d[4], subscriptionExpiry: parseInt(d[5].toString()), remainingLockTime: parseInt(d[6].toString()) * 1000 };
        } catch (e) { return null; }
    },

    async isBlocked() {
        try { return await this.contract.isBlocked(this.address); }
        catch (e) { return false; }
    },

    async isSubscribed() {
        try { return (await this.contract.players(this.address))[4]; }
        catch (e) { return false; }
    },

    async getClaimHistory() {
        try {
            const h = await this.contract.getClaimHistory(this.address);
            return h.map(r => ({ amount: parseInt(r[0].toString()), timestamp: parseInt(r[1].toString()) * 1000, txHash: r[2] }));
        } catch (e) { return []; }
    },

    async getClaimableMONAD() { return Math.floor((await this.getPoints()) / 1000); },
    async getProgress() { return (await this.getPoints()) % 1000 / 10; },
    async getTotalClaimed() {
        try { return parseInt((await this.contract.players(this.address))[3].toString()); }
        catch (e) { return 0; }
    },

    async sponsorSubscription(player, duration = 30 * 24 * 60 * 60) {
        if (!this.isOwner) return { success: false, error: 'Owner only' };
        try {
            const tx = await this.contract.sponsorSubscription(player, duration);
            await tx.wait();
            return { success: true, hash: tx.hash };
        } catch (e) { return { success: false, error: e.message }; }
    },

    async claimPointsForPlayer(player, amount) {
        if (!this.isOwner) return { success: false, error: 'Owner only' };
        try {
            const tx = await this.contract.claimPoints(player, ethers.parseEther(amount.toString()));
            await tx.wait();
            return { success: true, hash: tx.hash };
        } catch (e) { return { success: false, error: e.message }; }
    },

    async blockPlayer(player, reason = "") {
        if (!this.isOwner) return { success: false, error: 'Owner only' };
        try { const tx = await this.contract.blockPlayer(player, reason); await tx.wait(); return { success: true }; }
        catch (e) { return { success: false, error: e.message }; }
    },

    async adjustPoints(player, amount) {
        if (!this.isOwner) return { success: false, error: 'Owner only' };
        try { const tx = await this.contract.adjustPoints(player, amount); await tx.wait(); return { success: true }; }
        catch (e) { return { success: false, error: e.message }; }
    }
};

window.BlockchainGame = BlockchainGame;