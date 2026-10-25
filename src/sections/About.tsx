import { Check } from '@phosphor-icons/react'
import { about } from '../content'

export default function About() {
  return (
    <section id="quem-somos" className="bg-paper py-24 md:py-32">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-16">
        <figure className="lg:col-span-5">
          <img
            src="/img/drone-white.webp"
            alt="Drone de carga em voo"
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
          />
        </figure>
        <div className="lg:col-span-7">
          <h2 data-reveal className="font-display text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.02] tracking-[-0.025em]">
            {about.title}
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-navy/75">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 grid max-w-[1320px] px-5 md:mt-28 md:grid-cols-2 md:px-10">
        <div className="border-t border-line py-10 md:py-12 md:pr-12">
          <h3 className="font-display text-2xl font-black tracking-[-0.02em]">Missão</h3>
          <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-navy/75">{about.mission}</p>
        </div>
        <div className="border-t border-line py-10 md:border-l md:py-12 md:pl-12">
          <h3 className="font-display text-2xl font-black tracking-[-0.02em]">Visão</h3>
          <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-navy/75">{about.vision}</p>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[1320px] px-5 md:px-10">
        <h3 data-reveal className="font-display text-2xl font-black tracking-[-0.02em]">
          Valores
        </h3>
        <ul className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {about.values.map((v) => (
            <li key={v} className="flex items-center gap-3 border-t border-line pt-4 text-lg">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-lime text-navy">
                <Check size={14} weight="bold" aria-hidden />
              </span>
              {v}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
