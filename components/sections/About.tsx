"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image Parallax
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text Reveal
      if (textRef.current) {
        const paragraphs = textRef.current.querySelectorAll("p");
        
        paragraphs.forEach((p) => {
          gsap.fromTo(p, 
            { y: 50, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              duration: 1, 
              ease: "power3.out",
              scrollTrigger: {
                trigger: p,
                start: "top 85%",
              }
            }
          );
        });
        
        const statLine = textRef.current.querySelector(".stat-line");
        if (statLine) {
          gsap.fromTo(statLine,
            { scale: 0.9, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: statLine,
                start: "top 90%",
              }
            }
          );
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative w-full py-32 md:py-48 bg-wine-black text-wasabi overflow-hidden z-10"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        
        {/* Left Col: Image Parallax */}
        <div className="relative h-[60vh] md:h-[80vh] w-full rounded-2xl overflow-hidden group">
          <div ref={imageRef} className="absolute inset-[-10%] w-[120%] h-[120%]">
            {/* Using a placeholder image for sunset/dam */}
            <div className="w-full h-full bg-gradient-to-br from-wine via-algae to-wasabi opacity-80" />
            <Image 
              src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?q=80&w=2070&auto=format&fit=crop"
              alt="Sunset view at On Da Rocks"
              fill
              className="object-cover mix-blend-overlay opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
        </div>

        {/* Right Col: Text Reveal */}
        <div ref={textRef} className="flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-8">
            The Golden Hour Has a Home
          </h2>
          
          <div className="space-y-8 text-lg md:text-xl font-light text-wasabi/90">
            <p>
              On Da Rocks sits right above Kanke Dam — which, honestly, does half the work for us. You get here as the sky starts turning, find a spot on the deck, order something off the grill, and just... let the evening happen. That's the whole idea.
            </p>
            <p>
              We're not fine dining and we're not trying to be. We're the place your group chat picks when someone says "let's just go somewhere nice tonight" — good food, a proper bar, live music some evenings, and a view that genuinely doesn't get old, no matter how many times you've been.
            </p>
          </div>

          <div className="stat-line mt-12 p-6 border-l-4 border-algae bg-wine/50 rounded-r-xl">
            <p className="text-xl md:text-2xl font-medium text-algae">
              350+ happy evenings and counting
            </p>
            <p className="text-cream mt-2">
              Open till midnight, every day
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
