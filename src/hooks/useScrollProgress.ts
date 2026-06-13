/**
 * ═══════════════════════════════════════════════════════════════
 * SCROLL PROGRESS HOOK
 * Tracks scroll progress for sections and elements
 * ═══════════════════════════════════════════════════════════════
 */

'use client';

import { useEffect, useState, useCallback } from 'react';

interface ScrollProgress {
  scrollY: number;
  scrollPercentage: number; // 0 to 1
  sectionProgress: Record<string, number>;
}

export const useScrollProgress = () => {
  const [progress, setProgress] = useState<ScrollProgress>({
    scrollY: 0,
    scrollPercentage: 0,
    sectionProgress: {},
  });

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = docHeight > 0 ? scrollY / docHeight : 0;
    
    setProgress((prev) => ({
      ...prev,
      scrollY,
      scrollPercentage,
    }));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Get progress for a specific element
  const getElementProgress = useCallback((element: HTMLElement | null) => {
    if (!element) return 0;
    
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const elementTop = rect.top + window.scrollY;
    const elementHeight = rect.height;
    
    const scrollPosition = window.scrollY + viewportHeight / 2;
    const start = elementTop;
    const end = elementTop + elementHeight;
    
    if (scrollPosition < start) return 0;
    if (scrollPosition > end) return 1;
    
    return (scrollPosition - start) / (end - start);
  }, []);

  return { ...progress, getElementProgress };
};

// Hook for checking if element is in viewport
export const useInViewport = (
  elementRef: React.RefObject<HTMLElement | null>,
  threshold = 0.2
) => {
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, threshold]);

  return isInViewport;
};

export default useScrollProgress;
