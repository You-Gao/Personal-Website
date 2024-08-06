import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useEffect } from "react";
import "./Background.css";
import React from "react";
gsap.registerPlugin(ScrollTrigger);

export default function Scene() {
  const component = useRef();
  const slider = useRef();

const initializeAnimations = () => {
  gsap.utils.toArray(".panel").forEach((panel, i) => {
    let trigger = ScrollTrigger.create({
      trigger: panel,
      start: "top top", 
      pin: true, 
      pinSpacing: false, 
      markers: true,
    });
      
  }, slider);
};

  useEffect(() => {
    initializeAnimations();

    const handleResize = () => {
      initializeAnimations();
    };

    window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);

  return (
    <div>
      <div className="teststicky">I am a: </div>
      <section id="one" class="panel red">
        <div className="test">X</div>
        <img src="pikachuy.jpg" alt="test" />
      </section>
      <section id="two" class="panel orange">
        <div className="test">Y</div>
        <img src="book.jpg" alt="test" />
      </section>
      <section id="three" class="panel purple">
       <div className="test">Z</div>
       <img src="uva.png" alt="test" />
      </section>
      <section id="four" class="panel green">
       <div className="test">F</div>
       <img src="food.jpg" alt="test" />
      </section>
      <section id="four" class="panel blue">
       <div className="test">F</div>
       <img src="code.png" alt="test" />
      </section>

    </div>
  );
}
