'use client';

import { HeroSection } from '@/components/sections';
import Navigation from '@/components/Navigation';
import Cursor from '@/components/Cursor';
import SmoothScrollProvider from '@/providers/SmoothScrollProvider';

export default function Home() {
  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-dark-900 text-light-100">
        <Cursor />
        <Navigation />
        <main>
          <HeroSection />
        </main>
      </div>
    </SmoothScrollProvider>
  );
}
