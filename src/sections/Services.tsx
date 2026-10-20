const upcoming = [
  {
    name: 'Painéis solares e campos fotovoltaicos',
    text: 'Limpeza de painéis em telhados e em campos de produção de energia.',
  },
  {
    name: 'Mapeamento e inspecção',
    text: 'Relatórios fotográficos para encontrar fissuras onde o olho não chega.',
  },
  {
    name: 'Aviação privada',
    text: 'Limpeza exterior de jatos privados, sem escadas nem plataformas.',
  },
]

export default function Services() {
  return (
    <section id="servicos" className="relative py-[20vh]">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-5 md:grid-cols-12 md:px-10">
        <div className="scrim md:col-span-7" data-wipe>
          <h2 className="font-display text-[clamp(2.4rem,5.2vw,4.75rem)] font-black leading-[1] tracking-[-0.03em]">
            Hoje, fachadas. A seguir, tudo o que está fora de alcance.
          </h2>
          <div className="mt-12 rounded-[4px] bg-navy-deep/80 p-7 md:p-9">
            <h3 className="font-display text-3xl font-black tracking-[-0.02em] md:text-4xl">
              Fachadas e vidros, <span className="text-lime">já hoje</span>
            </h3>
            <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-mist/85">
              Vidro, painéis metálicos e revestimentos de escritórios, hotéis e edifícios de habitação, em qualquer
              altura que o drone alcance com segurança.
            </p>
          </div>
        </div>

        <div className="scrim md:col-span-4 md:col-start-9 md:mt-[28vh]" data-wipe>
          <h3 className="font-display text-3xl font-black tracking-[-0.02em]">Em breve</h3>
          <ul className="mt-4 divide-y divide-mist/15">
            {upcoming.map((s) => (
              <li key={s.name} className="py-6 first:pt-2">
                <h4 className="font-display text-xl font-medium">{s.name}</h4>
                <p className="mt-2 leading-relaxed text-mist/75">{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
