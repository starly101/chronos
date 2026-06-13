'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import HeroShader from '@/components/webgl/HeroShader';
import { useMousePosition } from '@/hooks/useMousePosition';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const mousePosition = useMousePosition();
  const email = 'ali@starly.dev';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in section on scroll
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, scale: 1.05 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stagger reveal of content elements
      gsap.fromTo(
        '.contact-content > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
    >
      {/* Background WebGL Shader - Reduced Opacity */}
      <div className="absolute inset-0 z-0 opacity-[0.15]">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          dpr={[1, 2]}
          gl={{ antialias: false, alpha: false }}
        >
          <Suspense fallback={null}>
            <HeroShader mousePosition={mousePosition} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="contact-content relative z-10 text-center max-w-5xl mx-auto">
        {/* Main CTA Text */}
        <h2 className="text-display-1 md:text-[clamp(4rem,12vw,9rem)] font-bold text-light-100 mb-12 tracking-tight">
          Let&apos;s build something unreasonable.
        </h2>

        {/* Email Link with Copy Functionality */}
        <div className="mb-16">
          <button
            onClick={handleCopyEmail}
            className="group relative inline-block"
          >
            <span className="text-heading-1 md:text-display-3 text-accent-gold hover:text-light-100 transition-colors duration-300 font-mono">
              {email}
            </span>
            
            {/* Hover clip-path reveal effect */}
            <span className="absolute inset-0 bg-accent-gold text-dark-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 clip-path-diagonal">
              Copied!
            </span>

            {/* Underline animation */}
            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-accent-gold group-hover:w-full transition-all duration-500 ease-out" />
          </button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-8">
          {/* GitHub */}
          <a
            href="https://github.com/starly101"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 flex items-center justify-center border border-light-300 rounded-full group-hover:border-accent-gold group-hover:rotate-15 group-hover:scale-110 transition-all duration-300">
              <svg className="w-6 h-6 text-light-300 group-hover:text-accent-gold transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.435-2.385 1.155-3.255-.225-.405-.51-1.29.105-2.67 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.615 1.38.33 2.265.105 2.67.72.87 1.155 1.95 1.155 3.255 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </div>
            <span className="text-label text-light-300 group-hover:text-accent-gold transition-colors">GitHub</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/starly101"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 flex items-center justify-center border border-light-300 rounded-full group-hover:border-accent-gold group-hover:rotate-15 group-hover:scale-110 transition-all duration-300">
              <svg className="w-6 h-6 text-light-300 group-hover:text-accent-gold transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <span className="text-label text-light-300 group-hover:text-accent-gold transition-colors">LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 right-6 z-10">
        <p className="text-body-sm text-light-300">
          © 2025 Muhammad Ali — Lahore, Pakistan
        </p>
      </footer>

      {/* Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 z-5 bg-gradient-to-t from-dark-900 via-transparent to-dark-900 opacity-20" />
    </section>
  );
}
