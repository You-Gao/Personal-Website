import React, { useState, useEffect, useRef } from 'react';
import Navbar from './navbar/Navbar';
import Background from './background/Background';
import LoadingBar from 'react-top-loading-bar';

const About = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const loadingBarRef = useRef(null);

    useEffect(() => {
        loadingBarRef.current.continuousStart();

        const handleLoad = () => {
            console.log('Loading...');
            loadingBarRef.current.complete();
            setTimeout(() => {
                setIsLoaded(true);
            }, 200); 
        };

        setTimeout(() => {
            handleLoad();
        }, 200);

        return () => {
        };
    }, []);

    return (
        <div className="About">
            <div className="outer" style={{ display: isLoaded ? 'block' : 'none' }}>
                <Navbar />
                <div className="bottom">
                    <Background />
                </div>
            </div>
            <LoadingBar color="#1f1f1f" ref={loadingBarRef}/>
        </div>
    );
}

export default About;