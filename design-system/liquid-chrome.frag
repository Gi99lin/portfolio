// Liquid chrome surface, v2 (2026-10-23).
// The animated background chosen for the portfolio design system ("chrome as atmosphere").
//
// Draw it as one full-screen triangle (vertices -1,-1  3,-1  -1,3) with this vertex shader:
//   attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }
//
// Uniforms
//   uR   canvas size in device pixels (width, height)
//   uT   time in seconds
//   uRef reference length in device pixels: 560 CSS px * render scale. Keeping it fixed keeps the
//        metal and the cursor ripple at the same size on any screen. Normalizing by the canvas
//        height instead (v1) blew both up on tall screens and made the noise cells visible.
//   uM   cursor position in the same space as p below: (x_px / uRef, y_px / uRef), y up
//   uS   ripple strength 0..1: ease it toward 1 while the cursor is over the page, toward 0 after
//
// Render scale used in the mockups: min(devicePixelRatio, 2) * 0.85.
// Quintic fade in noise() (instead of smoothstep) removes the cell seams that showed up in the
// reflections as "render squares".
// For the dimmed "dark mercury" look, put a layer above the canvas:
//   linear-gradient(180deg, rgba(8,9,11,.62), rgba(8,9,11,.82) 45%, rgba(8,9,11,.9))

precision highp float;
uniform vec2 uR; uniform float uT; uniform vec2 uM; uniform float uS; uniform float uRef;

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }

float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p){
  float v = 0.0; float a = 0.5;
  for (int i = 0; i < 4; i++){ v += a * noise(p); p = p * 2.03 + vec2(1.7, 9.2); a *= 0.5; }
  return v;
}

float height(vec2 p){
  vec2 q = vec2(fbm(p * 1.2 + vec2(0.0, uT * 0.06)), fbm(p * 1.2 + vec2(5.2, -uT * 0.05)));
  float h = fbm(p * 1.4 + q * 1.8 + vec2(uT * 0.02, 0.0));
  float d = distance(p, uM);
  h += uS * 0.2 * exp(-d * d * 12.0) * (0.55 + 0.45 * sin(d * 30.0 - uT * 4.0));
  return h;
}

void main(){
  vec2 p = gl_FragCoord.xy / uRef;
  float e = 1.5 / uRef;
  float hc = height(p);
  float hx = height(p + vec2(e, 0.0));
  float hy = height(p + vec2(0.0, e));
  vec3 n = normalize(vec3((hc - hx) / e, (hc - hy) / e, 2.2));
  vec3 v = vec3(0.0, 0.0, 1.0);
  vec3 r = reflect(-v, n);
  float sky = 0.5 + 0.5 * r.y;
  float bands = 0.5 + 0.5 * sin(r.y * 7.0 + r.x * 2.5 + 1.2);
  vec3 col = mix(vec3(0.02, 0.02, 0.03), vec3(0.86, 0.88, 0.92), smoothstep(0.15, 0.95, sky * bands));
  float fres = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 1.6);
  vec3 film = 0.5 + 0.5 * cos(6.2831 * (vec3(0.0, 0.33, 0.67) + hc * 2.2 + uT * 0.02));
  col = mix(col, col * 0.4 + film * 0.75, clamp(fres * 2.2, 0.0, 1.0));
  col += pow(max(r.y, 0.0), 30.0) * 0.9;
  vec2 q = gl_FragCoord.xy / uR - 0.5;
  col *= 1.0 - dot(q, q) * 0.9;
  gl_FragColor = vec4(col, 1.0);
}
