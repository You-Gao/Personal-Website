import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Particles = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        let scene, camera, renderer, particleSystem;

        function init() {
            // Scene
            scene = new THREE.Scene();

            // Camera
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 5;

            // Renderer
            renderer = new THREE.WebGLRenderer({ alpha: true, canvas: canvasRef.current });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x000000, 0);

            // Particles
            const particleCount = 500;
            const particlesGeometry = new THREE.SphereGeometry();
            const particlesMaterial = new THREE.PointsMaterial({ color: 0x000000, size: 0.2 });

            const positions = new Float32Array(particleCount * 3);
            for (let i = 0; i < particleCount; i++) {
                positions[i * 3] = (Math.random() - 0.5) * 10;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
            }

            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
            scene.add(particleSystem);

            animate();
        }

        function animate() {
            requestAnimationFrame(animate);

            particleSystem.rotation.x += 0.001;

            renderer.render(scene, camera);
        }

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        init();

        return () => {
            window.removeEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        };
    }, []);

    return (
            <canvas ref={canvasRef} />
    );
};

export default Particles;