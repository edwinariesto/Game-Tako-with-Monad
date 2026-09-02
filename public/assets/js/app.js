/* ==========================================
   TAKO Game - Main Application Logic
   ========================================== */

const CONFIG = {
    SUBSCRIPTION_AMOUNT: '0.1',
    OWNER_WALLET: '0x29b7DA258ED7F92F72511d8fC5d1f8dd636bAAE6',
    SUBSCRIPTION_DURATION: 30 * 24 * 60 * 60 * 1000,
    RPC_URL: 'https://rpc.testednet.monad.xyz',
    NETWORK_CHAIN_ID: 10143,
    NETWORK_NAME: 'Monad Testnet',
    GAME_DURATION: 60,
    MAX_PLAYS_PER_DAY: 3,
    PLAY_PERIODS: [
        { name: 'Morning', start: 6, end: 11 },
        { name: 'Afternoon', start: 12, end: 17 },
        { name: 'Evening', start: 18, end: 23 }
    ],
    COIN_SPAWN_INTERVAL: 800,
    MAX_COINS_ON_SCREEN: 12,
    COIN_TYPES: {
        WHITE: { chance: 0.10, color: '#FFFFFF', points: 10 },
        YELLOW: { chance: 0.55, color: '#FFD700', points: 1 },
        GREEN: { chance: 0.15, color: '#00FF00', points: 2 },
        RED: { chance: 0.12, color: '#FF0000', penalty: 0.3 },
        BOMB: { chance: 0.08, color: '#000000', penalty: 1 }
    },
    MONTHLY_SUBSCRIPTION_MONAD: 0.1,
    MAX_PROFIT_PERCENT: 200,
    DANGER_SPAWN_MIN: 2,
    DANGER_SPAWN_MAX: 10
};

// ==========================================
// TRANSLATION SYSTEM
// ==========================================

const translations = {
    en: {
        'tagline': 'Game Catch Coin Tako',
        'btn_connect': 'Connect Wallet',
        'btn_about': 'About',
        'btn_continue': 'Continue',
        'btn_disconnect': 'Disconnect',
        'btn_help': 'How to Play',
        'wallet_balance': '-- MONAD',
        'label_coins': 'Coins',
        'label_time': 'Time',
        'modal_title': 'Subscription Required',
        'modal_text': 'Rent the app for 1 Month',
        'sweet_connecting': 'Connecting...',
        'sweet_connected': 'Connected!',
        'sweet_connection_failed': 'Connection Failed',
        'sweet_demo_mode': 'Demo Mode',
        'sweet_demo_text': 'Demo mode: No MetaMask detected.',
        'sweet_wallet_rejected': 'Wallet Rejected',
        'sweet_wallet_rejected_text': 'You rejected the connection request.',
        'sweet_payment_success': 'Payment Successful!',
        'sweet_payment_success_text': 'Your subscription is now active.',
        'sweet_error': 'Error',
        'about_title': 'About TAKO',
        'about_text': 'TAKO is a Web3 game on the Monad blockchain.\n\nSubscribe: 0.1 MONAD/month',
        'about_got_it': 'Got it!',
        'btn_start': 'Start Game',
        'btn_pay': 'Pay Now',
        'btn_cancel': 'Cancel',
        'game_over_title': 'Game Over!',
        'game_over_coins': 'Total Coins: ',
        'game_over_plays_left': 'Plays Left Today: ',
        'game_play_again': 'Play Again',
        'game_exit': 'Exit',
        'warning_red_coin': 'Red Coin! -30% coins lost!',
        'warning_bomb': 'BOMB! All coins reset to 0!',
        'no_plays_left': 'No plays left today!',
        'no_plays_text': 'Come back in the next period.',
        'no_plays_next_period': 'Next period in: ',
        'btn_return_tomorrow': 'Return Next Period',
        'btn_start': 'Start Game',
        'plays_label': 'Plays',
        'countdown_label': 'Next period in: ',
        'help_title': 'How to Play',
        'help_text': '<b>🎯 Goal:</b> Catch coins with your basket!<br><br><b>🪙 Coin Types:</b><br>1. <span style="color:#FFD700">●</span> <b>Gold Coin</b> - +1 point<br>2. <span style="color:#FFFFFF">●</span> <b>White Coin</b> - +10 points<br>3. <span style="color:#00FF00">●</span> <b>Green Coin</b> - +2 points<br>4. <span style="color:#FF0000">●</span> <b>Red Coin</b> - -30% penalty!<br>5. <span style="color:#000">●</span> <b>BOMB</b> - Reset to 0!<br><br><b>🎮 Controls:</b><br>• Use <b>← →</b> buttons or drag on canvas<br>• Keyboard: <b>A/D</b> or <b>Arrow keys</b><br><br><b>⏰ Game Duration:</b> 60 seconds<br><b>⚠️ Max 3 plays/day</b>',
        'help_got_it': 'Got it!',
        'points_title': 'My Points',
        'points_total': 'Total Points',
        'points_claimable': 'Claimable MONAD',
        'points_progress': 'Progress to 1000',
        'points_not_enough': 'Collect 1000 points to claim 1 MONAD',
        'points_enough': 'Claim Available!',
        'btn_claim': 'Claim',
        'btn_close': 'Close',
        'owner_blocked_title': 'Access Denied',
        'owner_blocked_text': 'Owner wallet cannot play this game.',
        'claim_title': 'My Points',
        'claim_total': 'Total Points',
        'claim_accumulated': 'Total Claimed',
        'claim_available': 'Available MONAD',
        'claim_progress': 'Next claim progress',
        'claim_history': 'Claim History',
        'claim_no_history': 'No claims yet',
        'claim_btn': 'Claim MONAD',
        'claim_success': 'Claim Successful!',
        'claim_success_text': 'You received {amount} MONAD. Transaction: {tx}',
        'claim_error': 'Claim Failed',
        'claim_error_text': 'Please try again.',
        'claim_not_enough': 'Collect 1000 points to claim',
        'claim_close': 'Close',
        'claim_confirming': 'Confirming transaction...'
    },
    id: {
        'tagline': 'Game Tangkap Koin Tako',
        'btn_connect': 'Hubungkan Dompet',
        'btn_about': 'Tentang',
        'btn_continue': 'Lanjutkan',
        'btn_disconnect': 'Putuskan',
        'btn_help': 'Cara Bermain',
        'wallet_balance': '-- MONAD',
        'label_coins': 'Koin',
        'label_time': 'Waktu',
        'modal_title': 'Berlangganan Diperlukan',
        'modal_text': 'Sewa aplikasi selama 1 Bulan',
        'sweet_connecting': 'Menghubungkan...',
        'sweet_connected': 'Terhubung!',
        'sweet_connection_failed': 'Koneksi Gagal',
        'sweet_demo_mode': 'Mode Demo',
        'sweet_demo_text': 'Mode demo: MetaMask tidak terdeteksi.',
        'sweet_wallet_rejected': 'Dompet Ditolak',
        'sweet_wallet_rejected_text': 'Anda menolak permintaan koneksi.',
        'sweet_payment_success': 'Pembayaran Berhasil!',
        'sweet_payment_success_text': 'Berlangganan kamu aktif.',
        'sweet_error': 'Error',
        'about_title': 'Tentang TAKO',
        'about_text': 'TAKO adalah game Web3 di blockchain Monad.\n\nBerlangganan: 0.1 MONAD/bulan',
        'about_got_it': 'Tutup',
        'btn_start': 'Mulai Main',
        'btn_pay': 'Bayar Sekarang',
        'btn_cancel': 'Batal',
        'game_over_title': 'Permainan Selesai!',
        'game_over_coins': 'Total Koin: ',
        'game_over_plays_left': 'Sisa Main Hari Ini: ',
        'game_play_again': 'Main Lagi',
        'game_exit': 'Keluar',
        'warning_red_coin': 'Koin Merah! -30% koin hilang!',
        'warning_bomb': 'BOM! Semua koin direset ke 0!',
        'no_plays_left': 'Sudah tidak ada kesempatan main!',
        'no_plays_text': 'Tunggu periode berikutnya.',
        'no_plays_next_period': 'Periode berikutnya dalam: ',
        'btn_return_tomorrow': 'Kembali Periode Berikutnya',
        'btn_start': 'Mulai Main',
        'plays_label': 'Main',
        'countdown_label': 'Periode berikutnya dalam: ',
        'help_title': 'Cara Bermain',
        'help_text': '<b>🎯 Tujuan:</b> Tangkap koin dengan keranjangmu!<br><br><b>🪙 Jenis Koin:</b><br>1. <span style="color:#FFD700">●</span> <b>Koin Emas</b> - +1 poin<br>2. <span style="color:#FFFFFF">●</span> <b>Koin Putih</b> - +10 poin<br>3. <span style="color:#00FF00">●</span> <b>Koin Hijau</b> - +2 poin<br>4. <span style="color:#FF0000">●</span> <b>Koin Merah</b> - -30% potong!<br>5. <span style="color:#000">●</span> <b>BOM</b> - Reset ke 0!<br><br><b>🎮 Kontrol:</b><br>• Gunakan tombol <b>← →</b> atau drag di canvas<br>• Keyboard: <b>A/D</b> atau <b>Arrow keys</b><br><br><b>⏰ Durasi Game:</b> 60 detik<br><b>⚠️ Maksimal 3x main/hari</b>',
        'help_got_it': 'Tutup',
        'points_title': 'Poin Saya',
        'points_total': 'Total Poin',
        'points_claimable': 'MONAD yang Bisa Diklaim',
        'points_progress': 'Progres ke 1000',
        'points_not_enough': 'Kumpulkan 1000 poin untuk klaim 1 MONAD',
        'points_enough': 'Siap Diklaim!',
        'btn_claim': 'Klaim',
        'btn_close': 'Tutup',
        'owner_blocked_title': 'Akses Ditolak',
        'owner_blocked_text': 'Dompet Owner tidak bisa memainkan game ini.',
        'claim_title': 'Poin Saya',
        'claim_total': 'Total Poin',
        'claim_accumulated': 'Total Diklaim',
        'claim_available': 'MONAD Tersedia',
        'claim_progress': 'Progres klaim selanjutnya',
        'claim_history': 'Riwayat Klaim',
        'claim_no_history': 'Belum ada klaim',
        'claim_btn': 'Klaim MONAD',
        'claim_success': 'Klaim Berhasil!',
        'claim_success_text': 'Anda menerima {amount} MONAD. Transaksi: {tx}',
        'claim_error': 'Klaim Gagal',
        'claim_error_text': 'Silakan coba lagi.',
        'claim_not_enough': 'Kumpulkan 1000 poin untuk klaim',
        'claim_close': 'Tutup',
        'claim_confirming': 'Mengkonfirmasi transaksi...'
    }
};

