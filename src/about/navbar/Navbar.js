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
        interval = setInterval(fadeOut, 2000);
      }
    };

    // Call fadeIn on component mount
    fadeIn();

    interval = setInterval(fadeOut, 2000);

    if (navbar) {
      navbar.addEventListener('mouseover', fadeIn);
    }

    
    const links = document.querySelectorAll('.navbar-links div');

    const addBrackets = (event) => {
      const div = event.target;
      const textNode = div.firstChild;
      if (textNode && textNode.nodeType === Node.TEXT_NODE) {
        if (textNode.textContent.includes("About")) return;
        textNode.textContent = `[${textNode.textContent}]`;
        console.log(textNode.textContent);
        div.style.color = 'grey';
      }
    };
    
    const removeBrackets = (event) => {
      const div = event.target;
      const textNode = div.firstChild;
      if (textNode && textNode.nodeType === Node.TEXT_NODE) {
        if (textNode.textContent.includes("About")) return;
        textNode.textContent = textNode.textContent.replace(/^\[|\]$/g, '');
        console.log(textNode.textContent);
        div.style.color = 'black';
      }
    };

    if (navbar) {
      links.forEach(link => {
        link.addEventListener('mouseover', addBrackets);
        link.addEventListener('mouseout', removeBrackets);
      });
    }
    
    return () => {
      clearInterval(interval); // Cleanup the interval on component unmount
      if (navbar) {
        navbar.removeEventListener('mouseover', fadeIn);
        links.forEach(link => {
          link.removeEventListener('mouseover', addBrackets);
          link.removeEventListener('mouseout', removeBrackets);
        });
      }
    };
  }, []);

  return (
    <div className="navbar-container">
        <nav className="navbar" style={{opacity:'0'}}>
            <div className="navbar-links">
                <div><Link to="/work">Work</Link></div>
                <div><Link to="/projects">Projects</Link></div>
            </div>
            <div className="navbar-logo">
                <Link to="/">You Gao</Link>
            </div>
            <div className="navbar-links">
                <div><Link to="/about">[About Me]</Link></div>
                <div><a href="https://blog.yougao.dev/">To Blog</a></div>
            </div>
        </nav>
    </div>
);
};

export default Navbar;