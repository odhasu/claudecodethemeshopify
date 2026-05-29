# Status

## Next actions (priority order)

**[admin] — Oscar does these in Shopify**
1. Set homepage section order (see Section order below)
2. Create 11 products with prices + compare-at (see LUKE_CLONE_PRD.md)
3. Upload product photos
4. Upload 10–20 results screenshots to results-carousel section (add as blocks in Shopify Customize)
5. Upload 10–20 testimonial screenshots
6. Add real social URLs to footer (placeholder Instagram currently)
7. Update store name + nav links in Shopify Customize
8. Policy pages (Refund, Shipping, Privacy, Terms)

---

## Active bugs
- None

---

## Sections built

| Section | File | Status |
|---------|------|--------|
| Urgency bar | urgency-bar.liquid | Done |
| Header | header-pill.liquid | Done |
| Hero | hero.liquid | Done |
| Product grid | product-grid.liquid | Done |
| Divider | divider.liquid | Done |
| Secondary product grid | secondary-product-grid.liquid | Done |
| Bundle builder | bundle-builder.liquid | Done |
| Testimonials | testimonials.liquid | Done |
| Trust bar | trust-bar.liquid | Done |
| Reviews | reviews.liquid | Done |
| FAQ | faq.liquid | Done |
| Footer | footer.liquid | Done |
| Results carousel | results-carousel.liquid | Built — needs content |
| Main product | main-product.liquid | Done |
| Cart | main-cart.liquid | Done — needs live test |

---

## Section order (homepage — set in Shopify admin)
1. Urgency bar (header group)
2. Header (header group)
3. Hero
4. Product grid
5. Divider
6. Secondary product grid
7. Bundle builder
8. Testimonials
9. Trust bar
10. Reviews
11. FAQ
12. Footer (footer group)

---

## Recently fixed
- #39ff14 wrong green purged from all 12 files — now #19d400 everywhere
- rgba(57,255,20) glow values fixed to rgba(25,212,0) in cart, reviews, 404
- Hero: trust line flex-wrap added, mobile padding reduced (65% of desktop)
- Results carousel is fully wired — just needs images uploaded in Shopify admin
- urgency_bar_height auto-syncs via JS + CSS var — no manual sync needed
- Header sliding behind urgency bar on scroll — fixed
- Header rebuilt as full-width black bar (logo left, nav center, cart right)
- Font loading fixed — Fontshare CDN for Satoshi + Clash Grotesk
