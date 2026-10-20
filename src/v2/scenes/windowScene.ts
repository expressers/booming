import * as THREE from 'three'
import { createDrone } from '../../scene/drone'

// "Do lado de dentro": the camera is inside an office looking out through dirty glass.
// A tethered drone outside cleans the window in rows; the scroll drives the whole shot.
export type WindowHandle = {
  setProgress: (p: number) => void
  setActive: (active: boolean) => void
  dispose: () => void
}

const ROWS = 6

const worldVert = /* glsl */ `
varying vec3 vW;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`

const uvVert = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const noiseLib = /* glsl */ `
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) { float v = 0.0; float a = 0.5; for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; } return v; }
`

// Grime on the outside of the glass. The cleaned area is computed analytically from the
// row-by-row path, so scrolling back up makes the window dirty again.
const glassFrag = /* glsl */ `
uniform float uClean;
uniform vec4 uRect; // x0, x1, yTop, yBottom
${noiseLib}
varying vec3 vW;
void main() {
  vec2 p = vW.xy;
  float rowH = (uRect.z - uRect.w) / float(${ROWS - 1});
  float R = rowH * 0.78;
  float wob = (noise(p * 5.0) - 0.5) * 0.16;
  float clean = 0.0;
  for (int k = 0; k < ${ROWS}; k++) {
    float pk = clamp(uClean * float(${ROWS}) - float(k), 0.0, 1.0);
    float yk = uRect.z - float(k) * rowH;
    float a; float b;
    if (mod(float(k), 2.0) < 0.5) { a = uRect.x - R; b = mix(uRect.x, uRect.y, pk); }
    else { a = mix(uRect.y, uRect.x, pk); b = uRect.y + R; }
    float x = p.x + wob;
    float h = smoothstep(a - 0.12, a + 0.04, x) * (1.0 - smoothstep(b - 0.04, b + 0.12, x));
    float v = 1.0 - smoothstep(R * 0.55, R, abs(p.y - yk) + wob * 0.4);
    clean = max(clean, h * v * step(0.0001, pk));
  }
  clean = max(clean, smoothstep(0.985, 1.0, uClean));

  float streak = fbm(vec2(p.x * 4.5, p.y * 0.55));
  float blot = fbm(p * 1.7 + 3.0);
  float dirt = clamp(streak * 0.7 + blot * 0.55 - 0.08, 0.0, 1.0);
  vec3 grime = mix(vec3(0.6, 0.58, 0.52), vec3(0.38, 0.37, 0.33), blot);
  float alpha = mix(0.42, 0.95, dirt) * (1.0 - clean);

  // Wet edge: the only lime on the glass, where water has just passed
  float edge = clean * (1.0 - clean) * 4.0;
  vec3 col = mix(grime, vec3(0.57, 0.83, 0.21), edge * 0.25);
  alpha = max(alpha, edge * 0.12);
  gl_FragColor = vec4(col, alpha);
}
`

// Daylight Luanda seen from a high floor, three layers of towers. uExpose blows it out to white.
const cityFrag = /* glsl */ `
uniform float uExpose;
varying vec2 vUv;
float h1(float x) { return fract(sin(x * 91.7) * 43758.5453); }
vec3 layer(vec3 col, vec2 uv, float n, float base, float amp, vec3 tone, float seed, float windows) {
  float c = floor(uv.x * n + seed);
  float hgt = base + h1(c + seed) * amp * step(0.25, h1(c * 1.3 + seed));
  float inside = step(uv.y, hgt);
  vec2 cell = fract(vec2(uv.x * n * 4.0, uv.y * 90.0));
  float win = windows * step(0.35, cell.x) * step(cell.x, 0.8) * step(0.4, cell.y) * step(h1(floor(uv.y * 90.0) + c), 0.55);
  vec3 t = mix(tone, tone + 0.08, win);
  return mix(col, t, inside);
}
void main() {
  vec2 uv = vUv;
  vec3 col = mix(vec3(0.9, 0.93, 0.95), vec3(0.66, 0.75, 0.82), smoothstep(0.4, 1.0, uv.y));
  col = layer(col, uv, 38.0, 0.5, 0.14, vec3(0.74, 0.79, 0.83), 3.0, 0.0);
  col = layer(col, uv, 22.0, 0.4, 0.2, vec3(0.56, 0.63, 0.69), 11.0, 1.0);
  col = layer(col, uv, 12.0, 0.26, 0.26, vec3(0.33, 0.41, 0.48), 23.0, 1.0);
  col = mix(col, vec3(0.97), uExpose);
  gl_FragColor = vec4(col, 1.0);
}
`

const smooth = (a: number, b: number, x: number) => THREE.MathUtils.smoothstep(x, a, b)

