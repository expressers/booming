import Logo from '../components/Logo'
import { CONTACT } from '../config'

export default function Footer() {
  return (
    <footer className="relative bg-navy-deep">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 border-t border-mist/10 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-10">
        <Logo className="h-10" />
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-[15px] text-mist/75">
          {CONTACT.instagram && (
            <a className="link" href={CONTACT.instagram} rel="noopener" target="_blank">
              Instagram
            </a>
          )}
          {CONTACT.linkedin && (
            <a className="link" href={CONTACT.linkedin} rel="noopener" target="_blank">
              LinkedIn
            </a>
          )}
          <span>{CONTACT.city}</span>
          <span>© {new Date().getFullYear()} Booming</span>
        </div>
      </div>
    </footer>
  )
}
