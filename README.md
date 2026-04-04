# Gesture Controlled Particles 

This project is a fun experiment where you can control a 3D particle system using your hand gestures. It combines Three.js for rendering and MediaPipe for hand tracking to create an interactive visual experience directly in the browser.

## What it does

1. Displays millions of particles forming different shapes (heart, galaxy, DNA, etc.)
2. Lets you change shapes using buttons
3. Allows color customization
4. Uses your webcam to detect hand gestures:
  a. Open hand → particles expand
  b. Closed hand → particles contract

## Tech used

1. Three.js (for 3D rendering)
2. MediaPipe Hands (for gesture tracking)
3. HTML, CSS, JavaScript

## How to run

1. Download or clone this project
2. Open the folder in VS Code
3. Run it using Live Server (recommended)  
   or just open `index.html` in your browser

## Make sure to allow camera access, otherwise gesture control won’t work.

## Notes

1. The particle count is very high (3 million), so performance depends on your system
2. Works best on laptops/desktops with good GPU support
3. If it lags, try reducing `PARTICLE_COUNT` in the code

## Why I built this

I wanted to try something beyond basic UI projects and experiment with graphics + real-time interaction. This project helped me understand how math, rendering, and computer vision can work together.

Just a small creative project, but pretty cool to play with 🙂

*** Build with ❤️ for Hackclub, by Dushyant Acharya ***