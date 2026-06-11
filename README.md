# Particle Lab — Gesture + Voice Controlled Particle Motion

Particle Lab is a fun web experiment that renders floating **3D particles** using **your webcam and microphone**. You don’t need a keyboard/controller—use **hand gestures** and **voice commands** to change shapes, colors, motion, and more.

---

## What you can do

### 1) Hand tracking (Webcam)
- **Left hand:** open/close to **expand/contract** the particle formation.
- **Right hand:** move your wrist to **rotate** the scene.
- **Both hands:** pinch with both hands to **reset zoom**.

### 2) Voice commands (Mic + Web Speech API)
With the mic enabled, try saying commands such as:
- shapes: `galaxy`, `heart`, `dna`, `cube`, `wave`, `donut`, `bottle`
- colors: `pink`, `rainbow`, `cyan`, `gold`, `white`
- movement: `pause`, `slow`, `fast`, `hyper`
- tweaks: `more particles`, `less particles`, `zoom in`, `explode`, `reset`

### 3) Audio reactivity (Mic + Web Audio)
Turn on **Audio React** and the particle motion will pulse in response to sound (music/noise).

### 4) Many shapes
Switch between multiple presets (e.g., heart, flower, saturn, fireworks, dna, torus, galaxy, pyramid, sphere, wave, mobius, cube, knot, spring, klein, nebula).

---

## Run it locally

Because the app needs access to your **camera** and **microphone**, it must be served from a **secure context** (e.g. `https://` or `localhost`).

1. Open a terminal in this project folder.
2. Start a local server.

   **Python:**
   ```bash
   python3 -m http.server 3000
   ```

   **Node.js (alternative):**
   ```bash
   npx serve -l 3000
   ```

3. Open your browser at:
   - `http://localhost:3000`
4. Accept the browser permissions for **camera** and **microphone**.

> Pro tip: voice recognition tends to work best in **Google Chrome** or **Microsoft Edge**.

---

## Controls & shortcuts

- `Tab` — hide/show the settings panel
- `P` — save a PNG screenshot
- `O` — toggle mouse/touch orbit controls
- `V` — toggle Voice Commands on/off
- `Scroll wheel` — zoom in/out

---

## Tech used

- **Three.js** — 3D rendering of particle points
- **MediaPipe Hands** — hand landmark detection/gestures
- **Web Speech API** — speech-to-text voice commands
- **Web Audio API** — audio analysis for reactivity

