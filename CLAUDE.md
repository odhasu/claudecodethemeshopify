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
- When visual details are unclear — check lukesvendors.com first, don't ask

---

## Current theme structure (v2)
Sections: `hero`, `product-grid`, `trust-badges`, `testimonials`, `reviews`, `bundle-builder`, `results-carousel`, `faq`, `urgency-bar`, `header-pill`, `footer`
Assets: `theme.css`, `theme.js`
Snippets: `chat-widget`, `live-sales-notification`, `meta-tags`

---

## Build status

### Done
- ✅ Urgency bar — hidden at top, slides in on scroll
- ✅ Lag fix — removed license bloat, Fontshare instead of Google Fonts
- ✅ Hero — badge pill, single-line headline w/ green inline highlight, CTA, trust row, glow
- ✅ Design system — Clash Grotesk heading + Satoshi body (Fontshare), accent #19d400
- ✅ Product grid — ⓘ info button + BUY NOW (Luke's style — gradient, white border outline, glow), detail modal
- ✅ Trust badges bar — auto-scrolling marquee, 4 badges, green icons, configurable
- ✅ Footer — brand, policy links (· separator), social icons (ig/tiktok/yt/discord), copyright
- ✅ Loading screen — dual counter-rotating arc spinner, dismisses on page load

### Known issues (fix next)
- 🔲 Buttons — inconsistent across sections, need full audit and fix
- 🔲 Sticky header — broken behavior
- 🔲 Cart — broken or missing
- 🔲 Footer — needs polish

### Still to build
- 🔲 Header section — full section with logo, nav, CTA, theme settings
- 🔲 Testimonials
- 🔲 FAQ
- 🔲 Reviews

---

## Design system (matches lukesvendors.com)
- Background: `#000000`
- Accent: `#19d400`
- Card bg: `#111111`
- Fonts: Clash Grotesk (headings) + Satoshi (body) — loaded from Fontshare CDN
- Buttons: flat green, 12px radius, 2px white border outline, green glow on hover
- Info button: dark `#1a1a1a`, same radius, opens product detail modal

## Key CSS variables (theme.liquid)
- `--color-accent` — #19d400
- `--color-bg` — #000000
- `--color-card-bg` — #111111
- `--font-heading` — Clash Grotesk
- `--font-body` — Satoshi
- `--urgency-bar-height` — set by JS, used by header-pill offset
