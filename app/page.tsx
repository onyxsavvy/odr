import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import MenuPreview from "@/components/sections/MenuPreview";
import Gallery from "@/components/sections/Gallery";
import Events from "@/components/sections/Events";
import Testimonials from "@/components/sections/Testimonials";
import Visit from "@/components/sections/Visit";
import Reserve from "@/components/sections/Reserve";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="flex flex-col w-full relative">
      <Hero />
      <About />
      <Experience />
      <MenuPreview />
      <Gallery />
      <Events />
      <Testimonials />
      <Visit />
      <Reserve />
      <Footer /> 
    </main>
  );
}
