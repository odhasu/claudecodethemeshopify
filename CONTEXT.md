# Theme — Context

## What this is
Vexel Shopify theme — premium theme product for resellers, replicating lukesvendors.com design.

## Repo
- GitHub: odhasu/claudecodethemeshopify
- Branch: v2 (working branch, never touch main)
- Loader repo: odhasu/vexel-loader (license protection, separate)

## Stack
- Shopify Liquid (native rendering, no client-side loader)
- Clash Grotesk + Satoshi (Fontshare)
- CSS variables for theming
- Vanilla JS for interactivity (marquees, FAQ toggle, modals)

## Architecture
All sections render directly in Liquid — HTML, CSS, and JS are inline in each section file. No shells, no loaders, no build step.

## File structure
```
layout/
  theme.liquid         — main layout (fonts, CSS vars, global styles)
  password.liquid      — password page

sections/
  urgency-bar.liquid   — scrolling marquee bar (header group)
  header-pill.liquid   — fixed header (header group)
  hero.liquid          — hero section with headline + CTA
  product-grid.liquid  — product cards grid
  testimonials.liquid  — image carousel
  faq.liquid           — accordion FAQ
  reviews.liquid       — customer reviews grid
  trust-badges.liquid  — scrolling badges bar (footer group)
  footer.liquid        — site footer (footer group)
  cart-drawer.liquid   — slide-out cart
  bundle-builder.liquid — bundle discount builder
  results-carousel.liquid — results showcase
  main-product.liquid  — product page
  main-cart.liquid     — cart page

snippets/
  live-sales-notification.liquid — purchase toast popup
  chat-widget.liquid   — chatbot widget
  meta-tags.liquid     — SEO meta tags

assets/
  theme.css            — global utility CSS
  theme.js             — scroll reveal + utilities

config/
  settings_schema.json — theme settings schema
  settings_data.json   — theme settings values

templates/
  index.json           — homepage template
```
