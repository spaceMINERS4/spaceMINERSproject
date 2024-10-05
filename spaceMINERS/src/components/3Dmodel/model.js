/*import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Import textures (make sure to add your asteroid texture)
import starsTexture from './src/img/stars.jpg';
import sunTexture from './src/img/sun.jpg';
import mercuryTexture from './src/img/mercury.jpg';
import venusTexture from './src/img/venus.jpg';
import earthTexture from './src/img/earth.jpg';
import marsTexture from './src/img/mars.jpg';
import jupiterTexture from './src/img/jupiter.jpg';
import saturnTexture from './src/img/saturn.jpg';
import saturnRingTexture from './src/img/saturn ring.png';
import uranusTexture from './src/img/uranus.jpg';
import uranusRingTexture from './src/img/uranus ring.png';
import neptuneTexture from './src/img/neptune.jpg';
import plutoTexture from './src/img/pluto.jpg';
import asteroidTexture from './src/img/asteroid.jpg'; // Add your asteroid texture

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture
]);


const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const textureload = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(12, 25, 20);
const sunMat = new THREE.MeshBasicMaterial({
  map: textureload.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

const pointLight = new THREE.PointLight(0xffffff, 3, 300);
scene.add(pointLight);




function createPlanet(size, texture, position, ring) {
    const geometry = new THREE.SphereGeometry(size, 25, 20);
    const material = new THREE.MeshStandardMaterial({
        map: textureload.load(texture)
    });
    const planet = new THREE.Mesh(geometry, material);
    const planetObj = new THREE.Object3D();
    planetObj.add(planet);
    scene.add(planetObj);
    planet.position.x = position;

    if (ring) {
        const RingGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 30);
        const RingMat = new THREE.MeshStandardMaterial({
            map: textureload.load(ring.texture),
            side: THREE.DoubleSide
        });
        const Ring = new THREE.Mesh(RingGeo, RingMat);
        planetObj.add(Ring);

        Ring.position.x = position;
        Ring.rotation.x = -0.5 * Math.PI;
    }
    return { planet, planetObj };
}

const mercury = createPlanet(4, mercuryTexture, 20);
const venus = createPlanet(5, venusTexture, 40);
const earth = createPlanet(5.56, earthTexture, 60);
const mars = createPlanet(5, marsTexture, 80);
const jupiter = createPlanet(6, jupiterTexture, 100);
const saturn = createPlanet(8, saturnTexture, 150, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
});
const uranus = createPlanet(8.2, uranusTexture, 200, {
    innerRadius: 10,
    outerRadius: 20,
    texture: uranusRingTexture
});
const neptune = createPlanet(5, neptuneTexture, 240);

// Define asteroid creation function
function createAsteroid(fullName, size, texture, position, H) {
    const geometry = new THREE.SphereGeometry(size, 15, 15); // Smaller geometry for asteroids
    const material = new THREE.MeshStandardMaterial({
        map: textureload.load(texture)
    });
    const asteroid = new THREE.Mesh(geometry, material);
    
    asteroid.position.x = position; // Set position based on distance from the sun
    asteroid.name = fullName; // Set the name for easier debugging if needed
    asteroid.scale.set(0.5, 0.5, 0.5); // Scale down the asteroid

    scene.add(asteroid);
    
    // Add any additional properties based on H (absolute magnitude)
    asteroid.h = H; // You can use this value for further calculations if needed

    return asteroid;
}

// Example asteroid data for additional asteroids
const asteroidDataList = [
    {
        full_name: "Asteroid 12345",
        size: 1.5, // Radius in your scale
        texture: asteroidTexture, // Path to an asteroid texture image
        position: 100, // Distance from the sun
        H: 20.1 // Absolute magnitude
    },
    {
        full_name: "Asteroid 67890",
        size: 1.2, // Radius in your scale
        texture: asteroidTexture,
        position: 110, // Distance from the sun
        H: 19.8 // Absolute magnitude
    },
    {
        full_name: "Asteroid 11223",
        size: 1.0, // Radius in your scale
        texture: asteroidTexture,
        position: 120, // Distance from the sun
        H: 21.5 // Absolute magnitude
    },
    {
        full_name: "Asteroid 44556",
        size: 1.8, // Radius in your scale
        texture: asteroidTexture,
        position: 130, // Distance from the sun
        H: 22.0 // Absolute magnitude
    }
];

// Creating the asteroids using the function
const exampleAsteroid1 = createAsteroid(
    asteroidDataList[0].full_name, 
    asteroidDataList[0].size, 
    asteroidDataList[0].texture, 
    asteroidDataList[0].position, 
    asteroidDataList[0].H
);

const exampleAsteroid2 = createAsteroid(
    asteroidDataList[1].full_name, 
    asteroidDataList[1].size, 
    asteroidDataList[1].texture, 
    asteroidDataList[1].position, 
    asteroidDataList[1].H
);

const exampleAsteroid3 = createAsteroid(
    asteroidDataList[2].full_name, 
    asteroidDataList[2].size, 
    asteroidDataList[2].texture, 
    asteroidDataList[2].position, 
    asteroidDataList[2].H
);

const exampleAsteroid4 = createAsteroid(
    asteroidDataList[3].full_name, 
    asteroidDataList[3].size, 
    asteroidDataList[3].texture, 
    asteroidDataList[3].position, 
    asteroidDataList[3].H
);

function animate() {
    sun.rotateY(0.002);
    mercury.planet.rotateY(0.001);
    mercury.planetObj.rotateY(0.001);
    venus.planet.rotateY(0.0012);
    venus.planetObj.rotateY(0.0015);
    earth.planet.rotateY(0.012);
    earth.planetObj.rotateY(0.0012);
    mars.planet.rotateY(0.013);
    mars.planetObj.rotateY(0.0019);
    jupiter.planet.rotateY(0.04);
    jupiter.planetObj.rotateY(0.0023);
    saturn.planet.rotateY(0.01);
    saturn.planetObj.rotateY(0.0021);
    uranus.planet.rotateY(0.01);
    uranus.planetObj.rotateY(0.0015);
    neptune.planet.rotateY(0.01);
    neptune.planetObj.rotateY(0.001);
    
    // Add rotation for asteroids if needed
    exampleAsteroid1.rotateY(0.005);
    exampleAsteroid2.rotateY(0.005);
    exampleAsteroid3.rotateY(0.005);
    exampleAsteroid4.rotateY(0.005);

    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// Setting window size
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


// second code





import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Import textures
import caca from '../../assets/Images/'
import starsTexture from '../../assets/Images/stars.jpg';
import sunTexture from '../../assets/Images/sun.jpg';
import mercuryTexture from '../../assets/Images/mercury.jpg';
import venusTexture from '../../assets/Images/venus.jpg';
import earthTexture from '../../assets/Images/earth.jpg';
import marsTexture from '../../assets/Images/mars.jpg';
import jupiterTexture from '../../assets/Images/jupiter.jpg';
import saturnTexture from '../../assets/Images/saturn.jpg';
import uranusTexture from '../../assets/Images/uranus.jpg';
import neptuneTexture from '../../assets/Images/neptune.jpg';

// Keplerian elements for the planets
const planetaryData = {
    mercury: { a: 0.387, e: 0.206, I: 7.00, L: 252.25, longPeri: 77.46, longNode: 48.34, rates: { a: 0, e: 0.00002123, I: -0.00590158, L: 149472.67486623, longPeri: 0.15940013, longNode: -0.12214182 }},
    venus: { a: 0.723, e: 0.007, I: 3.40, L: 181.98, longPeri: 131.77, longNode: 76.67, rates: { a: -0.00000026, e: -0.00005107, I: 0.00043494, L: 58517.81560260, longPeri: 0.05679648, longNode: -0.27274174 }},
    earth: { a: 1.000, e: 0.017, I: 0.00, L: 100.47, longPeri: 102.93, longNode: 0.0, rates: { a: -0.00000003, e: -0.00003661, I: -0.01337178, L: 35999.37306329, longPeri: 0.31795260, longNode: 0 }},
    mars: { a: 1.524, e: 0.093, I: 1.85, L: -4.57, longPeri: -23.92, longNode: 49.71, rates: { a: 0.00000097, e: 0.00009149, I: -0.00724757, L: 19140.29934243, longPeri: 0.45223625, longNode: -0.26852431 }},
    jupiter: { a: 5.203, e: 0.048, I: 1.30, L: 34.33, longPeri: 14.28, longNode: 100.29, rates: { a: -0.00002864, e: 0.00018026, I: -0.00322699, L: 3034.90371757, longPeri: 0.18199196, longNode: 0.13024619 }},
    saturn: { a: 9.582, e: 0.056, I: 2.49, L: 50.08, longPeri: 92.86, longNode: 113.64, rates: { a: -0.00003065, e: -0.00032044, I: 0.00451969, L: 1222.11494724, longPeri: 0.54179478, longNode: -0.25015002 }},
    uranus: { a: 19.229, e: 0.046, I: 0.77, L: 314.20, longPeri: 172.43, longNode: 73.96, rates: { a: -0.00020455, e: -0.00001550, I: -0.00180155, L: 428.49512595, longPeri: 0.09266985, longNode: 0.05739699 }},
    neptune: { a: 30.104, e: 0.009, I: 1.77, L: 304.22, longPeri: 46.68, longNode: 131.79, rates: { a: 0.00006447, e: 0.00000818, I: 0.00022400, L: 218.46515314, longPeri: 0.01009938, longNode: -0.00606302 }}
};

// Constants
const J2000 = 2451545.0;

// Set up scene, camera, and renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);

const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(-150, 200, 300);
orbit.update();

// Set background
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starsTexture, starsTexture, starsTexture, starsTexture, starsTexture, starsTexture
]);

// Lighting
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 3, 500);
scene.add(pointLight);

// Add the Sun
const textureload = new THREE.TextureLoader();
const sunGeo = new THREE.SphereGeometry(16, 32, 32);
const sunMat = new THREE.MeshBasicMaterial({ map: textureload.load(sunTexture) });
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

// Planet sizes
const planetSizes = {
    mercury: 5.0,   // Increase size
    venus: 6.2,     // Increase size
    earth: 6.0,     // Increase size
    mars: 5.1,      // Increase size
    jupiter: 18,    // Increase size
    saturn: 16,     // Increase size
    uranus: 9.0,    // Increase size
    neptune: 9.0     // Increase size
};

// Planet textures
const planetTextures = {
    mercury: mercuryTexture,
    venus: venusTexture,
    earth: earthTexture,
    mars: marsTexture,
    jupiter: jupiterTexture,
    saturn: saturnTexture,
    uranus: uranusTexture,
    neptune: neptuneTexture
};

// Create planets and their positions
const planets = {};
Object.keys(planetaryData).forEach(planetName => {
    const planetGeometry = new THREE.SphereGeometry(planetSizes[planetName], 32, 32);
    const planetTexture = new THREE.TextureLoader().load(planetTextures[planetName]);
    const planetMaterial = new THREE.MeshStandardMaterial({ map: planetTexture });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planet);
    planets[planetName] = planet;
});

// Function to compute planet position based on Keplerian elements
function computePlanetPosition(planet, julianDate) {
    const T = (julianDate - J2000) / 36525;
    const a = planet.a + planet.rates.a * T;
    const e = planet.e + planet.rates.e * T;
    const I = THREE.MathUtils.degToRad(planet.I + planet.rates.I * T);
    const L = planet.L + planet.rates.L * T;
    const longPeri = planet.longPeri + planet.rates.longPeri * T;
    const longNode = planet.longNode + planet.rates.longNode * T;

    let M = (L - longPeri) % 360;
    const M_rad = THREE.MathUtils.degToRad(M);
    let E = M_rad;
    let delta;
    do {
        delta = E - e * Math.sin(E) - M_rad;
        E -= delta / (1 - e * Math.cos(E));
    } while (Math.abs(delta) > 1e-6);

    const x_orb = a * (Math.cos(E) - e);
    const y_orb = a * Math.sqrt(1 - e ** 2) * Math.sin(E);

    const r = Math.sqrt(x_orb ** 2 + y_orb ** 2);
    const v = Math.atan2(y_orb, x_orb);

    const xeclip = r * (Math.cos(longNode) * Math.cos(v + longPeri - longNode) - Math.sin(longNode) * Math.sin(v + longPeri - longNode) * Math.cos(I));
    const yeclip = r * (Math.sin(longNode) * Math.cos(v + longPeri - longNode) + Math.cos(longNode) * Math.sin(v + longPeri - longNode) * Math.cos(I));
    const zeclip = r * Math.sin(v + longPeri - longNode) * Math.sin(I);

    return { x: xeclip * 100, y: yeclip * 100, z: zeclip * 100 };
}

// Set initial camera position
camera.position.set(-150, 200, 300);
orbit.update();

let julianDate = J2000;
const timeStep = 0.1;

function animate() {
    julianDate += timeStep;

    // Update each planet's position
    Object.keys(planets).forEach(planetName => {
        const planetData = planetaryData[planetName];
        const planet = planets[planetName];
        const pos = computePlanetPosition(planetData, julianDate);
        planet.position.set(pos.x, pos.y, pos.z);
    });

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
*/
import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//i imported these idk if i need them
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

