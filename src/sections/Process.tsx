import { process } from '../content'

export default function Process() {
  return (
    <section aria-labelledby="processo-title" className="bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <h2
          id="processo-title"
          data-reveal
          className="max-w-[18ch] font-display text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.02] tracking-[-0.025em]"
        >
          {process.title}
        </h2>

        <ol className="relative mt-16 grid gap-10 lg:grid-cols-5 lg:gap-8">
          {/* The line joins the steps: it is the sequence, so it is drawn */}
          <span aria-hidden className="absolute left-[19px] top-2 bottom-2 w-px bg-navy/20 lg:left-0 lg:right-0 lg:top-[19px] lg:bottom-auto lg:h-px lg:w-auto" />
          {process.steps.map((s, i) => (
            <li key={s.name} className="relative grid grid-cols-[40px_1fr] gap-5 lg:block">
              <span className="tnum relative z-10 grid h-10 w-10 place-items-center rounded-full bg-navy font-display text-[15px] font-medium text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-lg font-medium leading-snug lg:mt-6">{s.name}</h3>
                <p className="mt-2 leading-relaxed text-navy/70">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
