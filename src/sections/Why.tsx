// Facts only: each line is something the Booming method does, as stated by Carlos.
const facts = ['Ninguém suspenso.', 'Pilotagem certificada.', 'Tudo a partir do chão.']

export default function Why() {
  return (
    <section id="porque" aria-labelledby="porque-title" className="relative py-[22vh]">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <h2 id="porque-title" className="sr-only">
          Porquê a Booming
        </h2>
        <div className="flex flex-col gap-[6vh]">
          {facts.map((w, i) => (
            <p
              key={w}
              data-wipe
              className={`scrim w-fit font-display text-[clamp(2.8rem,8vw,5.5rem)] font-black leading-[0.95] tracking-[-0.035em] ${
                i === 1 ? 'md:ml-[18%]' : i === 2 ? 'text-lime md:ml-[30%]' : ''
              }`}
            >
              {w}
            </p>
          ))}
        </div>
        <p data-wipe className="scrim mt-[12vh] max-w-[38ch] text-xl leading-relaxed md:ml-[30%]">
          A equipa planeia o voo, o drone faz a subida e o trabalho em altura. O risco fica com a máquina, não com as
          pessoas.
        </p>
      </div>
    </section>
  )
}
