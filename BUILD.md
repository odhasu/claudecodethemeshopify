# Theme — Build Status

## Section order (matches Luke's)
1. Urgency bar — header group
2. Header full-width — header group
3. Hero
4. Product grid
5. Testimonials
6. FAQ
7. Reviews
8. Trust badges — footer group
9. Footer — footer group

## Sections — Liquid (done, needs shell conversion)
- Urgency bar — scrolling marquee, countdown timer, live viewer count, slides in on scroll
- Header — full-width fixed bar, logo left, nav right, cart icon, mobile hamburger + dropdown
- Hero — inline headline, green highlight, CTA buttons, glow, background image mode
- Product grid — glassmorphic cards, info modal, BUY NOW button, green glow background
- Trust badges — scrolling marquee, 4 badges, green icons, positioned before footer
- Footer — brand name, policy links, social icons, copyright
- Testimonials — horizontal scrolling image carousel, fade-out edges
- FAQ — accordion, first item open by default, green glow border on open item
- Reviews — card grid, star rating summary, write-a-review button
- Cart drawer — slide-out panel, AJAX quantity controls (stays as Liquid, no shell)

## Other done
- Loading screen — dual counter-rotating arc spinner
- Color system — unified to #19d400 everywhere
- Fonts — Clash Grotesk (headings) + Satoshi (body) from Fontshare

## License Protection (Kenso Shell Model) — DONE
- All 10 sections converted to shells (empty div + JSON data)
- Obfuscated loader built (~315KB) — renders sections client-side after license validation
- Loader served from Shopify CDN (assets/scaled-loader.js)
- Validation via Vercel store server → Supabase RPC (anon key)
- 24hr grace period (localStorage), 30-min session cache
- Footer protection (MutationObserver + periodic check)
- theme.liquid: VexelConfig, loading states, loader from CDN

## Still to build
- Results carousel — section exists but not on homepage
- Hero background image — needs upload in Shopify admin
- More testimonial screenshots (up to 20 supported)
- Real social links in footer

## Last worked on
2026-05-09 — Luke's replication pass: testimonials hide when empty (no more spinner), unified all colors #39ff14 to #19d400 across entire theme, hero font default to Clash Grotesk 110px, hero font options cleaned to only loaded fonts, product grid button radius synced to 50px
2026-05-09 — Hero: added bg image + gradient overlay + 2 CTA buttons; Product cards: inline descriptions; License validation fix (Supabase anon key)
2026-05-08 — License protection end-to-end: Supabase RPC, validate endpoint fix, loader from CDN, rebranding to Vexel
2026-04-29 — License protection plan finalized (Kenso shell model), button radius fix, header dark bg
2026-04-28 — Cart drawer built, header/footer complete
2026-04-21 — Luke's full replication: header rebuild, hero bg image mode, color unification
