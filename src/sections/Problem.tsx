const before = [
  'Pessoas suspensas por cordas a dezenas de metros',
  'Gruas e plataformas a ocupar a rua durante dias',
  'Acessos fechados e a fachada parada',
]

const after = [
  'A equipa trabalha a partir do chão',
  'Um drone ligado por mangueira a uma estação em terra',
  'Água filtrada que seca sem marcas',
]

export default function Problem() {
  return (
    <section id="problema" className="relative py-[22vh]">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="scrim max-w-[52rem]" data-wipe>
          <h2 className="font-display text-[clamp(2.4rem,5.2vw,4.75rem)] font-black leading-[1] tracking-[-0.03em]">
            Limpar em altura sempre pôs alguém pendurado.
          </h2>
          <p className="mt-7 max-w-[52ch] text-lg leading-relaxed text-mist/85">
            Por isso muitas empresas deixaram de limpar os seus edifícios. A Booming muda o método: o drone sobe, as
            pessoas ficam em terra.
          </p>
        </div>

        <div className="mt-[18vh] grid gap-12 md:ml-[24%] md:grid-cols-2 md:gap-16">
          <div className="scrim" data-wipe>
            <h3 className="font-display text-xl font-medium text-mist/70">O método de sempre</h3>
            <ul className="mt-5 space-y-4 text-lg leading-snug text-mist/70">
              {before.map((t) => (
                <li key={t} className="line-through decoration-mist/30 decoration-1">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="scrim" data-wipe>
            <h3 className="font-display text-xl font-medium text-lime">Com a Booming</h3>
            <ul className="mt-5 space-y-4 text-lg leading-snug">
              {after.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
