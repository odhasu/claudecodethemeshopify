# Theme — Context

## What it is
Custom Shopify theme for ogresells.com — Oscar's reselling store. Built from scratch, replicating lukesvendors.com design on the v2 branch.

## Repo
GitHub: odhasu/claudecodethemeshopify
- main — V1, live on Shopify, never touch
- v2 — active development, all work goes here

Working dir: /Users/oscargraafmans/Desktop/ogresell/theme

## Stack
Shopify Liquid, vanilla CSS, vanilla JS. No frameworks.

## File structure
layout/
  theme.liquid         — root layout, CSS vars, loading screen, fonts
sections/
  urgency-bar.liquid
  header-pill.liquid   — full-width header (logo left, nav right)
  hero.liquid
  product-grid.liquid
  trust-badges.liquid
  testimonials.liquid
  reviews.liquid
  faq.liquid
  footer.liquid
  bundle-builder.liquid
  results-carousel.liquid
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
templates/
  index.json           — homepage sections + order
sections/
  header-group.json    — header sections + order
  footer-group.json    — footer sections + order

## Store
ogresells.com — sells vendor lists and reselling bundles
Products: All Vendor Bundle, Cologne Vendor Bundle, Clothing Vendor Bundle, etc.

## Design reference
lukesvendors.com — check before building anything visual
