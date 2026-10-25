import { safety } from '../content'

export default function Safety() {
  const [lead, ...rest] = safety.paragraphs
  return (
    <section id="seguranca" className="relative isolate">
      <img
        src="/img/tower-dark.webp"
        alt="Fachada de vidro de uma torre contra o céu"
        loading="lazy"
        className="h-[52vh] w-full object-cover md:h-[70vh]"
      />
      <div className="mx-auto max-w-[1320px] px-0 md:px-10">
        <div data-reveal className="on-dark relative bg-navy px-5 py-14 text-white md:-mt-48 md:ml-auto md:w-[min(760px,70%)] md:p-14">
          <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-black leading-[1.02] tracking-[-0.025em]">
            {safety.title}
          </h2>
          <p className="mt-6 text-xl leading-relaxed">{lead}</p>
          <div className="mt-6 space-y-4 leading-relaxed text-white/75">
            {rest.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
