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
          snap: 1 / (panels.length - 1),
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
            <p className="">This is a personal blog where I share my thoughts and experiences on various topics.</p>
            </div>
        </div>
        <div className="panel">
            <div className="">
                <h1>Project 1</h1>
            </div>
        </div>
        <div className="panel">
            <div className="">
                <h1>Project 2</h1>
            </div>
        </div>
        <div className="panel">
            <div className="">
                <h1>Project 3</h1>
            </div>
        </div>
      </div>
    </div>
  );
}
