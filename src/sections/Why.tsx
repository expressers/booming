import { CalendarCheck, Cpu, Gauge, Leaf, ShieldCheck, SlidersHorizontal, type Icon } from '@phosphor-icons/react'
import { why } from '../content'

const icons: Icon[] = [Cpu, ShieldCheck, Gauge, Leaf, SlidersHorizontal, CalendarCheck]

export default function Why() {
  return (
    <section aria-labelledby="porque-title" className="mx-auto max-w-[1320px] px-5 py-24 md:px-10 md:py-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <h2
            id="porque-title"
            data-reveal
            className="font-display text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.02] tracking-[-0.025em] lg:sticky lg:top-28"
          >
            {why.title}
          </h2>
        </div>
        <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-8">
          {why.items.map((w, i) => {
            const I = icons[i]
            return (
              <li key={w.name} data-reveal className="border-t border-line pt-6">
                <I size={28} weight="light" aria-hidden />
                <h3 className="mt-5 font-display text-xl font-medium">{w.name}</h3>
                <p className="mt-3 leading-relaxed text-navy/70">{w.text}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
