import { Plus } from '@phosphor-icons/react'
import { faq } from '../content'

export default function Faq() {
  return (
    <section id="faq" className="bg-paper py-24 md:py-32">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-16">
        <h2
          data-reveal
          className="font-display text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.02] tracking-[-0.025em] lg:col-span-4"
        >
          Perguntas frequentes.
        </h2>
        <div data-reveal className="lg:col-span-8">
          {faq.map((f) => (
            <details key={f.q} className="group border-t border-line last:border-b">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-lg font-medium md:text-xl [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus size={20} aria-hidden className="shrink-0 transition-transform duration-200 group-open:rotate-45" />
              </summary>
              <p className="max-w-[62ch] pb-7 text-lg leading-relaxed text-navy/75">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
