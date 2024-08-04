import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import gsap from 'gsap';

const Background = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        let scene, camera, renderer, model, controls;

        function init() {
            // Scene, Camera + Controls, Renderer
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xffffff);

            camera = new THREE.PerspectiveCamera(1000, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 25, -90); // Zoom in on the board

            renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
            renderer.setSize(window.innerWidth, window.innerHeight);

            controls = new OrbitControls(camera, renderer.domElement);
            controls.target.set(0, 25, -100);
            controls.enableRotate = true;
            controls.enablePan = false;


            // Light
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);

            // --- Models --- 
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

            // Add a basic circle to the scene
            const circleGeometry = new THREE.CircleGeometry(5, 32);
            const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
            const circle = new THREE.Mesh(circleGeometry, circleMaterial);
            circle.position.set(0, 0, -150); // Set the position of the circle
            scene.add(circle);

            // Raycaster for detecting clicks
            const raycaster = new THREE.Raycaster();
            const mouse = new THREE.Vector2();

            // Add event listener for click
            renderer.domElement.addEventListener('click', (event) => {
                // Calculate mouse position in normalized device coordinates
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

                // Update the raycaster with the camera and mouse position
                raycaster.setFromCamera(mouse, camera);

                // Calculate objects intersecting the ray
                const intersects = raycaster.intersectObjects([circle]);

                if (intersects.length > 0) {
                    // Change camera position
                    gsap.to(camera.position, { duration: 1, x: 0, y: 25, z: -290 });
                    // Change orbital target
                    controls.target.set(0, 25, -300);
                    controls.update();
                }
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