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
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    gsap.utils.toArray(".apanel").forEach((panel, i) => {
      let trigger = ScrollTrigger.create({
        trigger: panel,
        start: "top top", 
        pin: true, 
        pinSpacing: false, 
      });

      gsap.utils.toArray(".apanel").forEach((panel, i) => {
        if (i === 0) {
          gsap.fromTo(
            panel.querySelector("#name"),
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 1,
              delay: 0.5,
              ease: "power2",
              scrollTrigger: {
                trigger: panel.querySelector("#name"),
                start: "top bottom",
                end: "bottom top",
                toggleActions: "play reverse play reverse",
              },
            }
            
          );
        } else {
        gsap.fromTo(
          panel.querySelector("#name"),
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1,
            delay: 0.5,
            ease: "power2",
            scrollTrigger: {
              trigger: panel,
              start: "top center",
              end: "bottom",
              scrub: true,
            },
          }
        );
      }
      });
      gsap.utils.toArray(".apanel").forEach((panel, i) => {
        const ulElements = panel.querySelectorAll(".under-center h2");
        ulElements.forEach((h2) => {
          if (i === 0) {
            gsap.fromTo(
              h2,
              {
                opacity: 0,
              },
              {
                opacity: 1,
                duration: 1,
                delay: 0.5,
                ease: "power2",
                scrollTrigger: {
                  trigger: h2,
                  start: "top bottom",
                  end: "bottom top",
                  toggleActions: "play reverse play reverse",
                },
              }
            );
          }
        else {
          gsap.fromTo(
            h2,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 1,
              delay: 0.5,
              ease: "power2",
              scrollTrigger: {
                trigger: panel,
                start: "top center",
                end: "bottom",
                scrub: true,
                markers: true,
              },
            }
          );
        }
        const liElements = panel.querySelectorAll(".under-center li");
        if (i === 0) {
          liElements.forEach((li, i) => {
            gsap.fromTo(
              li,
              {
                opacity: 0,
                x: 100 + i * 100,
              },
              {
                opacity: 1,
                x: 0,
                duration: 2,
                delay: 0.2,
                ease: "power2",
                scrollTrigger: {
                  trigger: li,
                  start: "top bottom",
                  end: "bottom top",
                  toggleActions: "play reverse play reverse",
                },
              }
            );
          });
        }
        liElements.forEach((li, i) => {
          gsap.fromTo(
            li,
            {
              opacity: 0,
              x: 100 + i * 100,
            },
            {
              opacity: 1,
              x: 0,
              duration: 2,
              delay: 0.2,
              ease: "power2",
              scrollTrigger: {
                trigger: panel,
                start: "top center",
                end:  "center",
                scrub: true,
              },
            }

          );
        });
        });
      });
    }, slider);
  };

  // first panel refs
  useEffect(() => {
   // for all panels, select the classes with id="name" and add a fade in

    initializeAnimations();

    const handleResize = () => {
      initializeAnimations();
    };

    window.addEventListener('resize', handleResize);
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }
    window.addEventListener('load', function() {
      ScrollTrigger.refresh();
    });

  return () => {
    document.querySelectorAll('.apanel').forEach(panel => panel.remove());
    window.removeEventListener('resize', handleResize);
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    window.scrollTo(0, 0);
  };
}, []);

  return (
    <div>
      
      
      <section id="x" class="apanel">
        <table className="center">
          <td>
          <div style={{marginRight:"10px", color:"grey"}}>i am a: </div>
          </td>
          <td style={{border: "3px solid black"}}>
          <div id="name" style={{marginLeft:"10px",marginRight:"10px"}}>Student</div>
          </td>
        </table>
        <div className="under-center">
          <h2 style={{textAlign:"center"}}>Relevant Information:</h2>
          <ul style={{marginTop: "-25px"}}>
            <li>CS & GDS Majors</li>
            <li>Data Science Minor</li>
            <li>2 More Years.....</li>
          </ul>
        </div>
      </section>

      <section id="x" class="apanel">
        <table className="center">
          <td>
          <div style={{marginRight:"10px", color:"grey"}}>i am a: </div>
          </td>
          <td style={{border: "3px solid black"}}>
          <div id="name" style={{marginLeft:"10px",marginRight:"10px"}}>Foodie</div>
          </td>
        </table>
        <div className="under-center">
          <h2 style={{textAlign:"center"}}>Recent Places Went:</h2>
          <ul style={{marginTop: "-25px"}}>
            <li>Cantina Bakery (amazing)</li>
            <li>Yoshi Sushi</li>
            <li>Brecotea</li>
          </ul>
        </div>
      </section>

      <section id="x" class="apanel">
        <table className="center">
          <td>
          <div style={{marginRight:"10px", color:"grey"}}>i am a: </div>
          </td>
          <td id="name" style={{border: "3px solid black"}}>
          <div style={{marginLeft:"10px",marginRight:"10px"}}>Gamer</div>
          </td>
        </table>
        <div className="under-center">
          <h2 style={{textAlign:"center"}}>Favorite Games ATM:</h2>
          <ul style={{marginTop: "-25px"}}>
            <li>Guilty Gear -Strive-</li>
            <li>Golf with Your Friends</li>
            <li>Pokemon Emerald</li>
          </ul>
        </div>
      </section>

      <section class="apanel">
        <table className="center">
          <td>
          <div style={{marginRight:"10px", color:"grey"}}>i am a: </div>
          </td>
          <td style={{border: "3px solid black"}}>
          <div id="name" style={{marginLeft:"10px",marginRight:"10px"}}>Reader</div>
          </td>
        </table>
        <div className="under-center">
          <h2 style={{textAlign:"center"}}>Planned Reads:</h2>
          <ul style={{marginTop: "-25px"}}>
            <li>The Pragmatic Programmer</li>
            <li>The Idea of Phenomenology</li>
            <li>Homo Sacer</li>
          </ul>
        </div>
      </section>

      <section class="apanel">
        <table className="center">
          <td>
          <div style={{marginRight:"10px", color:"grey"}}>i am a: </div>
          </td>
          <td style={{border: "3px solid black"}}>
          <div id="name" style={{marginLeft:"10px",marginRight:"10px"}}>Blogger</div>
          </td>
        </table>
        <div className="under-center">
          <h2 style={{textAlign:"center"}}>Latest Ponderings:</h2>
          <ul style={{marginTop: "-25px"}}>
            <li>Environmental Dissonance</li>
            <li>Layer 8 DDoS and ChatGPT</li>
            <li>Learning Forwards and Backwards</li>
          </ul>
        </div>
      </section>

      <section id="x" class="apanel">
        <table className="center">
          <td>
          <div style={{marginRight:"10px", color:"grey"}}>i am a: </div>
          </td>
          <td style={{border: "3px solid black"}}>
          <div id="name" style={{marginLeft:"10px",marginRight:"10px"}}>Developer</div>
          </td>
        </table>
        <div className="under-center">
          <h2 style={{textAlign:"center"}}>Current Interests:</h2>
          <ul style={{marginTop: "-25px"}}>
            <li>DevOps Theory (Phoenix Project)</li>
            <li>Front-end Design</li>
            <li>Operating Systems</li>
          </ul>
        </div>
        
      </section>

      <div class="overflow-div">
      </div>
    </div>
  );
}
