# Theme — Build Status

## Section order (matches the reference layout)
1. Urgency bar — header group
2. Hero
3. Product grid
4. Testimonials
5. FAQ
6. Reviews
8. Trust badges — footer group
9. Footer — footer group

## Sections — Liquid shells + runtime rendering
- Urgency bar — scrolling marquee, countdown timer, live viewer count, slides in on scroll
- Header — transparent fixed bar, title-case nav, cart icon, mobile hamburger + dropdown
- Hero — centered headline, green highlight, trust row/avatar stack, optional CTA/image mode
- Product grid — flat dark cards, bottom-right sale badge, details overlay, direct-checkout BUY NOW button
- Trust badges — scrolling marquee, 4 badges, green icons, positioned before footer
- Footer — brand name, policy links, social icons, copyright
- Testimonials — horizontal scrolling image carousel, fade-out edges
- FAQ — accordion, first item open by default, green glow border on open item
- Reviews — single-column cards, full-width rating summary, write-a-review button
- Cart drawer — slide-out panel, AJAX quantity controls (stays as Liquid, no shell)

## Other done
- Loading screen — full-page spinner, 1s minimum, smooth fade reveal (no per-section spinners)
- Color system — unified to #19d400 everywhere
- Fonts — Clash Grotesk (headings) + Satoshi (body) from Fontshare
- Hero — content + buttons centered via CSS overrides
- Footer — settings locked down (only brand/social/CTA/copyright editable), refund policy link added
- Header nav — restored as the two-link reference pattern (Home / Products)

## License Protection (Kenso Shell Model) — DONE
- All 10 sections converted to shells (empty div + JSON data)
- Runtime loader — renders sections client-side after license validation
- Loader served from Shopify CDN (assets/scaled-loader.js)
- Validation via Vercel store server → Supabase RPC (anon key)
- 24hr grace period (localStorage), 30-min session cache
- Footer protection (MutationObserver + periodic check)
- theme.liquid: VexelConfig, loading states, loader from CDN

## Reference theme pass — 2026-09-23
- Matched compact transparent header, smaller logo/nav, hero spacing/type scale, flat product cards, sale badge, card controls and purchase action styling.
- Product title/image/info controls open the details overlay; BUY NOW adds the selected variant and continues to checkout.
- Product image and title now use buttons for the details overlay, matching the reference's control semantics; BUY NOW remains a checkout link.
- Restored the hero trust line and overlapping avatar system visible on the current reference; theme image settings use store-owned portraits, with neutral placeholders until those are uploaded.
- Tuned hero headline size, top/bottom spacing, and avatar size against a matched 375px reference view so the trust row sits at the same height without moving the product grid.
- Matched FAQ sizing/open-state treatment, single-column reviews layout, trust-separator glyph, and 12-item display limit.
- Product catalog data and product images were not changed. Reference customer screenshots, review feed, and store-specific branding/social links remain configured by the store owner.

## Store setup still needed
- Replace or reactivate the saved license key for ogsellsz.myshopify.com; the configured validation server currently returns `invalid_key` on the public storefront.
- Add the store's own testimonial screenshots and social links in Shopify Customize.
- Upload the store's own customer avatar images in Hero settings to replace neutral placeholders.
- Connect a real reviews app/feed if live submitted reviews and moderation are required; the bundled review form is only a front-end placeholder.
- Verify cart/checkout behavior and saved settings in the target Shopify theme preview before publishing.

## Last worked on
2026-09-23 — Reference pass: compact transparent header, flat cards/details overlay, direct checkout, FAQ/review layout and trust-bar styling
2026-05-10 — Removed header nav, removed per-section spinners, smooth 1s loader reveal, centered hero, stripped footer settings, added refund policy
2026-05-09 — Hero: added bg image + gradient overlay + 2 CTA buttons; Product cards: inline descriptions; License validation fix (Supabase anon key)
2026-05-08 — License protection end-to-end: Supabase RPC, validate endpoint fix, loader from CDN, rebranding to Vexel
2026-04-29 — License protection plan finalized (Kenso shell model), button radius fix, header dark bg
2026-04-28 — Cart drawer built, header/footer complete
2026-04-21 — Luke's full replication: header rebuild, hero bg image mode, color unification
