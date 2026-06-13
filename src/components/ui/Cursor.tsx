/**
 * ═══════════════════════════════════════════════════════════════
 * CUSTOM CURSOR COMPONENT
 * Magnetic cursor with lerp-follow outer ring
 * ═══════════════════════════════════════════════════════════════
 */

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { CURSOR, TIMING } from '@/lib/constants';

interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  isText: boolean;
}

export const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  
  const stateRef = useRef<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    isText: false,
  });

  const outerPosRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  // Lerp function for smooth follow
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  // Animation loop
  const animate = useCallback(() => {
    const { x, y, isHovering } = stateRef.current;
    
    // Inner dot follows exactly
    if (innerRef.current) {
      innerRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      
      if (isHovering) {
        innerRef.current.style.width = `${CURSOR.hoverScale * CURSOR.size}px`;
        innerRef.current.style.height = `${CURSOR.hoverScale * CURSOR.size}px`;
      } else {
        innerRef.current.style.width = `${CURSOR.size}px`;
        innerRef.current.style.height = `${CURSOR.size}px`;
      }
    }
    
    // Outer ring follows with lerp delay
    outerPosRef.current.x = lerp(outerPosRef.current.x, x, TIMING.cursorLerpFactor);
    outerPosRef.current.y = lerp(outerPosRef.current.y, y, TIMING.cursorLerpFactor);
    
    if (outerRef.current) {
      outerRef.current.style.transform = `translate(${outerPosRef.current.x}px, ${outerPosRef.current.y}px) translate(-50%, -50%)`;
    }
    
    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      stateRef.current.x = e.clientX;
      stateRef.current.y = e.clientY;
    };

    const handleMouseDown = () => {
      if (innerRef.current) {
        innerRef.current.style.transform += ' scale(0.8)';
      }
    };

    const handleMouseUp = () => {
      if (innerRef.current) {
        innerRef.current.style.transform = innerRef.current.style.transform.replace(' scale(0.8)', '');
      }
    };

    // Check for hoverable elements
    const checkHoverTarget = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isTextElement = ['H1', 'H2', 'H3', 'P', 'A', 'SPAN', 'LABEL'].includes(target.tagName);
      const isInteractive = target.closest('button, a, [role="button"], input, select, textarea') !== null;
      
      stateRef.current.isText = isTextElement && !isInteractive;
      stateRef.current.isHovering = isInteractive || isTextElement;
      
      if (cursorRef.current) {
        if (stateRef.current.isText) {
          cursorRef.current.classList.add('custom-cursor--text');
        } else {
          cursorRef.current.classList.remove('custom-cursor--text');
        }
        
        if (stateRef.current.isHovering) {
          cursorRef.current.classList.add('custom-cursor--hover');
        } else {
          cursorRef.current.classList.remove('custom-cursor--hover');
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', checkHoverTarget, { passive: true });

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animate);

    // Hide default cursor globally
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', checkHoverTarget);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Restore default cursor
      document.body.style.cursor = '';
    };
  }, [animate]);

  // Don't render cursor on reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div 
      ref={cursorRef}
      className="custom-cursor"
      aria-hidden="true"
    >
      <div 
        ref={innerRef}
        className="custom-cursor__inner"
      />
      <div 
        ref={outerRef}
        className="custom-cursor__outer"
      />
    </div>
  );
};

export default Cursor;
