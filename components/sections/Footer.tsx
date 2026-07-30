"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-wine-black text-wasabi py-16 px-6 md:px-24 border-t border-wasabi/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Brand & Tagline */}
        <div className="flex flex-col gap-4 lg:col-span-1">
          <div className="flex flex-col gap-2">
            <Image src="/images/logo.png" alt="ODR Logo" width={64} height={64} className="object-contain" />
            <h2 className="text-3xl font-bold text-cream font-outfit">On Da Rocks</h2>
          </div>
          <p className="text-algae font-medium">East India's Biggest Sunset Bar & Grill</p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-bold text-cream mb-2 font-outfit">Explore</h3>
          <Link href="#about" className="hover:text-algae transition-colors w-fit">About</Link>
          <Link href="#menu" className="hover:text-algae transition-colors w-fit">Menu</Link>
          <Link href="#gallery" className="hover:text-algae transition-colors w-fit">Gallery</Link>
          <Link href="#events" className="hover:text-algae transition-colors w-fit">Events</Link>
          <Link href="#reserve" className="hover:text-algae transition-colors w-fit">Reserve</Link>
        </div>

        {/* Contact Block */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <h3 className="text-xl font-bold text-cream mb-2 font-outfit">Visit Us</h3>
          
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-algae flex-shrink-0 mt-1" />
            <p>Rock Garden, Gandhi Nagar, Kanke,<br />Ranchi, Jharkhand 834008</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-algae flex-shrink-0" />
            <p>073610 00066 · 073620 00066</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-algae flex-shrink-0" />
            <a href="mailto:odrranchi@gmail.com" className="hover:text-algae transition-colors">odrranchi@gmail.com</a>
          </div>
          
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-algae flex-shrink-0" />
            <p>Open daily, closes 12 AM</p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-wasabi/10 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="flex items-center gap-4">
          <a href="https://www.instagram.com/odrranchi/?hl=en" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-wine/50 flex items-center justify-center hover:bg-algae hover:text-wine transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-wine/50 flex items-center justify-center hover:bg-algae hover:text-wine transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
        </div>

        <p className="text-sm opacity-70">
          © {new Date().getFullYear()} On Da Rocks. Website by OnyxSavvy
        </p>
      </div>
    </footer>
  );
}
