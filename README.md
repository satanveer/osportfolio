# 🕹️ Retro OS Portfolio

A nostalgic, interactive desktop environment simulator featuring **Classic Mac OS** and **Windows 95** themes. This application showcases Tanveer's web development portfolio, complete with interactive folders, a command-line terminal, customizable wallpapers, custom retro sound effects, an achievement system, and an interactive desktop spirit (pet).

Live Demo: [satanveer.tech](https://satanveer.tech)

---

## ✨ Key Features

*   **🎭 Dual-OS Theme System:** Seamlessly transition between a pixel-perfect **Classic Macintosh** aesthetic and a grey-bevel **Windows 95** interface.
*   **👾 Desktop Pet (Companion):** An interactive companion that watches your desktop activity, emotes, reacts to folder openings, and responds when you click ("bonk") him.
*   **📁 Custom Folders & Explorer:**
    *   **Projects:** Detailed project cards (e.g., BobbyFlow, Cohort Builder, Desi Hatti) with live links.
    *   **Stack:** Visual representation of Tanveer's technical skills.
    *   **Social:** Connect links stylized as retro desktop icons.
    *   **About:** Contextual background information in a retro folder format.
*   **💻 Hidden Terminal:** A command-line window supporting special commands (`help`, `clear`, `about`, `projects`, `clear-achievements`, `matrix`, etc.).
*   **🏆 Achievement System:** Unlocks Toast notifications for finding easter eggs, opening all folders, loading a case disk, waking the screensaver, and more.
*   **🔊 Audio Engine:** Integrated retro mouse-click sounds with frequency sweeps built using the Web Audio API to bypass browser autoplay restrictions.
*   **🎛️ Wallpaper Switcher:** Instantly swap the desktop backdrop between *Classic Teal*, *Night Grid*, *Paper*, or *Matrix* themes.
*   **📺 Screensaver Mode:** Activates standard screensaver idle animations to emulate retro CRTs.

---

## 🛠️ Tech Stack

*   **Framework:** React 19 (Vite)
*   **Logic:** Native React Hooks, Custom Drag Position hook, and Web Audio API
*   **Styling:** Custom CSS (built from scratch with design tokens for OS themes, layouts, animations, and typography)
*   **Fonts:** Lato and local retro-spaced font faces

---

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/satanveer/osportfolio.git
   cd osportfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

---

## ☁️ Deployment on Vercel

This application is configured for deployment on Vercel. 

### Deploying a New Instance
If you want to deploy a fresh instance of this portfolio:
1. Push this project to your GitHub account.
2. Go to the [Vercel Dashboard](https://vercel.com).
3. Import the repository. Vercel automatically detects the Vite configuration:
   *   **Framework Preset:** Vite
   *   **Build Command:** `npm run build`
   *   **Output Directory:** `dist`
4. Click **Deploy**.

### Overwriting an Existing Vercel Project
If you already have a live portfolio on Vercel and want to replace it:
1. Push this code to a new GitHub repository.
2. Go to your existing Vercel project's **Settings** > **Git**.
3. Disconnect your previous repo and connect this new repository.
4. Push a change or trigger a deployment from the dashboard to replace your old portfolio.

---

## 🕵️‍♂️ Easter Eggs & Commands
Try out these terminal commands inside the Terminal Window:
*   `help` - Show all available commands.
*   `matrix` - Toggle a scrolling terminal matrix effect.
*   `bobbyflow` - Show details about the BobbyFlow planning workspace.
*   `bonk` - Interact with the desktop pet.
