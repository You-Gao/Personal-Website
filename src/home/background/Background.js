import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './Background.css';

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
            camera.position.set(0, 0, 4.3); // Position the camera above the scene

            // Add light
            const light = new THREE.DirectionalLight(0xffffff, 10); // Increased intensity to 10
            light.position.set(0, 0, 1);
            scene.add(light);
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Added ambient light
            scene.add(ambientLight);

            // Create renderer
            renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
            renderer.setSize(window.innerWidth / 2, window.innerHeight / 1.5);

            // Add orbit controls
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
            controls.dampingFactor = 0.25;

            // Load the model
            // const loader = new GLTFLoader();
            // const modelPath = 'yoshi.glb'; // Adjust this path if necessary
            // console.log(`Loading model from path: ${modelPath}`);
            // loader.load(modelPath, (gltf) => {
            //     model = gltf.scene;
            //     model.scale.set(30, 30, 30); // Scale the model by a factor of 30
            //     scene.add(model);
            // });

            // 50 Particles at each angle rotating in a sphere
            const particles_x = new THREE.Group();
            const particles_y = new THREE.Group();
            const particles_z = new THREE.Group();

            const particlesGeometry = new THREE.SphereGeometry(0.1, 32, 32);
            const particlesMaterial = new THREE.PointsMaterial({ color: 0x000000, size: 0.01 });
            for (let i = 0; i < 50; i++) {
                const particle = new THREE.Points(particlesGeometry, particlesMaterial);
                particle.position.x = Math.sin(i / 50 * Math.PI * 2) * 3;
                particle.position.y = Math.cos(i / 50 * Math.PI * 2) * 2;
                particle.position.z = 0;
                particles_x.add(particle);
            }
            scene.add(particles_x);
            for (let i = 0; i < 50; i++) {
                const particle = new THREE.Points(particlesGeometry, particlesMaterial);
                particle.position.x = Math.sin(i / 50 * Math.PI * 2) * 3;
                particle.position.y = 0;
                particle.position.z = Math.cos(i / 50 * Math.PI * 2) * 3;
                particles_y.add(particle);
            }
            scene.add(particles_y);
            for (let i = 0; i < 50; i++) {
                const particle = new THREE.Points(particlesGeometry, particlesMaterial);
                particle.position.x = 0;
                particle.position.y = Math.sin(i / 50 * Math.PI * 2) * 2;
                particle.position.z = Math.cos(i / 50 * Math.PI * 2) * 3;
                particles_z.add(particle);
            }
            scene.add(particles_z);


        // Animation loop
        function animate() {
            requestAnimationFrame(animate); // Request the next frame
            controls.update(); // Update orbit controls
            
            // Rotate particles around the X axis
            particles_x.rotation.x += 0.01;
            // Rotate particles around the Y axis
            particles_y.rotation.y += 0.01;
            // Rotate particles around the Z axis
            particles_z.rotation.z += 0.01;

            renderer.render(scene, camera); // Render the scene with the camera
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

return (
    
<div>
    <div className="overlay-text">cool text near spinny wheel</div>
    <div className="overlay-text2">cool text under spinny wheel</div>
    <div>
    <table className="table-container">
        <tr > 
            <td className="table-cell" style={{ textAlign: 'right' }}>
                <h1> TEST TEST TEST </h1>
                <p>cool text near spinny wheel</p>
            </td>
            <td className="table-cell">
                <canvas ref={canvasRef} />
            </td>
        </tr>
    </table>
    </div>
</div>
);
};

export default Background;