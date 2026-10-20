// Telemetry of the drone in the scene. Values are written by App's ScrollTrigger,
// directly to the DOM, so scrolling never re-renders React.
export default function Hud() {
  return (
    <>
    <span
      aria-hidden="true"
      id="hud-alt-m"
      className="tnum pointer-events-none fixed right-5 top-[84px] z-20 font-display text-lg font-medium md:hidden"
    >
      144 m
    </span>
    <aside
      aria-hidden="true"
      className="pointer-events-none fixed right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-end gap-3 md:right-10 md:flex"
    >
      <span className="text-[13px] text-mist/70">Altitude do drone</span>
      <span id="hud-alt" className="tnum font-display text-3xl font-medium leading-none">
        144 m
      </span>
      <span className="relative mt-2 block h-44 w-px bg-mist/25">
        <span
          id="hud-mark"
          className="absolute -left-[4px] top-0 block h-[9px] w-[9px] bg-lime will-change-transform"
        />
      </span>
      <span className="text-[13px] text-mist/70">Solo</span>
    </aside>
    </>
  )
}
