import { useEffect, useRef } from 'react'
import { gsap, reducedMotion } from '../lib/motion'
import { process } from '../content'

// One lime route runs through the five steps and draws itself as you read; each stop lights
// when the route reaches it.
export default function Process() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reducedMotion() || !ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-route]',
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '[data-steps]', start: 'top 60%', end: 'bottom 60%', scrub: true } },
      )
      gsap.utils.toArray<HTMLElement>('[data-step]').forEach((el) => {
        gsap.from(el.querySelector('[data-step-body]'), {
          opacity: 0.25,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 75%', end: 'top 60%', scrub: true },
        })
        gsap.to(el.querySelector('[data-stop]'), {
          backgroundColor: '#91d336',
          borderColor: '#91d336',
          duration: 0.2,
          scrollTrigger: { trigger: el, start: 'top 60%', toggleActions: 'play none none reverse' },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} aria-labelledby="processo-title" className="bg-paper py-24 md:py-36">
      <div className="mx-auto grid max-w-[1320px] gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2
            id="processo-title"
            data-reveal
            className="font-display text-[clamp(2.25rem,4.6vw,4.25rem)] font-black leading-[0.98] tracking-[-0.03em] lg:sticky lg:top-32"
          >
            {process.title}
          </h2>
        </div>

        <ol data-steps className="relative lg:col-span-7">
          <span aria-hidden className="absolute bottom-3 left-[9px] top-3 w-[2px] bg-navy/12" />
          <span aria-hidden data-route className="absolute bottom-3 left-[9px] top-3 w-[2px] origin-top bg-lime" />
          {process.steps.map((s) => (
            <li key={s.name} data-step className="relative grid grid-cols-[20px_1fr] gap-7 pb-14 last:pb-0">
              <span
                data-stop
                aria-hidden
                className="relative z-10 mt-1.5 h-5 w-5 rounded-full border-2 border-navy/25 bg-paper motion-reduce:border-lime motion-reduce:bg-lime"
              />
              <div data-step-body>
                <h3 className="font-display text-[clamp(1.4rem,2.2vw,1.875rem)] font-medium leading-tight tracking-[-0.01em]">
                  {s.name}
                </h3>
                <p className="mt-3 max-w-[52ch] text-lg leading-relaxed text-navy/70">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
