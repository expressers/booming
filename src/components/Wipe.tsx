import { useEffect, useRef } from 'react'
import { gsap, reducedMotion } from '../lib/motion'

type Props = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  eager?: boolean
}

// The cleaning pass: a photo is uncovered top to bottom behind a lime edge, the way a drone
// works down a facade. Scrubbed to scroll so the reader controls the pass.
export default function Wipe({ src, alt, className = '', imgClassName = '', eager }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: el, start: 'top 88%', end: 'top 40%', scrub: 0.5 },
      })
      tl.fromTo('[data-wipe-mask]', { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1 }, 0)
        .fromTo('[data-wipe-img]', { scale: 1.12 }, { scale: 1, duration: 1 }, 0)
        .fromTo('[data-wipe-edge]', { yPercent: 0 }, { yPercent: 100, duration: 1 }, 0)
        .to('[data-wipe-line]', { opacity: 0, duration: 0.08 }, 0.94)
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <figure ref={ref} className={`relative overflow-hidden ${className}`}>
      <div data-wipe-mask className="absolute inset-0">
        <img
          data-wipe-img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      </div>
      <div data-wipe-edge aria-hidden className="pointer-events-none absolute inset-0 motion-reduce:hidden">
        <div data-wipe-line className="h-[2px] w-full bg-lime" />
      </div>
    </figure>
  )
}
