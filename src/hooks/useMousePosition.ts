/**
 * ═══════════════════════════════════════════════════════════════
 * MOUSE POSITION HOOK
 * Tracks global mouse position with normalized coordinates
 * ═══════════════════════════════════════════════════════════════
 */

'use client';

import { useEffect, useState, useCallback } from 'react';

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // 0 to 1
  normalizedY: number; // 0 to 1
}

export const useMousePosition = () => {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;
    
    setPosition({
      x: clientX,
      y: clientY,
      normalizedX: clientX / innerWidth,
      normalizedY: clientY / innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return position;
};

// Hook for element-relative mouse position
export const useElementMousePosition = (elementRef: React.RefObject<HTMLElement | null>) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!elementRef.current) return;
      
      const rect = elementRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      setPosition({ x, y });
    },
    [elementRef]
  );

  const handleMouseEnter = useCallback(() => setIsInside(true), []);
  const handleMouseLeave = useCallback(() => setIsInside(false), []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [elementRef, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return { ...position, isInside };
};

export default useMousePosition;
