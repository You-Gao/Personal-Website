import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Background = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        let scene, camera, renderer, board, controls;

        function init() {
            // Scene
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xffffff);

            // Camera
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 0, 10); // Zoom in on the board

            // Renderer
            renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
            renderer.setSize(window.innerWidth, window.innerHeight);

            // Board
            // const geometry = new THREE.PlaneGeometry(15, 15);
            // const material = new THREE.MeshStandardMaterial();
            // board = new THREE.Mesh(geometry, material);
            // board.rotation.x = -Math.PI / 2; // Rotate to lay flat
            // scene.add(board);

            // Ambient Light
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);

            // Load Font and Create Text
            const loader = new FontLoader();
            loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
                
                // Line 1
                const textGeometry = new TextGeometry('Hello This is My Personal Website', {
                    font: font,
                    size: 1,
                    height: 0.2,
                });
                const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
                const textMesh = new THREE.Mesh(textGeometry, textMaterial);
                textMesh.position.set(-10, 0.1, 0); // Adjust position as needed
                scene.add(textMesh);
                
                // Line 2
                const textGeometry2 = new TextGeometry('Testing Testing 123', {
                    font: font,
                    size: 1,
                    height: 0.2,
                });
                const textMaterial2 = new THREE.MeshStandardMaterial({ color: 0xffff00 });
                const textMesh2 = new THREE.Mesh(textGeometry2, textMaterial2);
                textMesh2.position.set(-10, -2, 0); // Adjust position as needed
                scene.add(textMesh2);

                // Line 3
                const textGeometry3 = new TextGeometry('This is a test', {
                    font: font,
                    size: 1,
                    height: 0.2,
                });
                const textMaterial3 = new THREE.MeshStandardMaterial({ color: 0xffff00 });
                const textMesh3 = new THREE.Mesh(textGeometry3, textMaterial3);
                textMesh3.position.set(-10, -4, 0); // Adjust position as needed
                scene.add(textMesh3);

            });

            // Controls
            controls = new OrbitControls(camera, renderer.domElement);

            // Render loop
            const animate = () => {
                requestAnimationFrame(animate);
                controls.update();
                renderer.render(scene, camera);
            };
            animate();
        };

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