import React, { useState, useEffect } from 'react';
import Loading from './loading/Loading';
import Navbar from './navbar/Navbar';
import Background from './background/Background';
import './Home.css'; 
import LoadingBar from 'react-top-loading-bar';
import { useRef } from 'react'; 
import { hashHistory } from 'react-router-dom';

function Home() {
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
        }, 25);

        return () => {
        };
    }, []);
    return (
        <div className="Home">
            {isLoaded ? (
                <>
                    <div class="outer">
                        <Navbar />
                        <div class="bottom">
                        <Background />
                        </div>
                        <div class="bottom noclick">
                        </div>
                    </div>

                </>
            ) : (
                <LoadingBar color="#1f1f1f" ref={loadingBarRef}/>
            )}
        </div>
    );
}

export default Home;