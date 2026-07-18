"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: "01",
    title: "The View",
    desc: "Perched right above Kanke Dam. Come for sunset, stay for the way the water looks once the lights come on.",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "The Grill",
    desc: "Tandoor classics, Chinese favourites, and a full bar — the Paneer Tikka and Chicken Tikka are the ones people keep coming back for.",
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "The Vibe",
    desc: "Live music evenings, a crowd that's here to have a good time, and a space built for groups, not solo scrolling.",
    img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "The Space",
    desc: "50 to 200 guests, indoor or out on the deck. Birthdays, get-togethers, corporate nights — we've hosted them all.",
    img: "https://images.unsplash.com/photo-1466978913421-bac2e5f62e84?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;

      const totalScrollWidth = scrollContainer.scrollWidth - window.innerWidth;

      // Pin the section and horizontal scroll
      gsap.to(scrollContainer, {
        x: -totalScrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalScrollWidth}`,
          invalidateOnRefresh: true,
        },
      });

      // Subtle 3D tilt on each card during horizontal scroll
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        
        gsap.to(card, {
          rotateY: -10,
          rotateX: 5,
          scale: 0.95,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${totalScrollWidth}`,
            scrub: true,
          }
        });
      });
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="relative h-screen w-full bg-wine overflow-hidden"
    >
      <div 
        ref={scrollContainerRef}
        className="flex h-full w-[400vw] md:w-[300vw] lg:w-[250vw]"
      >
        {experiences.map((exp, index) => (
          <div 
            key={exp.id}
            className="h-full w-screen flex flex-col justify-center items-center px-6 md:px-24 perspective-[1000px]"
          >
            <div 
              ref={(el) => { cardsRef.current[index] = el; }}
              className="relative w-full max-w-5xl aspect-[4/5] md:aspect-video rounded-3xl overflow-hidden group transform-style-3d shadow-2xl"
            >
              <Image 
                src={exp.img}
                alt={exp.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wine via-wine/80 to-transparent pointer-events-none" />
              
              <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end pointer-events-none translate-z-10">
                <span className="text-algae font-bold text-6xl md:text-8xl mb-4 opacity-80 mix-blend-screen">
                  {exp.id}
                </span>
                <h3 className="text-3xl md:text-5xl font-bold text-cream mb-4">
                  {exp.title}
                </h3>
                <p className="text-lg md:text-xl text-wasabi/90 max-w-2xl font-light">
                  {exp.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
