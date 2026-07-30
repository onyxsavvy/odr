"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { id: 1, src: "/images/gallery-1.png", alt: "Drinks", aspect: "aspect-[3/4]" },
  { id: 2, src: "/images/gallery-2.jpg", alt: "Sunset view", aspect: "aspect-[4/5]" },
  { id: 3, src: "/images/gallery-3.jpg", alt: "Food", aspect: "aspect-square" },
  { id: 4, src: "/images/gallery-4.png", alt: "Ambience", aspect: "aspect-[4/3]" },
  { id: 5, src: "/images/gallery-5.png", alt: "Grill", aspect: "aspect-[3/4]" },
  { id: 6, src: "/images/gallery-6.png", alt: "Night view", aspect: "aspect-square" },
];

export default function Gallery() {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!gridRef.current) return;
      
      const cols = gridRef.current.children;
      
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Different parallax speeds for columns
        gsap.to(cols[0], {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
        
        gsap.to(cols[1], {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
        
        gsap.to(cols[2], {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const selectedItem = galleryImages.find(img => img.id === selectedImage);

  return (
    <section 
      id="gallery" 
      ref={containerRef}
      className="relative w-full py-32 bg-wine-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-cream mb-4">
          What an Evening Here Actually Looks Like
        </h2>
      </div>

      {/* Masonry Grid with columns for parallax */}
      <div 
        ref={gridRef}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10 h-auto"
      >
        {/* Col 1 */}
        <div className="flex flex-col gap-6 md:gap-8 pt-0 md:pt-12">
          {galleryImages.slice(0, 2).map((img) => (
            <motion.div
              layoutId={`gallery-image-${img.id}`}
              key={img.id}
              onClick={() => setSelectedImage(img.id)}
              className={`relative w-full ${img.aspect} rounded-2xl overflow-hidden cursor-pointer group`}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </motion.div>
          ))}
        </div>
        
        {/* Col 2 */}
        <div className="flex flex-col gap-6 md:gap-8 pt-0 md:pt-32">
          {galleryImages.slice(2, 4).map((img) => (
            <motion.div
              layoutId={`gallery-image-${img.id}`}
              key={img.id}
              onClick={() => setSelectedImage(img.id)}
              className={`relative w-full ${img.aspect} rounded-2xl overflow-hidden cursor-pointer group`}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </motion.div>
          ))}
        </div>
        
        {/* Col 3 */}
        <div className="flex flex-col gap-6 md:gap-8 pt-0 md:pt-24">
          {galleryImages.slice(4, 6).map((img) => (
            <motion.div
              layoutId={`gallery-image-${img.id}`}
              key={img.id}
              onClick={() => setSelectedImage(img.id)}
              className={`relative w-full ${img.aspect} rounded-2xl overflow-hidden cursor-pointer group`}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="text-center mt-24">
        <p className="text-algae font-medium text-lg">
          Tag us @odrranchi — we repost the best sunsets.
        </p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-wine-black/95 backdrop-blur-sm cursor-zoom-out"
          >
            <motion.div
              layoutId={`gallery-image-${selectedItem.id}`}
              className="relative w-full max-w-5xl aspect-video rounded-xl md:rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking image
            >
              <Image 
                src={selectedItem.src} 
                alt={selectedItem.alt} 
                fill 
                className="object-contain md:object-cover"
              />
              
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-wine/50 backdrop-blur text-cream w-10 h-10 rounded-full flex items-center justify-center hover:bg-wine transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
