"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { HeroOverlayPan } from "./hero-overlay-pan";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text roughly
      const tl = gsap.timeline();

      tl.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.5 },
      ).fromTo(
        textRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8",
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
    <section id="home" className="relative w-full">
      {/* 1. hero-top (100vh) */}
      <div
        ref={containerRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#433104]"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image 
            src="/images/hero.png" 
            alt="Hero Background" 
            fill 
            className="object-cover opacity-90 mix-blend-overlay" 
            priority
          />
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
            <span className="text-algae inline-block mt-2">
              Sunset Bar & Grill
            </span>
          </h1>

          <div ref={textRef} className="flex flex-col items-center">
            <p className="text-xl md:text-2xl text-wasabi/90 max-w-2xl mb-12 font-light">
              Come for the view. Stay till the lights over the dam come on.
            </p>
          </div>
        </div>

        {/* Gradient overlay for bottom blending */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-wine-black to-transparent z-10 pointer-events-none"></div>
      </div>

      {/* 2. hero-overlay (100vh pinned) */}
      <div className="hidden md:block">
        <HeroOverlayPan />
      </div>
    </section>
  );
}
