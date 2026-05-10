# Theme — Context

## What it is
Vexel — a premium Shopify theme product sold to resellers. Built from scratch, replicating lukesvendors.com design. License-protected via obfuscated loader + Railway validation server (Kenso shell model).

## Repo
GitHub: odhasu/claudecodethemeshopify
- main — V1, live on Shopify, never touch
- v2 — active development, all work goes here

Working dir: /Users/oscargraafmans/Desktop/ogresell/theme

## Stack
Shopify Liquid (shell sections), vanilla CSS, vanilla JS. No frameworks.
License protection: obfuscated client-side loader (javascript-obfuscator) + Railway server for validation.

## Architecture (Kenso shell model)
Sections are empty shells — just a div + JSON data. An obfuscated loader JS validates the license against a Railway server, then renders all section HTML client-side. Without a valid license, the theme shows nothing.

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
  settings_schema.json — global theme settings (includes License section)
  settings_data.json   — saved setting values
templates/
  index.json           — homepage sections + order
sections/
  header-group.json    — header sections + order
  footer-group.json    — footer sections + order

## Related projects
- License server (Railway): /Users/oscargraafmans/Desktop/ogresell/runtime/
- Dashboard + store: /Users/oscargraafmans/Desktop/ogresell/store/
- Obfuscated loader source: runtime/src/loader.js -> runtime/dist/scaled-loader.js

## Design reference
lukesvendors.com — check before building anything visual
Kenso theme — /tmp/kenso-extract/ — architecture reference for shell model
