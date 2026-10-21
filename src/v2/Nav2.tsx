import { ArrowRight } from '@phosphor-icons/react'
import logo from '../assets/brand/logo-horizontal-branco.svg?raw'

// One nav for both worlds: the page sets data-theme as dark and light chapters pass under it.
export default function Nav2() {
  return (
    <header
      data-nav2
      data-theme="dark"
      className="group fixed inset-x-0 top-0 z-30 text-mist transition-colors duration-300 data-[theme=light]:text-navy"
    >
      <nav aria-label="Principal" className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 md:px-10">
        <a
          href="#topo"
          aria-label="Booming, voltar ao início"
          className="block h-9 md:h-10 [&_svg]:h-full [&_svg]:w-auto [&_svg_*]:!fill-current"
          dangerouslySetInnerHTML={{ __html: logo }}
        />
        <a
          href="#cotacao"
          className="btn !h-11 !px-4 text-[15px] bg-mist text-navy group-data-[theme=light]:bg-navy group-data-[theme=light]:text-mist"
        >
          Pedir cotação
          <ArrowRight size={16} weight="bold" aria-hidden />
        </a>
      </nav>
    </header>
  )
}
