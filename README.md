# 🚀 Kirtish Barmecha - Senior Full Stack Developer Portfolio

Welcome to my developer portfolio! This is a state-of-the-art, interactive Single Page Application (SPA) designed to showcase my trajectory in software engineering, complex system topologies, and interactive user interfaces. 

Designed and engineered with **React**, **TypeScript**, and **Tailwind CSS v4** to serve as a high-fidelity case study platform.

👉 **Live Site:** [https://kirtish10.github.io/](https://kirtish10.github.io/)

---

## 🎨 Tech Stack & Tools

* **Core Framework:** React 19, TypeScript
* **Styling System:** Tailwind CSS v4 (fully customized via index.css `@theme` custom properties)
* **Routing System:** React Router v6 (configured with client-side ScrollRestoration and SPA redirections)
* **Vector Graphics:** Custom Interactive SVG Coordinate Map Diagrams
* **Icons:** Google Material Symbols Outlined
* **Build System:** Vite 5 (highly optimized compiler generating slim code bundles)

---

## 💫 Core Interactive Features & Capabilities

### 1. 🖥️ Retro CLI Developer Console
Click on the `terminal` icon in the navigation bar or press the Backtick (`` ` ``) hotkey to trigger the fully functional, interactive glassmorphic command-line overlay.
* **Console Commands:** `help`, `about`, `projects`, `skills`, `clear`, `exit`
* **Matrix Code Rain Easter Egg:** Typing `matrix` launches a retro green code drop rain animation drawn dynamically on a HTML5 Canvas!

### 2. 📊 Interactive System Topology Maps
Inside each detailed project case study page, static mockups are replaced by an **interactive SVG network flow diagram**.
* Maps out lanes dynamically: `External Nodes` ➔ `Frontend Apps` ➔ `Backend APIs` ➔ `Database Engines`.
* Hovering over nodes activates glowing connector wires and highlights detailed telemetry parameters, data serializations, and throughput latencies in a floating window.

### 3. ⚡ Live Server Telemetry Dashboard
An interactive status monitor in the page footer rendering simulated active network analytics:
* Gateway Response Time: `14ms`
* Server CPU Load: `0.04%`
* HikariPool Thread Pool Status: `HEALTHY (24 active)`
* Connection Protocol: `HTTP/3 via QUIC`

### 4. 🎯 Real-time Skill Category Filters
Tag tags in the Selected Works filter project cards instantly, highlighting matched frameworks while gracefully fading out unselected works.

---

## 📂 Project Structure

```
Portfolio/
├── .github/workflows/deploy.yml (GitHub Actions Pages deployment)
├── public/
│   ├── 404.html (SPA redirector gateway for GitHub Pages)
│   └── favicon.svg
├── src/
│   ├── main.tsx
│   ├── index.css (Tailwind CSS v4 & custom animation declarations)
│   ├── data/
│   │   └── projectsData.ts (Single source of truth data repository)
│   ├── hooks/
│   │   └── useScrollReveal.ts (Custom IntersectionObserver reveal hook)
│   ├── components/
│   │   ├── InteractiveBackground.tsx (optimized mouse-tracking layers)
│   │   ├── Navbar.tsx (shrinking sticky header)
│   │   ├── Hero.tsx (typewriting Java Spring Boot controller)
│   │   ├── Experience.tsx (timeline cards)
│   │   ├── Projects.tsx (filtered gallery cards)
│   │   ├── Skills.tsx (shimmer progress tracks)
│   │   ├── Contact.tsx (form feedback loops)
│   │   ├── TerminalOverlay.tsx (CLI shell engine + matrix canvas)
│   │   └── Footer.tsx (live telemetry status dashboard)
│   └── pages/
│       ├── Home.tsx (homepage coordination)
│       └── ProjectDetail.tsx (dynamic SVG case study pages)
```

---

## 💻 Local Setup Guidelines

Ensure you have Node.js (v20+) installed on your machine.

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/kirtish10/kirtish10.github.io.git
   cd kirtish10.github.io
   ```
2. **Install Package Dependencies:**
   ```bash
   npm install
   ```
3. **Execute Local Dev Server:**
   ```bash
   npm run dev
   ```
4. **Compile Production Build Bundle:**
   ```bash
   npm run build
   ```

---

## 🔒 License
MIT License. Created by [Kirtish Barmecha](https://github.com/kirtish10) (2026).
