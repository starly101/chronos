'use client';

import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamic import for SSR safety
const HeroShader = dynamic(() => import('./HeroShader'), { ssr: false });

interface HeroSceneProps {
  mousePosition: { x: number; y: number };
}

export default function HeroScene({ mousePosition }: HeroSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 1], fov: 75 }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
    >
      <Suspense fallback={null}>
        {/* Main Voronoi Shader */}
        <HeroShader mousePosition={mousePosition} />
        
        {/* Post-Processing Effects */}
        <EffectComposer disableNormalPass>
          {/* Bloom for glow effect on shader peaks */}
          <Bloom
            luminanceThreshold={0.6}
            luminanceSmoothing={0.9}
            intensity={0.5}
            radius={0.8}
          />
          
          {/* Subtle chromatic aberration at edges for cinematic feel */}
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.002, 0.002]}
          />
          
          {/* Film grain for texture */}
          <Noise
            blendFunction={BlendFunction.OVERLAY}
            opacity={0.05}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