// Import textures
import starsTexture from '../../assets/Images/stars.jpg';
import sunTexture from '../../assets/Images/sun.jpg';
import mercuryTexture from '../../assets/Images/mercury.jpg';
import venusTexture from '../../assets/Images/venus.jpg';
import earthTexture from '../../assets/Images/earth.jpg';
import marsTexture from '../../assets/Images/mars.jpg';
import jupiterTexture from '../../assets/Images/jupiter.jpg';
import saturnTexture from '../../assets/Images/saturn.jpg';
import uranusTexture from '../../assets/Images/uranus.jpg';
import neptuneTexture from '../../assets/Images/neptune.jpg';
import sunlight from '../../assets/Images/sunlight.png';

import saturnring from '../../assets/Images/saturnring.png';
import uranusring from '../../assets/Images/uranusring.png';
import ORBID01 from '../../assets/Images/ORBID01.svg';

// Keplerian elements for the planets
const planetaryData = {
    mercury: { a: 0.387, e: 0.206, I: 7.00, L: 252.25, longPeri: 77.46, longNode: 48.34, rates: { a: 0, e: 0.00002123, I: -0.00590158, L: 149472.67486623, longPeri: 0.15940013, longNode: -0.12214182 }},
    venus: { a: 0.723, e: 0.007, I: 3.40, L: 181.98, longPeri: 131.77, longNode: 76.67, rates: { a: -0.00000026, e: -0.00005107, I: 0.00043494, L: 58517.81560260, longPeri: 0.05679648, longNode: -0.27274174 }},
    earth: { a: 1.000, e: 0.017, I: 0.00, L: 100.47, longPeri: 102.93, longNode: 0.0, rates: { a: -0.00000003, e: -0.00003661, I: -0.01337178, L: 35999.37306329, longPeri: 0.31795260, longNode: 0 }},
    mars: { a: 1.524, e: 0.093, I: 1.85, L: -4.57, longPeri: -23.92, longNode: 49.71, rates: { a: 0.00000097, e: 0.00009149, I: -0.00724757, L: 19140.29934243, longPeri: 0.45223625, longNode: -0.26852431 }},
    jupiter: { a: 5.203, e: 0.048, I: 1.30, L: 34.33, longPeri: 14.28, longNode: 100.29, rates: { a: -0.00002864, e: 0.00018026, I: -0.00322699, L: 3034.90371757, longPeri: 0.18199196, longNode: 0.13024619 }},
    saturn: { a: 9.582, e: 0.056, I: 2.49, L: 50.08, longPeri: 92.86, longNode: 113.64, rates: { a: -0.00003065, e: -0.00032044, I: 0.00451969, L: 1222.11494724, longPeri: 0.54179478, longNode: -0.25015002 }},
    uranus: { a: 19.229, e: 0.046, I: 0.77, L: 314.20, longPeri: 172.43, longNode: 73.96, rates: { a: -0.00020455, e: -0.00001550, I: -0.00180155, L: 428.49512595, longPeri: 0.09266985, longNode: 0.05739699 }},
    neptune: { a: 30.104, e: 0.009, I: 1.77, L: 304.22, longPeri: 46.68, longNode: 131.79, rates: { a: 0.00006447, e: 0.00000818, I: 0.00022400, L: 218.46515314, longPeri: 0.01009938, longNode: -0.00606302 }}
};

