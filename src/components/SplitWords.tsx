// Renders a sentence as masked words so it can rise into place word by word.
// Screen readers get the plain sentence.
export default function SplitWords({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ')
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => (
          <span key={i}>
            <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-top">
              <span data-word className="inline-block will-change-transform">
                {w}
              </span>
            </span>
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    </span>
  )
}
