/**
 * ═══════════════════════════════════════════════════════════════
 * LENIS HOOK
 * Provides access to Lenis smooth scroll instance
 * ═══════════════════════════════════════════════════════════════
 */

'use client';

import { useContext } from 'react';
import { SmoothScrollContext } from '@/components/providers/SmoothScrollProvider';

export const useLenis = () => {
  const context = useContext(SmoothScrollContext);
  
  if (!context) {
    throw new Error('useLenis must be used within a SmoothScrollProvider');
  }
  
  return context;
};

export default useLenis;
