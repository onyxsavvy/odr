"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { MagneticButton } from "../ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const categories = ["Starters", "Mains", "From the Grill", "Bar"];

const menuItems = [
  {
    name: "Paneer Tikka",
    note: "The one everyone orders twice",
    tag: "Veg",
    img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2000&auto=format&fit=crop",
  },
  {
    name: "Chicken Tikka",
    note: "Smoky, straight off the grill",
    tag: "Non-Veg",
    img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2000&auto=format&fit=crop", // Placeholder
  },
  {
    name: "Veg Biryani",
    note: "A house favourite",
    tag: "Veg",
    img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2000&auto=format&fit=crop",
  },
  {
    name: "Chicken Coleslaw Salad",
    note: "Light, crunchy, a reviewer favourite",
    tag: "Non-Veg",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2000&auto=format&fit=crop",
  },
  {
    name: "Wood-Fired Pizza",
    note: "Because sometimes you just want pizza with a view",
    tag: "Veg/Non-Veg",
    img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2000&auto=format&fit=crop",
  },
];

export default function MenuPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("Starters");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;

      const totalScrollWidth = scrollContainer.scrollWidth - window.innerWidth;

      if (totalScrollWidth > 0) {
        let mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
          gsap.to(scrollContainer, {
            x: () => -(scrollContainer.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              pin: true,
              scrub: true,
              start: "top top",
              end: () => `+=${scrollContainer.scrollWidth - window.innerWidth}`,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-cream overflow-hidden py-24 flex flex-col"
    >
      <div className="px-6 md:px-24 mb-12">
        <h2 className="text-4xl md:text-6xl font-bold text-wine mb-4">
          A Taste Before You Arrive
        </h2>
        <p className="text-lg md:text-xl text-wine/80 max-w-2xl font-inter mb-8">
          Multi-cuisine, full bar, and a few dishes people genuinely will not
          stop ordering.
        </p>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full border transition-all duration-300 font-medium ${
                activeCategory === cat
                  ? "bg-wine text-cream border-wine"
                  : "bg-transparent text-wine border-wine/30 hover:border-wine"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Filmstrip */}
      <div className="flex-grow flex items-center w-full overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide">
        <div
          ref={scrollContainerRef}
          className="flex gap-8 px-6 md:px-24 pb-12 w-max"
        >
          {menuItems.map((item, i) => (
            <div
              key={i}
              className="w-[300px] md:w-[400px] flex-shrink-0 group cursor-pointer snap-center"
            >
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-6 shadow-xl">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 300px, 400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-cream/90 backdrop-blur text-wine px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {item.tag}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-wine mb-2">{item.name}</h3>
              <p className="text-wine/70 font-inter">{item.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-6 md:px-24 flex flex-col md:flex-row justify-between items-center gap-6 mt-auto">
        <div className="inline-flex items-center gap-2 bg-wasabi/30 text-wine font-medium px-6 py-3 rounded-xl border border-wasabi">
          <span>₹400–₹1,600 per person, depending on what you order</span>
        </div>

        <MagneticButton className="bg-algae text-wine font-bold px-8 py-4 rounded-full text-lg hover:bg-wine hover:text-cream transition-colors duration-300">
          View Full Menu
        </MagneticButton>
      </div>
    </section>
  );
}
