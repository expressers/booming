import { why } from '../content'

export default function Why() {
  return (
    <section aria-labelledby="porque-title" className="mx-auto max-w-[1320px] px-5 py-24 md:px-10 md:py-32">
      <h2
        id="porque-title"
        data-reveal
        className="max-w-[18ch] font-display text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.02] tracking-[-0.025em]"
      >
        {why.title}
      </h2>
      <dl className="mt-14 border-b border-line">
        {why.items.map((w) => (
          <div key={w.name} className="grid gap-3 border-t border-line py-7 md:grid-cols-12 md:gap-10">
            <dt className="font-display text-xl font-medium md:col-span-4">{w.name}</dt>
            <dd className="max-w-[62ch] leading-relaxed text-navy/70 md:col-span-8">{w.text}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
