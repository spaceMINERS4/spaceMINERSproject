/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import axios from 'axios';
import starsTexture from '../../assets/Images/stars.jpg';
import asteroidTexture from '../../assets/Images/asteroid.jpg'; // Ensure correct path
//i imported these idk if i need them
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

// Import textures

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

const Asteroids = () => {
  const [asteroidData, setAsteroidData] = useState([]);

  useEffect(() => {
    // Fetch asteroid data from the API
    axios.get('https://data.nasa.gov/resource/b67r-rgxc.json')
      .then(response => {
        console.log('Fetched Asteroid Data:', response.data); // Log the asteroid data
        setAsteroidData(response.data); // Store the asteroid data
      })
      .catch(error => console.error('Error fetching asteroid data:', error));
  }, []);

  useEffect(() => {
    if (asteroidData.length === 0) return; // Ensure data is fetched

    // Set up Three.js scene, camera, renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000); // Adjusted FOV and far plane
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


    // Asteroid material
    const textureLoader = new THREE.TextureLoader();
    const sunGeo = new THREE.SphereGeometry(10, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({ map: textureLoader.load(sunTexture) });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);



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
    //const asteroidMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color for visibility
    const asteroidMaterial = new THREE.MeshBasicMaterial({ map: textureLoader.load(asteroidTexture) });
    
    // Create asteroid spheres and add to scene
    const asteroids = [];
    asteroidData.forEach((asteroid, index) => {
        const asteroidGeo = new THREE.SphereGeometry(Math.random() * 1.5 + 0.1, 32, 32); // Random radius for each asteroid
        const asteroidMesh = new THREE.Mesh(asteroidGeo, asteroidMaterial);
        const position = {
          x: (Math.random() - 0.5) * 200, // Random position within -200 to 200
          y: (Math.random() - 0.5) * 200, // Random position within -200 to 200
          z: (Math.random() - 0.5) * 200  // Random position within -200 to 200
        };

        asteroidMesh.position.set(position.x, position.y, position.z);
      scene.add(asteroidMesh);
      asteroids.push({ mesh: asteroidMesh, data: asteroid });

      console.log(`Asteroid ${index} added to scene with data:`, asteroid); // Log each asteroid added
    });

    // Function to compute asteroid position based on Keplerian elements
    function computeAsteroidPosition(asteroid, julianDate) {
        // Ensure essential data is available and valid
        const requiredFields = ['q_au_2', 'e', 'i_deg', 'w_deg', 'node_deg', 'tp_tdb', 'epoch_tdb'];
        for (let field of requiredFields) {
          if (!asteroid[field] || isNaN(parseFloat(asteroid[field]))) {
            console.error(`Invalid data for asteroid ${asteroid.object}:`, asteroid);
            return { x: NaN, y: NaN, z: NaN };
          }
        }
      
        const T = (julianDate - J2000) / 36525;
        const a = asteroid.q_au_2 * 50;  // Semi-major axis
        const e = parseFloat(asteroid.e);
        const I = THREE.MathUtils.degToRad(parseFloat(asteroid.i_deg));
        const longPeri = parseFloat(asteroid.w_deg);
        const longNode = parseFloat(asteroid.node_deg);
      
        // Mean anomaly calculation (simple approximation)
        let M = (parseFloat(asteroid.tp_tdb) - parseFloat(asteroid.epoch_tdb)) % 360;
        const M_rad = THREE.MathUtils.degToRad(M);
      
        // Solving Kepler's equation (Eccentric Anomaly)
        let E = M_rad;
        let delta;
        do {
          delta = E - e * Math.sin(E) - M_rad;
          E -= delta / (1 - e * Math.cos(E));
        } while (Math.abs(delta) > 1e-6);
      
        // Orbital coordinates
        const x_orb = a * (Math.cos(E) - e);
        const y_orb = a * Math.sqrt(1 - e ** 2) * Math.sin(E);
      
        // Convert orbital plane to 3D space
        const r = Math.sqrt(x_orb ** 2 + y_orb ** 2);
        const v = Math.atan2(y_orb, x_orb);
      
        const xeclip = r * (Math.cos(longNode) * Math.cos(v + longPeri - longNode) - Math.sin(longNode) * Math.sin(v + longPeri - longNode) * Math.cos(I));
        const yeclip = r * (Math.sin(longNode) * Math.cos(v + longPeri - longNode) + Math.cos(longNode) * Math.sin(v + longPeri - longNode) * Math.cos(I));
        const zeclip = r * (Math.sin(v + longPeri - longNode) * Math.sin(I));
      
        return { x: xeclip, y: yeclip, z: zeclip };
      }
      
    // Animation loop
    const clock = new THREE.Clock();
    function animate() {
      const delta = clock.getDelta();
      const speedFactor = 2;
      const julianDate = J2000 + (delta / 86400) * speedFactor;


      backgroundPlane.quaternion.copy(camera.quaternion);

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
      asteroids.forEach(({ mesh, data }, index) => {
        const position = computeAsteroidPosition(data, julianDate);
        mesh.position.set(position.x, position.y, position.z);

        // Rotate each asteroid
        mesh.rotation.x += 0.01; // Adjust speed as necessary
        mesh.rotation.y += 0.01; // Adjust speed as necessary
        
        console.log(`Asteroid ${index} position:`, position);  // Log the position
      });
      orbit.update(); // Update orbit controls in the render loop
    

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();

    // Handle window resize
    const onWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    return () => {
      // Cleanup
      renderer.dispose();
      document.body.removeChild(renderer.domElement);
      window.removeEventListener('resize', onWindowResize);
    };
  }, [asteroidData]);

  return null;
};

export default Asteroids;
