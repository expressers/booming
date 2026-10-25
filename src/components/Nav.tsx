import { useEffect, useState } from 'react'
import { lockScroll } from '../lib/motion'
import { ArrowRight, List, X } from '@phosphor-icons/react'
import Logo from './Logo'

const links = [
  { href: '#quem-somos', label: 'Quem somos' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#sectores', label: 'Sectores' },
  { href: '#projectos', label: 'Projectos' },
  { href: '#seguranca', label: 'Segurança' },
  { href: '#faq', label: 'FAQ' },
]

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  // The nav sits over the hero photo until the hero leaves the viewport.
  useEffect(() => {
    const hero = document.getElementById('topo')
    if (!hero) return
    const io = new IntersectionObserver(([e]) => setSolid(!e.isIntersecting), { rootMargin: '-72px 0px 0px 0px' })
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    lockScroll(true)
    return () => {
      lockScroll(false)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  // Dark ground everywhere except the open mobile menu, which is a white sheet.
  const light = open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
        open
          ? 'bg-white shadow-[0_1px_0_var(--color-line)]'
          : solid
            ? 'bg-navy-deep/95 shadow-[0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-md'
            : 'bg-transparent'
      }`}
    >
      <nav aria-label="Principal" className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-5 md:px-10">
        <a href="#topo" aria-label="Booming, voltar ao início" className="h-9 md:h-10" onClick={() => setOpen(false)}>
          <Logo tone={light ? 'navy' : 'white'} className="h-full" />
        </a>

        <ul className={`hidden items-center gap-7 lg:flex ${light ? 'text-navy' : 'text-white'}`}>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="link-quiet text-[15px]">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href="#contactos" className="btn btn-primary !h-11 !px-4 text-[15px] hidden sm:inline-flex">
            Solicitar orçamento
            <ArrowRight size={16} weight="bold" aria-hidden />
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="menu-movel"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
            className={`grid h-11 w-11 place-items-center rounded-[4px] transition-transform duration-150 active:scale-[0.97] lg:hidden ${
              light ? 'text-navy' : 'text-white'
            }`}
          >
            {open ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </nav>

      <div
        id="menu-movel"
        hidden={!open}
        className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-white px-5 pb-10 pt-6 lg:hidden"
      >
        <ul className="flex flex-col">
          {links.map((l) => (
            <li key={l.href} className="border-b border-line">
              <a href={l.href} onClick={() => setOpen(false)} className="block py-4 font-display text-2xl font-medium">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contactos" onClick={() => setOpen(false)} className="btn btn-navy mt-8 w-full">
          Solicitar orçamento
          <ArrowRight size={16} weight="bold" aria-hidden />
        </a>
      </div>
    </header>
  )
}
