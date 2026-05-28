# Context

## What it is
Vexel — a premium Shopify theme for resellers. Replicates lukesvendors.com design. License-protected via local checksum validation (theme.js). Railway server exists but is not yet connected.

## Repo
GitHub: odhasu/claudecodethemeshopify
- main — V1, do not touch
- v3 — active branch, all work goes here

Working dir: /Users/oscargraafmans/Desktop/ogresell/theme

## Stack
Shopify Liquid (full sections — not shells), vanilla CSS, vanilla JS. No frameworks.

## File structure

```
layout/
  theme.liquid                    — root layout, CSS vars, loading screen, theme.js

sections/
  urgency-bar.liquid              — scrolling marquee, countdown, live viewer count
  header-pill.liquid              — full-width sticky bar (logo left, nav center, cart right)
  hero.liquid                     — headline, green highlight, CTA buttons, avatar row
  product-grid.liquid             — glassmorphic cards, info modal, BUY NOW + cart buttons
  secondary-product-grid.liquid   — same as product grid, scoped CSS
  bundle-builder.liquid           — bundle upsell, discount codes
  divider.liquid                  — gradient-glow / solid / dashed / dotted styles
  testimonials.liquid             — horizontal auto-scrolling image carousel
  trust-bar.liquid                — scrolling badge marquee
  reviews.liquid                  — card grid, star summary, write-a-review button
  faq.liquid                      — accordion, first item open, green glow on open
  footer.liquid                   — brand, policy links, social icons, copyright
  results-carousel.liquid         — built, needs content
  main-product.liquid             — product page, live counter, resellers badge
  main-cart.liquid                — cart page (cart drawer is inline here)

assets/
  theme.css                       — global styles
  theme.js                        — license validation + scroll reveal

snippets/
  chat-widget.liquid
  live-sales-notification.liquid
  meta-tags.liquid

config/
  settings_schema.json
  settings_data.json
```

## Related projects
- License server (Railway): /Users/oscargraafmans/Desktop/ogresell/runtime/
- Dashboard + store: /Users/oscargraafmans/Desktop/ogresell/store/
