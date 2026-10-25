import { why } from '../content'

export default function Why() {
  return (
    <section aria-labelledby="porque-title" className="on-dark bg-navy-deep py-24 text-white md:py-36">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2
            id="porque-title"
            data-reveal
            className="font-display text-[clamp(2.25rem,4.6vw,4.25rem)] font-black leading-[0.98] tracking-[-0.03em] lg:sticky lg:top-32"
          >
            {why.title}
          </h2>
        </div>
        <dl className="lg:col-span-7">
          {why.items.map((w) => (
            <div key={w.name} data-reveal className="border-t border-white/15 py-8 first:border-t-0 first:pt-0 lg:first:pt-2">
              <dt className="font-display text-[1.5rem] font-medium leading-tight">{w.name}</dt>
              <dd className="mt-3 max-w-[54ch] text-lg leading-relaxed text-white/65">{w.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