// Constants
const J2000 = 2451545.0;

const SolarSystem = () => {
    useEffect(() => {
        // Set up scene, camera, and renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
        const orbit = new OrbitControls(camera, renderer.domElement);
        camera.position.set(0, -100, 20); // Adjusted camera position
        orbit.update();

        // Set background
        const cubeTextureLoader = new THREE.CubeTextureLoader();
        scene.background = cubeTextureLoader.load([
            starsTexture, starsTexture, starsTexture, starsTexture, starsTexture, starsTexture
        ]);

        // Lighting
        
        const ambientLight = new THREE.AmbientLight(0xdddddd, 1);
        scene.add(ambientLight); 

        
        const pointLight = new THREE.PointLight(0xFF006B, 3, 1000);
        scene.add(pointLight);


        // Add the Sun
        const textureLoader = new THREE.TextureLoader();
        const sunGeo = new THREE.SphereGeometry(10, 32, 32);
        const sunMat = new THREE.MeshBasicMaterial({ map: textureLoader.load(sunTexture) });
        const sun = new THREE.Mesh(sunGeo, sunMat);
        scene.add(sun);
/* 
        const sunLight = new THREE.PointLight(0xffffff, 3, 2000); 
        sunLight.position.set(0, 0, 0); 
        scene.add(sunLight);  */

        
        const planeTexture = new THREE.TextureLoader().load(sunlight); 
        const planeGeometry = new THREE.PlaneGeometry(30, 30); 
        const planeMaterial = new THREE.MeshBasicMaterial({
            map: planeTexture,
            transparent: true,  
            side: THREE.DoubleSide 
        });
        
        const backgroundPlane = new THREE.Mesh(planeGeometry, planeMaterial);

        backgroundPlane.position.set(0, 0, 0);  

        scene.add(backgroundPlane);

        
        const saturnRingTexture = new THREE.TextureLoader().load(saturnring); 
        const saturnringGeometry = new THREE.PlaneGeometry(40, 40); 
        const saturnringMaterial = new THREE.MeshBasicMaterial({
            map: saturnRingTexture,
            transparent: true,  
            side: THREE.DoubleSide 
        });

        const saturnRing = new THREE.Mesh(saturnringGeometry, saturnringMaterial);
 
        
        const uranusringTexture = new THREE.TextureLoader().load(uranusring); 
        const uranusringGeometry = new THREE.PlaneGeometry(40, 40); 
        const uranusringMaterial = new THREE.MeshBasicMaterial({
            map: uranusringTexture,
            transparent: true,  
            side: THREE.DoubleSide 
        });

        const uranusRing = new THREE.Mesh(uranusringGeometry, uranusringMaterial);
 
        const ORBID01Texture = new THREE.TextureLoader().load(ORBID01);
 
        // Planet sizes (scaled for visibility)
        const planetSizes = {
            mercury: 1.0,
            venus: 2.0,
            earth: 2.0,
            mars: 1.1,
            jupiter: 10.0,
            saturn: 8.0,
            uranus: 5.0,
            neptune: 5.0
        };

        // Planet textures
        const planetTextures = {
            mercury: mercuryTexture,
            venus: venusTexture,
            earth: earthTexture,
            mars: marsTexture,
            jupiter: jupiterTexture,
            saturn: saturnTexture,
            uranus: uranusTexture,
            neptune: neptuneTexture
        };

        
        // Create planets and their positions
        const planets = {};
        Object.keys(planetaryData).forEach(planetName => {
            const planetGeometry = new THREE.SphereGeometry(planetSizes[planetName], 32, 32);
            const planetTexture = new THREE.TextureLoader().load(planetTextures[planetName]);
            const planetMaterial = new THREE.MeshStandardMaterial({ map: planetTexture });
            const planet = new THREE.Mesh(planetGeometry, planetMaterial);
            scene.add(planet);
            planets[planetName] = planet;
        });

        // Function to compute planet position based on Keplerian elements
        function computePlanetPosition(planet, julianDate) {
            const T = (julianDate - J2000) / 36525;
            const a = planet.a * 50; // Scale factor for semi-major axis (AU to pixels)
            const e = planet.e;
            const I = THREE.MathUtils.degToRad(planet.I);
            const L = planet.L + planet.rates.L * T;
            const longPeri = planet.longPeri + planet.rates.longPeri * T;
            const longNode = planet.longNode + planet.rates.longNode * T;

            let M = (L - longPeri) % 360;
            const M_rad = THREE.MathUtils.degToRad(M);
            let E = M_rad;
            let delta;
            do {
                delta = E - e * Math.sin(E) - M_rad;
                E -= delta / (1 - e * Math.cos(E));
            } while (Math.abs(delta) > 1e-6);

            const x_orb = a * (Math.cos(E) - e);
            const y_orb = a * Math.sqrt(1 - e ** 2) * Math.sin(E);

            const r = Math.sqrt(x_orb ** 2 + y_orb ** 2);
            const v = Math.atan2(y_orb, x_orb);

            const xeclip = r * (Math.cos(longNode) * Math.cos(v + longPeri - longNode) - Math.sin(longNode) * Math.sin(v + longPeri - longNode) * Math.cos(I));
            const yeclip = r * (Math.sin(longNode) * Math.cos(v + longPeri - longNode) + Math.cos(longNode) * Math.sin(v + longPeri - longNode) * Math.cos(I));
            /* const zeclip = r * (Math.sin(v + longPeri - longNode) * Math.sin(I)); */
            const zeclip = 0

            return { x: xeclip, y: yeclip, z: zeclip };
        }

        // Animation loop
        const clock = new THREE.Clock();
        function animate() {
            const delta = clock.getDelta();
            const julianDate = J2000 + (delta / 86400);

            backgroundPlane.quaternion.copy(camera.quaternion); // Aligns the plane with the camera's rotation without allowing it to rotate independently
    
            Object.keys(planets).forEach(planetName => {
                const position = computePlanetPosition(planetaryData[planetName], julianDate);
                planets[planetName].position.set(position.x, position.y, position.z);
                if(planetName === "saturn"){
                    
                    saturnRing.position.set(position.x, position.y, position.z); 

                    scene.add(saturnRing);
                }
                if(planetName === "uranus"){
                    
                    uranusRing.position.set(position.x, position.y, position.z);  

                    scene.add(uranusRing);
                } 
                const taille = Math.sqrt(position.x**2 + position.y**2) * 2;
                
                const ORBID01Geometry = new THREE.PlaneGeometry(taille, taille); 
                const ORBID01Material = new THREE.MeshBasicMaterial({
                    map: ORBID01Texture,
                    transparent: true,  
                    side: THREE.DoubleSide 
                });

                const ORBID = new THREE.Mesh(ORBID01Geometry, ORBID01Material);
                
                ORBID.position.set(0, 0, 0);  

                scene.add(ORBID); 
                  
            });

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

        animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });

        return () => {
            // Cleanup
            renderer.dispose();
            document.body.removeChild(renderer.domElement);
            window.removeEventListener('resize', () => {});
        };
    }, []);

    return null; // Since the rendering is done in the effect, we return null
};

export default SolarSystem;
