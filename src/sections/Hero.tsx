import { useEffect, useRef } from 'react'
import { ArrowRight } from '@phosphor-icons/react'
import SplitWords from '../components/SplitWords'
import { EASE_OUT, gsap, reducedMotion } from '../lib/motion'
import { hero, intro } from '../content'

// Aerial footage (Pexels, free licence) cut into stills; scroll position picks the still.
// The camera starts against a glass facade and pulls back until the whole city is in view.
const COUNT = 96
const frameUrl = (set: 'd' | 'm', i: number) => `/seq/${set}/${String(i + 1).padStart(3, '0')}.webp`

// Load order: a coarse pass first so any scroll position has a nearby frame, then fill the gaps.
function loadOrder(n: number) {
  const seen = new Set<number>()
  const out: number[] = []
  for (const step of [16, 8, 4, 2, 1]) {
    for (let i = 0; i < n; i += step) {
      if (!seen.has(i)) {
        seen.add(i)
        out.push(i)
      }
    }
  }
  return out
}

export default function Hero() {
  const wrap = useRef<HTMLElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const root = wrap.current
    if (!root || !canvas.current) return
    const cv: HTMLCanvasElement = canvas.current

    // Entrance: the headline rises word by word, the rest follows. Runs once.
    const intro = gsap.context(() => {
      if (reducedMotion()) return
      gsap.from('[data-hero-in] [data-word]', { yPercent: 110, duration: 1.3, ease: EASE_OUT, stagger: 0.045, delay: 0.15 })
      gsap.from('[data-hero-fade]', { opacity: 0, y: 16, duration: 1.1, ease: EASE_OUT, stagger: 0.08, delay: 0.55 })
    }, root)

    if (reducedMotion()) return () => intro.revert()

    const set: 'd' | 'm' = window.matchMedia('(max-aspect-ratio: 4/5)').matches ? 'm' : 'd'
    const imgs: (HTMLImageElement | null)[] = Array(COUNT).fill(null)
    const ctx2d = cv.getContext('2d')
    const state = { f: 0 }
    let drawn = -1
    let cancelled = false

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv.width = Math.round(cv.clientWidth * dpr)
      cv.height = Math.round(cv.clientHeight * dpr)
      drawn = -1
      draw()
    }

    // Draw the nearest loaded still at or before the target, cover-fitted.
    function draw() {
      if (!ctx2d) return
      let i = Math.round(state.f)
      while (i > 0 && !imgs[i]) i--
      const img = imgs[i]
      if (!img || i === drawn) return
      drawn = i
      const s = Math.max(cv.width / img.naturalWidth, cv.height / img.naturalHeight)
      const w = img.naturalWidth * s
      const h = img.naturalHeight * s
      ctx2d.drawImage(img, (cv.width - w) / 2, (cv.height - h) / 2, w, h)
    }

    ;(async () => {
      for (const i of loadOrder(COUNT)) {
        if (cancelled) return
        const img = new Image()
        img.decoding = 'async'
        img.src = frameUrl(set, i)
        try {
          await img.decode()
        } catch {
          continue
        }
        imgs[i] = img
        if (i === 0) cv.dataset.ready = ''
        if (Math.abs(i - state.f) < 16) {
          drawn = -1
          draw()
        }
      }
    })()

    size()
    window.addEventListener('resize', size)

    const scenes = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
      })
      tl.to(state, { f: COUNT - 1, duration: 1, onUpdate: draw }, 0)
        // Opening card leaves as the camera pulls off the glass
        .to('[data-scene="1"]', { opacity: 0, y: -60, duration: 0.12 }, 0.1)
        // The statement holds the middle of the flight
        .fromTo('[data-scene="2"]', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.1 }, 0.28)
        .to('[data-scene="2"]', { opacity: 0, y: -40, duration: 0.1 }, 0.62)
        // The city lands under navy so the next section continues the same ground
        .to('[data-veil]', { opacity: 1, duration: 0.1 }, 0.9)
    }, root)

    return () => {
      cancelled = true
      window.removeEventListener('resize', size)
      scenes.revert()
      intro.revert()
    }
  }, [])

  return (
    <section id="topo" ref={wrap} className="relative bg-navy-deep text-white motion-safe:h-[300svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* First still doubles as the LCP image and the reduced-motion view */}
        <picture>
          <source media="(max-aspect-ratio: 4/5)" srcSet="/seq/m/001.webp" />
          <img
            src="/seq/d/001.webp"
            alt="Fachada envidraçada de uma torre, vista por um drone em voo"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>
        <canvas ref={canvas} aria-hidden className="absolute inset-0 h-full w-full opacity-0 data-ready:opacity-100" />

        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-navy-deep)_0%,rgb(17_28_35/0.55)_38%,rgb(17_28_35/0.1)_70%)]" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(to_bottom,rgb(17_28_35/0.6),transparent)]" />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,rgb(17_28_35/0.7),transparent_60%)]" />
        <div data-veil aria-hidden className="absolute inset-0 bg-navy-deep opacity-0" />

        <div data-scene="1" className="absolute inset-x-0 bottom-0 pb-14 md:pb-20">
          <div className="mx-auto max-w-[1320px] px-5 md:px-10">
            <h1 data-hero-in className="max-w-[14ch] font-display text-[clamp(2.6rem,7vw,6.25rem)] font-black leading-[0.95] tracking-[-0.035em]">
              <SplitWords text={hero.title} />
            </h1>
            <p data-hero-fade className="mt-7 max-w-[46ch] text-lg leading-relaxed text-white/80 md:text-xl">
              {hero.subtitle}
            </p>
            <div data-hero-fade className="mt-9 flex flex-wrap gap-3">
              <a href="#contactos" className="btn btn-primary">
                Solicitar orçamento
                <ArrowRight size={18} weight="bold" aria-hidden />
              </a>
              <a href="#servicos" className="btn btn-ghost-light">
                Conhecer serviços
              </a>
            </div>
          </div>
        </div>

        <div data-scene="2" className="pointer-events-none absolute inset-0 hidden items-center motion-safe:flex">
          <p className="mx-auto w-full max-w-[1320px] px-5 font-display text-[clamp(2rem,4.6vw,4.25rem)] font-black leading-[1.02] tracking-[-0.03em] md:px-10">
            <span className="block max-w-[20ch]">{intro.statement}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
