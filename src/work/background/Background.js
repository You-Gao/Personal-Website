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
            // ------------------------------------------------ Setup ------------------------------------------------
            // Scene, Camera + Controls, Renderer
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xffffff);

            camera = new THREE.PerspectiveCamera(1000, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 25, 50); // Zoom in on the board

            renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
            renderer.setSize(window.innerWidth, window.innerHeight);

            controls = new OrbitControls(camera, renderer.domElement);
            controls.target.set(0, 25, 0);
            controls.enableRotate = true;
            controls.enablePan = false;


            // Light
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);

            // ------------------------------------------------ Rooms ------------------------------------------------
            // Plane at 0
            const planeGeometry = new THREE.PlaneGeometry(100, 1000);
            const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
            const plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.position.set(0, 65, 0);
            plane.rotation.x = Math.PI / 2;
            scene.add(plane);
            

            // Close-up Model
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
            const modelPath1 = 'door.glb'; // Adjust this path if necessary
            console.log(`Loading model from path: ${modelPath1}`);
            loader.load(modelPath1, (gltf) => {
                model = gltf.scene;
                model.scale.set(30, 30, 30); // Scale the model by a factor of 30
                model.position.set(0, 0, -200); // Set the position of the model
                scene.add(model);
            });

            // Far-away Model
            const modelPath2 = 'door.glb'; // Adjust this path if necessary
            console.log(`Loading model from path: ${modelPath2}`);
            loader.load(modelPath2, (gltf) => {
                model = gltf.scene;
                model.scale.set(30, 30, 30); // Scale the model by a factor of 30
                model.position.set(0, 0, -400); // Set the position of the model
                scene.add(model);
            });


            // --------------------------------------------------- Movement ---------------------------------------------------
            // Array of circle data
            const circlesData = [
                { color: 0xffff00, position: { x: 0, y: 50, z: -10 }, target: { x: 0, y: 25, z: -100, targetX: 0, targetY: 25, targetZ: -110 } },
                { color: 0xff0000, position: { x: 0, y: 50, z: -200 }, target: { x: 0, y: 25, z: -300, targetX: 0, targetY: 25, targetZ: -310 } },
                { color: 0x00ff00, position: { x: 0, y: 50, z: -400 }, target: { x: 0, y: 25, z: -500, targetX: 0, targetY: 25, targetZ: -510 } }
            ];

            // Create circles and add to the scene
            const circles = [];
            circlesData.forEach(data => {
                const circleGeometry = new THREE.CircleGeometry(5, 32);
                const circleMaterial = new THREE.MeshBasicMaterial({ color: data.color });
                const circle = new THREE.Mesh(circleGeometry, circleMaterial);
                circle.position.set(data.position.x, data.position.y, data.position.z);
                scene.add(circle);
                circles.push({ mesh: circle, target: data.target });
            });

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
                const intersects = raycaster.intersectObjects(circles.map(c => c.mesh));

                if (intersects.length > 0) {
                    const intersectedCircle = circles.find(c => c.mesh === intersects[0].object);
                    if (intersectedCircle) {
                        // Change camera position
                        gsap.to(camera.position, { duration: 1, x: intersectedCircle.target.x, y: intersectedCircle.target.y, z: intersectedCircle.target.z });
                        // Change orbital target
                        controls.target.set(intersectedCircle.target.targetX, intersectedCircle.target.targetY, intersectedCircle.target.targetZ);
                        controls.update();
                    }
                }
            });

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