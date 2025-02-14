// Select the container where the globe will be rendered
const container = document.getElementById("globe-container");

// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); 
renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.5); // Adjust size
container.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Create an ambient light for soft illumination
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Create a directional light for shadows
const lightSource = new THREE.SpotLight(0xffffff, 1.5, 10, Math.PI / 4, 0.5);
lightSource.position.set(0, 5, 0); // Adjusted for better shadow projection
lightSource.castShadow = true;
lightSource.shadow.mapSize.width = 2048;
lightSource.shadow.mapSize.height = 2048;
lightSource.shadow.camera.near = 1;
lightSource.shadow.camera.far = 10;
lightSource.shadow.radius = 8;
scene.add(lightSource);

// Create a sphere (Earth)
const geometry = new THREE.SphereGeometry(1.6, 64, 64);
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load("/assets/img/images/texture.jpg");

// Use `MeshStandardMaterial` for shadows
const material = new THREE.MeshStandardMaterial({ map: earthTexture });
const earth = new THREE.Mesh(geometry, material);
earth.castShadow = true; // Globe casts shadow
scene.add(earth);

// Create a ground plane to receive the shadow
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.3 }); // Semi-transparent shadow
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; // Make it horizontal
plane.position.y = -2; // Positioned below the globe
plane.receiveShadow = true; // Enable shadow reception
scene.add(plane);

// Set camera position
camera.position.set(0, 2, 6); // Adjusted for a clear view

// Rotate the globe
function animate() {
    requestAnimationFrame(animate);
    earth.rotation.y += 0.002; // Adjust rotation speed if needed
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.5);
    camera.aspect = (window.innerWidth / 1.5) / (window.innerHeight / 1.5);
    camera.updateProjectionMatrix();
});
