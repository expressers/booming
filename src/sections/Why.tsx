const words = ['Eficiência.', 'Precisão.', 'Segurança.']

export default function Why() {
  return (
    <section id="porque" aria-labelledby="porque-title" className="relative py-[22vh]">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <h2 id="porque-title" className="sr-only">
          Porquê a Booming
        </h2>
        <div className="flex flex-col gap-[6vh]">
          {words.map((w, i) => (
            <p
              key={w}
              data-wipe
              className={`scrim w-fit font-display text-[clamp(3.2rem,9vw,6rem)] font-black leading-[0.95] tracking-[-0.035em] ${
                i === 1 ? 'md:ml-[18%]' : i === 2 ? 'text-lime md:ml-[36%]' : ''
              }`}
            >
              {w}
            </p>
          ))}
        </div>
        <p data-wipe className="scrim mt-[12vh] max-w-[38ch] text-xl leading-relaxed md:ml-[36%]">
          Ninguém suspenso. Pilotos com certificação em drones. Uma operação planeada e conduzida a partir do chão.
        </p>
      </div>
    </section>
  )
}
