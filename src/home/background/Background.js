import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './Background.css';

const Background = () => {
    const canvasRef = useRef(null);
    const fps = 30; // Set a valid frame rate
    const interval = 1000 / fps;
    let lastTime = 0;
    
    useEffect(() => {
        let scene, camera, renderer, model;
        let isAnimatingHome = true;

        function init() {
            // Create scene
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xffffff);

            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(.5, 0, 2.75); 
            
            renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
            renderer.setSize(window.innerWidth / 2, window.innerHeight / 1.65);

            // Darken Scene
            const ambientLight = new THREE.AmbientLight(0x404040);
            scene.add(ambientLight);


            // Add orbit controls
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
            controls.dampingFactor = 0.25;

            // 50 Particles at each angle rotating in a sphere
            const middle_sphere = new THREE.SphereGeometry(.8, 32, 32);
            const middle_material = new THREE.PointsMaterial({ color: 0xffffff, size: .2 });
            const middle_points = new THREE.Points(middle_sphere, middle_material);
            scene.add(middle_points);

            const particles_x = new THREE.Group();
            const particles_y = new THREE.Group();
            const particles_z = new THREE.Group();

            const particlesGeometry = new THREE.SphereGeometry(0.1, 32, 32);
            const particlesMaterial = new THREE.PointsMaterial({ color: 0x000000, size: 0.02 });
            for (let i = 0; i < 20; i++) {
                const particle = new THREE.Points(particlesGeometry, particlesMaterial);
                particle.position.x = Math.sin(i / 20 * Math.PI * 2) * 1.5;
                particle.position.y = Math.cos(i / 20 * Math.PI * 2) * 1.5;
                particle.position.z = 0;
                particles_x.add(particle);
            }
            scene.add(particles_x);
            for (let i = 0; i < 20; i++) {
                const particle = new THREE.Points(particlesGeometry, particlesMaterial);
                particle.position.x = Math.sin(i / 20 * Math.PI * 2) * 2;
                particle.position.y = 0;
                particle.position.z = Math.cos(i / 20 * Math.PI * 2) * 2;
                particles_y.add(particle);
            }
            scene.add(particles_y);
            for (let i = 0; i < 20; i++) {
                const particle = new THREE.Points(particlesGeometry, particlesMaterial);
                particle.position.x = 0;
                particle.position.y = Math.sin(i / 20 * Math.PI * 2) * 1.5;
                particle.position.z = Math.cos(i / 20 * Math.PI * 2) * 1.5;
                particles_z.add(particle);
            }
            scene.add(particles_z);

            // Deep Copies
            const particles_x_copy = particles_x.clone();
            const particles_y_copy = particles_y.clone();
            const particles_z_copy = particles_z.clone();

        // Function to handle window resize
        function onWindowResize() {
            // Update camera aspect ratio and projection matrix
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            // Update renderer size 
            renderer.setSize(window.innerWidth / 2 , window.innerHeight / 1.5);
        }

        // Add event listener for window resize
        window.addEventListener('resize', onWindowResize, false);

        // Animation loop
        // Render loop
        const animate = (time) => {
            if (isAnimatingHome) {
                requestAnimationFrame(animate);
                
                // Calculate the time difference
                const delta = time - lastTime;
                // If enough time has passed, render the frame
                if (delta > interval) {
                    // Spin the Middle Sphere
                    middle_points.rotation.x += 0.01;

                    // Update Rotations
                    particles_x.rotation.x += 0.03;
                    particles_x.rotation.z += 0.03;

                    particles_x_copy.rotation.x += 0.03;
                    particles_x_copy.rotation.y += 0.03;

                    particles_y.rotation.y += 0.03;

                    particles_y_copy.rotation.y += 0.03;
                    particles_y_copy.rotation.z += 0.03;

                    particles_z.rotation.z += 0.03;
                    particles_z.rotation.x += 0.05;

                    lastTime = time - (delta % interval);        
                    controls.update();
                    renderer.render(scene, camera);
                }
            }
        };
            animate();
        }

        init();

        // Cleanup on component unmount
        return () => {
            isAnimatingHome = false;
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
                            object.material.forEach((material) => {
                                material.dispose();
                                if (material.map) {
                                    material.map.dispose();
                                }
                            });
                        } else {
                            object.material.dispose();
                            if (object.material.map) {
                                object.material.map.dispose();
                            }
                        }
                    }
                    if (object instanceof THREE.WebGLRenderTarget) {
                        object.dispose();
                    }
                });
            }
        };
    }, []);

return (
    
<div>
    <div className="overlay-text">to-do: navbar styling, scroll indicator, add animations to home, social media icons?, finish work and about me</div>
    <div>   
    <table className="table-container">
        <tr > 
            <td className="table-cell" style={{ textAlign: 'right' }}>
                 <div ><h1 style={{textAlign: 'right'}}>hi i'm you.</h1></div>
                 <div ><h1 style={{textAlign: 'right'}}>minimal, sustainable,</h1></div>
                 <div ><h1 style={{textAlign: 'right', marginTop:  '-20px'}}>& yet effective</h1></div>

                <h2 style={{marginTop: '-15px'}}>^ my work motto</h2>
                <div style={{height: '20vh'}}>
                <p>in general, i like to:</p>
                <ul style={{marginTop:  '-23px'}}>
                    <li>make cool things</li>
                    <li>learn new things</li>
                    <li>help people</li>
                </ul>
                </div>

                <h2 style={{color: "grey"}}>have fun on my site!</h2>
                <h2 className="demonictransition" style={{color: "grey", marginTop: '-20px'}}>or else... ( jk )</h2>
            </td>
            <td className="table-cell">
                <canvas ref={canvasRef} />
                <h1>gaze into the sphere.</h1>
            </td>
        </tr>
    </table>
    </div>
</div>
);
};

export default Background;