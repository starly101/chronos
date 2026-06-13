/**
 * ═══════════════════════════════════════════════════════════════
 * STARLY.DEV — MAIN PAGE
 * The Creative OS — 5 Section Experience
 * ═══════════════════════════════════════════════════════════════
 */

'use client';

import { useEffect, useRef, Suspense } from 'react';
import { gsap } from '@/lib/gsap';
import { Cursor, Navigation } from '@/components/ui';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';

// Placeholder sections - will be built in Phase 3
const HeroSection = () => (
  <section id="hero" className="relative h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-[#E8E0D0] mb-4">Hero Section</h1>
      <p className="text-[#4A4540]">WebGL Shader Coming in Phase 2</p>
    </div>
  </section>
);

const ManifestoSection = () => (
  <section id="manifesto" className="min-h-screen flex items-center justify-center py-20">
    <div className="max-w-4xl mx-auto px-6">
      <h2 className="text-[#E8E0D0] text-center">The Manifesto</h2>
      <p className="text-[#4A4540] text-center mt-8">Word-by-word reveal coming in Phase 3</p>
    </div>
  </section>
);

const WorkSection = () => (
  <section id="work" className="min-h-screen flex items-center justify-center py-20">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-[#E8E0D0] text-center mb-12">Selected Work</h2>
      <p className="text-[#4A4540] text-center">Interactive project cards coming in Phase 3</p>
    </div>
  </section>
);

const ServicesSection = () => (
  <section id="services" className="min-h-screen flex items-center justify-center py-20">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-[#E8E0D0] text-center mb-12">Services</h2>
      <p className="text-[#4A4540] text-center">Bento grid with live demos coming in Phase 3</p>
    </div>
  </section>
);

const ContactSection = () => (
  <section id="contact" className="min-h-screen flex items-center justify-center py-20">
    <div className="text-center">
      <h2 className="text-[#E8E0D0] mb-8">Let&apos;s build something unreasonable.</h2>
      <a href="mailto:hello@starly.dev" className="text-[#C8A96E] text-xl hover:underline">
        hello@starly.dev
      </a>
      <div className="flex gap-6 mt-8 justify-center">
        <a href="https://github.com/starly101" target="_blank" rel="noopener noreferrer" className="text-[#4A4540] hover:text-[#C8A96E]">
          GitHub
        </a>
        <a href="https://linkedin.com/in/starly101" target="_blank" rel="noopener noreferrer" className="text-[#4A4540] hover:text-[#C8A96E]">
          LinkedIn
        </a>
      </div>
      <footer className="mt-20 text-[#4A4540] text-sm">
        © 2025 Muhammad Ali — Lahore, Pakistan
      </footer>
    </div>
  </section>
);

function StarlyDevContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Page load sequence
    const tl = gsap.timeline();
    
    tl.to('.hero-canvas', { 
      opacity: 1, 
      duration: 0.6, 
      ease: 'power2.out',
      delay: 0.4 
    })
    .to('.nav-element', { 
      opacity: 1, 
      y: 0, 
      duration: 0.6, 
      ease: 'power3.out',
      delay: 1.0 
    }, '-=0.2')
    .to('.hero-text', { 
      opacity: 1, 
      y: 0, 
      duration: 0.8, 
      ease: 'power4.out',
      delay: 1.5 
    }, '-=0.3')
    .to('.scroll-indicator', { 
      opacity: 1, 
      duration: 0.4 
    }, '-=0.2');

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <Cursor />
      <Navigation />
      
      <main>
        <Suspense fallback={<div className="h-screen bg-[#0C0C0A]" />}>
          <HeroSection />
          <ManifestoSection />
          <WorkSection />
          <ServicesSection />
          <ContactSection />
        </Suspense>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <SmoothScrollProvider>
      <StarlyDevContent />
    </SmoothScrollProvider>
  );
}
