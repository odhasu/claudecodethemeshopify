# Theme — Design System

## Reference
lukesvendors.com — check this first before building anything visual.

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

## Hero (Luke's style)
- Full-width background image with dark overlay (adjustable opacity)
- Text centered over image
- Headline: 110px desktop / 48px mobile, Clash Grotesk, uppercase
- Green highlight on one word in the headline
- Two CTA buttons: BUY NOW (green) + ADD TO CART (secondary)
- No badge, no trust row, no stats row in hero
