import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Loading.css';

const LoadingAnimation = () => {
    const [showGradient, setShowGradient] = useState(true);
    const nameRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGradient(false);
        }, 2000); // 2 seconds in milliseconds

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!showGradient) {
            gsap.fromTo(nameRef.current, { opacity: 0 }, { opacity: 1, duration: 2 });
        }
    }, [showGradient]);

    return (
        <div className={`loader-container ${showGradient ? 'gradient' : ''}`}>
            {!showGradient && (
                <div className="loader">
                    <h1 ref={nameRef}>TESTING TESTING 123</h1>
                </div>
            )}
        </div>
    );
};

export default LoadingAnimation;