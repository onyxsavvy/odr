"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "The ambience here is the real draw — great for catching up with friends over good food and an even better view.",
    author: "Recent visitor, Google Reviews",
  },
  {
    id: 2,
    quote: "Hosted my son's first birthday here. The space, the service, and the night view over the dam made it genuinely special.",
    author: "Local Guide, Google Reviews",
  },
  {
    id: 3,
    quote: "Tasty food, quick service, and one of the most pleasant atmospheres in the city.",
    author: "Verified visitor",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    if (typeof window !== "undefined") {
      prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion.current) return;
    
    if (!isPaused) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isPaused]);

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = Math.abs(offset.x) * velocity.x;

    if (swipe < -10000 || offset.x < -100) {
      setIndex((prev) => (prev + 1) % testimonials.length);
    } else if (swipe > 10000 || offset.x > 100) {
      setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  return (
    <section 
      id="testimonials"
      className="relative w-full py-32 bg-cream text-wine overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
        
        <div className="mb-12 flex justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-8 h-8 fill-algae text-algae" />
          ))}
        </div>

        <div 
          className="relative h-[250px] md:h-[200px] w-full flex items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={prefersReducedMotion.current ? { opacity: 0 } : { opacity: 0, x: 50 }}
              animate={prefersReducedMotion.current ? { opacity: 1 } : { opacity: 1, x: 0 }}
              exit={prefersReducedMotion.current ? { opacity: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              drag={!prefersReducedMotion.current ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd}
              className="absolute w-full px-4"
            >
              <blockquote className="text-2xl md:text-4xl font-outfit font-medium italic mb-8 leading-relaxed text-wine">
                "{testimonials[index].quote}"
              </blockquote>
              <p className="text-wasabi bg-wine inline-block px-4 py-1 rounded-full font-medium text-sm md:text-base">
                — {testimonials[index].author}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === idx ? "bg-algae w-8" : "bg-wine/20 hover:bg-wine/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
