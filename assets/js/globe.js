// Select the container where the globe will be rendered
const container = document.getElementById("globe-container");

// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
});
renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.5);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Enhanced ambient lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

// Create multiple soft directional lights for better shadow
const mainLight = new THREE.DirectionalLight(0xffffff, 0.5);
mainLight.position.set(0, 8, 4);
mainLight.castShadow = true;
mainLight.shadow.mapSize.width = 4096; // Increased resolution
mainLight.shadow.mapSize.height = 4096;
mainLight.shadow.camera.near = 0.1;
mainLight.shadow.camera.far = 20;
mainLight.shadow.camera.top = 4;
mainLight.shadow.camera.bottom = -4;
mainLight.shadow.radius = 10; // Increased shadow blur
mainLight.shadow.bias = -0.0001; // Reduce shadow artifacts
scene.add(mainLight);

// Add subtle rim light
const rimLight = new THREE.DirectionalLight(0x9dc2ff, 0.3);
rimLight.position.set(-5, 0, -5);
scene.add(rimLight);

// Create the globe with enhanced materials
const geometry = new THREE.SphereGeometry(2, 64, 64); // Increased segments for smoother sphere
const textureLoader = new THREE.TextureLoader();
const dotTexture = textureLoader.load("/assets/img/images/texture.jpg");
const material = new THREE.MeshStandardMaterial({
    map: dotTexture,
    roughness: 2,
    metalness: -0.3,
    bumpScale: 1,
});

const earth = new THREE.Mesh(geometry, material);
earth.castShadow = true;
earth.receiveShadow = true;
scene.add(earth);

// Create a larger, more diffused shadow plane
const planeGeometry = new THREE.PlaneGeometry(6, 6);
const shadowMaterial = new THREE.ShadowMaterial({
    opacity: 0.3, // Reduced opacity for softer shadow
});
const shadowPlane = new THREE.Mesh(planeGeometry, shadowMaterial);
shadowPlane.rotation.x = -Math.PI / 2;
shadowPlane.position.y = -2;
shadowPlane.receiveShadow = true;
scene.add(shadowPlane);

// Add subtle glow effect
const glowGeometry = new THREE.SphereGeometry(1.75, 64, 64);
const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0x0077ff,
    transparent: true,
    opacity: 0.5,
    side: THREE.FrontSide
});
const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
scene.add(glowMesh);

function updateGlobeSize() {
    let scaleFactor = window.innerWidth < 768 ? 0.8 : 1; // Reduce size for small screens
    earth.scale.set(scaleFactor, scaleFactor, scaleFactor);
    glowMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
}

// Camera position and settings
camera.position.z = 5;
camera.position.y = 0; // Slight angle for better perspective

// Smooth rotation animation
let rotationSpeed = 0.002;
const animate = () => {
    requestAnimationFrame(animate);
    earth.rotation.y += rotationSpeed;
    glowMesh.rotation.y += rotationSpeed;
    renderer.render(scene, camera);
};

// Add mouse interaction
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

container.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = {
        x: e.clientX,
        y: e.clientY
    };
});

container.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const deltaMove = {
            x: e.clientX - previousMousePosition.x,
            y: e.clientY - previousMousePosition.y
        };
        earth.rotation.y += deltaMove.x * 0.005;
        earth.rotation.x += deltaMove.y * 0.005;
        glowMesh.rotation.y = earth.rotation.y;
        glowMesh.rotation.x = earth.rotation.x;
    }
    previousMousePosition = {
        x: e.clientX,
        y: e.clientY
    };
});

container.addEventListener('mouseup', () => {
    isDragging = false;
});

// Enhanced window resize handler
window.addEventListener("resize", () => {
    const width = window.innerWidth / 1.5;
    const height = window.innerHeight / 1.5;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
updateGlobeSize();
window.addEventListener("resize", updateGlobeSize);

animate();