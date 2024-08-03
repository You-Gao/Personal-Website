import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import "./Background.css";
import React from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Scene() {
  const component = useRef();
  const slider = useRef();

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
            duration: { min: 0, max: .3 }, // Adjust duration for less snappy effect
            ease: "power1.inOut" // Adjust easing for smoother snapping
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
              <h1>Personal Blog</h1>
              <h2>React, Node.js, Express, MongoDB</h2>
              <p className="">This is a personal blog where I share my thoughts and experiences on various topics.</p>
              <img src="/blog.png"/>
            </div>
        </div>
        <div className="panel">
            <div className="project-container">
                <h1>UVA Event Oracle</h1>
                <h2>React, Node.js, Express, MongoDB</h2>
                <p className="">This is a web application that helps students find events happening at UVA.</p>
                <img src="/uva-event-oracle.png"/>
            </div>
        </div>
        <div className="panel">
            <div className="project-container">
                <h1>UVA Elective Oracle</h1>
                <h2>React, Node.js, Express, MongoDB</h2>
                <p className="">This is a web application that helps students find electives at UVA.</p>
                <img src="/uva-elective-oracle.png"/>
            </div>
        </div>
        <div className="panel">
            <div className="project-container">
                <h1>Github</h1>
                <p className="">Check out my Github to see more of my projects.</p>
                <img src="/github.png"/>
            </div>
        </div>
      </div>
    </div>
  );
}
