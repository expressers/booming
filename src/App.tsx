import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'
import Nav from './components/Nav'
import Hud from './components/Hud'
import Hero from './sections/Hero'
import Problem from './sections/Problem'
import HowItWorks from './sections/HowItWorks'
import Services from './sections/Services'
import Why from './sections/Why'
import Quote from './sections/Quote'
import Footer from './sections/Footer'
import type { SceneHandle } from './scene/Scene'

gsap.registerPlugin(ScrollTrigger, SplitText)

const TOP_ALT = 144

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let disposed = false
    let scene: SceneHandle | null = null
    let progress = 0

    // Smooth scroll on GSAP's ticker so ScrollTrigger never reads a stale position.
    let lenis: Lenis | null = null
    const tick = (t: number) => lenis?.raf(t * 1000)
    if (!reduce) {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true })
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
    }

    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')!
      const el = document.querySelector<HTMLElement>(id)
      if (!el) return
      e.preventDefault()
      if (lenis) lenis.scrollTo(el, { duration: 1.8 })
      else el.scrollIntoView()
      history.replaceState(null, '', id)
    }
    document.addEventListener('click', onAnchor)

    // The descent: the whole page down to the quote section is one drone flight.
    const alt = document.getElementById('hud-alt')
    const mark = document.getElementById('hud-mark')
    const altM = document.getElementById('hud-alt-m')
    const descent = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      endTrigger: '#cotacao',
      end: 'top top',
      onUpdate: (self) => {
        progress = self.progress
        scene?.setProgress(progress)
        const m = `${Math.round((1 - progress) * TOP_ALT)} m`
        if (alt) alt.textContent = m
        if (altM) altM.textContent = m
        if (mark) mark.style.transform = `translateY(${progress * 167}px)`
      },
    })

    // Nav turns solid once the hero is behind us, so copy never runs under it.
    const nav = document.querySelector<HTMLElement>('[data-nav]')
    const navSolid = ScrollTrigger.create({
      start: 120,
      end: 'max',
      onToggle: (self) => nav && (nav.dataset.solid = String(self.isActive)),
    })

    // Load the 3D scene after the first paint so the hero text is never blocked.
    const load = () =>
      import('./scene/Scene').then(({ createScene }) => {
        const canvas = canvasRef.current
        if (disposed || !canvas) return
        scene = createScene(canvas, { reduceMotion: reduce })
        scene.setProgress(progress)
        requestAnimationFrame(() => (canvas.dataset.ready = 'true'))
      })
    const hasIdle = typeof window.requestIdleCallback === 'function'
    const idleId = hasIdle ? window.requestIdleCallback(load, { timeout: 900 }) : window.setTimeout(load, 200)

    const ctx = gsap.context(() => {
      if (reduce) return
      // Hero: lines rise once, on arrival.
      const split = SplitText.create('[data-hero-title]', { type: 'lines', mask: 'lines' })
      gsap.from(split.lines, { yPercent: 105, duration: 1.1, ease: 'expo.out', stagger: 0.09, delay: 0.1 })
      gsap.from('[data-hero-sub], [data-hero-cta]', {
        opacity: 0,
        y: 16,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
        delay: 0.45,
      })

      // Every block is revealed by the jet: a left to right wipe scrubbed to the descent.
      gsap.utils.toArray<HTMLElement>('[data-wipe]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(-20% 100% -20% 0%)' },
          {
            clipPath: 'inset(-20% 0% -20% 0%)',
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 88%', end: 'top 55%', scrub: 0.5 },
          },
        )
      })
    })

    return () => {
      disposed = true
      if (hasIdle) window.cancelIdleCallback(idleId)
      else window.clearTimeout(idleId)
      descent.kill()
      navSolid.kill()
      ctx.revert()
      document.removeEventListener('click', onAnchor)
      if (lenis) {
        gsap.ticker.remove(tick)
        lenis.destroy()
      }
      scene?.dispose()
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 h-[100lvh] w-full opacity-0 transition-opacity duration-1000 ease-out data-[ready=true]:opacity-100"
      />
      <a
        href="#cotacao"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-lime focus:px-4 focus:py-2 focus:text-navy"
      >
        Saltar para a cotação
      </a>
      <Nav />
      <Hud />
      <main className="relative z-10">
        <Hero />
        <Problem />
        <HowItWorks />
        <Services />
        <Why />
        <Quote />
      </main>
      <Footer />
    </>
  )
}
