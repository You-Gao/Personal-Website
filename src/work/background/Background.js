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
            camera.position.set(0, 25, 130); // Zoom in on the board

            renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
            renderer.setSize(window.innerWidth, window.innerHeight);

            controls = new OrbitControls(camera, renderer.domElement);
            controls.target.set(0, 25, 80);
            controls.enableRotate = true;
            controls.enablePan = false;
            controls.enableZoom = false;

            const fontLoader = new FontLoader();
            const textureLoader = new THREE.TextureLoader();
            const loader = new GLTFLoader();

            // Light
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
            scene.add(ambientLight);

            // ------------------------------------------------ House ------------------------------------------------


            // Floor
            const woodTexture = textureLoader.load('wood.jpg');
            woodTexture.wrapS = THREE.RepeatWrapping;
            woodTexture.wrapT = THREE.RepeatWrapping;
            woodTexture.repeat.set(1, 15); // Adjust the repeat values as needed
            const planeGeometry = new THREE.PlaneGeometry(200, 1000);
            const planeMaterial = new THREE.MeshBasicMaterial({ map: woodTexture, side: THREE.DoubleSide});
            const plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.position.set(0, 65, -300);
            plane.rotation.x = -Math.PI / 2;
            scene.add(plane);

            // Right Wall
            const wallTexture = textureLoader.load('office.jpg');
            wallTexture.wrapS = THREE.RepeatWrapping;
            wallTexture.wrapT = THREE.RepeatWrapping;
            wallTexture.repeat.set(1, 10); // Adjust the repeat values as needed
            const leftWallGeometry = new THREE.PlaneGeometry(1000, 120);
            const leftWallMaterial = new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.DoubleSide });
            const leftWall = new THREE.Mesh(leftWallGeometry, leftWallMaterial);
            leftWall.position.set(-100, 10, -300);
            leftWall.rotation.y = Math.PI / 2;
            scene.add(leftWall);

            // Left Wall
            const rightWallGeometry = new THREE.PlaneGeometry(1000, 120);
            const rightWallMaterial = new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.DoubleSide });
            const rightWall = new THREE.Mesh(rightWallGeometry, rightWallMaterial);
            rightWall.position.set(100, 10, -300);
            rightWall.rotation.y = Math.PI / 2;
            scene.add(rightWall);

            // Back Wall
            const backWallGeometry = new THREE.PlaneGeometry(200, 120);
            const backWallMaterial = new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.DoubleSide });
            const backWall = new THREE.Mesh(backWallGeometry, backWallMaterial);
            backWall.position.set(0, 10, 200);
            backWall.rotation.y = Math.PI;
            scene.add(backWall);


            // Ceiling
            const ceilingGeometry = new THREE.PlaneGeometry(200, 1200);
            const ceilingMaterial = new THREE.MeshBasicMaterial({ color: 0xFA9C21, side: THREE.DoubleSide });
            const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
            ceiling.position.set(0, -50, -300);
            ceiling.rotation.x = Math.PI / 2;
            scene.add(ceiling);

            // ------------------------------------------------ Rooms ------------------------------------------------

            function createWalls(numWalls) {
                for (let i = 0; i < numWalls; i++) {
                    // const doorwallTexture = textureLoader.load('wall.jpg');
                    // doorwallTexture.wrapS = THREE.RepeatWrapping;
                    // doorwallTexture.wrapT = THREE.RepeatWrapping;
                    // doorwallTexture.repeat.set(1, 10); // Adjust the repeat values as needed

                    // Left Door Wall
                    const leftDoorWallGeometry = new THREE.PlaneGeometry(70, 85);
                    const leftDoorWallMaterial = new THREE.MeshBasicMaterial({ color: 0xADD8E6, side: THREE.DoubleSide });
                    const leftDoorWall = new THREE.Mesh(leftDoorWallGeometry, leftDoorWallMaterial);
                    leftDoorWall.position.set(55, 30, 0 + i * -200);
                    leftDoorWall.rotation.z = Math.PI / 2;
                    scene.add(leftDoorWall);
            
                    // Right Door Wall
                    const rightDoorWallGeometry = new THREE.PlaneGeometry(70, 85);
                    const rightDoorWallMaterial = new THREE.MeshBasicMaterial({ color: 0xADD8E6, side: THREE.DoubleSide });
                    const rightDoorWall = new THREE.Mesh(rightDoorWallGeometry, rightDoorWallMaterial);
                    rightDoorWall.position.set(-55, 30, 0 + i * -200);
                    rightDoorWall.rotation.z = Math.PI / 2;
                    scene.add(rightDoorWall);
                    
                    // Middle Wall
                    const middleWallGeometry = new THREE.PlaneGeometry(47, 195);
                    const middleWallMaterial = new THREE.MeshBasicMaterial({ color: 0xADD8E6, side: THREE.DoubleSide });
                    const middleWall = new THREE.Mesh(middleWallGeometry, middleWallMaterial);
                    middleWall.position.set(0, -25, 0 + i * -200);
                    middleWall.rotation.z = Math.PI / 2;
                    scene.add(middleWall);


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

            // --- Test --- 
            const posters = [];
            const testPoser = new THREE.BoxGeometry(50, 50, 50);
            const testMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
            const test = new THREE.Mesh(testPoser, testMaterial);
            test.position.set(0, 0, 0);
            scene.add(test);
            const camera_position = { x: 0, y: 0, z: 70 }
            const controls_target = { x: 0, y: 10, z: 0 }
            posters.push({ mesh: test, target: camera_position, controls: controls_target });

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
                const boxGeometry = new THREE.BoxGeometry(5, 25, 25);
                const boxMaterial = new THREE.MeshBasicMaterial({ map: texture });
                const box = new THREE.Mesh(boxGeometry, boxMaterial);
                box.position.set(-100, -27, -175); // Adjust the position as needed
                scene.add(box);
            });

            // // Deliverables
            // const delivarablePath = "biomanufacturing.png"; // Adjust this path if necessary
            // textureLoader.load(delivarablePath, (texture) => {
            //     const boxGeometry = new THREE.BoxGeometry(175, 60, 5);
            //     const boxMaterial = new THREE.MeshBasicMaterial({ map: texture });
            //     const box = new THREE.Mesh(boxGeometry, boxMaterial);
            //     box.rotation.y = -Math.PI / 2;
            //     box.rotation.z = Math.PI;
            //     box.position.set(-100, 25, -100); // Adjust the position as needed
            //     scene.add(box);
            // });

            // Desk Placeholder
            const deskGeometry = new THREE.BoxGeometry(150, 25, 25);
            const deskMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
            const desk = new THREE.Mesh(deskGeometry, deskMaterial);
            desk.position.set(-80, 50, -100); // Adjust the position as needed
            desk.rotation.y = Math.PI / 2;
            scene.add(desk);


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

            // Desk Placeholder
            const deskGeometry1 = new THREE.BoxGeometry(150, 25, 25);
            const deskMaterial1 = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
            const desk1 = new THREE.Mesh(deskGeometry1, deskMaterial1);
            desk1.position.set(-80, 50, -300); // Adjust the position as needed
            desk1.rotation.y = Math.PI / 2;
            scene.add(desk1);

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

            // Desk Placeholder
            const deskGeometry2 = new THREE.BoxGeometry(150, 25, 25);
            const deskMaterial2 = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
            const desk2 = new THREE.Mesh(deskGeometry2, deskMaterial2);
            desk2.position.set(-80, 50, -500); // Adjust the position as needed
            desk2.rotation.y = Math.PI / 2;
            scene.add(desk2);

            // ----- Room 4 -----


            // --------------------------------------------------- Movement ---------------------------------------------------
            // Array of circle data
            const circlesData = [
                { color: 0xffff00, position: { x: 0, y: 50, z: -10 }, target: { x: 20, y: 25, z: -100, targetX: -10, targetY: 25, targetZ: -100 } },
                { color: 0xff0000, position: { x: 0, y: 50, z: -200 }, target: { x: 20, y: 25, z: -300, targetX: -10, targetY: 25, targetZ: -300 } },
                { color: 0x00ff00, position: { x: 0, y: 50, z: -400 }, target: { x: 20, y: 25, z: -500, targetX: -10, targetY: 25, targetZ: -500 } }
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
                const intersectCircles = raycaster.intersectObjects(circles.map(c => c.mesh));
                const intersectPosters = raycaster.intersectObjects(posters.map(p => p.mesh));

                if (intersectCircles.length > 0) {
                    const intersectedCircle = circles.find(c => c.mesh === intersectCircles[0].object);
                    if (intersectedCircle) {
                        console.log('Circle clicked!');
                        // Change camera position
                        gsap.to(camera.position, { duration: 1, x: intersectedCircle.target.x, y: intersectedCircle.target.y, z: intersectedCircle.target.z });
                        // Change orbital target
                        controls.target.set(intersectedCircle.target.targetX, intersectedCircle.target.targetY, intersectedCircle.target.targetZ);
                        controls.update();
                    }
                }
                if (intersectPosters.length > 0) {
                    const intersectedPoster = posters.find(p => p.mesh === intersectPosters[0].object);    
                    if (intersectedPoster) {
                        console.log('Poster clicked!');
                        // Change camera position
                        gsap.to(camera.position, { duration: 1, x: intersectedPoster.target.x, y: intersectedPoster.target.y, z: intersectedPoster.target.z });
                        // Change orbital target
                        controls.target.set(intersectedPoster.controls.x, intersectedPoster.controls.y, intersectedPoster.controls.z);
                        controls.enableRotate = false;
                        const square = document.createElement('div');
                        square.style.position = 'absolute';
                        square.style.top = '100px';
                        square.style.left = '100px';
                        square.style.width = '50px';
                        square.style.height = '50px';
                        square.style.backgroundColor = 'red';
                        square.onclick = () => {
                            console.log('Square clicked!');
                            controls.enableRotate = true;
                            document.body.removeChild(square);
                            camera.position.set(0, 25, 130);
                            controls.target.set(0, 25, 80);
                            controls.update();
                        };
                        document.body.appendChild(square);
                        controls.update();
                    }          
                }
            });

            // Function to move camera on arrow keys
            let isAnimating = false;

            function moveCamera(event) {
                if (isAnimating) return;
            
                isAnimating = true;
                const currentCameraPosition = camera.position;
                const currentTargetPosition = controls.target;
                const speed = 50;
            
                const onComplete = () => {
                    isAnimating = false;
                };
            
                switch (event.key) {
                    case 'ArrowUp':
                        gsap.to(currentCameraPosition, { duration: .5, x: 0, y: 25, z: currentCameraPosition.z - speed, onComplete });
                        controls.target.set(0, 25, currentTargetPosition.z - speed);
                        controls.update();
                        break;
                    case 'ArrowDown':
                        gsap.to(currentCameraPosition, { duration: .5, x: 0, y: 25, z: currentCameraPosition.z + speed, onComplete });
                        controls.target.set(0, 25, currentTargetPosition.z + speed);
                        controls.update();
                        break;
                    // Add cases for ArrowLeft and ArrowRight if needed
                }
            }

            // Add event listener for arrow keys
            window.addEventListener('keydown', moveCamera);

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
                console.log('Disposing renderer');
                renderer.dispose();
            }
            if (scene) {
                console.log('Disposing scene');
                scene.traverse((object) => {
                    if (object.geometry) {
                        object.geometry.dispose();
                    }
                    if (object.material) {
                        if (Array.isArray(object.material)) {
                            object.material.forEach((material) => material.dispose());
                        } else {
                            object.material.dispose();
                        }
                    }
                });
            }
        };
    }, []);

    return <canvas ref={canvasRef} />;
};

export default Background;