/**
 * ═══════════════════════════════════════════════════════════════
 * SMOOTH SCROLL PROVIDER
 * Lenis + GSAP ScrollTrigger integration
 * ═══════════════════════════════════════════════════════════════
 */

'use client';

import { ReactNode, useEffect, useRef, createContext } from 'react';
import Lenis from 'lenis';
import { gsap } from '@/lib/gsap';

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: any) => void;
}

export const SmoothScrollContext = createContext<SmoothScrollContextType | undefined>(undefined);

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Sync with GSAP ScrollTrigger
    lenis.on('scroll', () => {
      gsap.ticker.emit('tick');
    });

    // Connect GSAP ticker to Lenis RAF
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable smooth scroll for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      lenis.destroy();
      lenisRef.current = null;
    }

    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
    };
  }, []);

  const scrollTo = (target: string | number | HTMLElement, options?: any) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: 0,
        immediate: false,
        lock: false,
        ...options,
      });
    } else {
      // Fallback to native scroll
      if (typeof target === 'string') {
        const element = document.querySelector(target);
        element?.scrollIntoView({ behavior: 'smooth', ...options });
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth', ...options });
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth', ...options });
      }
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

export default SmoothScrollProvider;
