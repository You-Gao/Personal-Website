import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Loading.css';

const LoadingAnimation = () => {
    const nameRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(nameRef.current, { opacity: 0 }, { opacity: 1, duration: 2 });
    }, []);

    return (
        <div className="loader-container">
            <div className="loader">
                <h1 ref={nameRef}>TESTING TESTING 123</h1>
            </div>
        </div>
    );
};

export default LoadingAnimation;