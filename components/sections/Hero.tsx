"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SunsetScene } from "../three/SunsetScene";
import { MagneticButton } from "../ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text roughly (in a real project, use SplitText if available, or a custom word-splitter)
      const tl = gsap.timeline();
      
      tl.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.5 }
      )
      .fromTo(
        textRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      );

      // Parallax effect on scroll
      gsap.to(".hero-content", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      id="home" 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <SunsetScene />
      </div>

      {/* Foreground Content */}
      <div className="hero-content relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto mt-20">
        <span className="uppercase tracking-widest text-wasabi/80 text-sm md:text-base mb-6 font-medium">
          Ranchi, Kanke Dam
        </span>
        
        <h1 
          ref={headingRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-cream leading-tight mb-8"
        >
          East India's Biggest <br />
          <span className="text-algae inline-block mt-2">Sunset Bar & Grill</span>
        </h1>

        <div ref={textRef} className="flex flex-col items-center">
          <p className="text-xl md:text-2xl text-wasabi/90 max-w-2xl mb-12 font-light">
            Come for the view. Stay till the lights over the dam come on.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <MagneticButton 
              className="bg-algae text-wine font-bold px-8 py-4 rounded-full text-lg hover:bg-cream transition-colors duration-300"
            >
              Reserve a Table
            </MagneticButton>
            <MagneticButton 
              className="bg-transparent border border-wasabi/30 text-wasabi px-8 py-4 rounded-full text-lg hover:bg-wasabi/10 transition-colors duration-300"
            >
              View Menu
            </MagneticButton>
          </div>
        </div>
      </div>
      
      {/* Gradient overlay for bottom blending */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-wine to-transparent z-10 pointer-events-none"></div>
    </section>
  );
}
