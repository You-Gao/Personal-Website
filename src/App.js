import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import About from './about/About';
import Work from './work/Work';
import './App.css'; 

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />
        </Routes>
    );
}

export default App;