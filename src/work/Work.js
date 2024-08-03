import React, { useState, useEffect } from 'react';
import Navbar from './navbar/Navbar';
import Background from './background/Background';
import './Work.css';
function About() {
    return (
        <div className="About">
            <div class="outer">
                <Navbar />
                <div class="bottom">
                <Background />
                </div>
            </div>
        </div>
    );
}

export default About;