"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "../ui/MagneticButton";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Events() {
  const containerRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Background radial glow effect
  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter animation
      const counters = document.querySelectorAll(".stat-counter");
      
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target") || "0", 10);
        const hasPlus = counter.getAttribute("data-plus") === "true";
        
        gsap.to(counter, {
          innerHTML: target,
          duration: 2,
          snap: { innerHTML: 1 },
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
          onUpdate: function() {
            if (hasPlus && this.progress() === 1) {
              counter.innerHTML = target + "+";
            }
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="events" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full py-32 md:py-48 bg-wine overflow-hidden group"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 hidden md:block z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(175, 162, 49, 0.08),
              transparent 80%
            )
          `,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
        
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-8 leading-tight">
            Your Next Celebration, <br />
            <span className="text-algae">With a View</span>
          </h2>
          
          <p className="text-lg md:text-xl font-light text-wasabi/90 mb-12">
            From a son's first birthday to a 150-person corporate evening, we've got the space, the staff, and the setting to make it work. Ample free parking, indoor and outdoor seating, and a dam view that makes for the best photos of the night, every time.
          </p>
          
          <div>
            <MagneticButton className="bg-algae text-wine font-bold px-8 py-4 rounded-full text-lg hover:bg-cream transition-colors duration-300">
              Plan Your Event
            </MagneticButton>
          </div>
        </div>

        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          
          <div className="bg-wine-black/40 backdrop-blur-sm p-8 rounded-2xl border border-wasabi/10 flex flex-col items-center text-center hover:border-algae/30 transition-colors">
            <div className="text-5xl md:text-6xl font-bold text-algae mb-2 flex">
              <span className="stat-counter" data-target="50">0</span>
              <span className="mx-2">-</span>
              <span className="stat-counter" data-target="200" data-plus="false">0</span>
            </div>
            <p className="text-wasabi font-medium">Guests Capacity</p>
          </div>

          <div className="bg-wine-black/40 backdrop-blur-sm p-8 rounded-2xl border border-wasabi/10 flex flex-col items-center text-center hover:border-algae/30 transition-colors">
            <div className="text-5xl md:text-6xl font-bold text-algae mb-2 flex">
              <span>Free</span>
            </div>
            <p className="text-wasabi font-medium">Parking, Always</p>
          </div>

          <div className="bg-wine-black/40 backdrop-blur-sm p-8 rounded-2xl border border-wasabi/10 flex flex-col items-center text-center hover:border-algae/30 transition-colors">
            <div className="text-4xl md:text-5xl font-bold text-algae mb-2">
              Live
            </div>
            <p className="text-wasabi font-medium">Music Evenings</p>
          </div>

          <div className="bg-wine-black/40 backdrop-blur-sm p-8 rounded-2xl border border-wasabi/10 flex flex-col items-center text-center hover:border-algae/30 transition-colors">
            <div className="text-4xl md:text-5xl font-bold text-algae mb-2">
              Indoor & Open-air
            </div>
            <p className="text-wasabi font-medium">Seating Options</p>
          </div>

        </div>

      </div>
    </section>
  );
}
