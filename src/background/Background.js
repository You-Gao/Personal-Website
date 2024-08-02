import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Background = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        let scene, camera, renderer, model;

        function init() {
            // Create scene
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xffffff); // Set background color to white

            // Create camera
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 10, 0); // Position the camera above the scene
            camera.lookAt(0, 0, 0);

            // Add light
            const light = new THREE.DirectionalLight(0xffffff, 10); // Increased intensity to 10
            light.position.set(0, 0, 1);
            scene.add(light);
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Added ambient light
            scene.add(ambientLight);

            // Create renderer
            renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
            renderer.setSize(window.innerWidth, window.innerHeight);

            // Load the model
            const loader = new GLTFLoader();
            const modelPath = 'yoshi.glb'; // Adjust this path if necessary
            console.log(`Loading model from path: ${modelPath}`);
            loader.load(modelPath, (gltf) => {
                model = gltf.scene;
                model.scale.set(30, 30, 30); // Scale the model by a factor of 30
                scene.add(model);
            });

            // Animation loop
            function animate() {
                requestAnimationFrame(animate);
                if (model) {
                    model.rotation.y += 0.01; // Rotate the model
                }
                renderer.render(scene, camera);
            }
            animate();
        }

        init();

        // Cleanup on component unmount
        return () => {
            if (renderer) {
                renderer.dispose();
            }
        };
    }, []);

    return <canvas ref={canvasRef} />;
};

export default Background;