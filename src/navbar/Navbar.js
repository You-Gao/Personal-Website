import React, { useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    let isFadedOut = false;
    let interval;

    const fadeOut = () => {
      if (navbar) {
        navbar.classList.add('fade-out');
        isFadedOut = true;
      }
    };

    const fadeIn = () => {
      if (navbar) {
        navbar.classList.remove('fade-out');
        isFadedOut = false;
        clearInterval(interval); // Clear the interval when hovered
        interval = setInterval(fadeOut, 2000); // Restart the interval
      }
    };

    interval = setInterval(fadeOut, 2000); // Initial fade-out after 3 seconds

    if (navbar) {
      navbar.addEventListener('mouseover', fadeIn);
    }

    return () => {
      clearInterval(interval); // Cleanup the interval on component unmount
      if (navbar) {
        navbar.removeEventListener('mouseover', fadeIn);
      }
    };
  }, []);
    return (
        <div>
            <nav className="navbar">
                <div className="navbar-links">
                    <div><a href="/home">Work</a></div>
                    <div><a href="/about">Projects</a></div>
                </div>
                <div className="navbar-logo">
                    <a href="/">You Gao</a>
                </div>
                <div className="navbar-links">
                    <div><a href="/services">About Me</a></div>
                    <div><a href="https://blog.yougao.dev/">To Blog</a></div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;