# Design System

## Reference
lukesvendors.com — check this first before building anything visual.

---

## Colors
| Token | Value | Notes |
|-------|-------|-------|
| Background | #000000 | |
| Card bg | #111111 | |
| Card elevated | #1a1a1a | |
| Accent | #19d400 | neon green — only green used, everywhere |
| Border | #333333 | |
| Text primary | #ffffff | |
| Text muted | #9ca3af | |
| Text subtle | #6b7280 | |
| Stars | #fbbf24 | |

## Fonts
| Role | Font | Weights | Source |
|------|------|---------|--------|
| Headings | Clash Grotesk | 700, 900 | Fontshare CDN only |
| Body | Satoshi | 400, 500, 700, 900 | Fontshare CDN only |

Not Google Fonts.

## Buttons
- **Primary**: linear-gradient(135deg, #19d400, #19d400), white border 2px rgba(255,255,255,0.25), glow: 0 0 20px color-mix(in srgb, #19d400 30%, transparent)
- **Primary hover**: translateY(-2px), glow: 0 0 30px color-mix(in srgb, #19d400 40%, transparent)
- **Secondary**: transparent bg, white border, white text
- **Info/dark**: #1a1a1a fill, #2a2a2a border
- All button values must be theme settings

## Spacing
| Name | Value |
|------|-------|
| XS | 4px |
| SM | 8px |
| MD | 16px |
| LG | 24px |
| XL | 32px |
| 2XL | 48px |
| 3XL | 64px |
| 4XL | 96px |

## Border radius
| Name | Value |
|------|-------|
| SM | 8px |
| MD | 12px |
| LG | 16px |
| Full | 9999px |

## Shadows / glow
- SM: `0 1px 2px rgba(0,0,0,0.5)`
- MD: `0 4px 12px rgba(0,0,0,0.5)`
- LG: `0 8px 24px rgba(0,0,0,0.5)`
- Glow: `0 0 20px color-mix(in srgb, #19d400 30%, transparent)`

## Animations
- Transitions: 0.2s–0.5s ease / ease-out
- Carousel scroll: 35px/s (urgency bar, trust bar)
- Hover: translateY(-2px) on interactive cards + buttons

## CSS variables (set in theme.liquid)
- `--color-accent: #19d400`
- `--color-bg: #000000`
- `--color-card-bg: #111111`
- `--font-heading: Clash Grotesk`
- `--font-body: Satoshi`
- `--urgency-bar-height` — set by JS, used as top offset for header

---

## Header spec
- Full-width fixed bar
- Background: #000000, border-bottom: #1a1a1a
- Logo: left, 200px desktop / 120px mobile
- Nav: center, uppercase, 14px Satoshi
- Height: 70px desktop / 58px mobile
- Sits below urgency bar via `top: var(--urgency-bar-height)`

## Hero spec
- Background: black with radial gradient glow (no bg image — glow only)
- Headline: 110px desktop / 48px mobile, Clash Grotesk, uppercase
- One word in headline gets accent color highlight
- Two CTAs side by side: BUY NOW (green) + ADD TO CART (secondary)

## Product card spec
- Info button: 52px tall, ~10px radius, #1a1a1a bg, ⓘ icon, dark border
- BUY NOW button: same height/radius, accent color, glass glow
- Both buttons same height — NOT pill shape
- SALE badge: bottom-right corner of image, semi-transparent dark bg
