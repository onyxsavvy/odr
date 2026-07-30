"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.8;
      
      setIsScrolled(scrollY > threshold);

      // Scroll spy logic
      const sections = ["about", "experience", "menu", "gallery", "events", "testimonials", "visit", "reserve"];
      let current = "";

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
            current = section;
            break;
          }
        }
      }
      
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  if (pathname !== "/") {
    return (
      <nav className="fixed top-0 left-0 w-full z-50 py-4 px-6 md:px-12 bg-wine/80 backdrop-blur-md border-b border-wasabi/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.png" alt="ODR Logo" width={48} height={48} className="object-contain" />
          </Link>
          <Link 
            href="/#reserve" 
            onClick={(e) => handleNavClick(e, 'reserve')}
            className="bg-algae text-wine px-6 py-2 rounded-full font-bold hover:bg-cream transition-colors"
          >
            Reserve
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <AnimatePresence>
      {isScrolled && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl rounded-full bg-wine/60 backdrop-blur-lg border border-wasabi/20 px-6 py-3 flex items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
        >
          <Link href="#home" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center">
            <Image src="/images/logo.png" alt="ODR Logo" width={40} height={40} className="object-contain" />
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {["About", "Experience", "Menu", "Gallery", "Events"].map((item) => {
              const id = item.toLowerCase();
              return (
                <Link 
                  key={item} 
                  href={`#${id}`}
                  onClick={(e) => handleNavClick(e, id)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === id ? "text-algae" : "text-wasabi hover:text-cream"
                  }`}
                >
                  {item}
                </Link>
              );
            })}
          </div>

          <Link 
            href="#reserve" 
            onClick={(e) => handleNavClick(e, 'reserve')}
            className="bg-algae text-wine px-6 py-2 rounded-full font-bold hover:bg-cream transition-colors text-sm"
          >
            Reserve
          </Link>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
