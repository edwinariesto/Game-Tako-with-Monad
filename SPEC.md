# TAKO Game - Specification

## 1. Project Overview
- **Name**: TAKO (Take Coin for You Wallet)
- **Type**: Web3 Multiplayer Blockchain Game
- **Core Functionality**: 2-player multiplayer game with blockchain-based subscription (0.1 MONAD/month), invite via link + 4-digit code
- **Target**: Browser-based, mobile-friendly

## 2. Visual & Rendering Specification

### Scene Setup
- **Background**: Clean sky with gradient (light blue to peach)
- **Clouds**: 22 SVG-based clouds with 6 different shapes, moving in both directions (left-to-right and right-to-left)
- **Falling Coins**: Gold coins falling from top (landing page only, hidden during game)
- **Basket**: Moving left-right on landing page, hidden during game

### Color Palette
- **Primary**: Gold (#FFD700) - coins, accents
- **Secondary**: Soft green (#4CAF50) - garden, success
- **Accent**: Purple (#9C27B0) - TAKO branding
- **Background**: Sky blue gradient (#87CEEB → #FFB347)
- **Cloud**: White (#FFFFFF) with various shapes
- **Red Coin**: #FF0000 - danger coin (-30% penalty)
- **Bomb**: #000000 - danger coin (reset to 0)

### Typography
- **Logo "TAKO"**: Cinzel Bold / white with 3D shadow effect
- **Tagline**: Poppins Light
- **Buttons**: Poppins SemiBold

## 3. Screen 1 - Landing Page

### Elements
1. **Animated Background**
   - 22 SVG clouds with different shapes
   - Cloud types: fluffy, wispy, flat, puffy, jagged, round
   - Moving both directions across full screen

2. **Logo & Tagline**
   - Large "TAKO" text (white), centered
   - "Game Tangkap Koin Tako" subtitle

3. **Action Buttons**
   - Connect Wallet (primary)
   - About (secondary)
   - Lanjutkan Permainan (accent)

4. **Subscription Check**
   - Before entering game, check if wallet has paid 0.1 MONAD subscription
   - If not paid → show payment modal

## 4. Game Mechanics

### Time Restrictions
- **Max plays per day**: 3 times
- **Play periods**:
  - Morning: 06:00 - 11:59
  - Afternoon: 12:00 - 17:59
  - Evening: 18:00 - 23:59

### Game Flow
1. Click "Start Game" button to begin
2. Coins fall from top, basket moves automatically left-right
3. Timer counts down (60 seconds)
4. Game ends when timer reaches 0

### Coin Types
- **Gold Coin (75% chance)**: +10 points each
- **Red Coin (15% chance)**: -30% from collected coins (can stack, minimum 0)
- **Bomb/BOM API (10% chance)**: Reset ALL coins to 0

### Danger Coins (Red & Bomb)
- Spawn 2-10 times per game session
- Appear randomly during gameplay (after 5-25 seconds)
- Show warning message on catch:
  - Red Coin: "Koin Merah! -30% koin hilang!"
  - Bomb: "BOM! Semua koin direset ke 0!"

### Profit Calculation
- **Subscription**: 0.1 MONAD/month
- **Max profit target**: 200% over subscription period
- **Daily earning limit**: Calculated based on total subscription days

## 5. Subscription System

### Payment Logic
- **Amount**: 0.1 MONAD
- **Recipient**: `0x47b5b13b049e81563d9475359a86b5d835d8d6704002ad8967af9557c9f48638`
- **Storage**: localStorage with timestamp (1 month validity)
- **Validation**: Check localStorage subscription status before game access

### Validation Rules
- Not connected wallet → SweetAlert "Please connect wallet first"
- No plays left today → "Sudah tidak ada kesempatan main hari ini!"
- Already subscribed → Allow continue to game

## 6. Game UI (During Play)

### Elements
- **Score display** (top-left): Score, Coins collected, Time
- **Wallet info** (top-right): Balance, Address, Subscription status
- **Start button**: Centered, pulsing animation (before game starts)
- **Game canvas**: Auto-moving basket, falling coins

### Visual Feedback
- Warning popup for danger coins
- Game over modal with stats and play again option

## 7. SweetAlert Style (iPhone)

### Design
- Semi-transparent backdrop (blur)
- Rounded white card (border-radius: 20px)
- iOS-style buttons (pill shape, subtle shadows)
- Smooth fade/scale animations
- Icons: success (green), error (red), info (blue), warning (yellow), danger (red)

## 8. Tech Stack
- Pure HTML5 + CSS3 + Vanilla JavaScript
- SVG-based cloud graphics (6 shapes)
- Web3 interaction via ethers.js-style API (simulated)
- localStorage for persistence

## 9. File Structure
```
monad-game-tako/
├── index.html
├── SPEC.md
├── public/
│   ├── assets/
│   │   ├── css/
│   │   │   └── style.css
│   │   ├── js/
│   │   │   └── app.js
│   │   └── images/
│   │       ├── coin-tako.png
│   │       ├── basket.png
│   │       ├── cloud-a1.svg
│   │       ├── cloud-a2.svg
│   │       ├── cloud-a3.svg
│   │       ├── cloud-b1.svg
│   │       ├── cloud-b2.svg
│   │       ├── cloud-b3.svg
│   │       ├── coin-red.svg
│   │       └── bomb.svg
```
