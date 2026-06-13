'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import HeroScene from '@/components/webgl/HeroScene';
import SplitText from '@/components/SplitText';

const HERO_TEXT_PRIMARY = "We build the web's unreasonable things.";
const HERO_TEXT_SECONDARY = "For the ones who want something that doesn't exist yet.";

interface HeroSectionProps {
  mousePosition: { x: number; y: number };
}

export default function HeroSection({ mousePosition }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Page load sequence
    const tl = gsap.timeline({
      onComplete: () => setIsLoaded(true),
    });

    // Canvas fade in (handled by CSS initially)
    tl.to({}, { duration: 0.6 }, 0.4);

    // Nav fade in
    if (navRef.current) {
      tl.fromTo(
        navRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        1.0
      );
    }

    // Hero text reveal
    if (textRef.current) {
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        1.5
      );
    }

    // Scroll indicator
    if (scrollIndicatorRef.current) {
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        2.0
      );

      // Animate scroll indicator
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2.4,
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* WebGL Background */}
      <div className="absolute inset-0 z-0">
        <HeroScene mousePosition={mousePosition} />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        {/* Hero Text */}
        <div ref={textRef} className="text-center">
          <h1 className="font-syne text-display-1 font-bold tracking-tight text-light-100">
            <SplitText
              text={HERO_TEXT_PRIMARY}
              className="inline-block"
              splitBy="words"
            />
          </h1>
          
          <h2 className="mt-6 font-instrument-sans text-heading-2 font-light tracking-wide text-light-200 opacity-90">
            <SplitText
              text={HERO_TEXT_SECONDARY}
              className="inline-block"
              splitBy="words"
            />
          </h2>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-label uppercase tracking-widest text-light-300">
              Scroll
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-accent-gold"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Gradient Overlay for better text readability */}
      <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-b from-dark-900/50 via-transparent to-dark-900/30" />
    </section>
  );
}
