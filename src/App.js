import React, { useState, useEffect } from 'react';
import Loading from './loading/Loading';
import Navbar from './navbar/Navbar';
import Background from './background/Background';
import './App.css'; 

function App() {
    const [isLoading, setIsLoading] = useState(true);

    // Simulate loading completion after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 10000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="App">
            
            <Background />
            {/* Other components and content */}
            
        </div>
    );
}

export default App;