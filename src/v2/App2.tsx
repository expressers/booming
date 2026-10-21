import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'
import Nav2 from './Nav2'
import Quote from '../sections/Quote'
import Footer from '../sections/Footer'
import type { WindowHandle } from './scenes/windowScene'
import type { ProductHandle } from './scenes/productScene'

gsap.registerPlugin(ScrollTrigger, SplitText)

const MANIFESTO =
  'Durante anos, limpar um edifício alto significou pôr alguém do lado de fora. Cordas, gruas, horas suspensas. A Booming muda quem sobe: o drone vai, as pessoas ficam em terra.'

const captions = [
  { title: 'Lança de pulverização', text: 'Aponta o jacto ao vidro e mantém a distância certa da fachada.' },
  { title: 'Mangueira até ao chão', text: 'A água sobe da estação em terra, onde a equipa fica a trabalhar.' },
  { title: 'Rotores de carga pesada', text: 'Seguram o drone estável junto à fachada, com a mangueira presa.' },
]

const services = [
  {
    name: 'Fachadas e vidros',
    text: 'Disponível agora em Luanda. Vidro, painéis metálicos e revestimentos, em qualquer altura que o drone alcance com segurança.',
    lead: true,
  },
  { name: 'Painéis solares', text: 'Em breve. Limpeza de painéis em telhados e em campos de produção de energia.' },
  { name: 'Inspecção e mapeamento', text: 'Em breve. Relatórios fotográficos das zonas que ninguém vê a partir do chão.' },
  { name: 'Aviação privada', text: 'Em breve. Limpeza exterior de jatos, sem escadas nem plataformas.' },
]

