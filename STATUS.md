# Status

## Next actions (priority order)

**[dev] — code work**
1. Mobile polish pass — all sections at 375px
2. Results carousel — built but needs content wired up
3. Cart drawer — locate in main-cart.liquid and test on live store

**[admin] — Oscar does these in Shopify**
4. Set homepage section order (see Section order below)
5. Create 11 products with prices + compare-at (see LUKE_CLONE_PRD.md)
6. Upload product photos
7. Upload 10–20 testimonial screenshots
8. Add real social URLs to footer (placeholder Instagram currently)
9. Update store name + nav links in Shopify Customize
10. Policy pages (Refund, Shipping, Privacy, Terms)

---

## Active bugs
- None confirmed

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
- urgency_bar_height auto-syncs via JS + CSS var — no manual sync needed
- Header sliding behind urgency bar on scroll — fixed, offset = urgency bar height
- Header rebuilt as full-width black bar (logo left, nav center, cart right)
- Font loading fixed — Fontshare CDN for Satoshi + Clash Grotesk
- Accent color unified to #19d400 across all sections
- Chat widget: smooth open/close animation + glow color fix
- Footer CTA: corner radius + button style setting (plain/glass/solid glow)
