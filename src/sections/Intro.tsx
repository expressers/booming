import { useEffect, useRef } from 'react'
import { gsap, reducedMotion } from '../lib/motion'
import { intro } from '../content'

// The first paragraph reads like glass being cleaned: words start dim and clear as you scroll past.
export default function Intro() {
  const ref = useRef<HTMLElement>(null)
  const [lead, rest] = intro.paragraphs

  useEffect(() => {
    if (reducedMotion() || !ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-clean] > span',
        { opacity: 0.18 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.05,
          scrollTrigger: { trigger: '[data-clean]', start: 'top 80%', end: 'bottom 45%', scrub: true },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} aria-label="Apresentação" className="on-dark bg-navy-deep pb-28 pt-10 text-white md:pb-40 md:pt-16">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        {/* Shown in the hero flight; without motion it lives here instead */}
        <p className="mb-14 hidden max-w-[20ch] font-display text-[clamp(2rem,4.6vw,4.25rem)] font-black leading-[1.02] tracking-[-0.03em] motion-reduce:block">
          {intro.statement}
        </p>
        <p data-clean className="max-w-[30ch] font-display text-[clamp(1.6rem,3.2vw,2.75rem)] font-medium leading-[1.18] tracking-[-0.02em]">
          {lead.split(' ').map((w, i) => (
            <span key={i}>{w} </span>
          ))}
        </p>
        <p className="mt-12 max-w-[52ch] text-lg leading-relaxed text-white/70 md:ml-[40%] md:text-xl">{rest}</p>
      </div>
    </section>
  )
}
