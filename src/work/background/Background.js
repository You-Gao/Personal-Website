import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Background = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        let scene, camera, renderer, model, controls;

        function init() {
            // Scene
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xffffff);

            // Camera
            camera = new THREE.PerspectiveCamera(1000, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 25, 100); // Zoom in on the board

            // Renderer 
            renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
            renderer.setSize(window.innerWidth, window.innerHeight);

            // Ambient Light
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);

            // Controls
            controls = new OrbitControls(camera, renderer.domElement);
            controls.target.set(0, 20, -400);
            
            // Lock orbit to just scroll (zoom)
            controls.enableRotate = false;
            controls.enablePan = false;

            // Close-up Model
            // Load the model
            const loader = new GLTFLoader();
            const modelPath = 'door.glb'; // Adjust this path if necessary
            console.log(`Loading model from path: ${modelPath}`);
            loader.load(modelPath, (gltf) => {
                model = gltf.scene;
                model.scale.set(30, 30, 30); // Scale the model by a factor of 30
                model.position.set(0, 0, 0); // Set the position of the model
                scene.add(model);
            });

            // Middle Model
            // Load the model
            const modelPath1 = 'door.glb'; // Adjust this path if necessary
            console.log(`Loading model from path: ${modelPath1}`);
            loader.load(modelPath1, (gltf) => {
                model = gltf.scene;
                model.scale.set(30, 30, 30); // Scale the model by a factor of 30
                model.position.set(0, 0, -200); // Set the position of the model
                scene.add(model);
            });

            // Far-away Model
            // Load the model
            const modelPath2 = 'door.glb'; // Adjust this path if necessary
            console.log(`Loading model from path: ${modelPath2}`);
            loader.load(modelPath2, (gltf) => {
                model = gltf.scene;
                model.scale.set(30, 30, 30); // Scale the model by a factor of 30
                model.position.set(0, 0, -400); // Set the position of the model
                scene.add(model);
            });

            // Render loop
            const animate = () => {
                requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera);
            };
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