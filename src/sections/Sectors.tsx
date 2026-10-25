import { Bank, Bed, Factory, FirstAidKit, SolarPanel, Storefront, type Icon } from '@phosphor-icons/react'
import { sectors } from '../content'

const icons: Record<string, Icon> = {
  hotel: Bed,
  health: FirstAidKit,
  bank: Bank,
  retail: Storefront,
  solar: SolarPanel,
  industry: Factory,
}

export default function Sectors() {
  return (
    <section id="sectores" className="on-dark bg-navy py-24 text-white md:py-32">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <h2 data-reveal className="max-w-[18ch] font-display text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.02] tracking-[-0.025em]">
          {sectors.title}
        </h2>
        <p data-reveal className="mt-6 max-w-[60ch] text-lg leading-relaxed text-white/75">
          {sectors.intro}
        </p>

        <ul className="mt-16 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.items.map((s) => {
            const I = icons[s.icon]
            return (
              <li key={s.name} data-reveal className="border-t border-white/15 pb-12 pt-8">
                <I size={32} weight="light" aria-hidden className="text-lime" />
                <h3 className="mt-8 font-display text-xl font-medium">{s.name}</h3>
                <p className="mt-3 leading-relaxed text-white/70">{s.text}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
