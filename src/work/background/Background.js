import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { CameraHelper } from 'three';

import gsap from 'gsap';

const Background = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        let scene, camera, renderer, model, controls;
        let isAnimatingWork = true;
        function init() {
            // ------------------------------------------------ Setup ------------------------------------------------
            // Scene, Camera + Controls, Renderer
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xffffff);

            camera = new THREE.PerspectiveCamera(1000, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 25, 100); // Zoom in on the board

            renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
            renderer.setSize(window.innerWidth, window.innerHeight);

            controls = new OrbitControls(camera, renderer.domElement);
            controls.target.set(1, 25, 100);
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

            // --- Starting Room --- 
            const posters = [];

            // const room1poster = new THREE.PlaneGeometry(50, 50);
            // const room1Material = new THREE.MeshBasicMaterial({ color: 0x000000 });
            // const room1 = new THREE.Mesh(room1poster, room1Material);
            // room1.position.set(-55, 0, 5);
            // const room1_camera_position = { x: -55, y: 0, z: 50 }
            // const room1_controls_target = { x: -55, y: 0, z: 5 }
            // scene.add(room1);
            // posters.push({ mesh: room1, target: room1_camera_position, controls: room1_controls_target });


            const uvaPosterTexture = textureLoader.load('uva_poster.png');
            const room1poster = new THREE.PlaneGeometry(50, 50);
            const room1Material = new THREE.MeshBasicMaterial({ map: uvaPosterTexture });
            const room1 = new THREE.Mesh(room1poster, room1Material);
            room1.position.set(-55, 0, 5);
            room1.rotation.x = Math.PI;
            room1.rotation.y = Math.PI;

            const passawayTexture = textureLoader.load('passaway.jpg');
            const room2poster = new THREE.PlaneGeometry(50, 50);
            const room2Material = new THREE.MeshBasicMaterial({ map: passawayTexture });
            const room2 = new THREE.Mesh(room2poster, room2Material);
            room2.position.set(55, 0, 5);
            room2.rotation.x = Math.PI;
            room2.rotation.y = Math.PI;


            scene.add(room1);
            scene.add(room2);
            // Add Text
            fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
                // Right Wall
                const textGeometry = new TextGeometry('Welcome to my Exhibit!', {
                    font: font,
                    size: 10,
                    height: 1,
                    curveSegments: 12,
                    bevelEnabled: false
                });
                const textMaterial = new THREE.MeshBasicMaterial({ color: 0xFA9C21 });
                const text = new THREE.Mesh(textGeometry, textMaterial);
                text.position.set(100,-30,175);
                text.rotation.x = Math.PI;
                text.rotation.y = Math.PI / -2;
                scene.add(text);

                const text2Geometry = new TextGeometry('"Career as Rooms"', {
                    font: font,
                    size: 9,
                    height: 1,
                    curveSegments: 12,
                    bevelEnabled: false
                });
                const text2Material = new THREE.MeshBasicMaterial({ color: 0xADD8E6 });
                const text2 = new THREE.Mesh(text2Geometry, text2Material);
                text2.position.set(100,-15,150);
                text2.rotation.x = Math.PI;
                text2.rotation.y = Math.PI / -2;
                scene.add(text2);

                const disclaimerGeometry = new TextGeometry('(drag to look around)', {
                    font: font,
                    size: 9,
                    height: 1,
                    curveSegments: 12,
                    bevelEnabled: false
                });
                const disclaimerMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
                const disclaimer = new THREE.Mesh(disclaimerGeometry, disclaimerMaterial);
                disclaimer.position.set(100,40,160);
                disclaimer.rotation.x = Math.PI;
                disclaimer.rotation.y = Math.PI / -2;
                scene.add(disclaimer);

                // const acknowledgementsGeometry = new TextGeometry('many thanks to the inventor of water', {
                //     font: font,
                //     size: 7,
                //     height: 1,
                //     curveSegments: 12,
                //     bevelEnabled: false
                //
                // const acknowledgementsMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
                // const acknowledgements = new THREE.Mesh(acknowledgementsGeometry, acknowledgementsMaterial);
                // acknowledgements.position.set(100,5,180);
                // acknowledgements.rotation.x = Math.PI;
                // acknowledgements.rotation.y = Math.PI / -2;
                // scene.add(acknowledgements);

                // Visitors Guide
                const text3Geometry = new TextGeometry("Visitor's Guide:", {
                    font: font,
                    size: 10,
                    height: 1,
                    curveSegments: 12,
                    bevelEnabled: false
                });
                const text3Material = new THREE.MeshBasicMaterial({ color: 0xFA9C21 });
                const text3 = new THREE.Mesh(text3Geometry, text3Material);
                text3.position.set(-90, -30, 200);
                text3.rotation.x = -Math.PI;
                scene.add(text3);

                const text4Geometry = new TextGeometry('tap arrow keys to move', {
                    font: font,
                    size: 8,
                    height: 1,
                    curveSegments: 12,
                    bevelEnabled: false
                });
                const text4Material = new THREE.MeshBasicMaterial({ color: 0xADD8E6 });
                const text4 = new THREE.Mesh(text4Geometry, text4Material);
                text4.position.set(-80, -15, 200);
                text4.rotation.x = -Math.PI;
                scene.add(text4);

                const text5Geometry = new TextGeometry('or click the signs above doors', {
                    font: font,
                    size: 8,
                    height: 1,
                    curveSegments: 12,
                    bevelEnabled: false
                });
                const text5Material = new THREE.MeshBasicMaterial({ color: 0xADD8E6 });
                const text5 = new THREE.Mesh(text5Geometry, text5Material);
                text5.position.set(-80, -5, 200);
                text5.rotation.x = -Math.PI;
                scene.add(text5);

                const text6Geometry = new TextGeometry('< > to move towards posters', {
                    font: font,
                    size: 8,
                    height: 1,
                    curveSegments: 12,
                    bevelEnabled: false
                });
                const text6Material = new THREE.MeshBasicMaterial({ color: 0xADD8E6 });
                const text6 = new THREE.Mesh(text6Geometry, text6Material);
                text6.position.set(-80, 10, 200);
                text6.rotation.x = -Math.PI;
                scene.add(text6);

                const text7Geometry = new TextGeometry('please stay within bounds', {
                    font: font,
                    size: 8,
                    height: 1,
                    curveSegments: 12,
                    bevelEnabled: false
                });
                const text7Material = new THREE.MeshBasicMaterial({ color: 0xADD8E6 });
                const text7 = new THREE.Mesh(text7Geometry, text7Material);
                text7.position.set(-80, 30, 200);
                text7.rotation.x = -Math.PI;
                scene.add(text7);

                const text8Geometry = new TextGeometry('enjoy your visit!', {
                    font: font,
                    size: 8,
                    height: 1,
                    curveSegments: 12,
                    bevelEnabled: false
                });
                const text8Material = new THREE.MeshBasicMaterial({ color: 0xADD8E6 });
                const text8 = new THREE.Mesh(text8Geometry, text8Material);
                text8.position.set(-80, 50, 200);
                text8.rotation.x = -Math.PI;
                scene.add(text8);
                
                const OutOfBounds  = new THREE.MeshBasicMaterial({ color: 0x000000 });
                const oobGeometry = new TextGeometry('There is nothing out here', {
                    font: font,
                    size: 13,
                    height: 1,
                    curveSegments: 12,
                    bevelEnabled: false
                });
                const oob = new THREE.Mesh(oobGeometry, OutOfBounds);
                oob.position.set(-120, 0, 350);
                oob.rotation.x = -Math.PI;
                scene.add(oob);

                // Left Wall
                const uvaGeometry = new TextGeometry('University of Virginia', {
                    font: font,
                    size: 10,
                    height: 1,
                    curveSegments: 12,
                    bevelEnabled: false
                });
                const uvaMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
                const uva = new THREE.Mesh(uvaGeometry, uvaMaterial);
                uva.position.set(-100, -30, 40);
                uva.rotation.x = Math.PI;
                uva.rotation.y = Math.PI / 2;
                scene.add(uva);

                const yearGeometry = new TextGeometry('2022-2026', {
                    font: font,
                    size: 10,
                    height: 1,
                    curveSegments: 12,
                    bevelEnabled: false
                });
                const yearMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
                const year = new THREE.Mesh(yearGeometry, yearMaterial);
                year.position.set(-100, -15, 70);
                year.rotation.x = Math.PI;
                year.rotation.y = Math.PI / 2;
                scene.add(year);
                
                // Desk Placeholder
                const deskGeometry = new THREE.BoxGeometry(150, 25, 25);
                const deskMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
                const desk = new THREE.Mesh(deskGeometry, deskMaterial);
                desk.position.set(-80, 50, 100); // Adjust the position as needed
                desk.rotation.y = Math.PI / 2;
                scene.add(desk);

            });
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

            
            // Year
            const year = new TextGeometry('2023', {
                font: font,
                size: 13,
                height: 1,
                curveSegments: 12,
                bevelEnabled: false
            });
            const yearMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
            const yearText = new THREE.Mesh(year, yearMaterial);
            yearText.position.set(-25, 60, -120);
            yearText.rotation.x = Math.PI / 2;
            yearText.rotation.z = Math.PI / 2;
            scene.add(yearText);
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

            // Desk Placeholder
            const deskGeometry = new THREE.BoxGeometry(150, 25, 25);
            const deskMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
            const desk = new THREE.Mesh(deskGeometry, deskMaterial);
            desk.position.set(-80, 50, -100); // Adjust the position as needed
            desk.rotation.y = Math.PI / 2;
            scene.add(desk);

            // Back Image
            const rawmathTexture = textureLoader.load('rawmath.png');
            const backGeometry = new THREE.PlaneGeometry(200, 120);
            const backMaterial = new THREE.MeshBasicMaterial({ map: rawmathTexture, side: THREE.DoubleSide });
            const back = new THREE.Mesh(backGeometry, backMaterial);
            back.position.set(98, 5, -100);
            back.rotation.x = Math.PI;
            back.rotation.y = -Math.PI / 2;
            scene.add(back);

            // Right Wall Image
            const paidTexture = textureLoader.load('paid.png');
            const rightGeometry = new THREE.PlaneGeometry(50, 50);
            const rightMaterial = new THREE.MeshBasicMaterial({ map: paidTexture, side: THREE.DoubleSide });
            const right = new THREE.Mesh(rightGeometry, rightMaterial);
            right.position.set(-55, 5, -5);
            right.rotation.x = Math.PI;
            scene.add(right);

            const simpsonsTexture = textureLoader.load('simpson.jpg');
            const simpsonsGeometry = new THREE.PlaneGeometry(50, 50);
            const simpsonsMaterial = new THREE.MeshBasicMaterial({ map: simpsonsTexture, side: THREE.DoubleSide });
            const simpsons = new THREE.Mesh(simpsonsGeometry, simpsonsMaterial);
            simpsons.position.set(55, 5, -5);
            simpsons.rotation.x = Math.PI;
            scene.add(simpsons);


            // Left Wall Image
            const leftTexture = textureLoader.load('pfd.jpg');
            const leftGeometry = new THREE.PlaneGeometry(50, 50);
            const leftMaterial = new THREE.MeshBasicMaterial({ map: leftTexture, side: THREE.DoubleSide });
            const left = new THREE.Mesh(leftGeometry, leftMaterial);
            left.position.set(-55, 5, -195);
            left.rotation.x = Math.PI;
            left.rotation.y = Math.PI;
            scene.add(left);

            const scadaTexture = textureLoader.load('scada.png');
            const scadaGeometry = new THREE.PlaneGeometry(50, 50);
            const scadaMaterial = new THREE.MeshBasicMaterial({ map: scadaTexture, side: THREE.DoubleSide });
            const scada = new THREE.Mesh(scadaGeometry, scadaMaterial);
            scada.position.set(55, 5, -195);
            scada.rotation.x = Math.PI;
            scada.rotation.y = Math.PI;
            scene.add(scada);



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

                // Year
                const year = new TextGeometry('2023', {
                    font: font,
                    size: 13,
                    height: 1,
                    curveSegments: 12,
                    bevelEnabled: false
                });
                const yearMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
                const yearText = new THREE.Mesh(year, yearMaterial);
                yearText.position.set(-25, 60, -320);
                yearText.rotation.x = Math.PI / 2;
                yearText.rotation.z = Math.PI / 2;
                scene.add(yearText);

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

            // Back Image
            const posterTexture = textureLoader.load('poster.png');
            const posterGeometry = new THREE.PlaneGeometry(200, 120);
            const posterMaterial = new THREE.MeshBasicMaterial({ map: posterTexture, side: THREE.DoubleSide });
            const poster = new THREE.Mesh(posterGeometry, posterMaterial);
            poster.position.set(98, 5, -300);
            poster.rotation.x = Math.PI;
            poster.rotation.y = -Math.PI / 2;
            scene.add(poster);

            // Right Wall Image
            const labTexture = textureLoader.load('lab.jpg');
            const labGeometry = new THREE.PlaneGeometry(50, 50);
            const labMaterial = new THREE.MeshBasicMaterial({ map: labTexture, side: THREE.DoubleSide });
            const lab = new THREE.Mesh(labGeometry, labMaterial);
            lab.position.set(-55, 5, -205);
            lab.rotation.x = -Math.PI;
            lab.rotation.y = 2*Math.PI;
            scene.add(lab);

            const lab2Texture = textureLoader.load('lorax.png');
            const lab2Geometry = new THREE.PlaneGeometry(50, 50);
            const lab2Material = new THREE.MeshBasicMaterial({ map: lab2Texture, side: THREE.DoubleSide });
            const lab2 = new THREE.Mesh(lab2Geometry, lab2Material);
            lab2.position.set(55, 5, -205);
            lab2.rotation.x = -Math.PI;
            lab2.rotation.y = 2*Math.PI;
            scene.add(lab2);
            
            // Left Wall Image
            const lab3Texture = textureLoader.load('datasci.jpg');
            const lab3Geometry = new THREE.PlaneGeometry(50, 50);
            const lab3Material = new THREE.MeshBasicMaterial({ map: lab3Texture, side: THREE.DoubleSide });
            const lab3 = new THREE.Mesh(lab3Geometry, lab3Material);
            lab3.position.set(-55, 5, -395);
            lab3.rotation.x = -Math.PI;
            lab3.rotation.y = Math.PI;
            scene.add(lab3);

            const lab4Texture = textureLoader.load('models.jpg');
            const lab4Geometry = new THREE.PlaneGeometry(50, 50);
            const lab4Material = new THREE.MeshBasicMaterial({ map: lab4Texture, side: THREE.DoubleSide });
            const lab4 = new THREE.Mesh(lab4Geometry, lab4Material);
            lab4.position.set(55, 5, -395);
            lab4.rotation.x = -Math.PI;
            lab4.rotation.y = Math.PI;
            scene.add(lab4);



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

                // Year
                const year = new TextGeometry('2024', {
                    font: font,
                    size: 13,
                    height: 1,
                    curveSegments: 12,
                    bevelEnabled: false
                });
                const yearMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
                const yearText = new THREE.Mesh(year, yearMaterial);
                yearText.position.set(-25, 60, -520);
                yearText.rotation.x = Math.PI / 2;
                yearText.rotation.z = Math.PI / 2;
                scene.add(yearText);

                const OutOfBounds  = new THREE.MeshBasicMaterial({ color: 0x000000 });
                const oobGeometry = new TextGeometry('What will the', {
                    font: font,
                    size: 13,
                    height: 1,
                    curveSegments: 12,
                    bevelEnabled: false
                });
                const oob = new THREE.Mesh(oobGeometry, OutOfBounds);
                oob.position.set(50, 0, -800);
                // oob.rotation.x = -Math.PI;
                oob.rotation.z = Math.PI;
                scene.add(oob);

                const OutOfBounds2  = new THREE.MeshBasicMaterial({ color: 0x000000 });
                const oobGeometry2 = new TextGeometry('future hold?', {
                    font: font,
                    size: 13,
                    height: 1,
                    curveSegments: 12,
                    bevelEnabled: false
                });
                const oob2 = new THREE.Mesh(oobGeometry2, OutOfBounds2);
                oob2.position.set(50, 20, -800);
                // oob2.rotation.x = -Math.PI;
                oob2.rotation.z = Math.PI;
                scene.add(oob2);

                const OutOfBounds3  = new THREE.MeshBasicMaterial({ color: 0x000000 });
                const oobGeometry3 = new TextGeometry('*cough* hire me', {
                    font: font,
                    size: 13,
                    height: 1,
                    curveSegments: 12,
                    bevelEnabled: false
                });
                const oob3 = new THREE.Mesh(oobGeometry3, OutOfBounds3);
                oob3.position.set(70, 50, -800);
                // oob3.rotation.x = -Math.PI;
                oob3.rotation.z = Math.PI;
                scene.add(oob3);
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

            // Back Image
            const backendTexture = textureLoader.load('backend.png');
            const backendGeometry = new THREE.PlaneGeometry(200, 120);
            const backendMaterial = new THREE.MeshBasicMaterial({ map: backendTexture, side: THREE.DoubleSide });
            const backend = new THREE.Mesh(backendGeometry, backendMaterial);
            backend.position.set(98, 10, -500);
            backend.rotation.x = Math.PI;
            backend.rotation.y = -Math.PI / 2;
            scene.add(backend);

            // Right Wall Image
            const comicTexture = textureLoader.load('comicstrip.jpg');
            const comicGeometry = new THREE.PlaneGeometry(50, 50);
            const comicMaterial = new THREE.MeshBasicMaterial({ map: comicTexture, side: THREE.DoubleSide });
            const comic = new THREE.Mesh(comicGeometry, comicMaterial);
            comic.position.set(55, 5, -405);
            comic.rotation.x = -Math.PI;
            comic.rotation.y = 2*Math.PI;
            scene.add(comic);

            const dockerTexture = textureLoader.load('docker.png');
            const dockerGeometry = new THREE.PlaneGeometry(50, 50);
            const dockerMaterial = new THREE.MeshBasicMaterial({ map: dockerTexture, side: THREE.DoubleSide });
            const docker = new THREE.Mesh(dockerGeometry, dockerMaterial);
            docker.position.set(-55, 5, -405);
            docker.rotation.x = -Math.PI;
            scene.add(docker);

            const comic2Texture = textureLoader.load('dev.jpg');
            const comic2Geometry = new THREE.PlaneGeometry(50, 50);
            const comic2Material = new THREE.MeshBasicMaterial({ map: comic2Texture, side: THREE.DoubleSide });
            const comic2 = new THREE.Mesh(comic2Geometry, comic2Material);
            comic2.position.set(55, 5, -595);
            comic2.rotation.x = -Math.PI;
            comic2.rotation.y = Math.PI;
            scene.add(comic2);

            const docker2Texture = textureLoader.load('cloud.jpg');
            const docker2Geometry = new THREE.PlaneGeometry(50, 50);
            const docker2Material = new THREE.MeshBasicMaterial({ map: docker2Texture, side: THREE.DoubleSide });
            const docker2 = new THREE.Mesh(docker2Geometry, docker2Material);
            docker2.position.set(-55, 5, -595);
            docker2.rotation.x = -Math.PI;
            docker2.rotation.y = Math.PI;
            scene.add(docker2);




            // ----- Room 4 -----


            // --------------------------------------------------- Movement ---------------------------------------------------
            // Array of circle data
            const greenData = [
                { color: 0xffff00, position: { x: 0, y: -20, z: 1 }, target: { x: 20, y: 25, z: -100, targetX: -10, targetY: 25, targetZ: -100 } },
                { color: 0xff0000, position: { x: 0, y: -20, z: -199 }, target: { x: 20, y: 25, z: -300, targetX: -10, targetY: 25, targetZ: -300 } },
                { color: 0x00ff00, position: { x: 0, y: -20, z: -399 }, target: { x: 20, y: 25, z: -500, targetX: -10, targetY: 25, targetZ: -500 } }
            ];
            const upArrowTexture = textureLoader.load('uparrow.png');
            // Create planes and add to the scene
            const g_arrows = [];
            greenData.forEach(data => {
                const squareGeometry = new THREE.PlaneGeometry(20, 20); // Ensure it's a square
                const squareMaterial = new THREE.MeshBasicMaterial({ map: upArrowTexture, transparent: true });
                const square = new THREE.Mesh(squareGeometry, squareMaterial);
                square.position.set(data.position.x, data.position.y, data.position.z);
                square.rotation.x = Math.PI;
                square.rotation.y = Math.PI;
                scene.add(square);
                g_arrows.push({ mesh: square, target: data.target });
            });

            const redData = [
                { color: 0xffff00, position: { x: 0, y: -20, z: -1 },  target: { x: 0, y: 25, z: 150, targetX: 0, targetY: 25, targetZ: 100 } },
                { color: 0xff0000, position: { x: 0, y: -20, z: -209 }, target: { x: 20, y: 25, z: -100, targetX: -10, targetY: 25, targetZ: -100 }},
                { color: 0x00ff00, position: { x: 0, y: -20, z: -409 }, target: { x: 20, y: 25, z: -300, targetX: -10, targetY: 25, targetZ: -300 }  }
            ];
            const downTexture = textureLoader.load('downarrow.png');
            // Create planes and add to the scene
            const r_arrows = [];
            redData.forEach(data => {
                const squareGeometry = new THREE.PlaneGeometry(20, 20); // Ensure it's a square
                const squareMaterial = new THREE.MeshBasicMaterial({ map: downTexture, transparent: true });
                const square = new THREE.Mesh(squareGeometry, squareMaterial);
                square.position.set(data.position.x, data.position.y, data.position.z);
                square.rotation.y = -Math.PI;
                scene.add(square);
                r_arrows.push({ mesh: square, target: data.target });
            });

            // Raycaster for detecting clicks
            const raycaster = new THREE.Raycaster();
            const mouse = new THREE.Vector2();
            let isAnimating = false;

            const onComplete = () => {
                isAnimating = false;
            };

            // Add event listener for click
            renderer.domElement.addEventListener('click', (event) => {
                // Calculate mouse position in normalized device coordinates
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

                // Update the raycaster with the camera and mouse position
                raycaster.setFromCamera(mouse, camera);

                // Calculate objects intersecting the ray
                const intersectGArrows = raycaster.intersectObjects(g_arrows.map(c => c.mesh));
                const intersectRArrows = raycaster.intersectObjects(r_arrows.map(c => c.mesh));
                const intersectPosters = raycaster.intersectObjects(posters.map(p => p.mesh));
                
                if (intersectGArrows.length > 0) {
                    const intersectGArrow = g_arrows.find(c => c.mesh === intersectGArrows[0].object);
                    if (intersectGArrow) {
                        console.log('Circle clicked!');
                        // Change camera position
                        gsap.to(camera.position, { duration: 1, x: intersectGArrow.target.x, y: intersectGArrow.target.y, z: intersectGArrow.target.z });
                        // Change orbital target
                        controls.target.set(intersectGArrow.target.targetX, intersectGArrow.target.targetY, intersectGArrow.target.targetZ);
                        controls.update();
                    }
                }
                if (intersectRArrows.length > 0) {
                    const intersectRArrow = r_arrows.find(c => c.mesh === intersectRArrows[0].object);
                    if (intersectRArrow) {
                        console.log('Circle clicked!');
                        // Change camera position
                        gsap.to(camera.position, { duration: 1, x: intersectRArrow.target.x, y: intersectRArrow.target.y, z: intersectRArrow.target.z });
                        // Change orbital target
                        controls.target.set(intersectRArrow.target.targetX, intersectRArrow.target.targetY, intersectRArrow.target.targetZ);
                        controls.update();
                    }
                }
                // if (intersectPosters.length > 0) {
                //     const intersectedPoster = posters.find(p => p.mesh === intersectPosters[0].object);    
                //     if (intersectedPoster) {
                //         console.log('Poster clicked!');
                //         isAnimating = true;
                //         // Change camera position
                //         gsap.to(camera.position, { duration: .1, x: intersectedPoster.target.x, y: intersectedPoster.target.y, z: intersectedPoster.target.z, onComplete});
                //         // Change orbital target
                //         controls.target.set(intersectedPoster.controls.x, intersectedPoster.controls.y, intersectedPoster.controls.z);
                //         controls.enableRotate = false;
                //         controls.update();
                //             if (!document.getElementById('backButton')) {
                //                 const square = document.createElement('div');
                //                 square.id = 'backButton'; // Assign an id to the div
                //                 square.style.position = 'absolute';
                //                 square.style.top = '100px';
                //                 square.style.left = '100px';
                //                 square.style.width = '50px';
                //                 square.style.height = '50px';
                //                 // square.style.backgroundColor = 'red';
                //                 square.style.whiteSpace = 'nowrap'; // No text wrap
                //                 square.style.fontSize = '40px'; // Increase font size
                //                 square.style.fontWeight = 'bold'; // Make text bold
                //                 square.innerText = '<-- Back'; // Add text to the div
                        
                //                 square.onclick = () => {
                //                     if (isAnimating) {
                //                         console.log('isAnimating is true');
                //                         return; // Skip the rest of the function if isAnimating is true
                //                     }
                //                     console.log('Square clicked!');
                //                     isAnimating = true; // Set isAnimating to true at the start of the animation
                //                     controls.enableRotate = true;
                //                     gsap.to(camera.position, {
                //                         duration: 1,
                //                         x: 0,
                //                         y: 25,
                //                         z: 100,
                //                         onComplete: () => {
                //                             controls.target.set(0, 25, 100);
                //                             controls.update();
                //                             document.body.removeChild(square);
                //                             isAnimating = false;
                //                         }
                //                     }); 
                //                 };
                //                 document.body.appendChild(square);
                //             }
                //         }
                //     }

            });

            // Function to move camera on arrow keys

            function moveCamera(event) {
                if (isAnimating) return;
            
                isAnimating = true;
                const currentCameraPosition = camera.position;
                const currentTargetPosition = controls.target;
                const speed = 25;
            
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
                    case 'ArrowLeft':
                        gsap.to(currentCameraPosition, { duration: .5, x: currentCameraPosition.x + speed, y: 0 , z: currentCameraPosition.z, onComplete });
                        controls.target.set(currentTargetPosition.x + speed, 0, currentTargetPosition.z);
                        controls.update();
                        break;
                    case 'ArrowRight':
                        gsap.to(currentCameraPosition, { duration: .5, x: currentCameraPosition.x - speed, y: 0 , z: currentCameraPosition.z, onComplete });   
                        controls.target.set(currentTargetPosition.x - speed, 0, currentTargetPosition.z);
                        controls.update();
                        break;
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
            if (isAnimatingWork) {
                requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera);

                }
            };
            animate();
            }



        init();

        // Cleanup on component unmount
        return () => {
            isAnimatingWork = false;
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