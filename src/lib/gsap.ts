/**
 * ═══════════════════════════════════════════════════════════════
 * GSAP CONFIGURATION & PLUGIN REGISTRATION
 * ═══════════════════════════════════════════════════════════════
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

// Default ease for all animations
gsap.defaults({
  ease: 'power3.out',
  duration: 0.6,
});

// MatchMedia for responsive animations
export const matchMedia = gsap.matchMedia();

// Export configured gsap instance
export { gsap, ScrollTrigger };

// Helper function for split text animations
export const createSplitTextTimeline = (
  element: HTMLElement | null,
  vars: Record<string, unknown> = {}
) => {
  if (!element) return gsap.timeline();
  
  const words = element.querySelectorAll('.word');
  const chars = element.querySelectorAll('.char');
  
  return gsap.timeline().from(
    chars,
    {
      opacity: 0,
      y: 40,
      stagger: 0.02,
      duration: 0.8,
      ease: 'power4.out',
      ...vars,
    },
    0
  );
};

// Scroll-triggered word reveal
export const createWordReveal = (
  selector: string,
  options: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
  } = {}
) => {
  const elements = document.querySelectorAll(selector);
  const timelines: gsap.core.Animation[] = [];
  
  elements.forEach((el) => {
    const words = el.querySelectorAll('.word');
    
    words.forEach((word, i) => {
      const tl = gsap.to(word, {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: word,
          start: options.start || 'top 85%',
          end: options.end || 'top 65%',
          scrub: options.scrub ?? true,
        },
      });
      timelines.push(tl);
    });
  });
  
  return timelines;
};
