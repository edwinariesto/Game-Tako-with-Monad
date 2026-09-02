# 🐙 TAKO Game (Take Coin for You Wallet)

*Read in English below | Baca dalam Bahasa Indonesia di bawah*

---

## 🇬🇧 English

### Overview
Tako Game is an interactive Web3 game on Monad Testnet featuring a 0.1 MONAD/month subscription. It uses Solidity and OpenZeppelin for secure on-chain logic, Hardhat for deployment, and HTML/JS for an engaging frontend experience.

### Features
- **Blockchain Subscription**: Players pay a subscription of 0.1 MONAD per month to access the game.
- **Secure Smart Contracts**: Built with Solidity & OpenZeppelin for robust on-chain security.
- **Monad Testnet**: Deployed on the high-performance Monad network.
- **Web3 Integration**: Seamless wallet connection using Ethers.js.
- **Interactive Gameplay**: Fun and dynamic coin-catching mechanics built purely with HTML, CSS, and JS.

### Tech Stack
- **Smart Contracts**: Solidity, Hardhat, OpenZeppelin
- **Frontend**: HTML5, CSS3, Vanilla JavaScript, Ethers.js
- **Network**: Monad Testnet

### Setup & Deployment
1. **Clone the repository:**
   ```bash
   git clone https://github.com/edwinariesto/Game-Tako-with-Monad-.git
   cd Game-Tako-with-Monad-
   ```
2. **Install Smart Contract Dependencies (Optional for Frontend):**
   ```bash
   npm install
   ```
3. **Smart Contract Configuration:**
   Rename `.env.example` to `.env` and add your private key.
4. **Deploy Smart Contract (Hardhat):**
   ```bash
   npx hardhat run scripts/deploy.js --network monadTestnet
   ```
5. **Run Frontend Locally:**
   Simply open `index.html` in your browser or use a local server like Live Server.

---

## 🇮🇩 Bahasa Indonesia

### Gambaran Umum
Tako Game adalah game Web3 interaktif di Monad Testnet dengan fitur langganan 0.1 MONAD/bulan. Game ini menggunakan Solidity dan OpenZeppelin untuk smart contract yang aman, Hardhat untuk deployment, serta HTML/JS untuk pengalaman frontend yang seru.

### Fitur Utama
- **Langganan Berbasis Blockchain**: Pemain membayar biaya langganan sebesar 0.1 MONAD per bulan untuk bermain.
- **Smart Contract yang Aman**: Dibangun dengan Solidity & OpenZeppelin untuk keamanan on-chain.
- **Monad Testnet**: Dideploy di jaringan Monad yang cepat.
- **Integrasi Web3**: Koneksi dompet kripto yang mulus menggunakan Ethers.js.
- **Gameplay Interaktif**: Mekanik permainan menangkap koin yang dinamis menggunakan HTML, CSS, dan JS murni.

### Teknologi yang Digunakan
- **Smart Contracts**: Solidity, Hardhat, OpenZeppelin
- **Frontend**: HTML5, CSS3, Vanilla JavaScript, Ethers.js
- **Jaringan**: Monad Testnet

### Instalasi & Deployment
1. **Clone repositori:**
   ```bash
   git clone https://github.com/edwinariesto/Game-Tako-with-Monad-.git
   cd Game-Tako-with-Monad-
   ```
2. **Install Dependensi Smart Contract (Opsional untuk Frontend):**
   ```bash
   npm install
   ```
3. **Konfigurasi Smart Contract:**
   Ubah nama `.env.example` menjadi `.env` dan masukkan *private key* Anda.
4. **Deploy Smart Contract (Hardhat):**
   ```bash
   npx hardhat run scripts/deploy.js --network monadTestnet
   ```
5. **Jalankan Frontend secara Lokal:**
   Cukup buka file `index.html` di browser Anda atau gunakan *local server* (seperti ekstensi Live Server di VSCode).
