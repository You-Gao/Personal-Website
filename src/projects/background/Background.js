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

const initializeAnimations = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  let ctx = gsap.context(() => {
      const pixelsPause = 300;

      let panels = gsap.utils.toArray(".panel");
      gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: "none",
          scrollTrigger: {
              trigger: slider.current,
              scrub: 1,
              pin: true,
              snap: {
                  snapTo: 1 / (panels.length - 1),
                  duration: { min: 0.1, max: 0.5 }, // Adjust duration for less snappy effect
                  ease: "power3.inOut" // Adjust easing for smoother snapping
              },
              start: `top+=0 top`,
              end: () => "+=" + (window.innerWidth * panels.length),
          },
      });

      // for panel add a scroll trigger on its img
      panels.forEach((panel, i) => {
        if (i === 0) return; // Skip the first panel
        const img = panel.querySelector("img");

        gsap.fromTo(img, 
            { opacity: 0 }, // Start opacity at 0
            { 
                opacity: 1, // End opacity at 1
                ease: "none",
                scrollTrigger: {
                    trigger: panel, // Use the panel as the trigger
                    scrub: 1,
                    start: `${(window.innerWidth * i + i * 150)}px`,
                    end: `${(window.innerWidth * i + i * 150)}px`,
                    markers: true, // Optional: for debugging
                    onEnter: () => console.log("ScrollTrigger entered"), // Log when the trigger is entered
                },
            }
        );

        const h1 = panel.querySelector("h1");
        const h2 = panel.querySelector("h2");
        const p = panel.querySelector("p");

        gsap.fromTo(h1,
            { x: -200, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: panel,
                    scrub: 1,
                    start: `${(window.innerWidth * i + i * 150)}px`,
                    end: `${(window.innerWidth * i + i * 150)}px`,
                    markers: true,
                },
            }
        );

        gsap.fromTo(h2,
            { x: -200, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: panel,
                    scrub: 1,
                    start: `${(window.innerWidth * i + i * 150)}px`,
                    end: `${(window.innerWidth * i + i * 150)}px`,
                    markers: true,
                },
            }
        );

        gsap.fromTo(p,
            { x: -200, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: panel,
                    scrub: 1,
                    start: `${(window.innerWidth * i + i * 150)}px`,
                    end: `${(window.innerWidth * i + i * 150)}px`,
                    markers: true,
                },
            }
        );
      });
      
      // ------ First Panel -------
      // panel with class 'a'
      gsap.fromTo(document.querySelector(".a img"), 
          { opacity: 0 }, // Start opacity at 0
          { 
              opacity: 1, // End opacity at 1
              ease: "none",
              delay: 0.5,              
              scrollTrigger: {
                trigger: document.querySelector(".a img"),
                start: "top bottom",
                end: "bottom top",
                toggleActions: "play reverse play reverse",
              },
          }
      );

      // fade from right for h1, h2, p
      gsap.fromTo(document.querySelector(".a h1"), 
          { x:-100, opacity: 0 }, 
          { 
              x: 0, 
              opacity: 1, 
              ease: "none",
              delay: 0.5,              
              scrollTrigger: {
                trigger: document.querySelector(".a h1"),
                start: "top bottom",
                end: "bottom top",
                toggleActions: "play reverse play reverse",
              },

          }
      );
      gsap.fromTo(document.querySelector(".a h2"), 
          { x: -100, opacity: 0 }, 
          { 
              x: 0, 
              opacity: 1, 
              ease: "none",
              delay: 0.5,
              scrollTrigger: {
                trigger: document.querySelector(".a h2"),
                start: "top bottom",
                end: "bottom top",
                toggleActions: "play reverse play reverse",
              },

          }
      );
      gsap.fromTo(document.querySelector(".a p"), 
          { x:-100, opacity: 0 }, 
          { 
              x: 0, 
              opacity: 1, 
              ease: "none",
              delay: 0.5,
              scrollTrigger: {
                trigger: document.querySelector(".a p"),
                start: "top bottom",
                end: "bottom top",
                toggleActions: "play reverse play reverse",
              },

          }
      );

  }, slider);
};

  useEffect(() => {
    initializeAnimations();

    const handleResize = () => {
      initializeAnimations();
    };

    window.addEventListener('resize', handleResize);

    window.addEventListener('load', function() {
        window.scrollTo(0, 0);
        ScrollTrigger.refresh();
      });

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

  return () => {
    window.removeEventListener('resize', handleResize);
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    window.scrollTo(0, 0);
  };
}, []);

  return (
    <div className="Projects" ref={component}>
      <div className="overlay-text">Scroll -></div>
      <div ref={slider} className="container">
        <div className="description panel a">
              <div className="project-container">
                <a href="https://www.yougao.dev/Personal-Website/"> 
                <h1>Personal Website v1</h1>
                </a>
                <h2>React, HTML/CSS/JS, Three.js, GSAP</h2>
                <p className="">My current website. First attempt with React, Three.js, and GSAP.</p>
                <img src="/site.png"/>
              </div>
          </div>
        <div className="description panel">
            <div className="project-container">
              <a href="https://blog.yougao.dev/">
              <h1>Personal Blog</h1>
              </a>
              <h2>Jekyll, HTML/CSS/JS</h2>
              <p className="">My personal blog where I share my thoughts on various topics.</p>
              <img src="/blog.png"/>
            </div>
        </div>
        <div className="panel">
            <div className="project-container">
                <a href="https://www.yougao.dev/UVA-Event-Oracle/">
                <h1>UVA Event Oracle</h1>
                </a>
                <h2>Web-Scraping, Python, Vertex AI</h2>
                <p className="">A static page that displays events happening at UVA after ETL.</p>
                <img src="/uva-event-oracle.png"/>
            </div>
        </div>
        <div className="panel">
            <div className="project-container">
                <a href="https://www.yougao.dev/UVA-Electives-Oracle/">
                <h1>UVA Elective Oracle</h1>
                </a>
                <h2>APIs, Python, HTML/CSS/JS</h2>
                <p className="">A web application for interacting w/ interesting electives at UVA</p>
                <img src="/uva-elective-oracle.png"/>
            </div>
        </div>
        <div className="panel">
            <div className="project-container">
                <a href="https://github.com/You-Gao/Kaggle-Archive">
                <h1>Kaggle Archive</h1>
                </a>
                <h2>Jupyter, Pandas, Scikit-learn, Matplotlib</h2>
                <p className="">An archive of my data-science projects from classes and Kaggle</p>
                <img src="/kaggle.png"/>
            </div>
        </div>
        <div className="panel">
            <div className="project-container">
            <a href="https://github.com/You-Gao/" target="_blank"><h1>Check My GitHub to Stay Updated!</h1></a>
            <br/>
            <br/>
            <h2 className="margin-top" >What I'm Up To (My Recent Commits):</h2>
            <ul id="commit-list"></ul>
            </div>
        </div>
      </div>
    </div>
  );
}
