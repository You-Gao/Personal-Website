import React, { useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    const navbar_container = document.querySelector('.navbar-container');
    let isFadedOut = false;
    let interval;
    
    const yesClick = () => {
      if (navbar) {
        navbar_container.classList.remove('no-click');
      }
    }

    const noClick = () => {
      if (navbar) {
        navbar_container.classList.add('no-click');
        setTimeout(yesClick, 4000);
      }
    }

    const fadeOut = () => {
      if (navbar) {
        navbar.classList.add('fade-out');
        navbar_container.classList.add('no-click');
        noClick();
        isFadedOut = true;
      }
    };

    const fadeIn = () => {
      if (navbar) {
        navbar.classList.remove('fade-out');
        isFadedOut = false;
        clearInterval(interval); // Clear the fadeOut interval when hovered
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
        <div class="navbar-container">
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