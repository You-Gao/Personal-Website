import React, { useState, useEffect } from 'react';
import Navbar from './navbar/Navbar';
import Background from './background/Background';
import './About.css';
function About() {
    return (
        <div className="About">
                <Navbar />
                <Background />
        </div>
    );
}

export default About;