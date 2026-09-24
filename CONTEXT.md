# Theme — Context

## What it is
Vexel — a Shopify theme product for resellers. Built from scratch, replicating lukesvendors.com design. The theme renders its shell sections client-side without a license check.

## Repo
GitHub: odhasu/claudecodethemeshopify
- main — V1 branch, never touch
- v2 — active development branch; Shopify currently marks its connected theme as live

Working dir: /Users/oscargraafmans/Desktop/ogresell main/theme

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
  footer.liquid        — shell + JSON
  cart-drawer.liquid   — shell + JSON
  main-product.liquid  — regular Liquid
assets/
  theme.css            — global styles
  theme.js             — global JS (loader reveal, scroll behavior, dialogs and header enhancements)
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
- Loader source: runtime/work/runtime-theme/src/loader.js -> runtime/work/runtime-theme/dist/scaled-loader.js -> theme loader assets

## Current state (2026-09-24)
- Recent visual work is recorded in BUILD.md: homepage, cart/404, review dialog, header cart glyph, and product description dialog.
- Shopify Theme Check last reported zero errors and 11 warnings after the cart/404 and review-dialog changes.
- The earlier 20px Product Grid padding edit was committed as `2b7927f`, and the live Shopify template matches `v2`.
- See BUGS.md for the custom-domain, content, and review-service follow-ups.

## Design reference
lukesvendors.com — check before building anything visual
Kenso theme — /tmp/kenso-extract/ — architecture reference for shell model
