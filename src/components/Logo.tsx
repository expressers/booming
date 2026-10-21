import logo from '../assets/brand/logo-horizontal-branco.svg?raw'

// Inlined so the "Soluções aéreas" descriptor renders in the page's Ubuntu.
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Booming Soluções aéreas"
      className={`block [&>svg]:h-full [&>svg]:w-auto ${className}`}
      dangerouslySetInnerHTML={{ __html: logo }}
    />
  )
}
