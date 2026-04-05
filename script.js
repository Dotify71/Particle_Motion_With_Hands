const PARTICLE_COUNT = 3000000;
const PARTICLE_SIZE = 0.08;
let currentShape = 'heart';
let targetPositions = [];
let particleGeometry, particlesMaterial, particleSystem;
let scene, camera, renderer;
let handExpansionFactor = 1.0;
let baseColor = new THREE.Color(0xff0055);
function initThree() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.02);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    renderer  = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    createParticleSystem();
    calculateShapeTargets('heart');
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    animate();
}
function createParticleSystem() {
    particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 100;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const sprite = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png');
    particlesMaterial = new THREE.PointsMaterial({
        color: baseColor,
        size: PARTICLE_SIZE,
        map: sprite,
        transparent: true,
        alphaTest: 0.5,
        blending: THREE.AdditiveBlending
    });
    particleSystem = new THREE.Points(particleGeometry, particlesMaterial);
    scene.add(particleSystem);
}
function calculateShapeTargets(type) {
    targetPositions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        let x, y, z;
        const i3 = i * 3;
        if (type === 'heart') {
            const t = Math.random() * Math.PI * 2;
            const r = Math.random();
            const scale = 1.5;
            x = 16 * Math.pow(Math.sin(t), 3);
            y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
            z = (Math.random() - 0.5) * 10;
            x *= scale * r; y *= scale * r; z *= r;
        } else if (type === 'flower') {
            const theta = Math.random() * Math.PI * 2;
            const k = 4;
            const r = Math.cos(k * theta) * 15;
            const depth = (Math.random() - 0.5) * 5;
            x = r * Math.cos(theta);
            y = r * Math.sin(theta);
            z = depth + (r / 5) * Math.sin(theta * 10);
        } else if (type === 'saturn') {
            const r = Math.random();
            if (r < 0.6) {
                const phi = Math.acos(-1 + (2 * i) / (PARTICLE_COUNT * 0.6));
                const theta = Math.sqrt((PARTICLE_COUNT * 0.6) * Math.PI) * phi;
                const rad = 8;
                x = rad * Math.cos(theta) * Math.sin(phi);
                y = rad * Math.sin(theta) * Math.sin(phi);
                z = rad * Math.cos(phi);
            } else {
                const angle = Math.random() * Math.PI * 2;
                const dist = 12 + Math.random() * 8;
                x = dist * Math.cos(angle);
                y = (Math.random() - 0.5);
                z = dist * Math.sin(angle);
                const tilt = 0.4;
                let tempY = y * Math.cos(tilt) - z * Math.sin(tilt);
                let tempZ = y * Math.sin(tilt) + z * Math.cos(tilt);
                y = tempY; z = tempZ;
            }
        } else if (type === 'fireworks') {
            const u = Math.random();
            const v = Math.random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);
            const r = 5 + Math.random() * 20;
            x = r * Math.sin(phi) * Math.cos(theta);
            y = r * Math.sin(phi) * Math.sin(theta);
            z = r * Math.cos(phi);
        } else if (type === 'dna') {
            let h = (Math.random() - 0.5) * 40;
            let angle = h * 0.5;
            let radius = 5;
            if (Math.random() > 0.5) {
                x = radius * Math.cos(angle);
                z = radius * Math.sin(angle);
            } else {
                x = radius * Math.cos(angle + Math.PI);
                z = radius * Math.sin(angle + Math.PI);
            }
            y = h;
            x += (Math.random() - 0.5); z += (Math.random() - 0.5);
        } else if (type === 'torus') {
            const u = Math.random() * Math.PI * 2;
            const v = Math.random() * Math.PI * 2;
            const R = 12;
            const r = 4;
            x = (R + r * Math.cos(v)) * Math.cos(u);
            y = (R + r * Math.cos(v)) * Math.sin(u);
            z = r * Math.sin(v);
        } else if (type === 'galaxy') {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 20;
            const spiralOffset = radius * 0.8;
            x = radius * Math.cos(angle + spiralOffset);
            z = radius * Math.sin(angle + spiralOffset);
            y = (Math.random() - 0.5) * (Math.max(0, 10 - radius));
        } else if (type === 'pyramid') {
            const H = 30;
            const B = 10;
            y = (Math.random() - 0.5) * H;
            const scale = 1 - ((y + H / 2) / H);
            const maxXZ = B * scale;
            x = (Math.random() * 2 - 1) * maxXZ;
            z = (Math.random() * 2 - 1) * maxXZ;
        }
        targetPositions[i3] = x;
        targetPositions[i3 + 1] = y;
        targetPositions[i3 + 2] = z;
    }
}
function animate() {
    requestAnimationFrame(animate);
    const positions = particleGeometry.attributes.position.array;
    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
        let target = targetPositions[i] * handExpansionFactor;
        positions[i] += (target - positions[i]) * 0.08;
    }
    particleGeometry.attributes.position.needsUpdate = true;
    particleSystem.rotation.y += 0.005;
    particleSystem.rotation.x += (handExpansionFactor -1) * 0.01;
    renderer.render(scene, camera);
}
function setShape(shape) {
    currentShape = shape;
    calculateShapeTargets(shape);
    document.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    document.getElementById(`btn-${shape}`).classList.add('active');
}
document.getElementById('colorPicker').addEventListener('input', (e) => {
    baseColor.set(e.target.value);
    particlesMaterial.color = baseColor;
});
const videoElement = document.getElementById('input_video');
const statusElement = document.getElementById('status');
function onResults(results) {
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        statusElement.innerText = "Hands Detected";
        statusElement.style.color = "#00ff88";
        const landmarks = results.multiHandLandmarks[0];
        const thumbTip = landmarks[4];
        const indexTip = landmarks[8];
        const distance = Math.sqrt(
            Math.pow(thumbTip.x - indexTip.x, 2) +
            Math.pow(thumbTip.y - indexTip.y, 2)
        );
        let factor = (distance * 10);
        factor = Math.max(0.2, Math.min(factor, 3.0));
        handExpansionFactor += (factor - handExpansionFactor) * 0.1;
    } else {
        statusElement.innerText = "No Hands Detected";
        statusElement.style.color = "#ffaa00";
        handExpansionFactor += (1.0 - handExpansionFactor) * 0.05;
    }
}
const hands = new Hands ({
    locateFile: (file) => {
        return  `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }
});
hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});
hands.onResults(onResults);
const cameraUtils = new Camera(videoElement, {
    onFrame: async () => {
        await hands.send({ image: videoElement });
    },
    width: 640,
    height: 480
});
initThree();
cameraUtils.start();