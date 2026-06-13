'use client';

import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { HeroShader, PostProcessing } from '@/components/webgl';
import { useMousePosition } from '@/hooks/useMousePosition';
import SplitText from '@/components/ui/SplitText';

export default function HeroSection() {
  const mousePosition = useMousePosition();
  const [isLoaded, setIsLoaded] = useState(false);
  const [heroText, setHeroText] = useState('');
  
  const fullText = "We build the web's unreasonable things.";

  useEffect(() => {
    // Typewriter effect for hero text
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setHeroText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Mark as loaded after initial delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* WebGL Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          dpr={[1, 2]}
          gl={{ antialias: false, alpha: false }}
        >
          <Suspense fallback={null}>
            <HeroShader mousePosition={mousePosition} />
            <PostProcessing />
          </Suspense>
        </Canvas>
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <div 
          className={`transform transition-all duration-1000 ease-out ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h1 className="text-display-1 font-bold tracking-tight text-light-100">
            <SplitText
              text={heroText}
              className="inline-block"
              animation="reveal"
              delay={1500}
            />
            <span className="animate-pulse text-accent-gold">|</span>
          </h1>
          
          <p 
            className={`mt-6 text-body-lg text-light-200 transition-all duration-1000 delay-500 ease-out ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            For the ones who want something that doesn&apos;t exist yet.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div 
          className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ease-out ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-label text-accent-gold">Scroll</span>
            <div className="h-12 w-[1px] bg-gradient-to-b from-accent-gold to-transparent">
              <div className="h-4 w-full animate-bounce bg-accent-gold" />
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay for depth */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-dark-900 via-transparent to-dark-900 opacity-30" />
    </section>
  );
}
