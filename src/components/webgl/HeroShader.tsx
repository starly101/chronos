'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { extend, ShaderMaterial, ReactThreeFiber } from '@react-three/fiber';
import * as THREE from 'three';

// Import shader code as strings
import vertexShaderSource from '@/shaders/hero.vert.glsl';
import fragmentShaderSource from '@/shaders/hero.frag.glsl';

interface HeroShaderProps {
  mousePosition: { x: number; y: number };
  isHovering?: boolean;
}

// Custom shader material component
function VoronoiMaterial({
  uTime,
  uMouse,
  uResolution,
}: {
  uTime: number;
  uMouse: [number, number];
  uResolution: [number, number];
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: uTime },
      uMouse: { value: new THREE.Vector2(uMouse[0], uMouse[1]) },
      uResolution: { value: new THREE.Vector2(uResolution[0], uResolution[1]) },
      uHover: { value: 0.0 },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * 0.3;
      materialRef.current.uniforms.uMouse.value.lerp(
        new THREE.Vector2(uMouse[0], uMouse[1]),
        0.1
      );
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShaderSource}
      fragmentShader={fragmentShaderSource}
      uniforms={uniforms}
      transparent={false}
      side={THREE.DoubleSide}
    />
  );
}

export default function HeroShader({ mousePosition, isHovering = false }: HeroShaderProps) {
  const { size } = useThree();
  
  // Convert mouse position to normalized device coordinates
  const normalizedMouse = useMemo(() => {
    return [
      mousePosition.x / (typeof window !== 'undefined' ? window.innerWidth : 1),
      1.0 - mousePosition.y / (typeof window !== 'undefined' ? window.innerHeight : 1),
    ] as [number, number];
  }, [mousePosition]);

  const resolution = useMemo(
    () => [size.width, size.height] as [number, number],
    [size.width, size.height]
  );

  return (
    <group>
      {/* Main Voronoi Displacement Plane */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[2, 2, 128, 128]} />
        <VoronoiMaterial
          uTime={0}
          uMouse={normalizedMouse}
          uResolution={resolution}
        />
      </mesh>
    </group>
  );
}
