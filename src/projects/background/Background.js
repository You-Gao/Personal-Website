import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useEffect } from "react";
import "./Background.css";
import React from "react";
import { getRecentCommits } from "./recent_commits";
gsap.registerPlugin(ScrollTrigger);

export default function Scene() {
  const component = useRef();
  const slider = useRef();
  
  useEffect(() => {
    const username = 'You-Gao';
    const fetchCommits = async () => {
        try {
            const commitList = await getRecentCommits(username);
            const limitCommits = commitList.slice(0, 10);
            console.log('Commits:', commitList);
            if (limitCommits) {
                const commitListElement = document.getElementById('commit-list');
                commitListElement.innerHTML = limitCommits.map(commit => {
                  const options = { 
                    month: '2-digit', 
                    day: '2-digit', 
                    year: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    hour12: true 
                };
                const formattedDate = new Date(commit.date).toLocaleString('en-US', options);
                    return `<li>${commit.repoName}: ${commit.message} (${formattedDate})</li>`;
                }).join('');
            }
        } catch (error) {
            console.error('Error fetching commits:', error);
        }
    };

    fetchCommits();
}, []);


  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const pixelsPause = 300;
      let panels = gsap.utils.toArray(".panel");
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: slider.current,
          scrub: 1,
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: { min: 0.1, max: 0.5 }, // Adjust duration for less snappy effect
            ease: "power3.inOut" // Adjust easing for smoother snapping
          },
          start: `top+=${pixelsPause} top`,
          end: () => "+=" + window.innerWidth * panels.length,
        },
      });
      ScrollTrigger.create({
        trigger: slider.current,
        end: () => "+=" + (window.innerWidth * panels.length + pixelsPause),
        pin: true,
      });
    }, component);
    return () => ctx.revert();
  });

  return (
    <div className="App" ref={component}>
      <div ref={slider} className="container">
        <div className="description panel">
              <div className="project-container">
                <h1>Personal Website v1</h1>
                <h2>React, HTML/CSS/JS, Three.js, GSAP</h2>
                <p className="">My current website. First attempt with React, Three.js, and GSAP.</p>
                <img src="/blog.png"/>
              </div>
          </div>
        <div className="description panel">
            <div className="project-container">
              <h1>Personal Blog</h1>
              <h2>Jekyll, HTML/CSS/JS</h2>
              <p className="">My personal blog where I share my thoughts and experiences on various topics.</p>
              <img src="/blog.png"/>
            </div>
        </div>
        <div className="panel">
            <div className="project-container">
                <h1>UVA Event Oracle</h1>
                <h2>Web-Scraping, Python, Vertex AI</h2>
                <p className="">A static page that displays events happening at UVA after ETL.</p>
                <img src="/uva-event-oracle.png"/>
            </div>
        </div>
        <div className="panel">
            <div className="project-container">
                <h1>UVA Elective Oracle</h1>
                <h2>APIs, Python, HTML/CSS/JS</h2>
                <p className="">A web application for interacting w/ interesting electives at UVA</p>
                <img src="/uva-elective-oracle.png"/>
            </div>
        </div>
        <div className="panel">
            <div className="project-container">
                <h1>Kaggle Archive</h1>
                <h2>Jupyter, Pandas, Scikit-learn, Matplotlib</h2>
                <p className="">An archive of my data-science projects from classes and Kaggle</p>
                <img src="/kaggle.png"/>
            </div>
        </div>
        <div className="panel">
            <div className="project-container">
            <h1><a href="https://github.com/You-Gao/" target="_blank">Check My GitHub to Stay Updated!</a></h1>
            <p>My Recent Commits:</p>
            <ul id="commit-list"></ul>
            </div>
        </div>
      </div>
    </div>
  );
}
