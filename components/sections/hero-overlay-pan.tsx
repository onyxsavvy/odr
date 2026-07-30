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

      const createScrollTrigger = () => {
        // Clear any existing triggers on this section to prevent duplicates on resize
        ScrollTrigger.getAll().forEach(st => {
          if (st.trigger === section) st.kill();
        });

        const imgHeight = imgContainer.getBoundingClientRect().height;
        const viewportHeight = window.innerHeight;
        
        // Calculate the difference between image height and viewport height
        const scrollDistance = Math.max(0, imgHeight - viewportHeight);
        
        // If image is shorter than viewport, don't pin or animate vertically
        if (scrollDistance <= 0) return;
        
        // On mobile, cap the extra scroll distance so it doesn't scroll excessively long
        const isMobile = window.innerWidth < 768;
        const maxScroll = viewportHeight * 1.5; 
        const pinDistance = isMobile ? Math.min(scrollDistance, maxScroll) : scrollDistance;

        gsap.fromTo(imgContainer, 
          { y: 0 },
          {
            y: -scrollDistance, // Always pan to the true bottom of the image
            ease: "none", // 1:1 scroll lock
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: `+=${pinDistance}`,
              pin: true,
              pinSpacing: true,
              scrub: true,
              invalidateOnRefresh: true,
            }
          }
        );
      };

      // Slight delay to allow image rendering to finish for accurate height calculation
      const initTimer = setTimeout(createScrollTrigger, 100);

      // Handle resize events to recalculate trigger end distance
      let resizeTimer: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          createScrollTrigger();
          ScrollTrigger.refresh();
        }, 200);
      };
      
      window.addEventListener("resize", handleResize);
      return () => {
        clearTimeout(initTimer);
        window.removeEventListener("resize", handleResize);
      };
      
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
