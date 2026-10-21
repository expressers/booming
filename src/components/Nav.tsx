import { ArrowRight } from '@phosphor-icons/react'
import Logo from './Logo'

export default function Nav() {
  return (
    <header
      data-nav
      className="fixed inset-x-0 top-0 z-30 border-b border-transparent bg-gradient-to-b from-navy-deep/85 to-transparent transition-[background-color,border-color] duration-200 data-[solid=true]:border-mist/10 data-[solid=true]:bg-navy-deep/95"
    >
      <nav
        aria-label="Principal"
        className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 md:px-10"
      >
        <a href="#topo" aria-label="Booming, voltar ao início" className="h-9 md:h-10">
          <Logo className="h-full" />
        </a>
        <div className="flex items-center gap-8">
          <a href="#como-funciona" className="link hidden text-[15px] md:inline">
            Como funciona
          </a>
          <a href="#servicos" className="link hidden text-[15px] md:inline">
            Serviços
          </a>
          <a href="#cotacao" className="btn btn-primary !h-11 !px-4 text-[15px]">
            Pedir cotação
            <ArrowRight size={16} weight="bold" aria-hidden />
          </a>
        </div>
      </nav>
    </header>
  )
}
