---
name: Booming Soluções Aéreas
description: Limpeza de fachadas em altura com drones. Para além do alcance.
colors:
  navy: "#192730"
  navy-deep: "#111c23"
  navy-2: "#2d3d4b"
  ink: "#1a1a1a"
  graphite: "#3c3c3b"
  mist: "#e6e6e6"
  lime: "#91d336"
  lime-hover: "#a3df52"
  olive: "#adb65d"
  error: "#f0a189"
typography:
  display:
    fontFamily: "Lufga, Ubuntu, system-ui, sans-serif"
    fontSize: "clamp(3rem, 7.4vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Lufga, Ubuntu, system-ui, sans-serif"
    fontSize: "clamp(2.4rem, 5.2vw, 4.75rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Lufga, Ubuntu, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
  body:
    fontFamily: "Ubuntu, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Ubuntu, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 500
rounded:
  control: "4px"
spacing:
  gutter-mobile: "20px"
  gutter-desktop: "40px"
  container: "1400px"
components:
  button-primary:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.navy}"
    rounded: "{rounded.control}"
    height: "52px"
    padding: "0 22px"
  button-primary-hover:
    backgroundColor: "{colors.lime-hover}"
  input:
    backgroundColor: "{colors.navy-deep}"
    textColor: "{colors.mist}"
    rounded: "{rounded.control}"
    height: "52px"
---

# Design System: Booming Soluções Aéreas

## Overview

**Creative North Star: "A Descida"** (inferred; to confirm with Eládio)

A night facade, cleaned floor by floor. The page is the glass of a tower, the scroll is the work and the drone is the only thing that moves with intent. Dark navy carries the whole world; lime is light, never decoration. Type is cinematic: one huge Lufga Black statement per section, Ubuntu for everything that is read.

**Key Characteristics:**
- Dark only. Navy ground everywhere, no section flips to light.
- One accent, lime, reserved for light sources and the primary action.
- 3D lives in one fixed WebGL scene behind the copy; DOM text sits on soft navy scrims.
- Facts, not adjectives. No invented numbers, clients or claims.

## Colors

A cool night palette taken directly from Gláucio Salla's identity (manual, Out. 2026).

### Primary
- **Sinal Lima** (#91d336): primary buttons, HUD marker, drone LEDs, the cleaning jet, the landing pad and the brand pattern. Nothing else is lime.

### Neutral
- **Navy Booming** (#192730): page ground, sky, nav when solid.
- **Navy Profundo** (#111c23): form fields, footer, scrims.
- **Navy Vidro** (#2d3d4b): glass, panels, scrollbar.
- **Névoa** (#e6e6e6): all text; secondary text uses it at 70-85% opacity, never a separate grey.

### Named Rules
**The Only Light Rule.** Lime marks something that emits light or asks for action. If it is neither, it is not lime.

## Typography

**Display Font:** Lufga (Black 900, Medium 500), self-hosted woff2
**Body Font:** Ubuntu (Regular 400, Medium 500), self-hosted woff2
**Character:** a heavy, round display face against a humanist technical sans; loud headlines, calm reading.

### Hierarchy
- **Display** (900, clamp(3rem, 7.4vw, 6rem), 0.95): the hero line only.
- **Headline** (900, clamp(2.4rem, 5.2vw, 4.75rem), 1): one per section.
- **Title** (500, 1.25rem): sub-items, service names.
- **Body** (400, 1.125rem, 1.625): max 40-52ch.
- **Label** (500, 15px): nav links, form labels.

### Named Rules
**The No Kicker Rule.** No eyebrow labels above headings. Status lives inside the heading ("Fachadas e vidros, já hoje").

## Layout

Single page, max container 1400px, gutters 20px mobile and 40px desktop. Sections are tall (16-22vh vertical padding) because each one is a stretch of the descent. Desktop compositions are asymmetric on a 12-column grid (offsets of 18-36%); everything collapses to one column under 768px. Hero is `min-h-[100dvh]` with copy anchored bottom left.

## Elevation & Depth

Flat DOM, real depth in WebGL. No box shadows. Readability over the 3D scene comes from radial navy scrims behind text blocks. Depth cues (fog, sky gradient, distant skyline) belong to the scene.

## Shapes

Square-cornered world with a single radius: 4px on buttons, fields and the form panel. Mullion grid and the isotipo pattern (manual p.22) are the only recurring geometry.

## Components

### Buttons
- **Shape:** 4px radius, 52px tall, one line always.
- **Primary:** lime on navy text, Lufga Medium.
- **Press:** scale(0.97) in 160ms with ease-out cubic-bezier(0.23, 1, 0.32, 1); hover lightens to #a3df52 only on fine pointers.
- **Secondary:** text link with a 1px underline at 0.3em offset that turns lime on hover.

### Inputs
- **Style:** navy-deep fill, 1px mist border at 22%, 4px radius, 52px tall; label above, error below.
- **Focus:** border turns lime. **Error:** border #e0866b with message in #f0a189.

### Navigation
Fixed, 72px, transparent gradient over the hero, solid navy-deep with a hairline once scrolled past 120px.

### Altitude HUD (signature)
Right edge on desktop: label, altitude in Lufga tabular numerals and a vertical track with a lime square that descends with the scroll. On mobile, the altitude number alone, top right.

### A Descida (signature scene)
Three.js scene in `src/scene`: shader facade with grime and a clean mask painted by the jet, procedural octocopter with tethered hose to a ground station, lime jet and spray, dusk sky with skyline, landing apron tiled with the brand pattern.

## Do's and Don'ts

### Do:
- **Do** keep the page dark; copy on the scene always gets a `.scrim`.
- **Do** use custom ease-out curves and keep UI motion under 300ms; scroll-scrubbed motion is the exception.
- **Do** honor `prefers-reduced-motion` with the static, already-clean facade.
- **Do** load the 3D scene after first paint, cap DPR at 1.5.

### Don't:
- **Don't** use lime for decoration or body text.
- **Don't** draw a drone in the logo or as an icon (client request).
- **Don't** use em dashes, eyebrow labels or invented metrics.
- **Don't** add a second accent colour or a light-mode section.
