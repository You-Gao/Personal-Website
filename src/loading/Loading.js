import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './Loading.css';

const LoadingAnimation = () => {
    const nameRef = useRef(null);
    const GsvgRef = useRef(null);
    const tl = gsap.timeline({ repeat: -1, ease: "linear" });
    const YsvgRef = useRef(null);
    const t2 = gsap.timeline({ repeat: -1, ease: "linear" });


    useEffect(() => {
        gsap.fromTo(nameRef.current, { opacity: 0 }, { opacity: 1, duration: 2 });

        tl.fromTo(GsvgRef.current, 
            { rotation: 0 }, 
            { rotation: 360, duration: 2 }
        )
        .fromTo(GsvgRef.current, 
                { y: 0 }, 
                { y: -1000, duration: 2 }
        );

        t2.fromTo(YsvgRef.current,
            { rotation: 0 },
            { rotation: 360, duration: 2 }
        )
        .fromTo(YsvgRef.current,
            { y: 0 },
            { y: 1000, duration: 2 }
        );

    }, []);

    return (
        <div className="loader-container gradient">
            <div className="loader">
                <div className="svg-wrapper">
                    <div className="svg-container" ref={YsvgRef}>
                        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                            <line x1="10" y1="10" x2="50" y2="50" stroke="black" stroke-width="5"/>
                            <line x1="90" y1="10" x2="50" y2="50" stroke="black" stroke-width="5"/>
                            <line x1="50" y1="50" x2="50" y2="90" stroke="black" stroke-width="5"/>
                        </svg>
                    </div>
                    <div className="svg-container" ref={GsvgRef}>
                        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="40" stroke="black" stroke-width="5" fill="none"/>
                            <line x1="50" y1="50" x2="80" y2="50" stroke="black" stroke-width="5"/>
                            <line x1="80" y1="50" x2="80" y2="80" stroke="black" stroke-width="5"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingAnimation;