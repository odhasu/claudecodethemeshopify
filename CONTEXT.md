# Theme — Context

## What it is
Vexel — a premium Shopify theme product sold to resellers. Built from scratch, replicating lukesvendors.com design. License-protected via local checksum validation (theme.js) + Railway server (built, not yet wired up).

## Repo
GitHub: odhasu/claudecodethemeshopify
- main — V1, do not touch
- v3 — active branch, all work goes here

Working dir: /Users/oscargraafmans/Desktop/ogresell/theme

## Stack
Shopify Liquid (full sections — NOT shells), vanilla CSS, vanilla JS. No frameworks.
License: local checksum in theme.js validates key format. Railway server exists at /Desktop/ogresell/runtime/ but is not yet connected.

## Architecture (current — V3)
Sections are full Liquid — they render HTML directly. This is NOT the Kenso shell model.
The shell model + client-side renderer exists in runtime/src/loader.js but is not used in V3.
theme.js validates the license key format locally, then dismisses the loader.

## File structure
layout/
  theme.liquid         — root layout, CSS vars, loading screen, theme.js
sections/
  urgency-bar.liquid   — full Liquid
  header-pill.liquid   — full Liquid
  hero.liquid          — full Liquid
  product-grid.liquid  — full Liquid
  secondary-product-grid.liquid — full Liquid
  bundle-builder.liquid
  divider.liquid
  testimonials.liquid
  trust-bar.liquid
  reviews.liquid
  faq.liquid
  footer.liquid
  cart-drawer.liquid
  main-product.liquid
assets/
  theme.css            — global styles
  theme.js             — license validation (local checksum) + scroll reveal
snippets/
  chat-widget.liquid
  live-sales-notification.liquid
  meta-tags.liquid
config/
  settings_schema.json
  settings_data.json

## Related projects
- License server (Railway): /Users/oscargraafmans/Desktop/ogresell/runtime/
- Dashboard + store: /Users/oscargraafmans/Desktop/ogresell/store/
- Obfuscated loader source: runtime/src/loader.js -> runtime/dist/scaled-loader.js

## Design reference
lukesvendors.com — check before building anything visual
