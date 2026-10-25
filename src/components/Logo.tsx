import whiteRaw from '../assets/brand/logo-horizontal-branco.svg?raw'
import navyRaw from '../assets/brand/logo-horizontal-navy.svg?raw'

// Both SVGs ship internal <style> blocks with the same class names (.cls-1...).
// Inlined side by side they would restyle each other, so each gets its own prefix.
const scope = (svg: string, prefix: string) => svg.replace(/cls-/g, `${prefix}-`)
const white = scope(whiteRaw, 'lw')
const navy = scope(navyRaw, 'ln')

// Inlined so the "Soluções aéreas" descriptor renders in the page's Ubuntu.
export default function Logo({ tone = 'navy', className = '' }: { tone?: 'navy' | 'white'; className?: string }) {
  return (
    <span
      role="img"
      aria-label="Booming Soluções aéreas"
      className={`block [&>svg]:h-full [&>svg]:w-auto ${className}`}
      dangerouslySetInnerHTML={{ __html: tone === 'white' ? white : navy }}
    />
  )
}
