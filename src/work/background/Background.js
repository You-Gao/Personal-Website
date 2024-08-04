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
            controls.enableZoom = false;

            const fontLoader = new FontLoader();
            const textureLoader = new THREE.TextureLoader();
            const loader = new GLTFLoader();

            // Light
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);

            // ------------------------------------------------ House ------------------------------------------------
            // Floor
            const woodTexture = textureLoader.load('wood.jpg');
            woodTexture.wrapS = THREE.RepeatWrapping;
            woodTexture.wrapT = THREE.RepeatWrapping;
            woodTexture.repeat.set(1, 10); // Adjust the repeat values as needed
            const planeGeometry = new THREE.PlaneGeometry(200, 1500);
            const planeMaterial = new THREE.MeshBasicMaterial({ map: woodTexture, side: THREE.DoubleSide });
            const plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.position.set(0, 65, 0);
            plane.rotation.x = Math.PI / 2;
            scene.add(plane);

            // Left Wall
            const wallTexture = textureLoader.load('office.jpg');
            wallTexture.wrapS = THREE.RepeatWrapping;
            wallTexture.wrapT = THREE.RepeatWrapping;
            wallTexture.repeat.set(1, 10); // Adjust the repeat values as needed
            const leftWallGeometry = new THREE.PlaneGeometry(1500, 200);
            const leftWallMaterial = new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.DoubleSide });
            const leftWall = new THREE.Mesh(leftWallGeometry, leftWallMaterial);
            leftWall.position.set(-100, 50, 0);
            leftWall.rotation.y = Math.PI / 2;
            scene.add(leftWall);

            // Right Wall
            const rightWallGeometry = new THREE.PlaneGeometry(1500, 200);
            const rightWallMaterial = new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.DoubleSide });
            const rightWall = new THREE.Mesh(rightWallGeometry, rightWallMaterial);
            rightWall.position.set(100, 50, 0);
            rightWall.rotation.y = Math.PI / 2;
            scene.add(rightWall);

            // Ceiling
            const ceilingGeometry = new THREE.PlaneGeometry(200, 1500);
            const ceilingMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
            const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
            ceiling.position.set(0, -50, 0);
            ceiling.rotation.x = Math.PI / 2;
            scene.add(ceiling);

            // ------------------------------------------------ Rooms ------------------------------------------------

            function createWalls(numWalls) {
                for (let i = 0; i < numWalls; i++) {
                    const wallTexture = textureLoader.load('wall.jpg');
                    wallTexture.wrapS = THREE.RepeatWrapping;
                    wallTexture.wrapT = THREE.RepeatWrapping;
                    wallTexture.repeat.set(1, 10); // Adjust the repeat values as needed

                    // Left Door Wall
                    const leftDoorWallGeometry = new THREE.PlaneGeometry(70, 115);
                    const leftDoorWallMaterial = new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.DoubleSide });
                    const leftDoorWall = new THREE.Mesh(leftDoorWallGeometry, leftDoorWallMaterial);
                    leftDoorWall.position.set(70, 30, 0 + i * -200);
                    leftDoorWall.rotation.z = Math.PI / 2;
                    scene.add(leftDoorWall);
            
                    // Right Door Wall
                    const rightDoorWallGeometry = new THREE.PlaneGeometry(70, 115);
                    const rightDoorWallMaterial = new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.DoubleSide });
                    const rightDoorWall = new THREE.Mesh(rightDoorWallGeometry, rightDoorWallMaterial);
                    rightDoorWall.position.set(-70, 30, 0 + i * -200);
                    rightDoorWall.rotation.z = Math.PI / 2;
                    scene.add(rightDoorWall);

                    // Middle Door Wall
                    const wallTexture2 = textureLoader.load('wall.jpg');
                    wallTexture2.wrapS = THREE.RepeatWrapping;
                    wallTexture2.wrapT = THREE.RepeatWrapping;
                    wallTexture2.repeat.set(1, 15); // Adjust the repeat values as needed
                    const middleDoorWallGeometry = new THREE.PlaneGeometry(50, 200);
                    const middleDoorWallMaterial = new THREE.MeshBasicMaterial({ map: wallTexture2, side: THREE.DoubleSide });
                    const middleDoorWall = new THREE.Mesh(middleDoorWallGeometry, middleDoorWallMaterial);
                    middleDoorWall.position.set(0, 30, 0 + i * -200);
                    middleDoorWall.position.y = -25;
                    middleDoorWall.rotation.z = Math.PI / 2;
                    scene.add(middleDoorWall);


                }
            }
            
            function createDoors(numDoors) {
                for (let i = 0; i < numDoors; i++) {
                    // Load Model
                    const modelPath_e = 'door.glb'; // Adjust this path if necessary
                    console.log(`Loading model from path: ${modelPath_e}`);
                    loader.load(modelPath_e, (gltf) => {
                        model = gltf.scene;
                        model.scale.set(30, 30, 30); // Scale the model by a factor of 30
                        model.position.set(0, 0, 0 + i * -200); // Set the position of the model
                        scene.add(model);
                    });
                }
            }

            createWalls(4);
            createDoors(4);

            // --- Room 1 ---

            // Text
            fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
            const textGeometry = new TextGeometry('Tessera Therapeutics', {
                font: font,
                size: 10,
                height: 1,
                curveSegments: 12,
                bevelEnabled: false
            });
            const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
            const text = new THREE.Mesh(textGeometry, textMaterial);
            text.position.set(-100, -30, -155);
            text.rotation.x = Math.PI;
            text.rotation.y = Math.PI / 2;
            scene.add(text);

            const textGeometry2 = new TextGeometry('Biomanufacturing Intern', {
                font: font,
                size: 10,
                height: 1,
                curveSegments: 12,
                bevelEnabled: false
            });
            const textMaterial2 = new THREE.MeshBasicMaterial({ color: 0x000000 });
            const text2 = new THREE.Mesh(textGeometry2, textMaterial2);
            text2.position.set(-100, -15, -155);
            text2.rotation.x = Math.PI;
            text2.rotation.y = Math.PI / 2;
            scene.add(text2);
            });

            // Logo
            const texturePath = 'tessera.png'; // Adjust this path if necessary
            textureLoader.load(texturePath, (texture) => {
                const boxGeometry = new THREE.BoxGeometry(25, 25, 25);
                const boxMaterial = new THREE.MeshBasicMaterial({ map: texture });
                const box = new THREE.Mesh(boxGeometry, boxMaterial);
                box.position.set(-110, -27, -175); // Adjust the position as needed
                scene.add(box);
            });

            // Deliverables
            const delivarablePath = "biomanufacturing.png"; // Adjust this path if necessary
            textureLoader.load(delivarablePath, (texture) => {
                const boxGeometry = new THREE.BoxGeometry(175, 60, 30);
                const boxMaterial = new THREE.MeshBasicMaterial({ map: texture });
                const box = new THREE.Mesh(boxGeometry, boxMaterial);
                box.rotation.y = -Math.PI / 2;
                box.rotation.z = Math.PI;
                box.position.set(-110, 25, -100); // Adjust the position as needed
                scene.add(box);
            });


            // --- Room 2 ---

            // Text
            fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
                const textGeometry = new TextGeometry('Fallahi-Sichani Lab', {
                    font: font,
                    size: 10,
                    height: 1,
                    curveSegments: 12,
                    bevelEnabled: false
                });
                const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
                const text = new THREE.Mesh(textGeometry, textMaterial);
                text.position.set(-100, -30, -355);
                text.rotation.x = Math.PI;
                text.rotation.y = Math.PI / 2;
                scene.add(text);

                const textGeometry2 = new TextGeometry('BME Research Assistant', {
                    font: font,
                    size: 10,
                    height: 1,
                    curveSegments: 12,
                    bevelEnabled: false
                });
                const textMaterial2 = new THREE.MeshBasicMaterial({ color: 0x000000 });
                const text2 = new THREE.Mesh(textGeometry2, textMaterial2);
                text2.position.set(-100, -15, -355);
                text2.rotation.x = Math.PI;
                text2.rotation.y = Math.PI / 2;
                scene.add(text2);
            });

            // Logo
            const texturePath1 = 'uva_bme.jpg'; // Adjust this path if necessary
            textureLoader.load(texturePath1, (texture) => {
                const boxGeometry = new THREE.BoxGeometry(25, 25, 25);
                const boxMaterial = new THREE.MeshBasicMaterial({ map: texture });
                const box = new THREE.Mesh(boxGeometry, boxMaterial);
                // flip the logo
                box.rotation.z = Math.PI;
                box.position.set(-110, -27, -375); // Adjust the position as needed
                scene.add(box);
            });

            // --- Room 3 ---

            // Text
            fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
                const textGeometry = new TextGeometry('Kinsale Insurance', {
                    font: font,
                    size: 10,
                    height: 1,
                    curveSegments: 12,
                    bevelEnabled: false
                });
                const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
                const text = new THREE.Mesh(textGeometry, textMaterial);
                text.position.set(-100, -30, -555);
                text.rotation.x = Math.PI;
                text.rotation.y = Math.PI / 2;
                scene.add(text);

                const textGeometry2 = new TextGeometry('Summer DevOps Intern', {
                    font: font,
                    size: 10,
                    height: 1,
                    curveSegments: 12,
                    bevelEnabled: false
                });
                const textMaterial2 = new THREE.MeshBasicMaterial({ color: 0x000000 });
                const text2 = new THREE.Mesh(textGeometry2, textMaterial2);
                text2.position.set(-100, -15, -555);
                text2.rotation.x = Math.PI;
                text2.rotation.y = Math.PI / 2;
                scene.add(text2);
            });

            // Logo
            const texturePath3 = 'kinsale.png'; // Adjust this path if necessary
            textureLoader.load(texturePath3, (texture) => {
                const boxGeometry = new THREE.BoxGeometry(25, 25, 25);
                const boxMaterial = new THREE.MeshBasicMaterial({ map: texture });
                const box = new THREE.Mesh(boxGeometry, boxMaterial);
                box.position.set(-110, -27, -575); // Adjust the position as needed
                scene.add(box);
            });

            // ----- Room 4 -----


            // --------------------------------------------------- Movement ---------------------------------------------------
            // Array of circle data
            const circlesData = [
                { color: 0xffff00, position: { x: 0, y: 50, z: -10 }, target: { x: 0, y: 25, z: -100, targetX: -20, targetY: 25, targetZ: -100 } },
                { color: 0xff0000, position: { x: 0, y: 50, z: -200 }, target: { x: 0, y: 25, z: -300, targetX: -20, targetY: 25, targetZ: -300 } },
                { color: 0x00ff00, position: { x: 0, y: 50, z: -400 }, target: { x: 0, y: 25, z: -500, targetX: -20, targetY: 25, targetZ: -500 } }
            ];

            // Create circles and add to the scene
            const circles = [];
            circlesData.forEach(data => {
                const circleGeometry = new THREE.CircleGeometry(5, 32);
                const circleMaterial = new THREE.MeshBasicMaterial({ color: data.color, side: THREE.DoubleSide });
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

            // Function to handle window resize
            function onWindowResize() {
                // Update camera aspect ratio and projection matrix
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                // Update renderer size
                renderer.setSize(window.innerWidth, window.innerHeight);
            }

            // Add event listener for window resize
            window.addEventListener('resize', onWindowResize, false);

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