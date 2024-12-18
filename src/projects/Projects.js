import React, { useState, useEffect } from 'react';
import Navbar from './navbar/Navbar';
import Background from './background/Background';
import './Projects.css';
import LoadingBar from 'react-top-loading-bar';
import { useRef } from 'react';

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
            }, 250); 
        };

        setTimeout(() => {
            handleLoad();
        }, 250);

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