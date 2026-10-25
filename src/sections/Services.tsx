import { useState } from 'react'
import { ArrowRight, Plus } from '@phosphor-icons/react'
import { services, type Service } from '../content'

function Detail({ s }: { s: Service }) {
  return (
    <>
      <div className="space-y-4 text-lg leading-relaxed text-navy/75">
        {s.paragraphs.map((p) => (
          <p key={p.slice(0, 20)}>{p}</p>
        ))}
      </div>
      <h4 className="mt-8 font-display text-base font-medium">Aplicações</h4>
      <ul className="mt-3 grid gap-x-8 sm:grid-cols-2">
        {s.applications.map((a) => (
          <li key={a} className="flex gap-3 border-t border-line py-3 text-[15px]">
            <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 bg-lime" />
            {a}
          </li>
        ))}
      </ul>
    </>
  )
}

export default function Services() {
  const [active, setActive] = useState(0)
  const s = services[active]

  return (
    <section id="servicos" className="mx-auto max-w-[1320px] px-5 py-24 md:px-10 md:py-32">
      <h2 data-reveal className="font-display text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.02] tracking-[-0.025em]">
        Os nossos serviços.
      </h2>

      {/* Desktop: a list of services drives one detail panel */}
      <div className="mt-14 hidden gap-14 lg:grid lg:grid-cols-12">
        <div role="tablist" aria-label="Serviços" aria-orientation="vertical" className="col-span-4 flex flex-col">
          {services.map((x, i) => (
            <button
              key={x.id}
              id={`tab-${x.id}`}
              role="tab"
              aria-selected={i === active}
              aria-controls="servico-painel"
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                  e.preventDefault()
                  const n = (active + (e.key === 'ArrowDown' ? 1 : -1) + services.length) % services.length
                  setActive(n)
                  document.getElementById(`tab-${services[n].id}`)?.focus()
                }
              }}
              className={`group flex items-center justify-between gap-4 border-t border-line py-5 text-left font-display text-xl font-medium transition-colors duration-200 last:border-b ${
                i === active ? 'text-navy' : 'text-navy/45 hover:text-navy/80'
              }`}
            >
              {x.name}
              <ArrowRight
                size={18}
                weight="bold"
                aria-hidden
                className={`shrink-0 transition-[opacity,transform] duration-200 ${
                  i === active ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
                }`}
              />
            </button>
          ))}
        </div>

        <div id="servico-painel" role="tabpanel" aria-labelledby={`tab-${s.id}`} className="col-span-8 grid grid-cols-8 gap-10">
          <img
            key={s.image}
            src={s.image}
            alt={s.alt}
            loading="lazy"
            className="col-span-3 aspect-[3/4] w-full object-cover [animation:fade_400ms_var(--ease-out)]"
          />
          <div key={s.id} className="col-span-5 [animation:fade_400ms_var(--ease-out)]">
            <h3 className="font-display text-3xl font-black leading-[1.05] tracking-[-0.02em]">{s.name}</h3>
            <div className="mt-6">
              <Detail s={s} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile and tablet: every service as an expandable row */}
      <div className="mt-10 lg:hidden">
        {services.map((x, i) => (
          <details key={x.id} open={i === 0} className="group border-t border-line last:border-b">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-xl font-medium [&::-webkit-details-marker]:hidden">
              {x.name}
              <Plus size={20} aria-hidden className="shrink-0 transition-transform duration-200 group-open:rotate-45" />
            </summary>
            <div className="pb-8">
              <img src={x.image} alt={x.alt} loading="lazy" className="mb-6 aspect-[16/10] w-full object-cover" />
              <Detail s={x} />
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
