import { useEffect, useRef } from 'react'
import { gsap } from '../lib/motion'
import { services } from '../content'

// Desktop: the five services pass sideways like a drone working along a facade, one panel per
// stretch of scroll. Phones, tablets and reduced motion get the same panels stacked.
export default function Services() {
  const wrap = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const w = wrap.current!
      const t = track.current!
      const distance = () => t.scrollWidth - window.innerWidth
      const fit = () => (w.style.height = `${distance() + window.innerHeight}px`)
      fit()
      const tween = gsap.to(t, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: w,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true,
          onRefreshInit: fit,
        },
      })
      gsap.utils.toArray<HTMLElement>('[data-pan-img]').forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: 'none',
            scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
          },
        )
      })
      return () => {
        w.style.height = ''
      }
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="servicos" className="on-dark bg-navy text-white">
      <div className="mx-auto max-w-[1320px] px-5 pb-12 pt-24 md:px-10 md:pt-36 lg:pb-0">
        <h2 data-reveal className="font-display text-[clamp(2.25rem,4.6vw,4.25rem)] font-black leading-[0.98] tracking-[-0.03em]">
          Os nossos serviços.
        </h2>
      </div>

      <div ref={wrap} className="relative">
        <div className="lg:motion-safe:sticky lg:motion-safe:top-0 lg:motion-safe:h-[100svh] lg:motion-safe:overflow-hidden">
          <div
            ref={track}
            className="flex flex-col gap-20 px-5 pb-24 md:px-10 lg:motion-safe:h-full lg:motion-safe:w-max lg:motion-safe:flex-row lg:motion-safe:items-center lg:motion-safe:gap-[6vw] lg:motion-safe:px-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))] lg:motion-safe:pb-0"
          >
            {services.map((s) => (
              <article
                key={s.id}
                className="grid gap-8 lg:grid-cols-12 lg:gap-12 lg:motion-safe:w-[min(1180px,84vw)] lg:motion-safe:shrink-0"
              >
                <div className="relative aspect-[4/3] overflow-hidden lg:col-span-7 lg:aspect-auto lg:h-[68svh]">
                  <img
                    data-pan-img
                    src={s.image}
                    alt={s.alt}
                    loading="eager"
                    decoding="async"
                    className="absolute inset-0 h-full w-full scale-[1.18] object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center lg:col-span-5">
                  <span aria-hidden className="block h-[3px] w-10 bg-lime" />
                  <h3 className="mt-6 font-display text-[clamp(1.75rem,2.8vw,2.6rem)] font-black leading-[1.02] tracking-[-0.025em]">
                    {s.name}
                  </h3>
                  <div className="mt-6 space-y-4 leading-relaxed text-white/75 lg:text-[17px]">
                    {s.paragraphs.map((p) => (
                      <p key={p.slice(0, 20)}>{p}</p>
                    ))}
                  </div>
                  <ul className="mt-7 flex flex-wrap gap-2">
                    {s.applications.map((a) => (
                      <li key={a} className="rounded-full border border-white/20 px-3.5 py-1.5 text-[14px] text-white/85">
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
