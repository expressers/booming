import { gallery } from '../content'

// The first image leads (2x2), two stack beside it, three close the row below: 6 tiles, no gaps.
const spans = ['sm:col-span-2 lg:row-span-2', '', '', '', '', 'sm:col-span-2 lg:col-span-1']

export default function Gallery() {
  return (
    <section id="projectos" className="mx-auto max-w-[1320px] px-5 py-24 md:px-10 md:py-32">
      <h2 data-reveal className="font-display text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.02] tracking-[-0.025em]">
        {gallery.title}
      </h2>
      <p data-reveal className="mt-6 max-w-[60ch] text-lg leading-relaxed text-navy/75">
        {gallery.intro}
      </p>

      <ul className="mt-14 grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:auto-rows-[260px] lg:grid-cols-3">
        {gallery.items.map((g, i) => (
          <li key={g.name} data-reveal className={`group flex flex-col ${spans[i]}`}>
            <div className="min-h-0 flex-1 overflow-hidden">
              <img
                src={g.image}
                alt={g.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
              />
            </div>
            <p className="pt-3 font-display text-[15px] font-medium">{g.name}</p>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-navy/60">Imagens ilustrativas.</p>
    </section>
  )
}
