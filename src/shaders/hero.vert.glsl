// src/shaders/hero.vert.glsl
precision highp float;

uniform float uTime;
uniform vec2 uMouse;
uniform float uPixelRatio;

varying vec2 vUv;
varying vec3 vPosition;
varying float vDisplacement;

// Simplex noise functions
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Fractal Brownian Motion
float fbm(vec2 st) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 0.0;
  
  for (int i = 0; i < 5; i++) {
    value += amplitude * snoise(st);
    st *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

// Voronoi noise
float voronoi(vec2 st) {
  vec2 n = floor(st);
  vec2 f = fract(st);
  
  float m = 8.0;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 o = vec2(sin(dot(n + g, vec2(12.9898, 78.233))), 
                    cos(dot(n + g, vec2(12.9898, 78.233)))) * 0.5 + 0.5;
      vec2 diff = g + o - f;
      float d = length(diff);
      m = min(m, d);
    }
  }
  return m;
}

void main() {
  vUv = uv;
  
  // Base displacement from FBM
  float noiseValue = fbm(uv * 3.0 + uTime * 0.1);
  
  // Add Voronoi cellular pattern
  float voronoiValue = voronoi(uv * 4.0 + uTime * 0.05);
  
  // Mouse interaction - gravity well effect
  vec2 mouseDist = uv - uMouse;
  float mouseInfluence = exp(-length(mouseDist) * 3.0);
  float mouseDisplacement = mouseInfluence * 0.5;
  
  // Combine all displacement sources
  vDisplacement = noiseValue * 0.3 + voronoiValue * 0.2 + mouseDisplacement;
  
  // Apply displacement to vertex position
  vec3 newPosition = position;
  newPosition.z += vDisplacement * 2.0;
  
  vPosition = newPosition;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
