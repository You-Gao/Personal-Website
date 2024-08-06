import React, { useState, useEffect } from 'react';
import Loading from './loading/Loading';
import Navbar from './navbar/Navbar';
import Background from './background/Background';
import './Home.css'; 

function Home() {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="Home">
            {showContent ? (
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
                <Loading />
            )}
        </div>
    );
}

export default Home;