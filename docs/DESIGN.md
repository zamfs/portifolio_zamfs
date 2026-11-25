---
name: Academic Minimal
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#747686'
  outline-variant: '#c4c5d7'
  surface-tint: '#2151da'
  primary: '#0037b0'
  on-primary: '#ffffff'
  primary-container: '#1d4ed8'
  on-primary-container: '#cad3ff'
  inverse-primary: '#b7c4ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#003ca3'
  on-tertiary: '#ffffff'
  tertiary-container: '#0051d6'
  on-tertiary-container: '#c9d4ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001551'
  on-primary-fixed-variant: '#0039b5'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#dbe1ff'
  tertiary-fixed-dim: '#b4c5ff'
  on-tertiary-fixed: '#00174b'
  on-tertiary-fixed-variant: '#003ea8'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.025em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  margin: 1.5rem
  gutter-desktop: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
  space-3xl: 6rem
---

## Brand & Style

This design system delivers an editorial, high-precision personal portfolio aesthetic tailored for a Computer Science student and software engineer. The visual identity merges academic rigor with modern product design principles: sharp structural clarity, expansive whitespace, purposeful typographic scale, and an uncompromising focus on readability and technical craftsmanship.

The brand persona is analytical, articulate, and forward-looking. Interactions and visuals avoid decorative skeuomorphism, noisy gradients, or non-functional embellishments. Instead, visual authority is achieved through structural restraint, asymmetric editorial balancing, crisp 1px hair lines, and deliberate focal accents of vibrant cobalt blue that signal interactive points and technical milestones.

## Colors

The palette is engineered around pure whites and cool-slate neutrals, punctured solely by cobalt and electric blue accents to anchor attention.

- **Canvas & Backgrounds:** The base viewport sits on `#FFFFFF`. Secondary container backgrounds, code blocks, project card backdrops, and muted surface fills transition cleanly to `#F8FAFC` (slate-50) and `#F1F5F9` (slate-100).
- **Typography & High-Contrast Structure:** Headers, hero titles, and prominent metrics utilize `#0F172A` (slate-900) for maximum legibility and ink-like presence. Body copy is rendered in `#334155` (slate-700) to maintain high contrast while softening the strain of pure black. Supporting metadata, captions, dates, and secondary labels use `#64748B` (slate-500).
- **Accent & Interactive Core:** Deep cobalt `#1D4ED8` functions as the primary interactive anchor (primary buttons, active tabs, prominent links), while vibrant electric blue `#2563EB` provides focus states, badge highlights, hover transitions, and tech tags.
- **Hairlines & Dividers:** Visual containment relies strictly on ultra-fine `#E2E8F0` (slate-200) borders.

## Typography

The typography system pairs **Plus Jakarta Sans** for prominent, contemporary headings with **Inter** for dense, neutral technical reading.

- **Plus Jakarta Sans** introduces geometric energy and modern character in headline levels (`display` through `headline-sm`). Tighter tracking (`-0.03em` to `-0.01em`) ensures expansive display text remains tightly bound and impactful.
- **Inter** ensures balanced horizontal rhythm and vertical cadence for paragraph text, article summaries, documentation snippets, and metadata labels.
- **JetBrains Mono** is reserved exclusively for inline code elements, commit hashes, technical parameters, and stack version tags.
- Editorial hierarchy mandates generous baseline margins: titles sit directly above their respective content groups with restrained bottom margins, allowing generous whitespace above each new section block.

## Layout & Spacing

The layout is built upon Bootstrap 5’s standard 12-column responsive fluid grid, utilizing a max container width of `1140px` (or `1200px` for extra-wide displays) to prevent line lengths from exceeding comfortable scanning widths.

- **Grid Architecture:** Columns run with a 24px (`1.5rem`) gutter on mobile and tablet devices, expanding to 32px (`2rem`) gutters on desktop screens (`min-width: 992px`). Outer container gutters adapt dynamically from 24px mobile padding to 48px desktop margins.
- **Vertical Rhythm:** Sections are separated by sweeping vertical buffers (`space-2xl` of 64px on mobile, scaling to `space-3xl` of 96px on desktop) to evoke an open, academic publication layout rather than a congested dashboard.
- **Internal Component Spacing:** Micro-elements use a 4px modular base scale (`space-xs` to `space-md`), keeping badge padding, input fields, and button internals crisp and mathematically predictable.

## Elevation & Depth

