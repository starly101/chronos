'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { ShaderMaterial } from 'three';
import * as THREE from 'three';

import vertexShaderSource from '@/shaders/hero.vert.glsl';
import fragmentShaderSource from '@/shaders/hero.frag.glsl';

interface HeroShaderProps {
  mousePosition: { x: number; y: number };
}

export default function HeroShader({ mousePosition }: HeroShaderProps) {
  const materialRef = useRef<ShaderMaterial>(null);
  const { size, viewport } = useThree();

  // Volcanic Dark palette - converted to normalized RGB (0-1 range)
  const colors = useMemo(
    () => ({
      bg: new THREE.Color('#0C0C0A'), // #0C0C0A → (0.047, 0.047, 0.039)
      surface: new THREE.Color('#141412'),
      accent: new THREE.Color('#C8A96E'),
      glow: new THREE.Color('#D4B896'),
    }),
    []
  );

  useFrame((state) => {
    if (!materialRef.current) return;

    const time = state.clock.getElapsedTime();

    // Normalize mouse position to 0-1 range
    const mouseX = (mousePosition.x / size.width) || 0.5;
    const mouseY = 1.0 - (mousePosition.y / size.height) || 0.5;

    materialRef.current.uniforms.uTime.value = time;
    materialRef.current.uniforms.uMouse.value.set(mouseX, mouseY);
    materialRef.current.uniforms.uPixelRatio.value = Math.min(
      state.viewport.dpr,
      2
    );
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uPixelRatio: { value: 1 },
      uColorBg: { value: colors.bg },
      uColorSurface: { value: colors.surface },
      uColorAccent: { value: colors.accent },
      uColorGlow: { value: colors.glow },
    }),
    [colors]
  );

  return (
    <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[viewport.width * 3, viewport.height * 3, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShaderSource}
        fragmentShader={fragmentShaderSource}
        uniforms={uniforms}
        transparent={false}
        depthWrite={false}
      />
    </mesh>
  );
}
