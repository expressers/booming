import { Check } from '@phosphor-icons/react'
import Wipe from '../components/Wipe'
import { about } from '../content'

export default function About() {
  const [first, ...rest] = about.paragraphs
  return (
    <section id="quem-somos" className="bg-white py-24 md:py-36">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6 lg:pt-6">
          <h2 data-reveal className="font-display text-[clamp(2.25rem,4.6vw,4.25rem)] font-black leading-[0.98] tracking-[-0.03em]">
            {about.title}
          </h2>
          <p className="mt-10 max-w-[44ch] text-xl leading-relaxed md:text-[1.375rem]">{first}</p>
          <div className="mt-6 max-w-[52ch] space-y-5 text-lg leading-relaxed text-navy/70">
            {rest.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>
        </div>
        <Wipe
          src="/img/drone-spray.webp"
          alt="Drone a pulverizar água em voo"
          imgClassName="object-[50%_18%]"
          className="aspect-[4/5] lg:col-span-6"
        />
      </div>

      <div className="mx-auto mt-24 grid max-w-[1320px] gap-px px-5 md:mt-32 md:grid-cols-2 md:px-10">
        {[
          ['Missão', about.mission],
          ['Visão', about.vision],
        ].map(([t, d], i) => (
          <div key={t} className={`border-t-2 border-navy py-10 md:py-12 ${i === 0 ? 'md:pr-14' : 'md:pl-14'}`}>
            <h3 className="font-display text-[clamp(1.75rem,2.6vw,2.25rem)] font-black tracking-[-0.02em]">{t}</h3>
            <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-navy/75">{d}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-14 max-w-[1320px] px-5 md:px-10">
        <h3 className="font-display text-[clamp(1.75rem,2.6vw,2.25rem)] font-black tracking-[-0.02em]">Valores</h3>
        <ul className="mt-8 flex flex-wrap gap-3">
          {about.values.map((v) => (
            <li key={v} className="flex items-center gap-2.5 rounded-full border border-line py-2.5 pl-3 pr-5 text-[17px]">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lime text-navy">
                <Check size={12} weight="bold" aria-hidden />
              </span>
              {v}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
