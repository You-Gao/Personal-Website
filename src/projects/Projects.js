import React, { useState, useEffect } from 'react';
import Navbar from './navbar/Navbar';
import Background from './background/Background';
import './Projects.css';
function About() {
    return (
        <div className="About">
            <Navbar />
            <Background />
        </div>
    );
}

export default About;