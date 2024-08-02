import React, { useState, useEffect } from 'react';
import Loading from './loading/Loading';
import Navbar from './navbar/Navbar';
import Background from './background/Background';
import './App.css'; 

function App() {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="App">
            {showContent ? (
            <>
                <div class="container_row">
                    <Background />
                    <Navbar />
                </div>
            </>
            ) : (
                <Loading />
            )}
        </div>
    );
}

export default App;