let currentLang = localStorage.getItem('tako_lang') || 'en';

const i18n = {
    t(key) {
        return translations[currentLang][key] || translations['en'][key] || key;
    },
    setLang(lang) {
        currentLang = lang;
        localStorage.setItem('tako_lang', lang);
        this.updateUI();
    },
    updateUI() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = this.t(key);
        });
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === currentLang);
        });
        const walletBalance = document.getElementById('walletBalance');
        if (walletBalance) {
            const text = walletBalance.textContent.trim();
            if (text === '-- MONAD' || text === 'wallet_balance') {
                walletBalance.textContent = this.t('wallet_balance');
            }
        }
        // Update start button if exists
        const startBtnText = document.querySelector('#btnStartGame .btn-text');
        if (startBtnText) {
            startBtnText.textContent = this.t('btn_start');
        }
    }
};

// ==========================================
// SWEET ALERT
// ==========================================

const SweetAlert = {
    overlay: document.getElementById('sweetOverlay'),

    show(options) {
        const { type = 'info', title = '', text = '', confirmText = 'OK', cancelText = null, onConfirm = null, onCancel = null, onShow = null, useI18n = true, extraData = null, isHtml = false, customWidth = null } = options;

        let finalTitle = useI18n && title ? i18n.t(title) : title;
        let finalText = useI18n && text ? i18n.t(text) : text;

        // Debug: log translation
        
        const finalConfirm = useI18n && confirmText ? i18n.t(confirmText) : confirmText;
        const finalCancel = useI18n && cancelText ? i18n.t(cancelText) : cancelText;

        if (extraData) {
            if (extraData.coins !== undefined) {
                finalText = finalText + extraData.coins + '\n' + (useI18n ? i18n.t('game_over_plays_left') : 'Plays Left: ') + extraData.playsLeft;
            }
        }

        const icons = {
            success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></polyline></svg>',
            error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-width="2"></circle><line x1="15" y1="9" x2="9" y2="15" stroke-width="2.5" stroke-linecap="round"></line><line x1="9" y1="9" x2="15" y2="15" stroke-width="2.5" stroke-linecap="round"></line></svg>',
            info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-width="2"></circle><line x1="12" y1="16" x2="12" y2="12" stroke-width="2" stroke-linecap="round"></line><line x1="12" y1="8" x2="12.01" y2="8" stroke-width="2.5" stroke-linecap="round"></line></svg>',
            warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke-width="2"></path><line x1="12" y1="9" x2="12" y2="13" stroke-width="2" stroke-linecap="round"></line><line x1="12" y1="17" x2="12.01" y2="17" stroke-width="2.5" stroke-linecap="round"></line></svg>',
            danger: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-width="2"></circle><line x1="15" y1="9" x2="9" y2="15" stroke-width="2.5" stroke-linecap="round"></line><line x1="9" y1="9" x2="15" y2="15" stroke-width="2.5" stroke-linecap="round"></line></svg>'
        };

        let formattedText = isHtml ? text : finalText.replace(/\n/g, '<br>');

        let html = `
            <div class="sweet-alert" ${customWidth ? `style="max-width: ${customWidth}px"` : ''}>
                <div class="sweet-icon ${type}">${icons[type] || icons.info}</div>
                <div class="sweet-title">${finalTitle}</div>
                <div class="sweet-text">${formattedText}</div>
                <div class="sweet-buttons">
                    <button class="sweet-btn sweet-btn-confirm" id="sweetConfirm">${finalConfirm}</button>
        `;

        if (cancelText) {
            html += `<button class="sweet-btn sweet-btn-cancel" id="sweetCancel">${finalCancel}</button>`;
        }
        html += `</div></div>`;

        this.overlay.innerHTML = html;
        this.overlay.classList.add('visible');

        // Call onShow callback if provided
        if (onShow) {
            setTimeout(onShow, 100);
        }

        document.getElementById('sweetConfirm').addEventListener('click', () => {
            this.hide();
            if (onConfirm) onConfirm();
        });

        const cancelBtn = document.getElementById('sweetCancel');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                this.hide();
                if (onCancel) onCancel();
            });
        }
    },

    showWarning(text, duration = 2000) {
        const warningEl = document.createElement('div');
        warningEl.className = 'game-warning';
        warningEl.textContent = text;
        document.body.appendChild(warningEl);
        setTimeout(() => {
            warningEl.style.opacity = '0';
            warningEl.style.transition = 'opacity 0.5s';
            setTimeout(() => warningEl.remove(), 500);
        }, duration);
    },

    hide() {
        this.overlay.classList.remove('visible');
        this.overlay.innerHTML = '';
    }
};

// ==========================================
// WALLET MANAGER
// ==========================================

let web3Provider = null;
let signer = null;
let gameState = {
    connected: false,
    subscribed: false,
    subscriptionExpiry: null,
    address: null,
    playsToday: 0,
    lastPlayDate: null,
    points: 0,
    playPeriods: {},
    playLockUntil: null
};

// Per-wallet storage key
function getWalletStorageKey(address) {
    if (!address) return 'tako_wallet_state';
    return `tako_wallet_state_${address.toLowerCase()}`;
}

const PointsManager = {
    getPoints(address) {
        const pointsData = localStorage.getItem(`tako_points_${address}`);
        return pointsData ? parseInt(pointsData) : 0;
    },

    setPoints(address, points) {
        localStorage.setItem(`tako_points_${address}`, points.toString());
    },

    addPoints(address, amount) {
        const currentPoints = this.getPoints(address);
        const newPoints = currentPoints + amount;
        localStorage.setItem(`tako_points_${address}`, newPoints.toString());
        return newPoints;
    },

    getClaimableMONAD(address) {
        const points = this.getPoints(address);
        return Math.floor(points / 1000);
    },

    getRemaining(address) {
        const points = this.getPoints(address);
        return 1000 - (points % 1000);
    },

    getProgress(address) {
        const points = this.getPoints(address);
        return Math.min(100, (points % 1000) / 10);
    },

    deductPoints(address, amount) {
        const currentPoints = this.getPoints(address);
        const newPoints = Math.max(0, currentPoints - (amount * 1000));
        localStorage.setItem(`tako_points_${address}`, newPoints.toString());
        return newPoints;
    },

    // Claim History
    addClaimHistory(address, monadAmount, txHash = null) {
        const history = this.getClaimHistory(address);
        const claimRecord = {
            amount: monadAmount,
            date: new Date().toISOString(),
            txHash: txHash,
            status: 'pending'
        };
        history.push(claimRecord);
        localStorage.setItem(`tako_claim_history_${address}`, JSON.stringify(history));
        return history;
    },

    getClaimHistory(address) {
        const history = localStorage.getItem(`tako_claim_history_${address}`);
        return history ? JSON.parse(history) : [];
    },

    updateClaimStatus(address, index, status, txHash = null) {
        const history = this.getClaimHistory(address);
        if (history[index]) {
            history[index].status = status;
            if (txHash) history[index].txHash = txHash;
            localStorage.setItem(`tako_claim_history_${address}`, JSON.stringify(history));
        }
    },

    getTotalClaimed(address) {
        const history = this.getClaimHistory(address);
        return history.reduce((sum, claim) => sum + (claim.status === 'completed' ? claim.amount : 0), 0);
    }
};

