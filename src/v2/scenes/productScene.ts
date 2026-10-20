import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { createDrone } from '../../scene/drone'

// Product reveal on white: the drone turns with the scroll, then opens into an exploded view.
export type ProductHandle = {
  setProgress: (p: number) => void
  setActive: (active: boolean) => void
  dispose: () => void
}

const smooth = (a: number, b: number, x: number) => THREE.MathUtils.smoothstep(x, a, b)

export function createProductScene(canvas: HTMLCanvasElement, opts: { reduceMotion: boolean }): ProductHandle {
  const small = Math.min(window.innerWidth, window.innerHeight) < 700
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 1.75))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  renderer.setClearColor(0x000000, 0)

  const scene = new THREE.Scene()
  const pmrem = new THREE.PMREMGenerator(renderer)
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environment = env

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)

  scene.add(new THREE.HemisphereLight('#ffffff', '#c9d0d5', 1.2))
  const key = new THREE.DirectionalLight('#ffffff', 2.4)
  key.position.set(3, 5, 4)
  scene.add(key)
  const rim = new THREE.DirectionalLight('#dfe8ee', 1.4)
  rim.position.set(-4, 2, -4)
  scene.add(rim)

  const rig = new THREE.Group()
  scene.add(rig)
  const drone = createDrone()
  rig.add(drone.group)

  // Exploded view: every part moves out along its own direction from the centre.
  const parts = drone.group.children.map((o) => {
    const base = o.position.clone()
    const out = base.clone()
    if (out.lengthSq() < 1e-4) out.set(0, 1, 0)
    out.normalize()
    // Lift the top parts, drop the bottom ones, push arms outward.
    out.y += Math.sign(base.y || 0.001) * 0.6
    return { o, base, out: out.normalize() }
  })

  // Soft contact shadow
  const shCanvas = document.createElement('canvas')
  shCanvas.width = shCanvas.height = 128
  const sctx = shCanvas.getContext('2d')!
  const sg = sctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  sg.addColorStop(0, 'rgba(25,39,48,0.35)')
  sg.addColorStop(1, 'rgba(25,39,48,0)')
  sctx.fillStyle = sg
  sctx.fillRect(0, 0, 128, 128)
  const shTex = new THREE.CanvasTexture(shCanvas)
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(3.6, 3.6),
    new THREE.MeshBasicMaterial({ map: shTex, transparent: true, depthWrite: false }),
  )
  shadow.rotation.x = -Math.PI / 2
  shadow.position.set(0.85, -1.1, 0)
  scene.add(shadow)

  let target = 0
  let current = 0
  let time = 0
  const clock = new THREE.Clock()

  const resize = () => {
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  resize()
  window.addEventListener('resize', resize)

  const frame = () => {
    const dt = Math.min(clock.getDelta(), 0.05)
    time += dt
    current += (target - current) * (opts.reduceMotion ? 1 : 1 - Math.exp(-dt * 5))
    const p = current

    const turn = smooth(0, 0.55, p)
    const explode = smooth(0.42, 0.78, p) * (1 - smooth(0.9, 1, p))
    const portrait = camera.aspect < 0.85

    rig.rotation.y = -0.6 + turn * Math.PI * 1.15 + (opts.reduceMotion ? 0 : Math.sin(time * 0.4) * 0.03)
    rig.rotation.x = 0.32 - turn * 0.18
    rig.position.y = (opts.reduceMotion ? 0 : Math.sin(time * 1.1) * 0.03) - (portrait ? 0.3 : 0)
    rig.position.x = portrait ? 0 : 0.85
    shadow.position.x = rig.position.x

    for (const { o, base, out } of parts) o.position.copy(base).addScaledVector(out, explode * 0.42)
    drone.spin(dt, 0.35)

    const dist = (portrait ? 13 : 8.4) + explode * 0.6
    camera.position.set(0, 1.1 + explode * 0.3, dist)
    camera.lookAt(0, -0.05, 0)
    ;(shadow.material as THREE.MeshBasicMaterial).opacity = 1 - explode * 0.5

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
      document.removeEventListener('visibilitychange', onVisibility)
      scene.traverse((o) => {
        const m = o as THREE.Mesh
        m.geometry?.dispose()
        const mat = m.material as THREE.Material | THREE.Material[] | undefined
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose())
        else mat?.dispose()
      })
      shTex.dispose()
      env.dispose()
      pmrem.dispose()
      renderer.dispose()
    },
  }
}
