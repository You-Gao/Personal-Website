import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const Navbar = () => {
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    const navbar_container = document.querySelector('.navbar-container');
    let isFadedOut = false;
    let interval;

    const fadeOut = () => {
      if (navbar) {
        gsap.to(navbar, { opacity: 0, duration: .5 });
        isFadedOut = true;
      }
    };

    const fadeIn = () => {
      if (navbar) {
        gsap.fromTo(navbar, { opacity: 0 }, { opacity: 1, duration: .5 });
        isFadedOut = false;
        clearInterval(interval);
        interval = setInterval(fadeOut, 4000);
      }
    };

    // Call fadeIn on component mount
    fadeIn();

    interval = setInterval(fadeOut, 4000);

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
    <div className="navbar-container">
        <nav className="navbar" style={{opacity:'0'}}>
            <div className="navbar-links">
                <div><Link to="/work">Work</Link></div>
                <div><Link to="/projects">[Projects]</Link></div>
            </div>
            <div className="navbar-logo">
                <Link to="/">You Gao</Link>
            </div>
            <div className="navbar-links">
                <div><Link to="/about">About Me</Link></div>
                <div><a href="https://blog.yougao.dev/">To Blog</a></div>
            </div>
        </nav>
    </div>
);
};

export default Navbar;