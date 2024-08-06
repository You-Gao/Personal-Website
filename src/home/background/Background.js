import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './Background.css';
import gsap from 'gsap';   

const Background = () => {
    const canvasRef = useRef(null);
    const fps = 30; // Set a valid frame rate
    const interval = 1000 / fps;
    let lastTime = 0;
    const headingRef = useRef(null);
    const mottoRef = useRef(null);
    const likesRef = useRef(null);
    const bottomRef = useRef(null);
    const sphereRef = useRef(null);
    const image1Ref = useRef(null);
    const image2Ref = useRef(null);
    const image3Ref = useRef(null);

    useEffect(() => {
        let scene, camera, renderer, model;
        let isAnimatingHome = true;

        gsap.fromTo(canvasRef.current, { opacity: 0}, { opacity: 1, duration: 2, delay: .7, ease: 'power2.inOut' });
        gsap.fromTo(headingRef.current, { opacity: 0, y: -100}, { y:0, opacity: 1, duration: 2, delay: 1, ease: 'power2.inOut' });
        gsap.fromTo(mottoRef.current, { opacity: 0, x: -100}, { x:0, opacity: 1, duration: 2, delay: 1.5, ease: 'power2.inOut' });
        gsap.fromTo(likesRef.current, { opacity: 0, x: -100}, { x:0, opacity: 1, duration: 2, delay: 2, ease: 'power2.inOut' });
        gsap.fromTo(bottomRef.current, { opacity: 0, y: 100}, { y:0, opacity: 1, duration: 2, delay: 2.5, ease: 'power2.inOut' });
        gsap.fromTo(image1Ref.current, { opacity: 0, y: 100}, { y:0, opacity: 1, duration: 2, delay: 3, ease: 'power2.inOut' });
        gsap.fromTo(image2Ref.current, { opacity: 0, y: 75}, { y:0, opacity: 1, duration: 2, delay: 3.25, ease: 'power2.inOut' });
        gsap.fromTo(image3Ref.current, { opacity: 0, y: 50}, { y:0, opacity: 1, duration: 2, delay: 3.5, ease: 'power2.inOut' });
        gsap.fromTo(sphereRef.current, { opacity: 0}, { opacity: 1, duration: 2, delay: 4, ease: 'power2.inOut' });
        
        gsap.to([sphereRef.current], {
            color: '#ffffff', // Target color
            duration: 1,
            repeat: 6,
            yoyo: true,
            ease: 'power2.inOut',
            onComplete: () => {
                gsap.to([sphereRef.current], {
                    color: '#000000', // Set back to black
                    duration: 1,
                    ease: 'power2.inOut'
                });
            }
        });

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
    <div className="overlay-text">to-do: responsive to screen, finish work and about me</div>
    <div>   
    <table className="table-container">
        <tr > 
            <td className="table-cell" style={{ textAlign: 'right' }}>
                 <div ><h1 ref={headingRef} style={{textAlign: 'right'}}>hi i'm you.</h1></div>
                 <div ref={mottoRef} >
                 <h2 className="dynamic-margin-head" style={{color: "grey"}}>my work philosophy:</h2>
                 <h1 style={{textAlign: 'right', marginTop: '-20px'}}>minimal, sustainable,</h1>
                 <h1 style={{textAlign: 'right', marginTop:  '-20px'}}>pragmatic & effective</h1>
                 </div>


                <div ref={likesRef}>
                <h2 style={{color: "grey"}}>i'm dedicated to:</h2>
                <ul style={{marginTop:  '-25px'}}>
                    <li><h1 style={{margin: '0', marginTop: '-5px'}}>making cool things</h1></li>
                    <li><h1 style={{margin: '0', marginTop: '-5px'}}>learning new stuff</h1></li>
                    <li><h1 style={{margin: '0', marginTop: '-5px'}}>helping people</h1></li>
                </ul>
                </div>

                <div ref={bottomRef}>
                <h2 className="dynamic-margin" style={{textAlign: 'right', color: "grey"}}>stay connected!</h2>
                <div style={{display: 'flex', justifyContent: 'right'}}>
                    <a href="https://www.linkedin.com/in/gao-you/" target="_blank" rel="noreferrer">
                    <img ref={image1Ref} style={{height: '75px', width: '75px', margin: '0 10px'}} src="linked_logo.png" alt="Image 1"/>
                    </a>
                    <a href="https://www.github.com/you-gao/" target="_blank" rel="noreferrer">
                    <img ref={image2Ref} style={{height: '75px', width: '75px', margin: '0 10px'}} src="github_logo.png" alt="Image "/>
                    </a>
                    <a href="https://stackoverflow.com/users/26650867/you-gao" target="_blank" rel="noreferrer">
                    <img ref={image3Ref} style={{height: '75px', width: '75px'}} src="stack_logo.png" alt="Image 3"/>
                    </a>
                </div>
                </div>
            </td>
            <td className="table-cell">
                <canvas ref={canvasRef} />
                <h1 style={{textAlign: 'center'}} ref={sphereRef}>gaze into the sphere.</h1>
            </td>
        </tr>
    </table>
    </div>
</div>
);
};

export default Background;