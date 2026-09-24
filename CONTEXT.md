# Theme — Context

## What it is
Vexel — a Shopify theme product for resellers. Built from scratch, replicating lukesvendors.com design. The theme renders its shell sections client-side without a license check.

## Repo
GitHub: odhasu/claudecodethemeshopify
- main — V1, live on Shopify, never touch
- v2 — active development, all work goes here

Working dir: /Users/oscargraafmans/Desktop/ogresell/theme

## Stack
Shopify Liquid (shell sections), vanilla CSS, vanilla JS. No frameworks. The renderer is built from a separate runtime work directory and bundled into theme assets.

## Architecture (Kenso shell model)
Sections are empty shells — just a div + JSON data. The bundled loader renders section HTML client-side on every storefront and editor load. No key or validation server is required.

## File structure
layout/
  theme.liquid         — root layout, CSS vars, VexelConfig, loading screen, loader script
sections/
  urgency-bar.liquid   — shell + JSON
  header-pill.liquid   — shell + JSON
  hero.liquid          — shell + JSON
  product-grid.liquid  — shell + JSON + products JSON
  trust-badges.liquid  — shell + JSON
  testimonials.liquid  — shell + JSON
  reviews.liquid       — shell + JSON
  faq.liquid           — shell + JSON
  footer.liquid        — shell + JSON (protected — removal breaks theme)
  cart-drawer.liquid    — regular Liquid (no shell)
  main-product.liquid  — regular Liquid
assets/
  theme.css            — global styles
  theme.js             — global JS (loader dismiss, scroll behavior)
snippets/
  chat-widget.liquid
  live-sales-notification.liquid
  meta-tags.liquid
config/
  settings_schema.json — global theme settings
  settings_data.json   — saved setting values
templates/
  index.json           — homepage sections + order
sections/
  header-group.json    — header sections + order
  footer-group.json    — footer sections + order

## Related projects
- Runtime work directory (renderer source and build script): /Users/oscargraafmans/Desktop/ogresell/runtime/work/runtime-theme/
- Dashboard + store: /Users/oscargraafmans/Desktop/ogresell/store/
- Loader source: runtime/work/runtime-theme/src/loader.js -> runtime/work/runtime-theme/dist/scaled-loader.js -> both theme loader assets

## Design reference
lukesvendors.com — check before building anything visual
Kenso theme — /tmp/kenso-extract/ — architecture reference for shell model
