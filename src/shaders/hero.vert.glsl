#version 300 es

precision highp float;

uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

// Voronoi noise function
vec3 voronoi(vec3 x) {
    vec3 p = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    
    vec2 k = 31.0 * p.xy + p.z;
    k = fract(k * 0.316227766);
    p.x += step(k.x, k.y);
    p.y += step(k.y, k.x);
    vec2 a = k;
    k.x = abs(a.x - 1.0);
    k.y = abs(a.y - 1.0);
    vec2 b = k;
    k.x = abs(a.x - b.y);
    k.y = abs(a.y - b.x);
    vec2 c = k;
    k.x = abs(a.x - c.y);
    k.y = abs(a.y - c.x);
    vec2 d = k;
    
    vec3 res = min(min(min(a, b), c), d);
    return res;
}

// Fractal Brownian Motion
float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    
    for (int i = 0; i < 5; i++) {
        value += amplitude * sin(p.x + p.y * 0.5 + p.z * 0.2);
        p.xy *= rot;
        p = p * 2.02;
        amplitude *= 0.5;
    }
    return value;
}

// Simplex noise
vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
            
    float n_ = 1.0 / 7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    m = m * m;
    
    vec4 px = vec4(dot(x0, p0), dot(x1, p1), dot(x2, p2), dot(x3, p3));
    return 42.0 * dot(m, px);
}

void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normal;
    
    vec2 uv = vUv;
    vec2 centeredUv = uv - 0.5;
    
    // Mouse gravity well
    vec2 mouseDist = centeredUv - (uMouse - 0.5);
    float mouseDistLength = length(mouseDist);
    float mouseInfluence = smoothstep(0.5, 0.0, mouseDistLength) * 0.3;
    
    float animatedTime = uTime * 0.3;
    
    // Voronoi cellular pattern
    vec3 noiseCoord = vec3(uv * 4.0 + animatedTime, animatedTime * 0.5);
    vec3 voronoiPattern = voronoi(noiseCoord);
    
    // FBM detail
    float fbmValue = fbm(vec3(uv * 6.0, animatedTime));
    
    // Simplex base
    float simplexValue = snoise(vec3(uv * 3.0, animatedTime * 0.8));
    
    // Combine noises
    float combinedNoise = (voronoiPattern.r + voronoiPattern.g + voronoiPattern.b) / 3.0;
    combinedNoise = mix(combinedNoise, fbmValue, 0.4);
    combinedNoise = mix(combinedNoise, simplexValue, 0.3);
    combinedNoise += mouseInfluence * sin(animatedTime * 2.0);
    
    // Displacement
    float displacement = combinedNoise * 0.5 + mouseInfluence;
    float breath = sin(animatedTime * 0.5) * 0.1;
    
    vec3 newPosition = position;
    newPosition.z += displacement + breath;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
