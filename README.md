# Progress Tracking Dashboard

A **game-like progress tracking system** for web development skills, where each skill earns points as you code. Gain XP, level up, and allocate skill points to **Frontend, Backend, DevOps, Problem Solving, and Tooling**.

## 🚀 Features

- 📊 **Skill Tracking:** Monitor progress in Frontend, Backend, DevOps, Problem-Solving, and Tooling.
- 🔢 **XP System:** Gain XP by improving sub-skills and level up as you progress.
- 🎯 **Level System:** Ranges from Novice to Grandmaster based on XP milestones.
- 📈 **Progress Bar:** Visualizes the experience points needed for the next level.
- 💾 **Local Storage Persistence:** Saves user progress across sessions.

## 🛠 Tech Stack

- **Next.js** - Framework for React applications
- **Tailwind CSS** - Styling for UI components
- **React State Management** - useState and useEffect for handling XP and skill data
- **LocalStorage** - Persistent data storage for user progress

## 📦 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/progress-dashboard.git
   cd progress-dashboard
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Run the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```
4. Open `http://localhost:3000` in your browser.

## 🏆 Leveling System

| Level Range | Title        |
| ----------- | ------------ |
| 1 - 5       | Novice       |
| 6 - 10      | Apprentice   |
| 11 - 20     | Beginner     |
| 21 - 40     | Intermediate |
| 41 - 60     | Advanced     |
| 61 - 80     | Expert       |
| 81 - 100    | Master       |
| 101+        | Grandmaster  |

## 📌 How It Works

1. Each skill has sub-skills with individual progress bars.
2. Clicking `+` increases XP and levels up sub-skills when XP reaches 100.
3. Level-ups automatically update the main progress bars.
4. Data is stored locally using `localStorage`.

## 📜 To-Do List

- [ ] Add Firebase for cloud-based progress tracking
- [ ] Implement authentication for multi-user support
- [ ] Introduce achievements and badges system

## 🤝 Contributing

Pull requests are welcome! If you find any bugs or have feature suggestions, feel free to open an issue.

## 📜 License

This project is licensed under the MIT License.
