import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { createDrone } from './drone'
import { facadeFragment, facadeVertex, skyFragment } from './shaders'

export type SceneHandle = {
  setProgress: (p: number) => void
  dispose: () => void
}

// World units are metres. The facade is the front face of the tower at z = 0.
const FACADE_W = 60
const FACADE_H = 150
const DRONE_TOP = 144 // hero: drone just under the roof line
const DRONE_BOTTOM = 3.2 // lands on the pad
const DRONE_Z = 4.2
const PASSES = 7 // lateral cleaning passes during the descent
const STATION = new THREE.Vector3(-13, 0.55, 8)
const PAD_X = -7 // lands under the quote heading, clear of the form

export function createScene(
  canvas: HTMLCanvasElement,
  opts: { reduceMotion: boolean },
): SceneHandle {
  const small = Math.min(window.innerWidth, window.innerHeight) < 700
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !small,
    powerPreference: 'high-performance',
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.25 : 1.5))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.1

  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#192730')
  scene.fog = new THREE.Fog('#192730', 38, 140)

  const pmrem = new THREE.PMREMGenerator(renderer)
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environment = envTex

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 500)
  const camZ = small ? 24 : 22

  // Lights: cool sky fill and a warm low key from the west.
  scene.add(new THREE.HemisphereLight('#a7b9c6', '#0c1317', 1.0))
  const key = new THREE.DirectionalLight('#ffe7c4', 1.8)
  key.position.set(40, 70, 50)
  scene.add(key)

  // Sky
  const sky = new THREE.Mesh(
    new THREE.PlaneGeometry(900, 420),
    new THREE.ShaderMaterial({
      vertexShader: facadeVertex,
      fragmentShader: skyFragment,
      depthWrite: false,
    }),
  )
  sky.position.set(0, 150, -160)
  scene.add(sky)

  // Clean mask: white where the jet has washed the glass.
  const maskCanvas = document.createElement('canvas')
  maskCanvas.width = 256
  maskCanvas.height = 640
  const mctx = maskCanvas.getContext('2d')!
  mctx.fillStyle = '#000'
  mctx.fillRect(0, 0, maskCanvas.width, maskCanvas.height)
  if (opts.reduceMotion) {
    mctx.fillStyle = '#fff'
    mctx.fillRect(0, 0, maskCanvas.width, maskCanvas.height)
  }
  const maskTex = new THREE.CanvasTexture(maskCanvas)
  maskTex.colorSpace = THREE.NoColorSpace
  maskTex.minFilter = THREE.LinearFilter
  maskTex.magFilter = THREE.LinearFilter
  maskTex.generateMipmaps = false

  const facadeMat = new THREE.ShaderMaterial({
    vertexShader: facadeVertex,
    fragmentShader: facadeFragment,
    uniforms: {
      uMask: { value: maskTex },
      uTime: { value: 0 },
      uSize: { value: new THREE.Vector2(FACADE_W, FACADE_H) },
    },
    defines: { OCTAVES: small ? 3 : 5 },
  })
  const facade = new THREE.Mesh(new THREE.PlaneGeometry(FACADE_W, FACADE_H), facadeMat)
  facade.position.set(0, FACADE_H / 2, 0)
  scene.add(facade)

  // Tower body behind the facade and roof parapet.
  const darkMat = new THREE.MeshStandardMaterial({ color: '#141d23', roughness: 0.85, metalness: 0.2 })
  const body = new THREE.Mesh(new THREE.BoxGeometry(FACADE_W, FACADE_H, 34), darkMat)
  body.position.set(0, FACADE_H / 2, -17.05)
  scene.add(body)
  const parapetMat = new THREE.MeshStandardMaterial({ color: '#1e2a33', roughness: 0.7, metalness: 0.35 })
  const parapet = new THREE.Mesh(new RoundedBoxGeometry(FACADE_W + 0.8, 1.4, 1.4, 2, 0.12), parapetMat)
  parapet.position.set(0, FACADE_H + 0.7, 0.2)
  scene.add(parapet)

  // Ground, landing pad and the ground station the hose comes from.
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(400, 400),
    new THREE.MeshStandardMaterial({ color: '#0b1115', roughness: 0.95 }),
  )
  ground.rotation.x = -Math.PI / 2
  scene.add(ground)
  const padX = PAD_X
  const pad = new THREE.Mesh(
    new THREE.RingGeometry(1.7, 1.9, 64),
    new THREE.MeshBasicMaterial({ color: '#91d336', toneMapped: false }),
  )
  pad.rotation.x = -Math.PI / 2
  pad.position.set(padX, 0.02, DRONE_Z)
  scene.add(pad)
  const station = new THREE.Mesh(new RoundedBoxGeometry(2.2, 1.1, 1.4, 2, 0.12), parapetMat)
  station.position.copy(STATION)
  scene.add(station)
  const stationLed = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.06, 0.02),
    new THREE.MeshBasicMaterial({ color: '#91d336', toneMapped: false }),
  )
  stationLed.position.set(STATION.x - 0.6, STATION.y + 0.2, STATION.z + 0.71)
  scene.add(stationLed)

  // Drone
  const drone = createDrone()
  scene.add(drone.group)

  // Hose from the drone down to the station.
  const hoseMat = new THREE.MeshStandardMaterial({ color: '#3c3c3b', roughness: 0.6, metalness: 0.1 })
  const hose = new THREE.Mesh(new THREE.BufferGeometry(), hoseMat)
  hose.frustumCulled = false
  scene.add(hose)
  const hoseCurve = new THREE.CatmullRomCurve3(
    Array.from({ length: 6 }, () => new THREE.Vector3()),
    false,
    'centripetal',
  )

  // Spray particles
  const SPRAY = small ? 220 : 420
  const sprayPos = new Float32Array(SPRAY * 3)
  const sprayVel = new Float32Array(SPRAY * 3)
  const sprayAge = new Float32Array(SPRAY)
  const sprayLife = new Float32Array(SPRAY)
  for (let i = 0; i < SPRAY; i++) {
    sprayAge[i] = Math.random()
    sprayPos[i * 3 + 1] = -999
  }
  const sprayGeo = new THREE.BufferGeometry()
  sprayGeo.setAttribute('position', new THREE.BufferAttribute(sprayPos, 3))
  const sprayMat = new THREE.PointsMaterial({
    color: '#e9f6d4',
    size: 0.05,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  const spray = new THREE.Points(sprayGeo, sprayMat)
  spray.frustumCulled = false
  spray.visible = !opts.reduceMotion
  scene.add(spray)

  // State
  let target = 0
  let current = 0
  let time = 0
  let lastHit: THREE.Vector2 | null = null
  const pointer = { x: 0, y: 0, sx: 0, sy: 0 }
  const prev = new THREE.Vector3(0, DRONE_TOP, DRONE_Z)
  const nozzle = new THREE.Vector3()
  const tmp = new THREE.Vector3()
  const port = new THREE.Vector3()
  const clock = new THREE.Clock()

  const visibleWidth = () => {
    const h = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camZ
    return h * camera.aspect
  }

  const paint = (wx: number, wy: number, strength: number) => {
    const u = (wx + FACADE_W / 2) / FACADE_W
    const v = wy / FACADE_H
    const px = u * maskCanvas.width
    const py = (1 - v) * maskCanvas.height
    // Elongated downward: the rinse water runs down the glass.
    const r = 9
    mctx.save()
    mctx.translate(px, py + 4)
    mctx.scale(1, 1.7)
    const g = mctx.createRadialGradient(0, 0, 0, 0, 0, r)
    g.addColorStop(0, `rgba(255,255,255,${strength})`)
    g.addColorStop(0.6, `rgba(255,255,255,${strength * 0.75})`)
    g.addColorStop(1, 'rgba(255,255,255,0)')
    mctx.fillStyle = g
    mctx.fillRect(-r, -r, r * 2, r * 2)
    mctx.restore()
  }

  // Visible jet and impact glow
  const jetMat = new THREE.MeshBasicMaterial({
    color: '#eef7e3',
    transparent: true,
    opacity: 0.32,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  })
  const jet = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.09, 1, 10, 1, true), jetMat)
  jet.visible = false
  scene.add(jet)
  const glowCanvas = document.createElement('canvas')
  glowCanvas.width = glowCanvas.height = 64
  const gctx = glowCanvas.getContext('2d')!
  const gg = gctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  gg.addColorStop(0, 'rgba(240,248,232,0.9)')
  gg.addColorStop(0.35, 'rgba(220,236,210,0.35)')
  gg.addColorStop(1, 'rgba(220,236,210,0)')
  gctx.fillStyle = gg
  gctx.fillRect(0, 0, 64, 64)
  const glowTex = new THREE.CanvasTexture(glowCanvas)
  const impact = new THREE.Mesh(
    new THREE.PlaneGeometry(1.6, 1.6),
    new THREE.MeshBasicMaterial({
      map: glowTex,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    }),
  )
  impact.visible = false
  scene.add(impact)
  const UP = new THREE.Vector3(0, 1, 0)
  const jetDir = new THREE.Vector3()
  const hit3 = new THREE.Vector3()

  const resize = () => {
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  resize()
  window.addEventListener('resize', resize)

  const onPointer = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    pointer.x = (e.clientX / window.innerWidth - 0.5) * 2
    pointer.y = (e.clientY / window.innerHeight - 0.5) * 2
  }
  if (!opts.reduceMotion) window.addEventListener('pointermove', onPointer, { passive: true })

  const updateHose = (from: THREE.Vector3) => {
    const pts = hoseCurve.points
    pts[0].copy(from)
    // Every control point stays above the ground so the hose never cuts through it.
    const low = THREE.MathUtils.clamp((from.y - 1) / 12, 0, 1)
    pts[1].set(from.x, Math.max(from.y - 1.6, 0.35), from.z + 0.4)
    pts[2].set(from.x + 0.4, Math.max(from.y - 6, 0.12), from.z + 1.4)
    pts[3].set(THREE.MathUtils.lerp(from.x, STATION.x, 0.5), Math.max(from.y * 0.45, 0.1) * low + 0.1, from.z + 2.6)
    pts[4].set(STATION.x + 1.6, 0.1, STATION.z - 0.1)
    pts[5].set(STATION.x + 1.1, STATION.y, STATION.z)
    const geo = new THREE.TubeGeometry(hoseCurve, small ? 48 : 80, 0.06, 6, false)
    hose.geometry.dispose()
    hose.geometry = geo
  }

  const frame = () => {
    const dt = Math.min(clock.getDelta(), 0.05)
    time += dt
    facadeMat.uniforms.uTime.value = time

    const follow = opts.reduceMotion ? 1 : 1 - Math.exp(-dt * 3.2)
    current += (target - current) * follow

    const amp = Math.min(7, visibleWidth() * 0.3)
    const landing = THREE.MathUtils.smoothstep(current, 0.94, 1)
    // While the visitor reads, the drone keeps working: a slow idle pass left and right.
    const idle = opts.reduceMotion ? 0 : Math.sin(time * 0.32) * Math.min(2.2, amp * 0.35)
    const sweep = amp * Math.cos(current * PASSES * Math.PI) + idle
    const x = THREE.MathUtils.lerp(sweep, padX, landing)
    const y = THREE.MathUtils.lerp(DRONE_TOP, DRONE_BOTTOM, current)
    const bob = opts.reduceMotion ? 0 : Math.sin(time * 1.7) * 0.08 * (1 - landing)
    drone.group.position.set(x, y + bob, DRONE_Z)

    // Bank into lateral motion, pitch into vertical motion.
    const vx = (x - prev.x) / Math.max(dt, 1e-3)
    const vy = (y - prev.y) / Math.max(dt, 1e-3)
    const roll = THREE.MathUtils.clamp(-vx * 0.035, -0.32, 0.32)
    const pitch = THREE.MathUtils.clamp(vy * 0.004, -0.18, 0.18)
    drone.group.rotation.z += (roll - drone.group.rotation.z) * 0.12
    drone.group.rotation.x += (pitch - drone.group.rotation.x) * 0.12
    prev.set(x, y, DRONE_Z)

    drone.spin(dt, 1 - landing * 0.9)

    // Jet: paint the mask along the path so fast scrolls leave no gaps.
    drone.nozzle.getWorldPosition(nozzle)
    const spraying = landing < 0.6 && !opts.reduceMotion
    if (spraying) {
      const hit = new THREE.Vector2(nozzle.x + Math.sin(time * 9) * 0.35, nozzle.y - 0.25)
      if (lastHit) {
        const dist = hit.distanceTo(lastHit)
        const steps = Math.min(60, Math.ceil(dist / 0.45))
        for (let s = 1; s <= steps; s++) {
          const t = s / steps
          paint(
            THREE.MathUtils.lerp(lastHit.x, hit.x, t),
            THREE.MathUtils.lerp(lastHit.y, hit.y, t),
            0.22,
          )
        }
      }
      paint(hit.x, hit.y, 0.05)
      lastHit = hit
      maskTex.needsUpdate = true

      hit3.set(hit.x, hit.y, 0.03)
      jetDir.subVectors(hit3, nozzle)
      const len = jetDir.length()
      jet.position.copy(nozzle).addScaledVector(jetDir, 0.5)
      jet.quaternion.setFromUnitVectors(UP, jetDir.normalize())
      jet.scale.set(1, len, 1)
      jetMat.opacity = 0.26 + Math.sin(time * 40) * 0.05
      impact.position.copy(hit3)
      impact.scale.setScalar(0.9 + Math.sin(time * 23) * 0.12)
    }
    jet.visible = spraying
    impact.visible = spraying

    // Spray particles
    if (spray.visible) {
      for (let i = 0; i < SPRAY; i++) {
        sprayAge[i] += dt
        const i3 = i * 3
        if (sprayAge[i] > sprayLife[i] || sprayPos[i3 + 2] < 0.05) {
          if (!spraying) {
            sprayPos[i3 + 1] = -999
            continue
          }
          sprayAge[i] = 0
          sprayLife[i] = 0.14 + Math.random() * 0.18
          sprayPos[i3] = nozzle.x
          sprayPos[i3 + 1] = nozzle.y
          sprayPos[i3 + 2] = nozzle.z
          sprayVel[i3] = (Math.random() - 0.5) * 2.2
          sprayVel[i3 + 1] = (Math.random() - 0.65) * 2.2
          sprayVel[i3 + 2] = -(nozzle.z / 0.3) * (0.85 + Math.random() * 0.3)
        }
        sprayVel[i3 + 1] -= 9.8 * dt * 0.35
        sprayPos[i3] += sprayVel[i3] * dt
        sprayPos[i3 + 1] += sprayVel[i3 + 1] * dt
        sprayPos[i3 + 2] = Math.max(0.04, sprayPos[i3 + 2] + sprayVel[i3 + 2] * dt)
      }
      sprayGeo.attributes.position.needsUpdate = true
    }

    drone.hosePort.getWorldPosition(port)
    updateHose(port)

    // Camera rides with the drone, with a damped mouse parallax.
    pointer.sx += (pointer.x - pointer.sx) * 0.04
    pointer.sy += (pointer.y - pointer.sy) * 0.04
    // At the top the camera lifts to show the roofline against the sky.
    const lift = (1 - THREE.MathUtils.smoothstep(current, 0, 0.05)) * 2
    // On tall screens the copy fills the lower half, so the drone flies in the upper third.
    const portraitOffset = camera.aspect < 0.85 ? -4.2 * (1 - landing) : 0
    const camY = y + 1.3 + lift + portraitOffset - pointer.sy * 0.6 + landing * 2.2
    camera.position.set(pointer.sx * 1.4, camY, camZ + landing * 6)
    tmp.set(pointer.sx * 0.3, y + 0.4 + lift * 0.9 + portraitOffset + landing * 0.8, 0)
    camera.lookAt(tmp)

    renderer.render(scene, camera)
  }

  let running = false
  const start = () => {
    if (running) return
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
    setProgress(p: number) {
      target = THREE.MathUtils.clamp(p, 0, 1)
    },
    dispose() {
      stop()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', onVisibility)
      scene.traverse((o) => {
        const m = o as THREE.Mesh
        if (m.geometry) m.geometry.dispose()
        const mat = m.material as THREE.Material | THREE.Material[] | undefined
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose())
        else mat?.dispose()
      })
      maskTex.dispose()
      envTex.dispose()
      pmrem.dispose()
      renderer.dispose()
    },
  }
}
