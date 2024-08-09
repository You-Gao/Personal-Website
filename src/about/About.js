import React, { useState, useEffect } from 'react';
import Navbar from './navbar/Navbar';
import Background from './background/Background';
import LoadingBar from 'react-top-loading-bar';
import { useRef } from 'react';
import './About.css';

function About() {
    const [isLoaded, setIsLoaded] = useState(false);
    const loadingBarRef = useRef(null);

    useEffect(() => {
        loadingBarRef.current.continuousStart();

        const handleLoad = () => {
            console.log('Loading...');
            loadingBarRef.current.complete();
            setTimeout(() => {
                setIsLoaded(true);
            }, 1000); 
        };

        setTimeout(() => {
            handleLoad();
        }, 500);

        return () => {
        };
    }, []);

    return (
        <div className="About">
            {isLoaded ? (
                <>
                    <Navbar />
                    <Background />
                </>
            ) : (
                <LoadingBar color="#1f1f1f" ref={loadingBarRef}/>
            )}
        </div>
    );
}

export default About;