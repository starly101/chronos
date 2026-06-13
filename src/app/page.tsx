import Navigation from "@/components/Navigation";
import Cursor from "@/components/Cursor";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import {
  HeroSection,
  ManifestoSection,
  WorkSection,
  ServicesSection,
  ContactSection,
} from "@/components/sections";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-dark-900 text-light-100 overflow-hidden">
        <Navigation />
        <Cursor />
        
        <main>
          <HeroSection />
          <ManifestoSection />
          <WorkSection />
          <ServicesSection />
          <ContactSection />
        </main>
      </div>
    </SmoothScrollProvider>
  );
}
