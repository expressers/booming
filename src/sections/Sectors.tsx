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
    <section id="sectores" className="bg-white py-24 md:py-36">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2
            data-reveal
            className="font-display text-[clamp(2.25rem,4.6vw,4.25rem)] font-black leading-[0.98] tracking-[-0.03em] lg:col-span-7"
          >
            {sectors.title}
          </h2>
          <p className="max-w-[52ch] text-lg leading-relaxed text-navy/70 lg:col-span-5">{sectors.intro}</p>
        </div>

        <ul className="mt-16 grid gap-x-12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
          {sectors.items.map((s) => {
            const I = icons[s.icon]
            return (
              <li key={s.name} data-reveal className="border-t-2 border-navy pb-14 pt-7">
                <div className="flex items-start justify-between gap-6">
                  <h3 className="font-display text-[1.375rem] font-medium leading-tight">{s.name}</h3>
                  <I size={30} weight="light" aria-hidden className="shrink-0 text-navy" />
                </div>
                <p className="mt-4 max-w-[40ch] leading-relaxed text-navy/70">{s.text}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
