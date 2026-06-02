'use client';

import { ReactNode, useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface LenisContextType {
  lenis: Lenis | null;
  scrollVelocity: number;
}

const LenisContext = React.createContext<LenisContextType>({ lenis: null, scrollVelocity: 0 });

export function useLenis() {
  const context = React.useContext(LenisContext);
  if (!context) throw new Error('useLenis must be used within LenisProvider');
  return context;
}

export default function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [scrollVelocity, setScrollVelocity] = useState(0);

  useEffect(() => {
    const l = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    gsap.registerPlugin(ScrollTrigger);
    gsap.ticker.add((time) => l.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    l.on('scroll', ScrollTrigger.update);
    l.on('scroll', ({ velocity }) => {
      setScrollVelocity((prev) => prev + (Math.abs(velocity) - prev) * 0.1);
    });

    setLenis(l);
    return () => {
      l.destroy();
      gsap.ticker.remove(l.raf);
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis, scrollVelocity }}>
      {children}
    </LenisContext.Provider>
  );
}
