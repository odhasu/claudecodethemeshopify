# Theme — Build Status (V3)

## Section order for homepage (set in Shopify admin — NOT index.json)
1. Urgency bar — header group
2. Header bar — header group
3. Hero
4. Product grid
5. Divider
6. Secondary product grid
7. Bundle builder
8. Testimonials
9. Trust bar
10. Reviews
11. FAQ
12. Footer — footer group

## Sections — all built ✓
- **Urgency bar** — scrolling marquee, countdown timer, live viewer count, 3-mode scroll behavior (follow / smart sticky / stay at top)
- **Header bar** — full-width black bar, logo left, nav center, cart right, 3-mode scroll behavior, cart badge, adjusts top when urgency bar hides
- **Hero** — inline headline, green highlight, CTA buttons, background image mode, glow
- **Product grid** — glassmorphic cards, ⓘ info modal, BUY NOW + cart icon buttons, glass/glow button style, buy_btn_height/radius/font settings
- **Secondary product grid** — same as product grid, scoped CSS via section.id, defaults to 4 cols / 4 products
- **Bundle builder** — bundle upsell section
- **Divider** — gradient-glow, gradient, solid, dashed, dotted styles; full/contained/narrow width
- **Testimonials** — horizontal auto-scrolling image carousel, fade-out edges
- **Trust bar** — scrolling marquee, 8 icon options, bg style setting
- **Reviews** — card grid, star rating summary, write-a-review button
- **FAQ** — accordion, first item open by default, green glow border on open item
- **Footer** — brand name, policy links, social icons, copyright
- **Main product** — product page with social proof (live checkout counter drift, resellers badge)
- **Cart drawer** — slide-out panel, AJAX quantity controls

## Other done
- Loading screen — full-page spinner, 1s minimum, smooth fade reveal
- Fonts — Clash Grotesk (headings) + Satoshi (body) from Fontshare
- Color system — #19d400 accent throughout
- Header/urgency bar ZIP backup — Desktop/header-urgency-bar-v1.zip

## License Protection (Kenso Shell Model) — DONE (V2, carry over)
- All sections converted to shells (empty div + JSON data)
- Obfuscated loader (~315KB) served from Shopify CDN
- Validation via Vercel store server → Supabase RPC (anon key)
- 24hr grace period (localStorage), 30-min session cache
- Footer protection (MutationObserver + periodic check)

## Still to do
- Set homepage section order in Shopify admin (user does this)
- Upload hero background image in Shopify admin
- Set up 11 products with correct prices + compare-at prices (see LUKE_CLONE_PRD.md)
- Upload product photos + testimonial screenshots
- Add real social links to footer
- Mobile polish pass
- Results carousel — built but needs content

## Last worked on
2026-05-17 — Header rebuilt as full-width bar (Luke's layout exact), urgency bar + header 3-mode scroll behavior setting, stacking fix (both fixed, header offset below urgency bar)
2026-05-16 — Added secondary-product-grid, divider, trust-bar sections; button glass/glow settings on product grid; ⓘ info icon / cart button layout
2026-05-10 — Removed header nav, smooth loader, centered hero, stripped footer
