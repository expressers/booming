const steps = [
  {
    verb: 'Inspecionar',
    text: 'Avaliamos a fachada, os acessos e o vento antes de voar, e definimos o plano de limpeza do edifício.',
    place: 'md:col-start-1 md:col-span-5',
  },
  {
    verb: 'Limpar',
    text: 'O drone sobe ligado por mangueira a uma estação em terra, que fornece a água. Passagens sobrepostas cobrem toda a superfície.',
    place: 'md:col-start-7 md:col-span-5',
  },
  {
    verb: 'Relatar',
    text: 'Entregamos um relatório fotográfico do edifício, com as zonas que ninguém consegue ver a partir do chão.',
    place: 'md:col-start-3 md:col-span-5',
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="relative py-[20vh]">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <h2
          data-wipe
          className="scrim max-w-[40rem] font-display text-[clamp(2.4rem,5.2vw,4.75rem)] font-black leading-[1] tracking-[-0.03em]"
        >
          Do topo ao chão, andar a andar.
        </h2>

        <ol className="mt-[16vh] grid grid-cols-1 gap-y-[22vh] md:grid-cols-12">
          {steps.map((s) => (
            <li key={s.verb} className={`scrim ${s.place}`} data-wipe>
              <h3 className="font-display text-[clamp(2rem,3.6vw,3.25rem)] font-black leading-none tracking-[-0.02em] text-lime">
                {s.verb}
              </h3>
              <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-mist/90">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
