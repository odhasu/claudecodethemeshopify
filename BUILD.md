# Theme — Build Status

## Sections (v2)
urgency-bar, header (full-width), hero, product-grid, trust-badges, testimonials, faq, reviews, footer

## Done ✅
- **Urgency bar** — hidden at top, slides in on scroll, reveal_on_scroll setting
- **Lag fix** — removed license bloat, Fontshare instead of 12 Google Fonts, DOMContentLoaded loader
- **Header** — full-width fixed (logo left, nav right, hamburger mobile) — matches Luke's style
- **Hero** — badge pill, single-line headline w/ green inline highlight, CTA buttons (BUY NOW + ADD TO CART), glow, background image mode (full-width image + overlay)
- **Product grid** — ⓘ info button + BUY NOW (gradient, white border outline, glow), detail modal
- **Trust badges bar** — auto-scrolling marquee, 4 badges, green icons (positioned before footer)
- **Footer** — brand, policy links, social icons, copyright
- **Loading screen** — dual counter-rotating arc spinner
- **Testimonials** — horizontal scrolling image carousel, fade edges
- **FAQ** — accordion, first item open by default, accent glow on open
- **Reviews** — card grid with write-a-review button

## Section order (matches Luke's)
1. Urgency bar (header group)
2. Header full-width (header group)
3. Hero
4. Product grid
5. Testimonials
6. FAQ
7. Reviews
8. Trust badges (footer group)
9. Footer (footer group)

## Color system ✅ Fixed
- All sections now use `#19d400` (was inconsistently `#39ff14` in many places)
- settings_data.json color_accent = `#19d400`
- Fonts locked to Clash Grotesk (heading) + Satoshi (body)

## Still to do 🔲
- Hero background image — needs Oscar to upload an actual hero image in Shopify admin
- Testimonials — needs more real customer screenshot images uploaded
- Cart — no cart drawer, just redirects to /cart page
- Social links in footer — need real URLs

## Last worked on
2026-04-21 — Full Luke's replication: header rebuild, hero bg image, color fix, section order fix, FAQ first-open, trust badges to footer
