import { useEffect, useRef } from 'react'
import { gsap, reducedMotion } from '../lib/motion'
import { safety } from '../content'

// A drone circling a glass tower plays behind the safety statement. It only plays while on
// screen, and never under reduced motion (the poster frame stays).
export default function Safety() {
  const ref = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [lead, ...rest] = safety.paragraphs

  useEffect(() => {
    const v = video.current
    const el = ref.current
    if (!v || !el || reducedMotion()) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (v.preload !== 'auto') v.preload = 'auto'
        v.play().catch(() => {})
      } else v.pause()
    })
    io.observe(el)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-media]',
        { scale: 1.15 },
        { scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'top top', scrub: true } },
      )
    }, el)
    return () => {
      io.disconnect()
      ctx.revert()
    }
  }, [])

  return (
    <section ref={ref} id="seguranca" className="on-dark relative isolate overflow-hidden bg-navy-deep text-white">
      <div data-media className="absolute inset-0 -z-10">
        <video
          ref={video}
          muted
          loop
          playsInline
          preload="none"
          poster="/video/orbita.webp"
          aria-hidden
          className="h-full w-full object-cover"
        >
          <source src="/video/orbita.mp4" type="video/mp4" />
        </video>
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(17_28_35/0.92)_0%,rgb(17_28_35/0.75)_45%,rgb(17_28_35/0.35)_100%)]" />

      <div className="mx-auto flex min-h-[100svh] max-w-[1320px] flex-col justify-center px-5 py-28 md:px-10">
        <h2 data-reveal className="max-w-[12ch] font-display text-[clamp(2.5rem,6vw,5.5rem)] font-black leading-[0.95] tracking-[-0.035em]">
          {safety.title}
        </h2>
        <p className="mt-10 max-w-[38ch] text-xl leading-relaxed md:text-2xl">{lead}</p>
        <div className="mt-10 grid max-w-[880px] gap-6 leading-relaxed text-white/75 md:grid-cols-2 md:gap-10">
          {rest.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