export function createWindowScene(canvas: HTMLCanvasElement, opts: { reduceMotion: boolean }): WindowHandle {
  const small = Math.min(window.innerWidth, window.innerHeight) < 700
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !small, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.25 : 1.5))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.15

  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#0b1216')
  const camera = new THREE.PerspectiveCamera(40, 1, 0.05, 200)

  scene.add(new THREE.HemisphereLight('#eef3f7', '#2a3238', 1.6))
  const sun = new THREE.DirectionalLight('#ffffff', 2.2)
  sun.position.set(-4, 6, -8)
  scene.add(sun)

  // City backdrop
  const cityMat = new THREE.ShaderMaterial({
    vertexShader: uvVert,
    fragmentShader: cityFrag,
    uniforms: { uExpose: { value: 0 } },
    depthWrite: false,
  })
  const city = new THREE.Mesh(new THREE.PlaneGeometry(120, 60), cityMat)
  city.position.set(0, 4, -40)
  scene.add(city)

  // Glass with grime
  const rect = new THREE.Vector4(-2.2, 2.2, 1.25, -1.25)
  const glassMat = new THREE.ShaderMaterial({
    vertexShader: worldVert,
    fragmentShader: glassFrag,
    uniforms: { uClean: { value: 0 }, uRect: { value: rect } },
    transparent: true,
    depthWrite: false,
  })
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(14, 9), glassMat)
  scene.add(glass)

  // Interior window frame, seen in silhouette
  const frameMat = new THREE.MeshBasicMaterial({ color: '#0d161b' })
  const bar = (w: number, h: number, x: number, y: number) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.12), frameMat)
    m.position.set(x, y, 0.08)
    scene.add(m)
  }
  bar(0.16, 9, -2.85, 0)
  bar(0.16, 9, 2.85, 0)
  bar(14, 0.5, 0, -2.1) // sill
  bar(14, 0.14, 0, 2.35) // head
  bar(4, 9, -4.9, 0)
  bar(4, 9, 4.9, 0)

  // Drone outside, facing the glass (and us)
  const drone = createDrone()
  drone.group.scale.setScalar(0.56)
  drone.group.rotation.y = Math.PI
  scene.add(drone.group)

  const hoseMat = new THREE.MeshStandardMaterial({ color: '#3c3c3b', roughness: 0.6 })
  const hose = new THREE.Mesh(new THREE.BufferGeometry(), hoseMat)
  hose.frustumCulled = false
  scene.add(hose)
  const hoseCurve = new THREE.CatmullRomCurve3([0, 1, 2, 3].map(() => new THREE.Vector3()))

  const jetMat = new THREE.MeshBasicMaterial({
    color: '#bfe97a',
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  })
  const jet = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.05, 1, 10, 1, true), jetMat)
  scene.add(jet)

  const glowCanvas = document.createElement('canvas')
  glowCanvas.width = glowCanvas.height = 64
  const gctx = glowCanvas.getContext('2d')!
  const gg = gctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  gg.addColorStop(0, 'rgba(210,240,160,0.95)')
  gg.addColorStop(0.35, 'rgba(145,211,54,0.4)')
  gg.addColorStop(1, 'rgba(145,211,54,0)')
  gctx.fillStyle = gg
  gctx.fillRect(0, 0, 64, 64)
  const glowTex = new THREE.CanvasTexture(glowCanvas)
  const impact = new THREE.Mesh(
    new THREE.PlaneGeometry(0.7, 0.7),
    new THREE.MeshBasicMaterial({
      map: glowTex,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    }),
  )
  scene.add(impact)

  let target = 0
  let current = 0
  let time = 0
  const pointer = { x: 0, y: 0, sx: 0, sy: 0 }
  const dronePos = new THREE.Vector3(rect.x - 1, rect.z + 4, -1.3)
  const want = new THREE.Vector3()
  const from = new THREE.Vector3()
  const away = new THREE.Vector3()
  const nozzle = new THREE.Vector3()
  const hit = new THREE.Vector3()
  const dir = new THREE.Vector3()
  const UP = new THREE.Vector3(0, 1, 0)
  const look = new THREE.Vector3()
  const clock = new THREE.Clock()

  const rowH = (rect.z - rect.w) / (ROWS - 1)
  const pathPoint = (c: number, out: THREE.Vector3) => {
    const k = Math.min(Math.floor(c * ROWS), ROWS - 1)
    const pk = THREE.MathUtils.clamp(c * ROWS - k, 0, 1)
    const x = k % 2 === 0 ? THREE.MathUtils.lerp(rect.x, rect.y, pk) : THREE.MathUtils.lerp(rect.y, rect.x, pk)
    return out.set(x, rect.z - k * rowH, 0)
  }

  const resize = () => {
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    // Keep the cleaned path inside the visible pane on narrow screens.
    const halfW = Math.tan(THREE.MathUtils.degToRad(20)) * 5 * camera.aspect
    const span = Math.min(2.2, halfW * 0.82)
    rect.x = -span
    rect.y = span
  }
  resize()
  window.addEventListener('resize', resize)

  const onPointer = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    pointer.x = (e.clientX / window.innerWidth - 0.5) * 2
    pointer.y = (e.clientY / window.innerHeight - 0.5) * 2
  }
  if (!opts.reduceMotion) window.addEventListener('pointermove', onPointer, { passive: true })

  const frame = () => {
    const dt = Math.min(clock.getDelta(), 0.05)
    time += dt
    current += (target - current) * (opts.reduceMotion ? 1 : 1 - Math.exp(-dt * 6))
    const p = current

    const enter = smooth(0.06, 0.2, p)
    const clean = THREE.MathUtils.clamp((p - 0.2) / 0.5, 0, 1)
    const exit = smooth(0.72, 0.84, p)
    const dolly = smooth(0.8, 1, p)

    glassMat.uniforms.uClean.value = clean
    cityMat.uniforms.uExpose.value = smooth(0.86, 1, p)

    // Drone target: arrive from above, follow the path, leave to the upper right.
    pathPoint(clean, hit)
    want.set(hit.x, hit.y + 0.32, -1.3)
    if (enter < 1) {
      from.set(rect.x - 0.6, rect.z + 3.5, -1.3)
      want.lerpVectors(from, want, enter)
    }
    if (exit > 0) want.lerp(away.set(rect.y + 3, rect.z + 3, -2), exit)
    dronePos.lerp(want, opts.reduceMotion ? 1 : 1 - Math.exp(-dt * 7))
    const bob = opts.reduceMotion ? 0 : Math.sin(time * 1.9) * 0.025
    const prevX = drone.group.position.x
    drone.group.position.set(dronePos.x, dronePos.y + bob, dronePos.z)
    const vx = (dronePos.x - prevX) / Math.max(dt, 1e-3)
    drone.group.rotation.z += (THREE.MathUtils.clamp(vx * 0.08, -0.3, 0.3) - drone.group.rotation.z) * 0.1
    drone.spin(dt, 1)

    const spraying = enter >= 0.99 && clean > 0 && clean < 1 && exit < 0.05 && !opts.reduceMotion
    jet.visible = impact.visible = spraying
    if (spraying) {
      drone.nozzle.getWorldPosition(nozzle)
      hit.z = -0.01
      dir.subVectors(hit, nozzle)
      const len = dir.length()
      jet.position.copy(nozzle).addScaledVector(dir, 0.5)
      jet.quaternion.setFromUnitVectors(UP, dir.normalize())
      jet.scale.set(1, len, 1)
      jetMat.opacity = 0.42 + Math.sin(time * 40) * 0.08
      impact.position.copy(hit)
      impact.scale.setScalar(0.9 + Math.sin(time * 23) * 0.15)
    }

    drone.hosePort.getWorldPosition(nozzle)
    const pts = hoseCurve.points
    pts[0].copy(nozzle)
    pts[1].set(nozzle.x + 0.05, nozzle.y - 1.2, nozzle.z - 0.3)
    pts[2].set(nozzle.x * 0.6 + 0.4, -4, -2.4)
    pts[3].set(rect.x - 2.5, -9, -4)
    hose.visible = enter > 0.2 && exit < 0.95
    hose.geometry.dispose()
    hose.geometry = new THREE.TubeGeometry(hoseCurve, 40, 0.018, 6, false)

    // Camera: still, breathing slightly; at the end it walks through the clean window.
    pointer.sx += (pointer.x - pointer.sx) * 0.05
    pointer.sy += (pointer.y - pointer.sy) * 0.05
    const z = THREE.MathUtils.lerp(5, -6, dolly * dolly)
    camera.position.set(pointer.sx * 0.25, -0.1 - pointer.sy * 0.15 + dolly * 0.6, z)
    look.set(pointer.sx * 0.08, dolly * 1.2, z - 5)
    camera.lookAt(look)

    renderer.render(scene, camera)
  }

  let running = false
  let active = true
  const start = () => {
    if (running || !active || document.hidden) return
    running = true
    clock.getDelta()
    renderer.setAnimationLoop(frame)
  }
  const stop = () => {
    running = false
    renderer.setAnimationLoop(null)
  }
  const onVisibility = () => (document.hidden ? stop() : start())
  document.addEventListener('visibilitychange', onVisibility)
  start()

  return {
    setProgress(p) {
      target = THREE.MathUtils.clamp(p, 0, 1)
    },
    setActive(a) {
      active = a
      if (a) start()
      else stop()
    },
    dispose() {
      stop()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', onVisibility)
      scene.traverse((o) => {
        const m = o as THREE.Mesh
        m.geometry?.dispose()
        const mat = m.material as THREE.Material | THREE.Material[] | undefined
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose())
        else mat?.dispose()
      })
      glowTex.dispose()
      renderer.dispose()
    },
  }
}
