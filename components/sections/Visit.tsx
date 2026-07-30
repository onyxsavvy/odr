"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Clock, Car, Phone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Visit() {
  const containerRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!infoRef.current) return;
      const elements = infoRef.current.children;
      
      gsap.fromTo(elements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="visit" 
      ref={containerRef}
      className="relative w-full py-24 md:py-32 bg-wine text-wasabi overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div ref={infoRef} className="flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-12">
            Find Us Above the Dam
          </h2>
          
          <div className="space-y-8 text-lg font-light">
            <div className="flex gap-4">
              <MapPin className="text-algae w-8 h-8 flex-shrink-0" />
              <div>
                <strong className="block text-xl text-cream mb-1 font-medium">Address</strong>
                Rock Garden, Gandhi Nagar, Kanke,<br />Ranchi, Jharkhand 834008
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="text-algae w-8 h-8 flex-shrink-0" />
              <div>
                <strong className="block text-xl text-cream mb-1 font-medium">Hours</strong>
                Open daily · Closes 12 AM<br />
                <span className="text-algae text-sm">Best time to visit: Golden hour (arrive 1 hr before sunset)</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Car className="text-algae w-8 h-8 flex-shrink-0" />
              <div>
                <strong className="block text-xl text-cream mb-1 font-medium">Parking</strong>
                Free, on-site, plenty of space
              </div>
            </div>

            <div className="flex gap-4">
              <Phone className="text-algae w-8 h-8 flex-shrink-0" />
              <div>
                <strong className="block text-xl text-cream mb-1 font-medium">Phone</strong>
                073610 00066 / 073620 00066
              </div>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <a 
          href="https://www.google.com/maps/dir/?api=1&destination=On+Da+Rocks,+Rock+Garden,+Gandhi+Nagar,+Kanke,+Ranchi,+Jharkhand+834008"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-2xl relative bg-wine-black block group"
        >
          {/* Overlay to intercept clicks and add hover effect */}
          <div className="absolute inset-0 z-10 bg-wine/0 group-hover:bg-wine/40 transition-all duration-300 flex items-center justify-center">
             <div className="bg-cream text-wine font-bold px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-xl">
               Get Directions
             </div>
          </div>

          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14652.793262660233!2d85.31293375!3d23.414447499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e1774e1d1b3b%3A0xc6651da0fb01b5!2sOn%20Da%20Rocks!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: "grayscale(100%) invert(90%) hue-rotate(180deg) contrast(1.2)" }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="ODR Location on Map"
            className="absolute inset-0 mix-blend-luminosity opacity-80 pointer-events-none"
          ></iframe>
        </a>

      </div>
    </section>
  );
}