class WalletManager {
    constructor() {
        this.address = null;
        this.blockchainProvider = null;
        this.blockchainContract = null;
    }

    async initBlockchain() {
        if (typeof window.ethereum === 'undefined') return false;
        if (!this.address) return false;

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            this.blockchainProvider = provider;
            this.blockchainContract = new ethers.Contract(
                BLOCKCHAIN_CONFIG.CONTRACT_ADDRESS,
                [
                    "function getPlayerData(address playerAddress) view returns (uint256,uint256,uint256,uint256,bool,uint256,uint256)",
                    "function getAvailablePlays(address playerAddress) view returns (uint256)",
                    "function getRemainingLockTime(address playerAddress) view returns (uint256)",
                    "function players(address) view returns (uint256,uint256,uint256,uint256,bool,uint256)"
                ],
                provider
            );
            return true;
        } catch (e) { return false; }
    }

    async syncFromBlockchain() {
        if (!this.blockchainContract || !this.address) return;

        try {
            const playerData = await this.blockchainContract.getPlayerData(this.address);

            // Sync playsToday and lock time from blockchain
            const blockchainPlays = parseInt(playerData[0].toString());
            const blockchainPoints = parseInt(playerData[2].toString());
            const blockchainSubscribed = playerData[4];
            const blockchainRemainingLock = parseInt(playerData[6].toString()) * 1000;

            // Only sync if blockchain has more recent data
            if (blockchainPoints > gameState.points) {
                gameState.points = blockchainPoints;
                PointsManager.setPoints(this.address, blockchainPoints);
            }

            // Sync lock time
            if (blockchainRemainingLock > 0 && (!gameState.playLockUntil || blockchainRemainingLock > gameState.playLockUntil - Date.now())) {
                gameState.playLockUntil = Date.now() + blockchainRemainingLock;
            } else if (blockchainRemainingLock === 0 && gameState.playLockUntil) {
                // Lock expired on blockchain
                gameState.playLockUntil = null;
                gameState.playPeriods = {};
            }

            // Sync plays - use blockchain playsToday for reference
            if (blockchainPlays > 0) {
                const periodKey = this.getPeriodKey();
                if (!gameState.playPeriods[periodKey] || gameState.playPeriods[periodKey] < blockchainPlays) {
                    gameState.playPeriods[periodKey] = blockchainPlays;
                }
            }

            this.saveState();
        } catch (e) { /* sync failed, keep local data */ }
    }

    async connect() {
        try {
            if (typeof window.ethereum === 'undefined') {
                this.address = this.generateRandomAddress();
                web3Provider = 'simulated';
                signer = 'simulated';
                gameState.connected = true;
                gameState.address = this.address;
                this.saveState();
                return { success: true, address: this.address, simulated: true };
            }

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts.length > 0) {
                this.address = accounts[0];

                // Check if owner wallet - revoke and reload immediately
                if (this.address.toLowerCase() === CONFIG.OWNER_WALLET.toLowerCase()) {
                    try {
                        window.ethereum.request({
                            method: 'wallet_revokePermissions',
                            params: [{ eth_accounts: {} }]
                        });
                    } catch (e) { /* ignore */ }
                    window.location.href = window.location.pathname;
                    return { success: false, error: 'owner_blocked' };
                }

                gameState.connected = true;
                gameState.address = this.address;
                this.saveState();

                // Initialize blockchain connection
                this.initBlockchain();

                try {
                    web3Provider = new ethers.JsonRpcProvider(CONFIG.RPC_URL);
                    signer = await web3Provider.getSigner();
                } catch (rpcError) {
                    web3Provider = 'simulated';
                    signer = 'simulated';
                }

                return { success: true, address: this.address, walletName: 'MetaMask' };
            } else {
                return { success: false, error: 'No accounts found' };
            }
        } catch (error) {
            
            if (error.code === 4001) {
                return { success: false, error: 'wallet_rejected' };
            }
            return { success: false, error: error.message };
        }
    }

    async disconnect() {
        const currentAddress = this.address;

        // Clear ALL state completely
        this.address = null;
        web3Provider = null;
        signer = null;
        gameState = {
            connected: false,
            subscribed: false,
            subscriptionExpiry: null,
            address: null,
            playsToday: 0,
            lastPlayDate: null,
            points: 0,
            playPeriods: {},
            playLockUntil: null
        };

        // Clear ALL localStorage related to wallet
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && (key.startsWith('tako_wallet_state') || key.startsWith('tako_points_') || key.startsWith(`tako_subscription_${currentAddress}`))) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));

        // Try to revoke MetaMask permissions
        if (window.ethereum) {
            try {
                await window.ethereum.request({
                    method: 'wallet_revokePermissions',
                    params: [{ eth_accounts: {} }]
                });
            } catch (e) {
                
            }
        }

        // Clear subscription localStorage for this address
        localStorage.removeItem(`tako_subscription_${currentAddress}`);
        localStorage.removeItem(`tako_subscription`);

        // Go to login page
        showLoginPage();

        // Reload page to ensure clean state
        window.location.reload();
    }

    async checkSubscription() {
        const saved = this.loadSubscription();
        if (saved) {
            const expiry = new Date(saved.expiry);
            gameState.subscribed = new Date() < expiry;
            gameState.subscriptionExpiry = saved.expiry;
            return { subscribed: gameState.subscribed, expiry: saved.expiry };
        }
        gameState.subscribed = false;
        return { subscribed: false, expiry: null };
    }

    async getBalance() {
        try {
            if (this.address && window.ethereum) {
                const balanceHex = await window.ethereum.request({
                    method: 'eth_getBalance',
                    params: [this.address, 'latest']
                });
                const balanceWei = BigInt(balanceHex);
                const balanceMONAD = Number(balanceWei) / 1e18;
                const balanceFormatted = balanceMONAD.toFixed(4);
                document.getElementById('walletBalance').textContent = `${balanceFormatted} MONAD`;
                return balanceFormatted;
            } else {
                document.getElementById('walletBalance').textContent = '10.0000 MONAD';
                return '10.0000';
            }
        } catch (error) {
            document.getElementById('walletBalance').textContent = '-- MONAD';
            return null;
        }
    }

    updateBalanceLoop() {
        this.getBalance();
        setInterval(() => this.getBalance(), 10000);
    }

    saveSubscription() {
        const expiry = new Date(Date.now() + CONFIG.SUBSCRIPTION_DURATION);
        const data = { address: this.address, expiry: expiry.toISOString() };
        localStorage.setItem('tako_subscription', JSON.stringify(data));
        gameState.subscribed = true;
        gameState.subscriptionExpiry = data.expiry;
        this.saveState();
        return { success: true, expiry: data.expiry };
    }

    loadSubscription() {
        const data = localStorage.getItem('tako_subscription');
        return data ? JSON.parse(data) : null;
    }

    getPlaysRemaining() {
        // Use period-based play counting (3 plays per 6-hour period)
        return this.getPeriodPlaysRemaining();
    }

    recordPlay() {
        const today = new Date().toDateString();
        if (gameState.lastPlayDate !== today) {
            gameState.playsToday = 0;
            gameState.lastPlayDate = today;
        }
        gameState.playsToday++;
        this.saveState();
    }

    getCurrentPeriod() {
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 12) return 6;   // Morning: 06:00-11:59
        if (hour >= 12 && hour < 18) return 12; // Afternoon: 12:00-17:59
        return 18; // Evening: 18:00-23:59
    }

    getPeriodKey(date = new Date()) {
        const d = date.toISOString().split('T')[0]; // "2024-05-03"
        const hour = date.getHours();
        let periodHour = 6;
        if (hour >= 6 && hour < 12) periodHour = 6;
        else if (hour >= 12 && hour < 18) periodHour = 12;
        else periodHour = 18;
        return `${d}-${periodHour}`;
    }

    getPeriodPlaysRemaining() {
        if (gameState.playLockUntil) {
            const now = Date.now();
            if (now >= gameState.playLockUntil) {
                // Lock expired - reset and allow plays
                gameState.playLockUntil = null;
                gameState.playPeriods = {};
                this.saveState();
                return CONFIG.MAX_PLAYS_PER_DAY;
            }
            return 0; // Still locked
        }

        const periodKey = this.getPeriodKey();
        const played = gameState.playPeriods[periodKey] || 0;
        return Math.max(0, CONFIG.MAX_PLAYS_PER_DAY - played);
    }

    recordPeriodPlay() {
        const periodKey = this.getPeriodKey();
        if (!gameState.playPeriods) gameState.playPeriods = {};

        gameState.playPeriods[periodKey] = (gameState.playPeriods[periodKey] || 0) + 1;

        // If this was the 3rd play, set 24h lock
        if (gameState.playPeriods[periodKey] >= CONFIG.MAX_PLAYS_PER_DAY) {
            gameState.playLockUntil = Date.now() + (24 * 60 * 60 * 1000);
        }

        this.saveState();
        
    }

    getRemainingLockTime() {
        if (!gameState.playLockUntil) return 0;
        return Math.max(0, gameState.playLockUntil - Date.now());
    }

    getNextPeriodTime() {
        // Return the locked time if exists
        if (gameState.playLockUntil) {
            return gameState.playLockUntil;
        }
        // No lock, return 24h from now
        const now = new Date();
        const next = new Date(now);
        next.setDate(next.getDate() + 1);
        return next.getTime();
    }

    getTimeUntilNextPeriod() {
        const now = new Date();
        const next = this.getNextPeriodTime();
        return Math.max(0, next - now);
    }

    formatCountdown(ms) {
        const totalSec = Math.ceil(ms / 1000);
        const h = Math.floor(totalSec / 3600);
        const m = Math.floor((totalSec % 3600) / 60);
        const s = totalSec % 60;
        if (h > 0) return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
        return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
    }

    getPlaysToday() {
        const today = new Date().toDateString();
        if (gameState.lastPlayDate !== today) return 0;
        return gameState.playsToday || 0;
    }

    getPeriodPlays() {
        const periodKey = this.getPeriodKey();
        return gameState.playPeriods ? (gameState.playPeriods[periodKey] || 0) : 0;
    }

    formatAddress(address) {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }

    generateRandomAddress() {
        const chars = '0123456789abcdef';
        let addr = '0x';
        for (let i = 0; i < 40; i++) addr += chars[Math.floor(Math.random() * chars.length)];
        return addr;
    }

    saveState() {
        if (this.address) {
            localStorage.setItem(getWalletStorageKey(this.address), JSON.stringify(gameState));
        } else {
            localStorage.setItem('tako_wallet_state', JSON.stringify(gameState));
        }
    }

    loadState() {
        // Try loading per-wallet storage first
        const storageKey = getWalletStorageKey(this.address);
        let saved = localStorage.getItem(storageKey);

        // Fallback to old global storage (for migration)
        if (!saved) {
            saved = localStorage.getItem('tako_wallet_state');
        }

        // Also try to find any saved wallet address
        if (!saved) {
            const keys = Object.keys(localStorage).filter(k => k.startsWith('tako_wallet_state_'));
            if (keys.length > 0) {
                saved = localStorage.getItem(keys[0]);
            }
        }

        if (saved) {
            const parsed = JSON.parse(saved);
            gameState = { ...gameState, ...parsed };
            this.address = gameState.address;

            if (gameState.playLockUntil && Date.now() >= gameState.playLockUntil) {
                gameState.playLockUntil = null;
                gameState.playPeriods = {};
                this.saveState();
            }
        }
    }
}

