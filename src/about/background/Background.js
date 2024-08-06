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

  // first panel refs
  const ballRef = useRef();
  const firstPanelRef = useRef();
  useEffect(() => {
    const firstPanelHeight = firstPanelRef.current.offsetHeight - 300;
    // first panel gsap animations
    gsap.fromTo(ballRef.current, { x: 0 }, { x: 1000, scrollTrigger: { trigger: ballRef.current, start: `top-=${firstPanelHeight}px top`, markers: true}, repeat: -1 });

    initializeAnimations();

  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);

  return (
    <div>
      
      <section id="two" class="panel orange">
      <div className="teststicky">i am a: </div>
        <div className="center">im a test</div>
        <div className="under-center">
          <h2>Favorite Books</h2>
          <ul style={{marginTop: "-25px"}}>
            <li>Harry Potter</li>
            <li>Lord of the Rings</li>
            <li>Game of Thrones</li>
          </ul>
        </div>
      </section>
      <section ref={firstPanelRef} id="one" class="panel red">
        <div className="center">Gamer</div>
        <img ref={ballRef} className="bottom-left" src="glowing-ball.png" alt="test" />
      </section>

      <section id="three" class="panel purple">
       <div className="center">Hoo</div>
      </section>
      <section id="four" class="panel green">
       <div className="center">Foodie</div>
      </section>
      <section id="four" class="panel blue">
       <div className="center">Coder</div>
      </section>

    </div>
  );
}
