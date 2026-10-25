import { intro } from '../content'

export default function Intro() {
  return (
    <section aria-label="Apresentação" className="mx-auto max-w-[1320px] px-5 py-24 md:px-10 md:py-32">
      <p data-reveal className="max-w-[22ch] font-display text-[clamp(1.9rem,3.8vw,3.25rem)] font-black leading-[1.08] tracking-[-0.025em]">
        {intro.statement}
      </p>
      <div data-reveal className="mt-12 grid gap-8 md:grid-cols-2 md:gap-12 lg:ml-[33%]">
        {intro.paragraphs.map((p) => (
          <p key={p.slice(0, 20)} className="text-lg leading-relaxed text-navy/75">
            {p}
          </p>
        ))}
      </div>
    </section>
  )
}