const wallet = new WalletManager();

// ==========================================
// COIN ANIMATION
// ==========================================

const CoinAnimation = {
    container: null,
    coins: [],
    maxCoins: 8,
    paused: false,

    init() {
        this.container = document.getElementById('coinsContainer');
        for (let i = 0; i < this.maxCoins; i++) {
            setTimeout(() => this.addCoin(), i * 800);
        }
    },

    pause() {
        this.paused = true;
        this.coins.forEach(coin => coin.style.display = 'none');
    },

    resume() {
        this.paused = false;
        this.coins.forEach(coin => coin.style.display = '');
    },

    addCoin() {
        if (!this.container || this.coins.length >= this.maxCoins) return;
        if (this.paused) return;

        const coin = document.createElement('div');
        coin.className = 'coin';
        const coinImg = document.createElement('img');
        coinImg.src = 'public/assets/images/coin-tako.png';
        coinImg.alt = 'Coin';
        coin.appendChild(coinImg);

        coin.style.left = `${Math.random() * 90 + 2}%`;
        coin.style.animationDelay = `${Math.random() * 2}s`;

        const sizes = ['size-1', 'size-2', 'size-3', 'size-4', 'size-5'];
        coin.classList.add(sizes[Math.floor(Math.random() * sizes.length)]);

        this.container.appendChild(coin);
        this.coins.push(coin);

        coin.addEventListener('animationend', () => {
            coin.remove();
            this.coins = this.coins.filter(c => c !== coin);
            this.addCoin();
        });
    }
};

// ==========================================
// PAYMENT MODAL
// ==========================================

const PaymentModal = {
    modal: null,

    init() {
        this.modal = document.getElementById('paymentModal');
        document.getElementById('modalClose').addEventListener('click', () => this.hide());
        document.getElementById('btnCancel').addEventListener('click', () => this.hide());
        document.getElementById('btnPay').addEventListener('click', () => this.handlePayment());
    },

    show() { this.modal.classList.add('visible'); },
    hide() { this.modal.classList.remove('visible'); },

    async handlePayment() {
        this.hide();
        SweetAlert.show({
            type: 'info',
            title: 'sweet_connecting',
            text: 'sweet_connecting',
            confirmText: 'sweet_connected',
            useI18n: true
        });

        await new Promise(resolve => setTimeout(resolve, 2000));
        wallet.saveSubscription();
        enterGame();
    }
};

// ==========================================
// GAME ENGINE
// ==========================================

