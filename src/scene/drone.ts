import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

// A heavy-lift octocopter for tethered facade cleaning: eight arms, a spray lance
// facing the glass and a hose port underneath. Built from primitives, no model file.
export function createDrone() {
  const group = new THREE.Group()

  const shell = new THREE.MeshStandardMaterial({ color: '#2d3d4b', metalness: 0.55, roughness: 0.38 })
  const carbon = new THREE.MeshStandardMaterial({ color: '#16191b', metalness: 0.3, roughness: 0.55 })
  const metal = new THREE.MeshStandardMaterial({ color: '#8a949b', metalness: 0.9, roughness: 0.25 })
  const lime = new THREE.MeshBasicMaterial({ color: '#91d336', toneMapped: false })

  // Fuselage
  const body = new THREE.Mesh(new RoundedBoxGeometry(0.95, 0.32, 0.95, 3, 0.12), shell)
  group.add(body)
  const canopy = new THREE.Mesh(new RoundedBoxGeometry(0.62, 0.16, 0.62, 3, 0.07), carbon)
  canopy.position.y = 0.22
  group.add(canopy)
  const belly = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.28, 0.24, 20), carbon)
  belly.position.y = -0.26
  group.add(belly)

  // Arms, motors, rotors
  const rotors: THREE.Object3D[] = []
  const armGeo = new THREE.BoxGeometry(1.05, 0.055, 0.075)
  const motorGeo = new THREE.CylinderGeometry(0.085, 0.095, 0.13, 16)
  const discGeo = new THREE.CircleGeometry(0.44, 40)
  const bladeGeo = new THREE.BoxGeometry(0.86, 0.008, 0.06)
  const discMat = new THREE.MeshBasicMaterial({
    color: '#cfd8de',
    transparent: true,
    opacity: 0.1,
    depthWrite: false,
    side: THREE.DoubleSide,
  })
  const ledGeo = new THREE.SphereGeometry(0.03, 10, 10)

  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + Math.PI / 8
    const arm = new THREE.Mesh(armGeo, carbon)
    arm.position.set(Math.cos(a) * 0.62, 0.02, Math.sin(a) * 0.62)
    arm.rotation.y = -a
    group.add(arm)

    const hub = new THREE.Group()
    hub.position.set(Math.cos(a) * 1.12, 0.1, Math.sin(a) * 1.12)
    group.add(hub)
    const motor = new THREE.Mesh(motorGeo, metal)
    hub.add(motor)

    const rotor = new THREE.Group()
    rotor.position.y = 0.08
    const disc = new THREE.Mesh(discGeo, discMat)
    disc.rotation.x = -Math.PI / 2
    rotor.add(disc)
    const blade = new THREE.Mesh(bladeGeo, carbon)
    rotor.add(blade)
    rotor.rotation.y = Math.random() * Math.PI
    hub.add(rotor)
    rotors.push(rotor)

    const led = new THREE.Mesh(ledGeo, lime)
    led.position.set(0, -0.09, 0)
    hub.add(led)
  }

  // Landing skids
  const skidGeo = new THREE.CylinderGeometry(0.018, 0.018, 1.25, 8)
  const legGeo = new THREE.CylinderGeometry(0.016, 0.016, 0.36, 8)
  for (const side of [-1, 1]) {
    const skid = new THREE.Mesh(skidGeo, carbon)
    skid.rotation.x = Math.PI / 2
    skid.position.set(side * 0.38, -0.5, 0)
    group.add(skid)
    for (const end of [-1, 1]) {
      const leg = new THREE.Mesh(legGeo, carbon)
      leg.position.set(side * 0.33, -0.33, end * 0.3)
      leg.rotation.z = side * 0.25
      group.add(leg)
    }
  }

  // Spray lance pointing at the facade (negative z)
  const lance = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 1.5, 10), metal)
  lance.rotation.x = Math.PI / 2
  lance.position.set(0, -0.12, -1.15)
  group.add(lance)
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.12, 12), metal)
  tip.rotation.x = -Math.PI / 2
  tip.position.set(0, -0.12, -1.95)
  group.add(tip)
  const tipLed = new THREE.Mesh(ledGeo, lime)
  tipLed.position.set(0, -0.06, -1.9)
  group.add(tipLed)
  const nozzle = new THREE.Object3D()
  nozzle.position.set(0, -0.12, -2.02)
  group.add(nozzle)

  // Hose port
  const port = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.12, 12), metal)
  port.position.set(0, -0.42, 0.05)
  group.add(port)
  const hosePort = new THREE.Object3D()
  hosePort.position.set(0, -0.48, 0.05)
  group.add(hosePort)

  group.scale.setScalar(1.15)

  return {
    group,
    nozzle,
    hosePort,
    spin(dt: number, throttle: number) {
      const speed = 38 * throttle
      for (let i = 0; i < rotors.length; i++) {
        rotors[i].rotation.y += (i % 2 === 0 ? 1 : -1) * speed * dt
      }
      discMat.opacity = 0.04 + 0.08 * throttle
    },
  }
}
