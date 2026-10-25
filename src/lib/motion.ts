import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

// Strong ease-out (Emil): fast start, long settle. Used for every entrance.
export const EASE_OUT = 'expo.out'

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

let lenis: Lenis | null = null

// Smooth scroll tied to GSAP's ticker so ScrollTrigger and Lenis read the same frame.
export function startSmoothScroll() {
  if (lenis || reducedMotion()) return () => {}
  lenis = new Lenis({ duration: 1.1, anchors: { offset: -72 } })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (t: number) => lenis?.raf(t * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(tick)
    gsap.ticker.lagSmoothing(500, 33)
    lenis?.destroy()
    lenis = null
  }
}

export function lockScroll(locked: boolean) {
  if (!lenis) return
  if (locked) lenis.stop()
  else lenis.start()
}

export { gsap, ScrollTrigger }
