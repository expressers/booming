import Wipe from '../components/Wipe'
import { gallery } from '../content'

// The first image leads (2x2), two stack beside it, three close the row below: 6 tiles, no gaps.
const spans = ['sm:col-span-2 lg:row-span-2', '', '', '', '', 'sm:col-span-2 lg:col-span-1']

export default function Gallery() {
  return (
    <section id="projectos" className="bg-white py-24 md:py-36">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2
            data-reveal
            className="font-display text-[clamp(2.25rem,4.6vw,4.25rem)] font-black leading-[0.98] tracking-[-0.03em] lg:col-span-6"
          >
            {gallery.title}
          </h2>
          <div className="max-w-[52ch] space-y-3 lg:col-span-6">
            <p className="text-lg leading-relaxed text-navy/75">{gallery.intro}</p>
            <p className="leading-relaxed text-navy/60">
              Imagens ilustrativas de banco de imagens. Os projectos da BOOMING serão publicados quando autorizados.
            </p>
          </div>
        </div>

        <ul className="mt-16 grid auto-rows-[240px] gap-4 sm:grid-cols-2 lg:auto-rows-[280px] lg:grid-cols-3">
          {gallery.items.map((g, i) => (
            <li key={g.name} className={`flex flex-col ${spans[i]}`}>
              <Wipe src={g.image} alt={g.alt} className="min-h-0 flex-1" />
              <p className="pt-3 font-display text-[15px] font-medium">{g.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