export default function App2() {
  const heroRef = useRef<HTMLElement>(null)
  const heroCanvas = useRef<HTMLCanvasElement>(null)
  const productRef = useRef<HTMLElement>(null)
  const productCanvas = useRef<HTMLCanvasElement>(null)
  const panRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let disposed = false
    let win: WindowHandle | null = null
    let product: ProductHandle | null = null
    let heroP = reduce ? 0.7 : 0
    let productP = reduce ? 0.6 : 0
    let themeTriggers: ScrollTrigger[] = []
    const nav = document.querySelector<HTMLElement>('[data-nav2]')

    let lenis: Lenis | null = null
    const tick = (t: number) => lenis?.raf(t * 1000)
    if (!reduce) {
      lenis = new Lenis({ duration: 1.2, smoothWheel: true })
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
      if (lenis) lenis.scrollTo(el, { duration: 2 })
      else el.scrollIntoView()
      history.replaceState(null, '', id)
    }
    document.addEventListener('click', onAnchor)

    const meter = document.getElementById('v2-clean')
    const heroST = ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (reduce) return
        heroP = self.progress
        win?.setProgress(heroP)
        if (nav) nav.dataset.theme = heroP > 0.9 ? 'light' : 'dark'
        if (meter) meter.textContent = `${Math.round(gsap.utils.clamp(0, 1, (heroP - 0.2) / 0.5) * 100)}%`
      },
    })
    const productST = ScrollTrigger.create({
      trigger: productRef.current,
      start: 'top bottom',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (reduce) return
        productP = self.progress
        product?.setProgress(productP)
      },
    })

    // Render each scene only while its chapter is on screen.
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === heroRef.current) win?.setActive(e.isIntersecting)
        if (e.target === productRef.current) product?.setActive(e.isIntersecting)
      }
    })
    if (heroRef.current) io.observe(heroRef.current)
    if (productRef.current) io.observe(productRef.current)

    import('./scenes/windowScene').then(({ createWindowScene }) => {
      const c = heroCanvas.current
      if (disposed || !c) return
      win = createWindowScene(c, { reduceMotion: reduce })
      win.setProgress(heroP)
      requestAnimationFrame(() => (c.dataset.ready = 'true'))
    })
    const loadProduct = () =>
      import('./scenes/productScene').then(({ createProductScene }) => {
        const c = productCanvas.current
        if (disposed || !c) return
        product = createProductScene(c, { reduceMotion: reduce })
        product.setProgress(productP)
        requestAnimationFrame(() => (c.dataset.ready = 'true'))
      })
    const hasIdle = typeof window.requestIdleCallback === 'function'
    const idleId = hasIdle ? window.requestIdleCallback(loadProduct, { timeout: 2500 }) : window.setTimeout(loadProduct, 1200)

    const ctx = gsap.context(() => {
      if (reduce) return

      // Hero: the opening line rises once; the rest is scrubbed to the shot.
      const split = SplitText.create('[data-h1]', { type: 'lines', mask: 'lines' })
      gsap.from(split.lines, { yPercent: 110, duration: 1.2, ease: 'expo.out', stagger: 0.1, delay: 0.2 })

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
      })
      tl.to('[data-h1]', { opacity: 0, y: -60, duration: 0.07 }, 0.12)
        .fromTo('[data-h2]', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.07 }, 0.3)
        .to('[data-h2]', { opacity: 0, y: -60, duration: 0.07 }, 0.56)
        .fromTo('[data-meter]', { opacity: 0 }, { opacity: 1, duration: 0.04 }, 0.2)
        .to('[data-meter]', { opacity: 0, duration: 0.04 }, 0.74)
        .fromTo('[data-h3]', { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.07 }, 0.7)
        .to('[data-h3]', { opacity: 0, scale: 1.08, filter: 'blur(8px)', duration: 0.08 }, 0.86)
        .fromTo('[data-white]', { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.92)
        .to({}, { duration: 0 }, 1)

      // Product captions crossfade in sequence while the drone opens up.
      const ptl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: productRef.current, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
      })
      gsap.utils.toArray<HTMLElement>('[data-caption]').forEach((el, i) => {
        const at = 0.3 + i * 0.2
        ptl.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.06 }, at)
        if (i < captions.length - 1) ptl.to(el, { opacity: 0, y: -24, duration: 0.06 }, at + 0.15)
      })
      ptl.to({}, { duration: 0 }, 1)

      // Manifesto: each word lights up as it is read.
      gsap.fromTo(
        '[data-word]',
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.05,
          scrollTrigger: { trigger: '[data-manifesto]', start: 'top 75%', end: 'bottom 45%', scrub: 0.5 },
        },
      )

      // Services: vertical scroll becomes a horizontal pan.
      const track = trackRef.current!
      const distance = () => track.scrollWidth - window.innerWidth
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: panRef.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      // Closing line slides up on the navy curtain.
      gsap.from('[data-closing] [data-line]', {
        yPercent: 110,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '[data-closing]', start: 'top 70%' },
      })
    })

    // Created after the pin so its spacer is already in the layout.
    // Nav follows the chapter under it.
    themeTriggers = gsap.utils.toArray<HTMLElement>('[data-theme-section]').map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: 'top 36px',
        end: 'bottom 36px',
        onToggle: (self) => {
          if (self.isActive && nav) nav.dataset.theme = el.dataset.themeSection!
        },
      }),
    )

    ScrollTrigger.refresh()

    return () => {
      disposed = true
      if (hasIdle) window.cancelIdleCallback(idleId)
      else window.clearTimeout(idleId)
      io.disconnect()
      heroST.kill()
      productST.kill()
      themeTriggers.forEach((t) => t.kill())
      ctx.revert()
      document.removeEventListener('click', onAnchor)
      if (lenis) {
        gsap.ticker.remove(tick)
        lenis.destroy()
      }
      win?.dispose()
      product?.dispose()
    }
  }, [])

  return (
    <>
      <a
        href="#cotacao"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-lime focus:px-4 focus:py-2 focus:text-navy"
      >
        Saltar para a cotação
      </a>
      <Nav2 />
      <main>
        {/* 1. Do lado de dentro */}
        <section id="topo" ref={heroRef} data-theme-section="dark" className="relative h-[420vh] bg-[#0b1216]">
          <div className="sticky top-0 h-[100dvh] overflow-hidden">
            <canvas
              ref={heroCanvas}
              aria-hidden="true"
              className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-1000 data-[ready=true]:opacity-100"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(11,18,22,0.92)_0%,rgba(11,18,22,0.35)_38%,transparent_60%)]"
            />
            <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-5 pb-14 md:px-10 md:pb-20">
              <h1
                data-h1
                className="max-w-[15ch] font-display text-[clamp(2.75rem,7vw,6rem)] font-black leading-[0.95] tracking-[-0.035em]"
              >
                Há trabalho que ninguém devia fazer pendurado.
              </h1>
            </div>
            <p
              data-h2
              className="absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-5 pb-14 font-display text-[clamp(2.75rem,7vw,6rem)] font-black leading-[0.95] tracking-[-0.035em] opacity-0 md:px-10 md:pb-20"
            >
              Por isso, mandamos
              <br />o drone.
            </p>
            <p
              data-h3
              className="absolute inset-0 grid place-items-center px-5 text-center font-display text-[clamp(3rem,9vw,8rem)] font-black leading-[0.92] tracking-[-0.04em] text-navy opacity-0"
            >
              Vidro limpo.
              <br />
              Equipa em terra.
            </p>
            <div data-meter className="absolute right-5 top-[96px] text-right opacity-0 md:right-10">
              <span className="block text-[13px] text-mist/75">Vidro limpo</span>
              <span id="v2-clean" className="tnum font-display text-3xl font-medium">
                0%
              </span>
            </div>
            <div data-white aria-hidden="true" className="pointer-events-none absolute inset-0 bg-paper opacity-0" />
          </div>
        </section>

        {/* 2. O sistema */}
        <section ref={productRef} data-theme-section="light" className="relative h-[320vh] bg-paper text-navy">
          <div className="sticky top-0 h-[100dvh] overflow-hidden">
            <canvas
              ref={productCanvas}
              aria-hidden="true"
              className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700 data-[ready=true]:opacity-100"
            />
            <div className="relative mx-auto max-w-[1400px] px-5 pt-28 md:px-10 md:pt-32">
              <h2 className="font-display text-[clamp(3rem,8vw,7rem)] font-black leading-[0.9] tracking-[-0.04em]">
                O sistema.
              </h2>
              <p className="mt-5 max-w-[34ch] text-lg leading-relaxed text-navy/75">
                Um drone de limpeza ligado ao chão. A água sobe pela mangueira, a equipa pilota a partir de baixo.
              </p>
            </div>
            <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-5 pb-12 md:px-10 md:pb-16">
              <div className="relative h-28 md:ml-auto md:w-[26rem]">
                {captions.map((c) => (
                  <div key={c.title} data-caption className="absolute inset-0 opacity-0">
                    <h3 className="font-display text-2xl font-black tracking-[-0.02em]">{c.title}</h3>
                    <p className="mt-2 leading-relaxed text-navy/75">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Manifesto */}
        <section data-theme-section="light" className="bg-paper px-5 py-[24vh] text-navy md:px-10">
          <p
            data-manifesto
            className="mx-auto max-w-[1100px] font-display text-[clamp(2rem,4.6vw,4.25rem)] font-black leading-[1.08] tracking-[-0.03em]"
          >
            {MANIFESTO.split(' ').map((w, i) => (
              <span key={i} data-word className="inline-block">
                {w}&nbsp;
              </span>
            ))}
          </p>
        </section>

        {/* 4. Serviços em panorâmica */}
        <section ref={panRef} id="servicos" data-theme-section="light" className="relative overflow-hidden bg-paper text-navy">
          <div className="flex h-[100dvh] flex-col justify-center">
            <h2 className="mx-auto w-full max-w-[1400px] px-5 font-display text-[clamp(2.2rem,4.6vw,4.25rem)] font-black leading-[1] tracking-[-0.03em] md:px-10">
              Hoje, fachadas.
              <br />
              Amanhã, tudo o que está fora de alcance.
            </h2>
            <div ref={trackRef} className="mt-12 flex gap-5 px-5 will-change-transform md:gap-8 md:px-10">
              {services.map((s) => (
                <article
                  key={s.name}
                  className={`relative flex h-[52vh] w-[82vw] shrink-0 flex-col justify-end overflow-hidden rounded-[4px] p-7 md:w-[46vw] md:p-10 ${
                    s.lead ? 'bg-navy text-mist' : 'border border-navy/15 bg-paper'
                  }`}
                >
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 [mask-image:url(/brand-pattern.svg)] [mask-size:120px_120px] ${
                      s.lead ? 'bg-lime opacity-[0.08]' : 'bg-navy opacity-[0.05]'
                    }`}
                  />
                  <h3 className="relative font-display text-[clamp(2rem,3.6vw,3.25rem)] font-black leading-[1] tracking-[-0.025em]">
                    {s.name}
                  </h3>
                  <p className={`relative mt-4 max-w-[40ch] text-lg leading-relaxed ${s.lead ? 'text-mist/80' : 'text-navy/70'}`}>
                    {s.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Fecho e cotação */}
        <div data-theme-section="dark" className="bg-navy">
          <section data-closing className="mx-auto max-w-[1400px] px-5 pt-[22vh] md:px-10">
            <p className="font-display text-[clamp(3rem,9vw,8rem)] font-black leading-[0.92] tracking-[-0.04em]">
              <span className="block overflow-hidden pb-2">
                <span data-line className="block">
                  O drone sobe.
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span data-line className="block text-mist/55">
                  Nós ficamos cá em baixo.
                </span>
              </span>
            </p>
          </section>
          <Quote />
          <Footer />
        </div>
      </main>
    </>
  )
}
