// src/shaders/hero.frag.glsl
precision highp float;

uniform float uTime;
uniform vec2 uMouse;
uniform vec3 uColorBg;
uniform vec3 uColorSurface;
uniform vec3 uColorAccent;
uniform vec3 uColorGlow;

varying vec2 vUv;
varying vec3 vPosition;
varying float vDisplacement;

void main() {
  // Base color from background
  vec3 color = uColorBg;
  
  // Add surface color based on displacement height
  float heightFactor = smoothstep(0.0, 1.0, vDisplacement);
  color = mix(color, uColorSurface, heightFactor * 0.5);
  
  // Add accent color at peaks
  float peakFactor = smoothstep(0.6, 1.0, vDisplacement);
  color = mix(color, uColorAccent, peakFactor * 0.4);
  
  // Add glow effect around mouse position
  vec2 mouseDist = vUv - uMouse;
  float mouseGlow = exp(-length(mouseDist) * 2.0);
  color = mix(color, uColorGlow, mouseGlow * 0.3);
  
  // Add subtle fresnel-like edge brightening
  float edgeFactor = 1.0 - smoothstep(0.0, 1.0, length(vUv - 0.5) * 2.0);
  color += uColorGlow * edgeFactor * 0.15;
  
  // Apply gamma correction
  color = pow(color, vec3(1.0 / 2.2));
  
  gl_FragColor = vec4(color, 1.0);
}
