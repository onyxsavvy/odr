"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "../ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Reserve() {
  const containerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!formRef.current) return;
      const inputs = formRef.current.querySelectorAll(".form-group");
      
      gsap.fromTo(inputs,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Get form data
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const date = formData.get("date");
    const size = formData.get("size");
    const occasion = formData.get("occasion");
    const message = formData.get("message");

    // Construct WhatsApp message
    const waText = `Hello ODR! I would like to request a table reservation.
*Name:* ${name}
*Phone:* ${phone}
*Date:* ${date}
*Party Size:* ${size}
${occasion ? `*Occasion:* ${occasion}\n` : ''}${message ? `*Message:* ${message}` : ''}`;

    const waUrl = `https://wa.me/917361000066?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <section 
      id="reserve" 
      ref={containerRef}
      className="relative w-full py-32 bg-wine-black text-wasabi overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
          Save Your Spot for Sunset
        </h2>
        <p className="text-lg md:text-xl font-light text-wasabi/90">
          Tell us when you're coming and how many of you there are — we'll take care of the rest.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form 
              key="form"
              ref={formRef}
              onSubmit={handleSubmit}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group flex flex-col gap-2 text-left">
                  <label htmlFor="name" className="text-cream text-sm font-medium pl-2">Name</label>
                  <input 
                    name="name"
                    type="text" 
                    id="name" 
                    required 
                    className="bg-wine border-2 border-transparent focus:border-algae w-full px-6 py-4 rounded-xl text-cream outline-none transition-all focus:shadow-[0_0_15px_rgba(175,162,49,0.3)] placeholder:text-wasabi/40"
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-group flex flex-col gap-2 text-left">
                  <label htmlFor="phone" className="text-cream text-sm font-medium pl-2">Phone Number</label>
                  <input 
                    name="phone"
                    type="tel" 
                    id="phone" 
                    required 
                    className="bg-wine border-2 border-transparent focus:border-algae w-full px-6 py-4 rounded-xl text-cream outline-none transition-all focus:shadow-[0_0_15px_rgba(175,162,49,0.3)] placeholder:text-wasabi/40"
                    placeholder="073610 00066"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group flex flex-col gap-2 text-left">
                  <label htmlFor="date" className="text-cream text-sm font-medium pl-2">Date</label>
                  <input 
                    name="date"
                    type="date" 
                    id="date" 
                    required 
                    className="bg-wine border-2 border-transparent focus:border-algae w-full px-6 py-4 rounded-xl text-cream outline-none transition-all focus:shadow-[0_0_15px_rgba(175,162,49,0.3)] text-wasabi/90 [&::-webkit-calendar-picker-indicator]:filter-wasabi"
                  />
                </div>
                <div className="form-group flex flex-col gap-2 text-left">
                  <label htmlFor="size" className="text-cream text-sm font-medium pl-2">Party Size</label>
                  <input 
                    name="size"
                    type="number" 
                    id="size" 
                    min="1"
                    max="200"
                    required 
                    className="bg-wine border-2 border-transparent focus:border-algae w-full px-6 py-4 rounded-xl text-cream outline-none transition-all focus:shadow-[0_0_15px_rgba(175,162,49,0.3)] placeholder:text-wasabi/40"
                    placeholder="4"
                  />
                </div>
              </div>

              <div className="form-group flex flex-col gap-2 text-left">
                <label htmlFor="occasion" className="text-cream text-sm font-medium pl-2">Occasion (optional)</label>
                <input 
                  name="occasion"
                  type="text" 
                  id="occasion" 
                  className="bg-wine border-2 border-transparent focus:border-algae w-full px-6 py-4 rounded-xl text-cream outline-none transition-all focus:shadow-[0_0_15px_rgba(175,162,49,0.3)] placeholder:text-wasabi/40"
                  placeholder="Birthday, Anniversary, etc."
                />
              </div>

              <div className="form-group flex flex-col gap-2 text-left">
                <label htmlFor="message" className="text-cream text-sm font-medium pl-2">Message (optional)</label>
                <textarea 
                  name="message"
                  id="message" 
                  rows={3}
                  className="bg-wine border-2 border-transparent focus:border-algae w-full px-6 py-4 rounded-xl text-cream outline-none transition-all focus:shadow-[0_0_15px_rgba(175,162,49,0.3)] placeholder:text-wasabi/40 resize-none"
                  placeholder="Any special requests?"
                ></textarea>
              </div>

              <div className="form-group pt-4 w-full flex flex-col md:flex-row gap-6 justify-center items-center">
                <button 
                  type="submit"
                  className="bg-algae text-wine font-bold px-8 py-4 rounded-full text-lg w-full md:w-auto hover:bg-cream transition-colors duration-300 shadow-[0_0_20px_rgba(175,162,49,0.2)] hover:shadow-[0_0_30px_rgba(175,162,49,0.4)]"
                >
                  Reserve My Table
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-wine/50 border border-algae/30 rounded-2xl p-12 text-center"
            >
              <div className="w-20 h-20 bg-algae/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-algae" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-cream mb-4">You're all set.</h3>
              <p className="text-lg text-wasabi/90">We'll confirm shortly — see you at golden hour.</p>
              
              <button 
                onClick={() => setIsSubmitted(false)}
                className="mt-8 text-algae border-b border-algae/50 hover:border-algae pb-1 transition-colors"
              >
                Make another reservation
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Alt CTAs */}
        <div className="mt-16 pt-8 border-t border-wasabi/10 flex flex-col sm:flex-row justify-center gap-6 items-center">
          <p className="text-cream font-medium">Or reach us directly:</p>
          <a href="tel:07361000066" className="flex items-center gap-2 text-wasabi hover:text-algae transition-colors">
            Call Us Directly
          </a>
          <span className="hidden sm:inline text-wasabi/30">|</span>
          <a href="https://wa.me/917361000066" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-wasabi hover:text-algae transition-colors">
            Message on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
