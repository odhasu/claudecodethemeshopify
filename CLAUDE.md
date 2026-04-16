# ogresells.com Theme

Shopify theme for ogresells.com — Oscar's reselling store.

## Repo
GitHub: `odhasu/claudecodethemeshopify`
- `main` — V1, live on Shopify, never touch
- `v2` — active development branch, all work goes here

## Stack
Shopify Liquid, vanilla CSS, vanilla JS. No frameworks.

## Rules
- Always work on `v2` branch
- Push after every edit
- Every visual value must have a theme setting (never hardcode colors, sizes, text)
- No recaps, no summaries

## Current theme structure (V1 base)
Sections: `hero`, `product-grid`, `testimonials`, `reviews`, `bundle-builder`, `results-carousel`, `faq`, `urgency-bar`, `header-pill`, `footer`
Assets: `theme.css`, `theme.js`
Snippets: `chat-widget`, `live-sales-notification`, `meta-tags`

## Active work (v2 branch)
- ✅ Urgency bar: hidden at top, slides in on scroll (reveal_on_scroll setting)
- ✅ Lag fix: removed license bloat, reduced Google Fonts from 12 to 3-4, DOMContentLoaded loader
- 🔲 Hero section improvements
- 🔲 Product grid improvements
- 🔲 Rest of sections

## Design direction
Dark theme. Black background (#000), neon green accent (#39ff14). Fonts: DM Sans heading, Inter body, Bebas for hero/header. Inspired by lukesvendors.com but our own style.

## Key CSS variables (set in theme.liquid)
- `--color-accent` — neon green
- `--color-bg` — page background
- `--color-card-bg` — card background
- `--urgency-bar-height` — set by JS when bar is visible, used by header-pill to offset top position

## Lag fix details
The original theme had:
1. License validation JS waiting for `window.load` (blocking full-screen overlay)
2. 12 Google Font families loading simultaneously
3. `setInterval` loops running forever (footer check every 3s, integrity monitor every 5s)
All three removed in v2.
