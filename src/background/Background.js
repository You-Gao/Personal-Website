import React, { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Background = () => {
    useEffect(() => {
        let scene, camera, renderer, model;

        function init() {
            // Create scene
            scene = new THREE.Scene();

            // Create camera
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 10, 0); // Position the camera above the scene
            camera.lookAt(0, 0, 0); //

            // Add light
            const light = new THREE.DirectionalLight(0xffffff, 10); // Increased intensity to 2
            light.position.set(0, 0, 1);
            scene.add(light);

            // Create renderer
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            // Load the model
            const loader = new GLTFLoader();
            const modelPath = 'yoshi.glb'; // Adjust this path if necessary
            console.log(`Loading model from path: ${modelPath}`);
            loader.load(modelPath, (gltf) => {
                model = gltf.scene;
                model.scale.set(30, 30, 30); // Scale the model by a factor of 2
                scene.add(model);
                console.log('Model loaded successfully');
            }, undefined, (error) => {
                console.error('Error loading model:', error);
            });

            // Start animation loop
            animate();
        }

        function animate() {
            requestAnimationFrame(animate);

            // Only horizontally rotate the model
            if (model) {
                model.rotation.y += 0.01;
            }
            // Render the scene
            renderer.render(scene, camera);
        }

        // Handle window resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Initialize the scene
        init();

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            document.body.removeChild(renderer.domElement);
        };
    }, []);

    return null;
};

export default Background;