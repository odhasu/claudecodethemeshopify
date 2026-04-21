# Theme — Context

## What it is
Custom Shopify theme for ogresells.com — Oscar's reselling store. Built from scratch, replicating lukesvendors.com design system on the v2 branch.

## Repo
GitHub: `odhasu/claudecodethemeshopify`
- `main` — V1, live on Shopify, **never touch**
- `v2` — active development, all work goes here

Working dir: `/Users/oscargraafmans/Desktop/ogresell/theme`

## Stack
Shopify Liquid, vanilla CSS, vanilla JS. No frameworks.

## File structure
```
layout/
  theme.liquid         — root layout, CSS vars, loading screen, fonts
sections/
  urgency-bar.liquid
  header-pill.liquid
  hero.liquid
  product-grid.liquid
  trust-badges.liquid
  testimonials.liquid
  reviews.liquid
  bundle-builder.liquid
  results-carousel.liquid
  faq.liquid
  footer.liquid
assets/
  theme.css            — global styles
  theme.js             — global JS (loader, scroll behavior)
snippets/
  chat-widget.liquid
  live-sales-notification.liquid
  meta-tags.liquid
config/
  settings_schema.json — global theme settings
  settings_data.json   — saved setting values
```

## Store
ogresells.com — sells vendor lists and reselling bundles
Products: All Vendor Bundle, Cologne Vendor Bundle, Clothing Vendor Bundle, etc.

## Design reference
lukesvendors.com — the full section-by-section breakdown is in `lukesvendors-reference.md`
