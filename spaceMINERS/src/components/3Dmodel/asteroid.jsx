import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Papa from 'papaparse';

// Import textures
import starsTexture from '../../assets/Images/stars.jpg';
import sunTexture from '../../assets/Images/sun.jpg';
import asteroidTexture from '../../assets/Images/asteroid.jpg';

// Constants
const J2000 = 2451545.0;

const NEOVisualization = () => {
    useEffect(() => {
        // Set up scene, camera, and renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
        const orbit = new OrbitControls(camera, renderer.domElement);
        camera.position.set(0, 100, 300);
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
        const textureLoader = new THREE.TextureLoader();
        const sunGeo = new THREE.SphereGeometry(16, 32, 32);
        const sunMat = new THREE.MeshBasicMaterial({ map: textureLoader.load(sunTexture) });
        const sun = new THREE.Mesh(sunGeo, sunMat);
        scene.add(sun);

        // Function to compute asteroid position based on Keplerian elements
        function computeAsteroidPosition(asteroid, julianDate) {
            const T = (julianDate - J2000) / 36525;
            const a = asteroid.a * 50;
            const e = asteroid.e;
            const I = THREE.MathUtils.degToRad(asteroid.i);
            const longNode = THREE.MathUtils.degToRad(asteroid.om);
            const longPeri = THREE.MathUtils.degToRad(asteroid.w);
            let M = 0;
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
            const zeclip = r * (Math.sin(v + longPeri - longNode) * Math.sin(I));

            return { x: xeclip, y: yeclip, z: zeclip };
        }

        const asteroids = []; // To hold asteroid data

        // Load CSV file (assuming you have the data in a file named 'asteroids.csv')
        Papa.parse("random_rows.csv", {
            header: true,
            download: true,
            complete: function(results) {
                results.data.forEach(data => {
                    const asteroid = {
                        full_name: data.full_name,
                        a: parseFloat(data.a),
                        e: parseFloat(data.e),
                        i: parseFloat(data.i),
                        om: parseFloat(data.om),
                        w: parseFloat(data.w),
                        q: parseFloat(data.q)
                    };
                    asteroids.push(asteroid);
                });

                // Compute and display positions
                asteroids.forEach(asteroid => {
                    const position = computeAsteroidPosition(asteroid, J2000);
                    const asteroidGeometry = new THREE.SphereGeometry(1, 32, 32);
                    const asteroidMaterial = new THREE.MeshStandardMaterial({ 
                        map: textureLoader.load(asteroidTexture)
                    });
                    const asteroidMesh = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
                    asteroidMesh.position.set(position.x, position.y, position.z);
                    asteroidMesh.full_name = asteroid.full_name;
                    scene.add(asteroidMesh);
                });
            }
        });

        // Animation loop
        const clock = new THREE.Clock();
        function animate() {
            const delta = clock.getDelta();
            const julianDate = J2000 + (delta / 86400);

            // Update positions of the asteroids
            asteroids.forEach(asteroid => {
                const position = computeAsteroidPosition(asteroid, julianDate);
                const asteroidMesh = scene.children.find(child => child.full_name === asteroid.full_name);
                if (asteroidMesh) {
                    asteroidMesh.position.set(position.x, position.y, position.z);
                }
            });

            orbit.update(); // Update controls
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

        animate();

        // Handle window resize
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            // Cleanup
            renderer.dispose();
            document.body.removeChild(renderer.domElement);
            window.removeEventListener('resize', handleResize);
            scene.children.forEach(child => {
                if (child instanceof THREE.Mesh) {
                    child.geometry.dispose();
                    child.material.dispose();
                    scene.remove(child);
                }
            });
        };
    }, []);

    return null; // Since the rendering is done in the effect, we return null
};

export default NEOVisualization;