const GameEngine = {
    canvas: null,
    ctx: null,
    basket: { x: 0, y: 0, width: 100, height: 70, speedX: 5, direction: 1 },
    basketImage: null,
    coins: [],
    coinsCollected: 0,
    timeLeft: CONFIG.GAME_DURATION,
    gameLoop: null,
    gameActive: false,
    gameStarted: false,
    dangerSpawnCount: 0,
    dangerSpawnedToday: false,
    dangerCoinsSpawned: 0,
    lastDangerSpawn: 0,
    isAutoMode: true,
    keysPressed: { left: false, right: false },
    isDragging: false,
    dragStartX: 0,
    basketStartX: 0,

    init() {
        this.canvas = document.getElementById('gameCanvasElement');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');

        this.basketImage = new Image();
        this.basketImage.src = 'public/assets/images/basket.png';
        this.basketImage.onerror = () => { this.basketImage = null; };

        // Canvas drag controls for basket
        this.canvas.addEventListener('mousedown', (e) => this.startDrag(e));
        this.canvas.addEventListener('mousemove', (e) => this.doDrag(e));
        this.canvas.addEventListener('mouseup', (e) => this.endDrag(e));
        this.canvas.addEventListener('mouseleave', (e) => this.endDrag(e));
        this.canvas.addEventListener('touchstart', (e) => this.startDrag(e), { passive: false });
        this.canvas.addEventListener('touchmove', (e) => this.doDrag(e), { passive: false });
        this.canvas.addEventListener('touchend', (e) => this.endDrag(e));

        this.setupControls();
        this.resizeObserver = new ResizeObserver(() => this.resizeCanvas());
    },

    initCanvas() {
        if (!this.canvas || !this.canvas.parentElement) return;
        this.resizeCanvas();
        this.drawInitialState();
        this.resizeObserver.observe(this.canvas.parentElement);
    },

    setupControls() {
        document.addEventListener('keydown', (e) => {
            if (!this.gameActive) return;
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
                this.keysPressed.left = true;
                this.isAutoMode = false;
            }
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
                this.keysPressed.right = true;
                this.isAutoMode = false;
            }
        });

        document.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
                this.keysPressed.left = false;
            }
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
                this.keysPressed.right = false;
            }
        });

        // Mobile controls
        const ctrlLeft = document.getElementById('ctrlLeft');
        const ctrlRight = document.getElementById('ctrlRight');

        if (ctrlLeft) {
            ctrlLeft.addEventListener('mousedown', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.isAutoMode = false;
                this.keysPressed.left = true;
            });
            ctrlLeft.addEventListener('mouseup', (e) => {
                e.preventDefault();
                this.keysPressed.left = false;
            });
            ctrlLeft.addEventListener('mouseleave', () => { this.keysPressed.left = false; });
            ctrlLeft.addEventListener('touchstart', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.isAutoMode = false;
                this.keysPressed.left = true;
            }, { passive: false });
            ctrlLeft.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.keysPressed.left = false;
            }, { passive: false });
            ctrlLeft.addEventListener('touchcancel', () => { this.keysPressed.left = false; });
        }

        if (ctrlRight) {
            ctrlRight.addEventListener('mousedown', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.isAutoMode = false;
                this.keysPressed.right = true;
            });
            ctrlRight.addEventListener('mouseup', (e) => {
                e.preventDefault();
                this.keysPressed.right = false;
            });
            ctrlRight.addEventListener('mouseleave', () => { this.keysPressed.right = false; });
            ctrlRight.addEventListener('touchstart', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.isAutoMode = false;
                this.keysPressed.right = true;
            }, { passive: false });
            ctrlRight.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.keysPressed.right = false;
            }, { passive: false });
            ctrlRight.addEventListener('touchcancel', () => { this.keysPressed.right = false; });
        }
    },

    startDrag(e) {
        e.preventDefault();
        e.stopPropagation();
        this.isDragging = true;
        this.isAutoMode = false;

        const rect = this.canvas.getBoundingClientRect();
        if (e.type === 'touchstart') {
            this.dragStartX = e.touches[0].clientX - rect.left;
        } else {
            this.dragStartX = e.clientX - rect.left;
        }
        this.basketStartX = this.basket.x;
    },

    doDrag(e) {
        if (!this.isDragging || !this.gameActive) return;
        e.preventDefault();

        const rect = this.canvas.getBoundingClientRect();
        let currentX;
        if (e.type === 'touchmove') {
            currentX = e.touches[0].clientX - rect.left;
        } else {
            currentX = e.clientX - rect.left;
        }

        const deltaX = currentX - this.dragStartX;
        this.basket.x = Math.max(0, Math.min(
            this.canvas.width - this.basket.width,
            this.basketStartX + deltaX
        ));
    },

    endDrag(e) {
        this.isDragging = false;
    },

    resizeCanvas() {
        if (!this.canvas) return;
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
        this.basket.y = this.canvas.height - this.basket.height - 80;
        this.basket.x = this.canvas.width / 2 - this.basket.width / 2;
    },

    prepareGame() {
        this.gameStarted = false;
        this.coinsCollected = 0;
        this.timeLeft = CONFIG.GAME_DURATION;
        this.coins = [];
        this.updateUI();
        this.resizeCanvas();
        this.basket.x = this.canvas.width / 2 - this.basket.width / 2;
        this.basket.direction = 1;
        this.dangerSpawnCount = 0;
        this.dangerCoinsSpawned = 0;
        this.dangerSpawnedToday = false;
        this.lastDangerSpawn = 0;
        this.drawInitialState();
    },

    drawInitialState() {
        if (!this.ctx || !this.canvas) return;
        const ctx = this.ctx;
        ctx.fillStyle = '#140520';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.basketImage && this.basketImage.complete && this.basketImage.naturalWidth > 0) {
            ctx.drawImage(this.basketImage, this.basket.x, this.basket.y, this.basket.width, this.basket.height);
        } else {
            this.drawBasketFallback(ctx);
        }
    },

    start() {
        if (this.gameActive || !this.gameStarted) return;
        this.gameActive = true;
        wallet.recordPlay();
        wallet.recordPeriodPlay();

        // Sync play start to blockchain
        this.syncPlayStartToBlockchain();

        if (!this.dangerSpawnedToday) {
            this.dangerSpawnCount = CONFIG.DANGER_SPAWN_MIN +
                Math.floor(Math.random() * (CONFIG.DANGER_SPAWN_MAX - CONFIG.DANGER_SPAWN_MIN + 1));
            this.dangerSpawnedToday = true;
        }

        const timerInterval = setInterval(() => {
            if (!this.gameActive) {
                clearInterval(timerInterval);
                return;
            }
            this.timeLeft--;
            this.updateUI();
            if (this.timeLeft <= 0) {
                this.endGame();
                clearInterval(timerInterval);
            }
        }, 1000);

        this.gameLoop = requestAnimationFrame(() => this.update());
    },

    spawnCoin() {
        if (!this.gameActive) return;

        const rand = Math.random();
        let coinType = 'YELLOW';
        let cumulative = 0;

        for (const type in CONFIG.COIN_TYPES) {
            cumulative += CONFIG.COIN_TYPES[type].chance;
            if (rand < cumulative) {
                coinType = type;
                break;
            }
        }

        const speed = 1.5 + Math.random() * 3.5;
        const size = 25 + Math.random() * 15;

        this.coins.push({
            x: Math.random() * (this.canvas.width - size * 2) + size,
            y: -size,
            speed: speed,
            size: size,
            rotation: 0,
            rotationSpeed: (Math.random() - 0.5) * 0.15,
            type: coinType
        });
    },

    forceSpawnDangerCoin(type) {
        if (!this.gameActive) return;
        if (this.dangerCoinsSpawned >= this.dangerSpawnCount) return;

        const size = 25 + Math.random() * 15;
        // Use same speed range as normal coins (1.5-4) for consistency
        const baseSpeed = 1.5;
        const speed = baseSpeed + Math.random() * 2.5;
        this.coins.push({
            x: Math.random() * (this.canvas.width - size * 2) + size,
            y: -size,
            speed: speed,
            size: size,
            rotation: 0,
            rotationSpeed: (Math.random() - 0.5) * 0.15,
            type: type
        });
        this.dangerCoinsSpawned++;
    },

    update() {
        if (!this.gameActive) return;

        if (!this.isDragging) {
            if (!this.isAutoMode) {
                const speed = 8;
                if (this.keysPressed.left) {
                    this.basket.x -= speed;
                    this.basket.direction = -1;
                }
                if (this.keysPressed.right) {
                    this.basket.x += speed;
                    this.basket.direction = 1;
                }
                this.basket.x = Math.max(0, Math.min(this.canvas.width - this.basket.width, this.basket.x));
            } else {
                this.basket.x += this.basket.speedX * this.basket.direction;
                if (this.basket.x <= 0) {
                    this.basket.x = 0;
                    this.basket.direction = 1;
                }
                if (this.basket.x >= this.canvas.width - this.basket.width) {
                    this.basket.x = this.canvas.width - this.basket.width;
                    this.basket.direction = -1;
                }
            }
        }

        for (let i = this.coins.length - 1; i >= 0; i--) {
            const coin = this.coins[i];
            coin.y += coin.speed;
            coin.rotation += coin.rotationSpeed;

            if (coin.y + coin.size / 2 > this.basket.y &&
                coin.y - coin.size / 2 < this.basket.y + this.basket.height &&
                coin.x > this.basket.x &&
                coin.x < this.basket.x + this.basket.width) {
                this.handleCoinCatch(coin);
                this.coins.splice(i, 1);
                continue;
            }

            if (coin.y > this.canvas.height + 50) {
                this.coins.splice(i, 1);
            }
        }

        this.draw();
        this.gameLoop = requestAnimationFrame(() => this.update());
    },

    handleCoinCatch(coin) {
        const type = CONFIG.COIN_TYPES[coin.type];

        if (coin.type === 'WHITE') {
            this.coinsCollected += 10;
        } else if (coin.type === 'YELLOW') {
            this.coinsCollected += 1;
        } else if (coin.type === 'GREEN') {
            this.coinsCollected += 2;
        } else if (coin.type === 'RED') {
            const penalty = Math.floor(this.coinsCollected * type.penalty);
            this.coinsCollected = Math.max(0, this.coinsCollected - penalty);
            SweetAlert.showWarning(i18n.t('warning_red_coin'));
        } else if (coin.type === 'BOMB') {
            this.coinsCollected = 0;
            SweetAlert.showWarning(i18n.t('warning_bomb'), 3000);
        }

        this.updateUI();
    },

    draw() {
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;

        ctx.fillStyle = '#140520';
        ctx.fillRect(0, 0, w, h);

        if (this.basketImage && this.basketImage.complete && this.basketImage.naturalWidth > 0) {
            ctx.drawImage(this.basketImage, this.basket.x, this.basket.y, this.basket.width, this.basket.height);
        } else {
            this.drawBasketFallback(ctx);
        }

        this.coins.forEach(coin => {
            ctx.save();
            ctx.translate(coin.x, coin.y);
            ctx.rotate(coin.rotation);

            const type = CONFIG.COIN_TYPES[coin.type];
            const halfSize = coin.size / 2;

            if (coin.type === 'WHITE') {
                const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, halfSize);
                grad.addColorStop(0, '#FFFFFF');
                grad.addColorStop(0.5, '#E0E0E0');
                grad.addColorStop(1, '#BDBDBD');
                ctx.fillStyle = grad;
                ctx.strokeStyle = '#9E9E9E';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(0, 0, halfSize, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = '#757575';
                ctx.font = `bold ${coin.size * 0.45}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('+10', 0, 1);
            } else if (coin.type === 'YELLOW') {
                const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, halfSize);
                grad.addColorStop(0, '#FFD700');
                grad.addColorStop(0.5, '#FFC107');
                grad.addColorStop(1, '#FFA000');
                ctx.fillStyle = grad;
                ctx.strokeStyle = '#E65100';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.arc(0, 0, halfSize, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = '#BF360C';
                ctx.font = `bold ${coin.size * 0.4}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('+1', 0, 1);
            } else if (coin.type === 'GREEN') {
                const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, halfSize);
                grad.addColorStop(0, '#69F0AE');
                grad.addColorStop(0.5, '#00E676');
                grad.addColorStop(1, '#00C853');
                ctx.fillStyle = grad;
                ctx.strokeStyle = '#1B5E20';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(0, 0, halfSize, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
            ctx.fillStyle = '#1B5E20';
                ctx.font = `bold ${coin.size * 0.4}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('+2', 0, 1);
            } else if (coin.type === 'RED') {
                const grad = ctx.createRadialGradient(0, -halfSize * 0.3, 0, 0, 0, halfSize);
                grad.addColorStop(0, '#FF8A80');
                grad.addColorStop(0.3, '#FF5252');
                grad.addColorStop(0.7, '#D32F2F');
                grad.addColorStop(1, '#B71C1C');
                ctx.fillStyle = grad;
                ctx.strokeStyle = '#7F0000';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(0, 0, halfSize, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(0, 0, halfSize * 0.65, 0, Math.PI * 2);
                ctx.strokeStyle = '#FFCDD2';
                ctx.lineWidth = 1.5;
                ctx.stroke();
                ctx.fillStyle = '#FFCDD2';
                ctx.font = `bold ${coin.size * 0.45}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('M', 0, 1);
            } else if (coin.type === 'BOMB') {
                const grad = ctx.createRadialGradient(0, halfSize * 0.1, 0, 0, 0, halfSize);
                grad.addColorStop(0, '#555555');
                grad.addColorStop(0.6, '#222222');
                grad.addColorStop(1, '#000000');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(0, halfSize * 0.15, halfSize * 0.7, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#8B4513';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(0, -halfSize * 0.5);
                ctx.quadraticCurveTo(halfSize * 0.2, -halfSize * 0.7, halfSize * 0.1, -halfSize * 0.85);
                ctx.stroke();
                ctx.fillStyle = '#FF6600';
                ctx.beginPath();
                ctx.arc(halfSize * 0.1, -halfSize * 0.85, halfSize * 0.18, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#FFFF00';
                ctx.beginPath();
                ctx.arc(halfSize * 0.1, -halfSize * 0.85, halfSize * 0.08, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#CCCCCC';
                ctx.font = `bold ${coin.size * 0.3}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('!', 0, halfSize * 0.15);
            }

            ctx.restore();
        });
    },

    drawBasketFallback(ctx) {
        const grad = ctx.createLinearGradient(
            this.basket.x, this.basket.y,
            this.basket.x, this.basket.y + this.basket.height
        );
        grad.addColorStop(0, '#8B4513');
        grad.addColorStop(0.5, '#A0522D');
        grad.addColorStop(1, '#6B3810');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(this.basket.x, this.basket.y, this.basket.width, this.basket.height, 15);
        ctx.fill();
    },

    updateUI() {
        document.getElementById('coinsValue').textContent = this.coinsCollected;
        document.getElementById('timeValue').textContent = this.timeLeft;
    },

    async syncPointsToBlockchain() {
        if (!wallet.blockchainContract || !wallet.address) return;
        try {
            const signer = await wallet.blockchainProvider.getSigner();
            const contract = new ethers.Contract(
                BLOCKCHAIN_CONFIG.CONTRACT_ADDRESS,
                ["function endGame(uint256 pointsEarned) external"],
                signer
            );
            await contract.endGame(this.coinsCollected);
        } catch (e) { /* sync failed */ }
    },

    async syncPlayStartToBlockchain() {
        if (!wallet.blockchainContract || !wallet.address) return;
        try {
            const signer = await wallet.blockchainProvider.getSigner();
            const contract = new ethers.Contract(
                BLOCKCHAIN_CONFIG.CONTRACT_ADDRESS,
                ["function startGame() external"],
                signer
            );
            await contract.startGame();
        } catch (e) { /* sync failed */ }
    },

    endGame() {
        this.gameActive = false;
        if (this.gameLoop) cancelAnimationFrame(this.gameLoop);

        // Save points to wallet address (localStorage + blockchain sync)
        if (wallet.address && this.coinsCollected > 0) {
            PointsManager.addPoints(wallet.address, this.coinsCollected);
            gameState.points = PointsManager.getPoints(wallet.address);
            updatePointsDisplay();

            // Sync to blockchain in background
            this.syncPointsToBlockchain();
        }

        const periodPlays = wallet.getPeriodPlays();
        const playsLeft = wallet.getPeriodPlaysRemaining();

        // Add plays display to game over text
        const playsText = `${periodPlays}/${CONFIG.MAX_PLAYS_PER_DAY} ${i18n.t('plays_label')}`;

        if (playsLeft <= 0) {
            // No plays left - auto show countdown on canvas
            this.showPeriodCountdown();
            return;
        }

        SweetAlert.show({
            type: 'success',
            title: 'game_over_title',
            text: 'game_over_coins',
            confirmText: 'game_play_again',
            cancelText: 'game_exit',
            extraData: { coins: this.coinsCollected, playsLeft: playsLeft },
            onConfirm: () => {
                if (wallet.getPeriodPlaysRemaining() > 0) {
                    this.prepareGame();
                    showStartButton();
                } else {
                    this.showPeriodCountdown();
                }
            },
            onCancel: () => {
                goToLogin();
            }
        });
    },

    showPeriodCountdown() {
        // Remove start button and show countdown
        const existing = document.getElementById('btnStartGame');
        if (existing) existing.remove();
        const existingCd = document.getElementById('periodCountdown');
        if (existingCd) existing.remove();

        const gameArea = document.getElementById('gameArea');
        const countdownDiv = document.createElement('div');
        countdownDiv.id = 'periodCountdown';
        countdownDiv.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(20, 5, 32, 0.9);
            border: 2px solid #FF9800;
            border-radius: 20px;
            padding: 25px 35px;
            text-align: center;
            color: white;
            z-index: 10;
            min-width: 280px;
        `;

        // Use saved lock timestamp from localStorage
        const endTimestamp = gameState.playLockUntil || (Date.now() + 24 * 60 * 60 * 1000);
        window.countdownEndTimestamp = endTimestamp; // store globally for re-render

        countdownDiv.innerHTML = `
            <div class="cd-title" style="font-size: 1.3rem; font-weight: bold; color: #FF9800; margin-bottom: 10px;">${i18n.t('no_plays_left')}</div>
            <div class="cd-text" style="font-size: 0.85rem; color: #aaa; margin-bottom: 15px;">${i18n.t('no_plays_text')}</div>
            <div class="cd-label" style="font-size: 0.75rem; color: #888; margin-bottom: 5px;">${i18n.t('countdown_label')}</div>
            <div id="countdownTimer" style="font-size: 2.2rem; font-weight: bold; color: #FFD700; font-family: monospace;">--:--:--</div>
            <div class="cd-plays" style="margin-top: 15px; font-size: 0.8rem; color: #666;">${wallet.getPlaysToday()}/3 ${i18n.t('plays_label')}</div>
        `;
        gameArea.insertBefore(countdownDiv, gameArea.firstChild);

        // Start countdown using saved end timestamp
        function updateCountdownFromNow() {
            const remaining = Math.max(0, endTimestamp - Date.now());
            const timer = document.getElementById('countdownTimer');
            if (timer) {
                const totalSec = Math.ceil(remaining / 1000);
                const h = Math.floor(totalSec / 3600);
                const m = Math.floor((totalSec % 3600) / 60);
                const s = totalSec % 60;
                if (h > 0) {
                    timer.textContent = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
                } else {
                    timer.textContent = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
                }
            }
            if (remaining <= 0) {
                clearInterval(countdownInterval);
                countdownDiv.remove();
                showStartButton();
            }
        }

        updateCountdownFromNow();
        const countdownInterval = setInterval(updateCountdownFromNow, 1000);
    },
};

// ==========================================
// PAGE NAVIGATION
// ==========================================

function showLoginPage() {
    document.getElementById('loginPage').classList.add('active');
    document.getElementById('gamePage').classList.remove('active');
    document.getElementById('walletGroup').style.display = 'none';
    CoinAnimation.resume();
}

function showGamePage() {
    document.getElementById('loginPage').classList.remove('active');
    document.getElementById('gamePage').classList.add('active');
    document.getElementById('walletGroup').style.display = 'flex';
    CoinAnimation.pause();
    if (document.getElementById('gameCanvasElement')) {
        GameEngine.initCanvas();
    }
}

function goToLogin() {
    GameEngine.gameActive = false;
    GameEngine.gameStarted = false;
    showLoginPage();
}

function enterGame() {
    // Check if wallet address is owner - revoke and reload immediately
    if (wallet.address && wallet.address.toLowerCase() === CONFIG.OWNER_WALLET.toLowerCase()) {
        try {
            window.ethereum.request({
                method: 'wallet_revokePermissions',
                params: [{ eth_accounts: {} }]
            });
        } catch (e) { /* ignore */ }
        window.location.href = window.location.pathname;
        return;
    }

    showGamePage();
    setTimeout(() => {
        GameEngine.initCanvas();
        GameEngine.prepareGame();
        showStartButton();
    }, 100);
}

function showStartButton() {
    const gameArea = document.getElementById('gameArea');
    const existing = document.getElementById('btnStartGame');
    if (existing) existing.remove();

    const periodPlays = wallet.getPeriodPlays();
    const playsLeft = wallet.getPeriodPlaysRemaining();

    if (playsLeft <= 0) {
        // No plays left - show countdown to next period
        const countdownDiv = document.createElement('div');
        countdownDiv.id = 'periodCountdown';
        countdownDiv.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(20, 5, 32, 0.85);
            border: 2px solid #FFD700;
            border-radius: 20px;
            padding: 25px 35px;
            text-align: center;
            color: white;
            z-index: 10;
            min-width: 280px;
        `;

        // Use saved lock timestamp from localStorage
        const endTimestamp = gameState.playLockUntil || (Date.now() + 24 * 60 * 60 * 1000);
        window.countdownEndTimestamp = endTimestamp;

        countdownDiv.innerHTML = `
            <div class="cd-title" style="font-size: 1.4rem; font-weight: bold; color: #FFD700; margin-bottom: 10px;">${i18n.t('no_plays_left')}</div>
            <div class="cd-text" style="font-size: 0.85rem; color: #aaa; margin-bottom: 15px;">${i18n.t('no_plays_text')}</div>
            <div class="cd-label" style="font-size: 0.75rem; color: #888; margin-bottom: 5px;">${i18n.t('countdown_label')}</div>
            <div id="countdownTimer" style="font-size: 2rem; font-weight: bold; color: #FF9800; font-family: monospace;">--:--:--</div>
            <div class="cd-plays" style="margin-top: 15px; font-size: 0.8rem; color: #666;">${wallet.getPlaysToday()}/3 ${i18n.t('plays_label')}</div>
        `;
        gameArea.insertBefore(countdownDiv, gameArea.firstChild);

        // Start countdown using saved end timestamp
        function updateCountdownFromNow() {
            const remaining = Math.max(0, endTimestamp - Date.now());
            const timer = document.getElementById('countdownTimer');
            if (timer) {
                const totalSec = Math.ceil(remaining / 1000);
                const h = Math.floor(totalSec / 3600);
                const m = Math.floor((totalSec % 3600) / 60);
                const s = totalSec % 60;
                if (h > 0) {
                    timer.textContent = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
                } else {
                    timer.textContent = `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
                }
            }
            if (remaining <= 0) {
                clearInterval(countdownInterval);
                countdownDiv.remove();
                showStartButton(); // Re-show start button
            }
        }

        updateCountdownFromNow();
        const countdownInterval = setInterval(updateCountdownFromNow, 1000);
        return;
    }

    // Show start button with plays indicator
    const startBtn = document.createElement('button');
    startBtn.id = 'btnStartGame';
    startBtn.className = 'btn-start-game';
    startBtn.innerHTML = `
        <span class="btn-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
        </span>
        <span class="btn-text">${i18n.t('btn_start')}</span>
    `;

    gameArea.insertBefore(startBtn, gameArea.firstChild);

    // Update score display to show plays counter
    updateScoreDisplayPlays();

    startBtn.addEventListener('click', () => {
        startBtn.remove();
        const cd = document.getElementById('periodCountdown');
        if (cd) cd.remove();
        GameEngine.gameStarted = true;
        GameEngine.dangerSpawned = false;
        GameEngine.dangerCoinsSpawned = 0;
        GameEngine.dangerSpawnedToday = false;

        GameEngine.spawnCoin();
        const spawnInterval = setInterval(() => {
            if (!GameEngine.gameActive) {
                clearInterval(spawnInterval);
                return;
            }
            if (GameEngine.coins.length < CONFIG.MAX_COINS_ON_SCREEN) {
                GameEngine.spawnCoin();
            }
        }, CONFIG.COIN_SPAWN_INTERVAL);

        const dangerInterval = setInterval(() => {
            if (!GameEngine.gameActive || GameEngine.dangerCoinsSpawned >= GameEngine.dangerSpawnCount) {
                clearInterval(dangerInterval);
                return;
            }
            // Prevent clustering - minimum 5 seconds between danger coins
            const now = Date.now();
            if (GameEngine.lastDangerSpawn && (now - GameEngine.lastDangerSpawn) < 5000) return;
            GameEngine.lastDangerSpawn = now;

            const rand = Math.random();
            if (rand < 0.5) {
                GameEngine.forceSpawnDangerCoin('BOMB');
            } else {
                GameEngine.forceSpawnDangerCoin('RED');
            }
        }, 3000 + Math.random() * 5000);

        GameEngine.start();
    });
}

// ==========================================
// CLAIM FUNCTION
// ==========================================

async function performClaim() {
    const address = wallet.address;
    const claimableMONAD = PointsManager.getClaimableMONAD(address);

    if (claimableMONAD <= 0) return;

    // Check wallet connection
    if (!address) {
        SweetAlert.show({
            type: 'error',
            title: i18n.t('claim_error'),
            text: 'Wallet not connected',
            confirmText: i18n.t('claim_close'),
            useI18n: false
        });
        return;
    }

    // Check network
    if (CONFIG.NETWORK_CHAIN_ID && window.ethereum) {
        try {
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            const expectedChainId = '0x' + CONFIG.NETWORK_CHAIN_ID.toString(16);
            if (chainId !== expectedChainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: expectedChainId }]
                    });
                } catch (switchError) {
                    if (switchError.code === 4902) {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [{
                                chainId: expectedChainId,
                                chainName: CONFIG.NETWORK_NAME,
                                rpcUrls: [CONFIG.RPC_URL],
                                nativeCurrency: { name: 'MONAD', symbol: 'MON', decimals: 18 }
                            }]
                        });
                    }
                }
            }
        } catch (e) {
            
        }
    }

    // Show confirming state
    SweetAlert.show({
        type: 'info',
        title: i18n.t('claim_confirming'),
        text: `${claimableMONAD} MONAD`,
        confirmText: '',
        useI18n: false
    });

    try {
        // Add to claim history
        const historyIndex = PointsManager.addClaimHistory(address, claimableMONAD).length - 1;

        // Simulate transaction (in real app, send MON token here)
        // For demo, simulate successful transaction
        const txHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

        // Update claim status
        PointsManager.updateClaimStatus(address, historyIndex, 'completed', txHash);

        // Deduct points
        PointsManager.deductPoints(address, claimableMONAD);

        // Update display
        updatePointsDisplay();

        // Show success
        SweetAlert.show({
            type: 'success',
            title: i18n.t('claim_success'),
            text: i18n.t('claim_success_text').replace('{amount}', claimableMONAD).replace('{tx}', txHash.substring(0, 10) + '...'),
            confirmText: i18n.t('claim_close'),
            useI18n: false
        });
    } catch (error) {
        
        // Update claim status to failed
        const history = PointsManager.getClaimHistory(address);
        if (history.length > 0) {
            PointsManager.updateClaimStatus(address, history.length - 1, 'failed');
        }
        SweetAlert.show({
            type: 'error',
            title: i18n.t('claim_error'),
            text: i18n.t('claim_error_text'),
            confirmText: i18n.t('claim_close'),
            useI18n: false
        });
    }
}

