// Colours are written directly in sRGB: ShaderMaterial output is not colour-managed.

export const facadeVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const skyFragment = /* glsl */ `
varying vec2 vUv;
void main() {
  vec3 top = vec3(0.067, 0.11, 0.137);
  vec3 mid = vec3(0.098, 0.153, 0.188);
  vec3 horizon = vec3(0.235, 0.29, 0.31);
  float t = vUv.y;
  vec3 c = mix(horizon, mid, smoothstep(0.3, 0.6, t));
  c = mix(c, top, smoothstep(0.6, 1.0, t));
  gl_FragColor = vec4(c, 1.0);
}
`

export const facadeFragment = /* glsl */ `
uniform sampler2D uMask;
uniform float uTime;
uniform vec2 uSize;
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < OCTAVES; i++) {
    v += a * noise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 w = vUv * uSize;               // metres on the facade
  vec2 cell = vec2(1.5, 3.75);        // one glass panel per floor
  vec2 id = floor(w / cell);
  vec2 g = fract(w / cell);

  // Mullions, transoms and the opaque spandrel at each slab
  float mx = 1.0 - smoothstep(0.0, 0.04, g.x) * smoothstep(1.0, 0.96, g.x);
  float my = 1.0 - smoothstep(0.0, 0.025, g.y) * smoothstep(1.0, 0.975, g.y);
  float frame = max(mx, my);
  float spandrel = smoothstep(0.17, 0.155, g.y);

  // Glass reflecting the dusk sky, slightly different per panel
  float rnd = hash(id);
  vec3 deep = vec3(0.063, 0.098, 0.122);
  vec3 skyRefl = vec3(0.2, 0.27, 0.32);
  float refl = g.y * 0.45 + fbm(vec2(w.x * 0.04 + rnd, w.y * 0.012)) * 0.55;
  vec3 glass = mix(deep, skyRefl, refl) + (rnd - 0.5) * 0.04;
  float lit = step(0.94, hash(id + 17.3));
  glass += lit * vec3(0.09, 0.085, 0.07) * (0.5 + 0.5 * g.y);

  // A slow diagonal sheen that only clean glass shows
  float band = fract((w.x * 0.35 + w.y * 0.2) * 0.045 - uTime * 0.012);
  float sheen = exp(-pow((band - 0.5) * 12.0, 2.0)) * 0.16;
  vec3 clean = glass * 1.06 + vec3(0.82, 0.9, 0.94) * sheen + vec3(0.02, 0.022, 0.024);

  // Grime: vertical run-off streaks plus blotches
  float streak = fbm(vec2(w.x * 1.6, w.y * 0.16));
  float blot = fbm(w * 0.33 + 3.1);
  float dirt = clamp(streak * 0.75 + blot * 0.45 - 0.18, 0.0, 1.0);
  vec3 grime = vec3(0.29, 0.28, 0.235);
  vec3 dirty = mix(glass * 0.7, grime, dirt * 0.75);

  float m = texture2D(uMask, vUv).r;
  float cm = smoothstep(0.05, 0.9, m);
  vec3 col = mix(dirty, clean, cm);

  // Wet sheen where the jet has just passed
  float edge = m * (1.0 - m) * 4.0;
  col += vec3(0.85, 0.9, 0.92) * edge * 0.05;

  // Spandrel panels: matte, dirt still shows but less
  vec3 span = mix(vec3(0.13, 0.17, 0.2), vec3(0.24, 0.235, 0.2), dirt * 0.55 * (1.0 - cm));
  col = mix(col, span, spandrel);

  vec3 frameCol = vec3(0.085, 0.095, 0.1) + 0.03 * g.y;
  col = mix(col, frameCol, frame);

  gl_FragColor = vec4(col, 1.0);
}
`
