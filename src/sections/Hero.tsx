import { ArrowRight } from '@phosphor-icons/react'

export default function Hero() {
  return (
    <section id="topo" className="relative flex min-h-[100dvh] items-end pb-14 pt-24 md:pb-20">
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <div className="scrim max-w-[44rem]">
          <h1
            data-hero-title
            className="font-display text-[clamp(3rem,7.4vw,6rem)] font-black leading-[0.95] tracking-[-0.03em]"
          >
            Para além do alcance.
          </h1>
          <p data-hero-sub className="mt-6 max-w-[36ch] text-lg leading-relaxed text-mist/85 md:text-xl">
            Limpamos fachadas em altura com drones. Sem cordas, sem andaimes, com toda a equipa em terra firme.
          </p>
          <div data-hero-cta className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a href="#cotacao" className="btn btn-primary">
              Pedir cotação
              <ArrowRight size={18} weight="bold" aria-hidden />
            </a>
            <a href="#como-funciona" className="link text-[15px] text-mist/90">
              Ver como funciona
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