// ==========================================
// EVENT LISTENERS
// ==========================================

function setupEventListeners() {
    // Language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            i18n.setLang(btn.dataset.lang);
            // Re-render countdown if exists
            const cd = document.getElementById('periodCountdown');
            if (cd && window.countdownEndTimestamp) {
                cd.querySelector('.cd-title').textContent = i18n.t('no_plays_left');
                cd.querySelector('.cd-text').textContent = i18n.t('no_plays_text');
                cd.querySelector('.cd-label').textContent = i18n.t('countdown_label');
                cd.querySelector('.cd-plays').textContent = `${wallet.getPlaysToday()}/3 ${i18n.t('plays_label')}`;
            }
        });
    });

    // Points button - My Points with Claim
    document.getElementById('btnPoints').addEventListener('click', async () => {
        const address = wallet.address;
        const totalPoints = PointsManager.getPoints(address);
        const claimableMONAD = PointsManager.getClaimableMONAD(address);
        const progress = PointsManager.getProgress(address);
        const remaining = PointsManager.getRemaining(address);
        const totalClaimed = PointsManager.getTotalClaimed(address);
        const claimHistory = PointsManager.getClaimHistory(address);
        const canClaim = totalPoints >= 1000;

        // Build history HTML
        let historyHtml = '';
        if (claimHistory.length === 0) {
            historyHtml = `<div style="text-align: center; color: #888; font-size: 0.8rem; padding: 10px;">${i18n.t('claim_no_history')}</div>`;
        } else {
            historyHtml = claimHistory.slice(-5).reverse().map(claim => {
                const date = new Date(claim.date).toLocaleDateString();
                const statusColor = claim.status === 'completed' ? '#4CAF50' : claim.status === 'pending' ? '#FF9800' : '#F44336';
                return `<div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee;">
                    <span>${claim.amount} MONAD</span>
                    <span style="color: ${statusColor}; font-size: 0.75rem;">${claim.status}</span>
                    <span style="color: #888; font-size: 0.75rem;">${date}</span>
                </div>`;
            }).join('');
        }

        const claimBtn = canClaim
            ? `<button id="claimNowBtn" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #4CAF50, #45a049); color: white; border: none; border-radius: 10px; font-size: 1rem; font-weight: bold; cursor: pointer; margin-top: 10px;">${i18n.t('claim_btn')}</button>`
            : `<div style="text-align: center; color: #888; font-size: 0.8rem; margin-top: 10px;">${remaining} ${i18n.t('claim_not_enough').split(' ').pop()}</div>`;

        SweetAlert.show({
            type: 'info',
            title: i18n.t('claim_title'),
            text: `<div style="text-align: left; max-height: 400px; overflow-y: auto;">
                <div style="margin-bottom: 15px;">
                    <div style="font-size: 0.75rem; color: #888;">${i18n.t('claim_total')}</div>
                    <div style="font-size: 1.6rem; font-weight: bold; color: #FFD700;">${totalPoints.toLocaleString()}</div>
                </div>
                <div style="display: flex; gap: 15px; margin-bottom: 15px;">
                    <div style="flex: 1;">
                        <div style="font-size: 0.7rem; color: #888;">${i18n.t('claim_available')}</div>
                        <div style="font-size: 1.1rem; font-weight: bold;">${claimableMONAD}</div>
                    </div>
                    <div style="flex: 1;">
                        <div style="font-size: 0.7rem; color: #888;">${i18n.t('claim_accumulated')}</div>
                        <div style="font-size: 1.1rem; font-weight: bold;">${totalClaimed}</div>
                    </div>
                </div>
                <div style="margin-bottom: 10px;">
                    <div style="font-size: 0.75rem; color: #888; margin-bottom: 5px;">${i18n.t('claim_progress')}</div>
                    <div style="background: #e0e0e0; border-radius: 8px; height: 10px; overflow: hidden;">
                        <div style="width: ${progress}%; background: linear-gradient(135deg, #FFD700, #FFA500); height: 100%; border-radius: 8px;"></div>
                    </div>
                </div>
                ${canClaim ? claimBtn : ''}
                <div style="margin-top: 20px;">
                    <div style="font-size: 0.8rem; color: #666; font-weight: bold; margin-bottom: 8px;">${i18n.t('claim_history')}</div>
                    <div style="max-height: 180px; overflow-y: auto; padding-right: 5px;" class="claim-scroll">
                        <style>
                            .claim-scroll::-webkit-scrollbar { width: 4px; }
                            .claim-scroll::-webkit-scrollbar-track { background: #f0f0f0; border-radius: 4px; }
                            .claim-scroll::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }
                            .claim-scroll::-webkit-scrollbar-thumb:hover { background: #aaa; }
                        </style>
                        ${historyHtml}
                    </div>
                </div>
            </div>`,
            confirmText: i18n.t('claim_close'),
            useI18n: false,
            isHtml: true,
            customWidth: 320,
            onShow: () => {
                const claimNowBtn = document.getElementById('claimNowBtn');
                if (claimNowBtn) {
                    claimNowBtn.addEventListener('click', async () => {
                        await performClaim();
                    });
                }
            }
        });
    });

    // Help button - How to Play
    document.getElementById('btnHelp').addEventListener('click', () => {
        SweetAlert.show({
            type: 'info',
            title: i18n.t('help_title'),
            text: i18n.t('help_text'),
            confirmText: i18n.t('help_got_it'),
            useI18n: false,
            isHtml: true,
            customWidth: 320
        });
    });

    // Connect Wallet button
    document.getElementById('btnConnect').addEventListener('click', async () => {
        // Show connecting message
        SweetAlert.show({
            type: 'info',
            title: 'sweet_connecting',
            text: 'sweet_connecting',
            confirmText: '',
            useI18n: true
        });

        const result = await wallet.connect();

        SweetAlert.hide();

        if (result && result.success) {
            
            document.getElementById('walletAddress').textContent = wallet.formatAddress(result.address);
            wallet.getBalance();
            wallet.updateBalanceLoop();
            enterGame();
        } else {
            
            if (result?.error === 'wallet_rejected') {
                SweetAlert.show({
                    type: 'warning',
                    title: 'sweet_wallet_rejected',
                    text: 'sweet_wallet_rejected_text',
                    confirmText: 'about_got_it'
                });
            } else if (result?.error === 'owner_blocked') {
                // Already handled in connect(), do nothing
                // The SweetAlert in connect() already handles everything
            }
        }
    });

    // About button
    document.getElementById('btnAbout').addEventListener('click', () => {
        SweetAlert.show({
            type: 'info',
            title: 'about_title',
            text: 'about_text',
            confirmText: 'about_got_it'
        });
    });

    // Continue button - only works if wallet is connected
    document.getElementById('btnContinue').addEventListener('click', () => {
        if (!wallet.address) {
            SweetAlert.show({
                type: 'warning',
                title: 'sweet_error',
                text: 'sweet_demo_text',
                confirmText: 'about_got_it'
            });
            return;
        }

        const playsRemaining = wallet.getPlaysRemaining();
        if (playsRemaining <= 0) {
            SweetAlert.show({
                type: 'warning',
                title: 'no_plays_left',
                text: 'no_plays_text'
            });
            return;
        }

        const subStatus = wallet.checkSubscription();
        if (!subStatus.subscribed) {
            PaymentModal.show();
        } else {
            enterGame();
        }
    });

    // Disconnect button
    document.getElementById('btnDisconnect').addEventListener('click', async () => {
        await wallet.disconnect();
        document.getElementById('walletAddress').textContent = '';
        document.getElementById('walletBalance').textContent = '-- MONAD';
        goToLogin();
    });
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('year').textContent = new Date().getFullYear();

    CoinAnimation.init();
    GameEngine.init();
    PaymentModal.init();
    setupEventListeners();

    // Check if MetaMask has active permissions
    let hasMetaMaskSession = false;
    let metaMaskAccounts = [];
    if (window.ethereum) {
        try {
            metaMaskAccounts = await window.ethereum.request({ method: 'eth_accounts' });
            hasMetaMaskSession = metaMaskAccounts.length > 0;
        } catch (e) {
            
            hasMetaMaskSession = false;
        }
    }

    // If MetaMask has no active session, force login page
    if (!hasMetaMaskSession) {
        gameState = {
            connected: false,
            subscribed: false,
            subscriptionExpiry: null,
            address: null,
            playsToday: 0,
            lastPlayDate: null,
            points: 0,
            playPeriods: {},
            playLockUntil: null
        };
        wallet.address = null;

        // Clear any leftover storage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && (key.startsWith('tako_wallet_state') || key.startsWith('tako_points_'))) {
                localStorage.removeItem(key);
            }
        }

        showLoginPage();
        i18n.updateUI();
        return;
    }

    // MetaMask has session - connect with existing account
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        // Check if owner wallet - revoke and reload immediately
        if (address.toLowerCase() === CONFIG.OWNER_WALLET.toLowerCase()) {
            try {
                window.ethereum.request({
                    method: 'wallet_revokePermissions',
                    params: [{ eth_accounts: {} }]
                });
            } catch (e) { /* ignore */ }
            window.location.href = window.location.pathname;
            return;
        }

        wallet.address = address;
        wallet.loadState();
        gameState.connected = true;
        gameState.address = address;

        // Initialize blockchain and sync data
        wallet.initBlockchain().then(() => {
            wallet.syncFromBlockchain().then(() => {
                updatePointsDisplay();
            });
        });

        // Restore wallet info in UI
        document.getElementById('walletAddress').textContent = wallet.formatAddress(address);
        document.getElementById('walletBalance').textContent = i18n.t('wallet_balance') + '...';
        document.getElementById('walletGroup').style.display = 'flex';
        wallet.getBalance();
        wallet.updateBalanceLoop();
        updatePointsDisplay();

        // Go to game page
        showGamePage();
        updateScoreDisplayPlays();
        showStartButton();
    } catch (error) {
        
        showLoginPage();
    }

    i18n.updateUI();
});

function updatePointsDisplay() {
    const pointsEl = document.getElementById('pointsValue');
    if (wallet.address) {
        const totalPoints = PointsManager.getPoints(wallet.address);
        pointsEl.textContent = totalPoints > 0 ? totalPoints.toLocaleString() : '0';
    } else {
        pointsEl.textContent = '0';
    }
}

function updateScoreDisplayPlays() {
    const playsScoreItem = document.getElementById('playsScoreItem');
    const playsValue = document.getElementById('playsValue');
    if (!playsScoreItem || !playsValue) return;

    const periodPlays = wallet.getPeriodPlays();
    const playsLeft = wallet.getPeriodPlaysRemaining();

    if (playsLeft <= 0) {
        playsScoreItem.style.display = 'none';
    } else {
        playsScoreItem.style.display = 'flex';
        playsValue.textContent = `${wallet.getPlaysToday()}/3`;
    }
}