This design system deliberately eschews standard drop shadows in favor of **low-contrast hair-line framing** and **tonal surface separation**:

- **Zero-Shadow Default:** Interfaces sit flush to the canvas. Elevation is communicated through contrasting neutral planes: base `#FFFFFF` elevated above `#F8FAFC` panels, delineated with 1px border lines in `#E2E8F0`.
- **Micro-Hover Lift:** Cards and interactive project modules maintain a border of `#E2E8F0` at rest. On hover, rather than a heavy shadow blur, they execute a subtle translateY (-2px) transform accompanied by an ambient, barely perceptible tint: `box-shadow: 0 4px 16px -2px rgba(15, 23, 42, 0.05)`, while the border shifts to `#CBD5E1` or primary `#1D4ED8` on interactive links.
- **Glass Translucency:** The sticky global header utilizes a backdrop filter (`backdrop-filter: blur(12px); background-color: rgba(255, 255, 255, 0.85);`) bordered below by a 1px `#E2E8F0` rule to preserve background context without layering intrusive physical elevation.

## Shapes

The geometric framework is grounded in **Soft (level 1)** geometry, establishing a measured, engineering-first aesthetic:

- **Interactive Core & Inputs:** Standard elements like text inputs, textareas, and primary action buttons feature 6px (`0.375rem`) to 8px (`0.5rem`) corner radiuses (`rounded-md`), balancing modern software design with clean structure.
- **Cards & Visual Containers:** Project showcases, academic timeline containers, and code blocks adopt `rounded-lg` (`0.5rem` / 8px) or `rounded-xl` (`0.75rem` / 12px) to softly frame content without appearing playful or bubbly.
- **Pill Exception (Chips & Badges):** Technology tags, status badges, and subtle filter chips utilize fully rounded pill silhouettes (`rounded-pill` or `9999px`) to create intentional contrast against rectangular project cards and linear code blocks.

## Components

### Buttons
- **Primary:** Deep cobalt background (`#1D4ED8`), high-contrast white text (`#FFFFFF`), semi-bold label typography (`label-md`), padding `0.625rem 1.25rem`, subtle rounded corners (6px). Hover state transitions cleanly to `#1E40AF` with no shadow expansion.
- **Secondary / Outline:** Background `transparent`, solid 1px border `#E2E8F0`, text color `#0F172A`. Hover background shifts to `#F8FAFC` and border deepens to `#CBD5E1`.
- **Tertiary / Inline Link:** Text `#1D4ED8`, weight 600, paired with an inline external arrow icon (`↗`) that smoothly shifts 2px diagonally up and right on mouseover.

### Badges & Technology Chips
- **Tech Tags:** Subdued `#F1F5F9` background, `#334155` text color, border of 1px solid `#E2E8F0`. Padding `0.25rem 0.75rem`, font size `12px` (`label-sm`), fully rounded (`rounded-pill`).
- **Accent Badges (e.g., "Open to Opportunities"):** Soft electric blue fill (`#EFF6FF`), dark cobalt text (`#1D4ED8`), 1px border (`#DBEAFE`), featuring an optional 6px pulsing dot.

### Project & Experience Cards
- Encased in a 1px solid `#E2E8F0` border with a `#FFFFFF` or `#F8FAFC` background fill.
- Internal padding spans `1.5rem` to `2rem`.
- Layout isolates tech badges at the bottom, project title and external reference links at the top, and concise description in `#334155` in the body.

### Form Inputs & Fields
- Neutral white background with a 1px border in `#CBD5E1`. Internal horizontal padding `0.875rem`, vertical padding `0.625rem`.
- **Focus State:** 1px border transition to `#1D4ED8` paired with a sharp 3px ring (`rgba(29, 78, 216, 0.12)`). No default browser outlines.

### Lists & Timeline Components
- Academic path and engineering experience utilize a vertical structural spine: a 1px vertical line `#E2E8F0` punctuated by 9px solid circles (`#FFFFFF` fill, 2px `#1D4ED8` border).
- Content nodes feature year markers rendered in JetBrains Mono (`code-sm`, `#64748B`) followed by institutional headers in Plus Jakarta Sans.

### Navigation Header
- Fixed fluid bar with transparent 85% white backdrop and bottom divider `#E2E8F0`.
- Navigation links use `#334155`, shifting to `#1D4ED8` on hover or active routes, accompanied by an animated 2px bottom indicator bar.