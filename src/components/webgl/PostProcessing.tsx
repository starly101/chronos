'use client';

import { EffectComposer } from '@react-three/postprocessing';
import { Bloom, ChromaticAberration, Noise, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

export default function PostProcessing() {
  return (
    <EffectComposer disableNormalPass>
      <Bloom
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
        height={300}
        intensity={0.5}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={[0.002, 0.002]}
      />
      <Noise
        blendFunction={BlendFunction.OVERLAY}
        opacity={0.05}
        premultiply={false}
      />
      <Vignette
        blendFunction={BlendFunction.NORMAL}
        darkness={1.0}
        offset={0.4}
      />
    </EffectComposer>
  );
}
