# Reddit-Community-Chess
> **An interactive chess experience where Reddit communities vote on moves together, featuring AI opponents, analyst systems, and real-time chat.**
> **The game is still currently under development due to the incompatible systems used in the game, I look forward to give you guys more exciting experience in the near future**

## 🎮 **Live Demo**

- **App Dashboard:** [developers.reddit.com/apps/nexus-gambit](https://developers.reddit.com/apps/nexus-gambit)
- **Test Subreddit:** [r/nexus_gambit_dev](https://www.reddit.com/r/nexus_gambit_dev)
- **Playtest Link:** [nexus_gambit_dev/?playtest=nexus-gambit](https://www.reddit.com/r/nexus_gambit_dev/?playtest=nexus-gambit)

## ✨ **Features**

### 🏆 **Core Gameplay**
- **Community Voting:** Users vote on chess moves with 4 AI-curated options
- **Smart AI Engine:** 1800+ ELO chess engine provides best moves and alternatives
- **Real-time Chess Board:** Interactive board with piece movement visualization
- **2-minute Vote Timer:** Countdown timer for each move decision

### 🧠 **Analyst System**
- **20-second Analyst Test:** Quick challenge to become a strategic analyst
- **Move Explanations:** AI-powered analysis of submitted moves
- **Accuracy Leaderboard:** Track top analysts by move accuracy
- **Separate Analyst Chat:** Exclusive communication channel for analysts

### 💬 **Dynamic Chat System**
- **Phase-based Chat:** 
  - **Moves 1-10:** General community chat
  - **Moves 11-15:** Chat paused during analyst selection
  - **Move 16+:** Team-separated chats (analysts vs regular players)
- **Real-time Messaging:** Live chat with timestamps and user roles

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ and npm
- Reddit Developer Account
- Devvit CLI installed

## 🎯 **Game Flow**

### **Phase 1: Community Voting (Moves 1-10)**
1. Users see 4 move options (1 AI best + 3 alternatives)
2. Community votes within 2-minute timer
3. General chat available for strategy discussion
4. Winning move is executed automatically

### **Phase 2: Analyst Selection (Moves 11-15)**
1. Chat is paused system-wide
2. 20-second analyst test popup appears
3. Users submit chess moves under time pressure
4. Fastest/best submissions become analysts

### **Phase 3: Team Separation (Move 16+)**
1. Analysts get exclusive chat and leaderboard
2. Regular players continue in general chat
3. Teams cannot see each other's discussions
4. Strategic depth increases significantly

### **Epic Finale**
- **Humanity Wins:** "🎉 HUMANITY TRIUMPHS! The collective wisdom prevails!"
- **AI Wins:** "🤖 AI DOMINANCE BEGINS... The machines have learned our patterns!"

### **Current Limitations**
- Chat history doesn't persist between sessions
- Limited to 4 move options per turn
- Analyst test is time-based only (no chess skill validation)

### **Planned Features**
- **Tournament Mode:** Multiple games running simultaneously
- **ELO Ratings:** Track individual player chess ratings
- **Move History:** Visual game notation and replay
- **Custom Positions:** Start from specific chess positions

## 📜 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Reddit Devvit Team** - Amazing platform for interactive apps
- **Chess.js Library** - Robust chess game logic
- **React Chessboard** - Beautiful chess board component
- **Chess Community** - Inspiration and feedback

---

**Built with ❤️ for the Reddit chess community**

*"Every move is a community decision, every game is a shared victory."*
