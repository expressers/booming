import { ArrowRight } from '@phosphor-icons/react'
import { hero } from '../content'

export default function Hero() {
  return (
    <section id="topo" className="on-dark relative isolate flex min-h-[100dvh] items-end overflow-hidden bg-navy text-white">
      <img
        src="/img/hero-alt.webp"
        alt=""
        fetchPriority="high"
        className="hero-photo absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(17,28,35,0.92)_0%,rgba(17,28,35,0.75)_42%,rgba(17,28,35,0.15)_100%)] max-md:bg-[linear-gradient(0deg,rgba(17,28,35,0.95)_0%,rgba(17,28,35,0.7)_55%,rgba(17,28,35,0.25)_100%)]"
      />
      <div className="mx-auto w-full max-w-[1320px] px-5 pb-16 pt-32 md:px-10 md:pb-24">
        <h1 className="max-w-[16ch] font-display text-[clamp(2.6rem,6vw,5.25rem)] font-black leading-[0.98] tracking-[-0.03em]">
          {hero.title}
        </h1>
        <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-white/85 md:text-xl">{hero.subtitle}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#contactos" className="btn btn-primary">
            Solicitar orçamento
            <ArrowRight size={18} weight="bold" aria-hidden />
          </a>
          <a href="#servicos" className="btn btn-ghost-light">
            Conhecer os nossos serviços
          </a>
        </div>
      </div>
    </section>
  )
}
