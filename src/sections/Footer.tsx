import Logo from '../components/Logo'
import { CONTACT } from '../config'
import { footer, navLinks } from '../content'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="on-dark bg-navy-deep text-white">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-16 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Logo tone="white" className="h-11" />
          <p className="mt-6 max-w-[36ch] leading-relaxed text-white/70">{footer.tagline}</p>
        </div>
        <nav aria-label="Rodapé" className="lg:col-span-7">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link-quiet text-white/80">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mx-auto flex max-w-[1320px] flex-wrap justify-between gap-4 border-t border-white/10 px-5 py-6 text-sm text-white/55 md:px-10">
        <span>© {YEAR} {footer.name}</span>
        <span>Imagens e vídeos ilustrativos de banco de imagens.</span>
        <span>{CONTACT.location}</span>
      </div>
    </footer>
  )
}
