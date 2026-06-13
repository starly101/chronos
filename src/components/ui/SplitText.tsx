/**
 * ═══════════════════════════════════════════════════════════════
 * SPLIT TEXT COMPONENT
 * Wraps text in spans for character/word-level animations
 * Uses Splitting.js for reliable text splitting
 * ═══════════════════════════════════════════════════════════════
 */

'use client';

import { useEffect, useRef } from 'react';
import Splitting from 'splitting';

interface SplitTextProps {
  children: string;
  by?: 'words' | 'chars' | 'lines';
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  onComplete?: () => void;
}

export const SplitText = ({
  children,
  by = 'words',
  className = '',
  as = 'span',
  onComplete,
}: SplitTextProps) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      // Initialize Splitting
      const results = Splitting({
        target: elementRef.current,
        by: by === 'chars' ? 'chars' : by === 'lines' ? 'lines' : 'words',
      });

      // Add initial styles for animation
      const elements = by === 'chars' 
        ? elementRef.current.querySelectorAll('.char')
        : elementRef.current.querySelectorAll('.word');
      
      elements.forEach((el) => {
        el.classList.add('split-text-element');
      });

      // Trigger callback after split is complete
      if (onComplete) {
        onComplete();
      }
    }

    return () => {
      // Cleanup Splitting if needed
      if (elementRef.current) {
        // Splitting doesn't have a destroy method, but we can clean up classes
        const elements = elementRef.current.querySelectorAll('.split-text-element');
        elements.forEach((el) => {
          el.classList.remove('split-text-element');
        });
      }
    };
  }, [children, by, onComplete]);

  const Component = as;

  return (
    <Component
      ref={elementRef}
      className={`split-text ${className}`}
      data-splitting={by}
    >
      {children}
    </Component>
  );
};

export default SplitText;
