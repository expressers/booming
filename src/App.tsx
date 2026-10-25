import { useEffect } from 'react'
import { ScrollTrigger, startSmoothScroll } from './lib/motion'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import Intro from './sections/Intro'
import About from './sections/About'
import Services from './sections/Services'
import Sectors from './sections/Sectors'
import Why from './sections/Why'
import Process from './sections/Process'
import Safety from './sections/Safety'
import Gallery from './sections/Gallery'
import Faq from './sections/Faq'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

export default function App() {
  // Reveal blocks once as they enter. Content stays visible without JS or with reduced motion.
  useEffect(() => {
    document.documentElement.classList.add('js')
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            ;(e.target as HTMLElement).dataset.in = ''
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el))
    const stop = startSmoothScroll()
    // Layout settles once fonts and images arrive; re-measure every scroll scene then.
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => {
      io.disconnect()
      stop()
      window.removeEventListener('load', refresh)
    }
  }, [])

  return (
    <>
      <a
        href="#contactos"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-lime focus:px-4 focus:py-2 focus:text-navy"
      >
        Saltar para o pedido de orçamento
      </a>
      <Nav />
      <main>
        <Hero />
        <Intro />
        <About />
        <Services />
        <Sectors />
        <Why />
        <Process />
        <Safety />
        <Gallery />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
