"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "../ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export function HeroOverlayPan() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);
    
    const handleMediaChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;

    let ctx = gsap.context(() => {
      const section = sectionRef.current;
      const imgContainer = imageContainerRef.current;

      if (!section || !imgContainer) return;

      // Make values reactive using functions for invalidateOnRefresh
      const getScrollDistance = () => Math.max(0, imgContainer.getBoundingClientRect().height - window.innerHeight);
      const getPinDistance = () => {
        const scrollDist = getScrollDistance();
        const isMobile = window.innerWidth < 768;
        return isMobile ? Math.min(scrollDist, window.innerHeight * 1.5) : scrollDist;
      };

      const initTimer = setTimeout(() => {
        if (getScrollDistance() > 0) {
          gsap.fromTo(imgContainer,
            { y: 0 },
            {
              y: () => -getScrollDistance(), // Reactive calculation
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${getPinDistance()}`, // Reactive calculation
                pin: true,
                pinSpacing: true,
                scrub: true,
                invalidateOnRefresh: true,
              }
            }
          );
          ScrollTrigger.refresh();
        }
      }, 100);

      return () => clearTimeout(initTimer);
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen overflow-hidden bg-wine-black flex justify-center items-center"
    >
      {/* Tall Background Image Layer */}
      <div 
        ref={imageContainerRef}
        className={`absolute top-0 left-0 w-full ${isReducedMotion ? 'h-full' : ''} pointer-events-none`}
      >
        <Image 
          src="/images/overlay-hero.png"
          alt="Overlay Hero Background"
          width={1448}
          height={1086}
          priority
          className={`w-full ${isReducedMotion ? 'h-full object-cover' : 'h-auto object-top'} opacity-90`}
          onLoad={() => ScrollTrigger.refresh()}
        />
      </div>

      {/* Buttons Layer (Fixed / Centered relative to section) */}
      <div className="relative z-10 flex flex-col sm:flex-row gap-6">
        <MagneticButton className="bg-algae text-wine font-bold px-8 py-4 rounded-full text-lg hover:bg-cream transition-colors duration-300">
          Reserve a Table
        </MagneticButton>
        <MagneticButton className="bg-transparent border border-wasabi/30 text-wasabi px-8 py-4 rounded-full text-lg hover:bg-wasabi/10 transition-colors duration-300">
          View Menu
        </MagneticButton>
      </div>
    </section>
  );
}
