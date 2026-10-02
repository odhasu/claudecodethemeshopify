# Theme — Design System

## Active Lin reference — 2026-10-02

Reference: https://linresell.com/. Branch: `linresell-replica`. The remaining sections describe the historical green Vexel design.

Black background, pink `#ff86dd` accent, hover `#ff60ae`, cards `#111111`, 20px card radius and glass inset shadows. System fonts match the reference's visible fallback. Header is 64px tall with a 90px bundled logo at desktop/mobile. Four desktop columns, two mobile columns, centered final row. Grid width 1200px including 16px gutters; gaps 24px desktop and 12px at 375px. Headline letter spacing -1px; product title spacing .02em. FAQ answer gap is 16px.

At 1440px: headline top 112px, 52.8px/58.08px; first card top 226.0703125px, 274 x 435.3984375px; FAQ heading top 1692.265625px; access heading top 2473.015625px. At 375px: headline top 112px, 30.8px/33.88px; first card top 235.75px, 165.5 x 327px; FAQ top 2306.75px; access top 3218.5px. Positions are at scroll zero with the first FAQ open.

Specs and native Chrome screenshots: `docs/research/linresell/` and `docs/design-references/linresell/`. Settings remain adjustable; observed geometry is evidence, not a claim of pixel perfection across browsers.

## Historical Vexel design

## Reference
lukesvendors.com — check the live page before building anything visual. The detailed `lukesvendors-reference.md` is a historical snapshot and may not describe the current site.

## Colors
- Background: #000000
- Accent: #19d400 (neon green — this is the only green used, everywhere)
- Card bg: #111111
- Card elevated: #1a1a1a
- Border: #333333 (exact from Kenso source)
- Text primary: #ffffff
- Text muted: #9ca3af
- Text subtle: #6b7280
- Stars: #fbbf24

## Fonts
- Headings: Clash Grotesk (700/900) — Fontshare CDN only
- Body: Satoshi (400/500/700/900) — Fontshare CDN only
- Not Google Fonts

## Buttons
- Primary: linear-gradient(135deg, #19d400, #19d400), white border 2px rgba(255,255,255,0.25), glow: 0 0 20px color-mix(in srgb, #19d400 30%, transparent)
- Hover: translateY(-2px), glow: 0 0 30px color-mix(in srgb, #19d400 40%, transparent)
- Secondary: transparent, white border, white text
- Info/dark: #1a1a1a fill, #2a2a2a border
- All button values must be theme settings — no hardcoding

## CSS Variables (set in theme.liquid)
- --color-accent: #19d400
- --color-bg: #000000
- --color-card-bg: #111111
- --font-heading: Clash Grotesk
- --font-body: Satoshi
- --urgency-bar-height: set by JS, used as top offset for header

## Header (Luke's style)
- Full-width fixed bar
- Background: #000000
- Border-bottom: #1a1a1a
- Logo: left-aligned, 200px desktop / 120px mobile
- Nav: right-aligned, uppercase, 14px Satoshi
- Height: 70px desktop / 58px mobile
- Sits below urgency bar via top: var(--urgency-bar-height)

## Hero (current Vexel implementation)
- Centered text-first hero; optional store-owned image and CTA settings are available
- Headline and spacing are responsive and aligned against the current reference
- Trust line and overlapping avatar stack use store-owned content/settings
- Recheck the live reference before changing copy, imagery, or layout assumptions
