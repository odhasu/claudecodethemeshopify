# OGResell Shopify Theme — Project Context

This is the custom Shopify theme for ogresells.com. Read this file every session before touching anything.

## What this repo is

A fully custom Shopify theme built from scratch for OGResell — a reselling education business owned by Oscar. The theme is license-protected. When a customer visits the store, a loader script checks their license against the backend server. Valid license = full content loads. Invalid = content is blurred and a notice appears.

## Rules — always follow these

- Every visual element must have a Shopify theme editor setting. Never hardcode colors, text, sizes, or URLs.
- After every file change: git add → git commit → git push
- No placeholder copy. Write real persuasive copy based on OGResell's brand.
- The paired backend server lives at: github.com/odhasu/claudeshopifylicinse

## What's been built

### Homepage
- Hero section with headline, subtext, CTA button
- Stats bar (to be updated: $300K combined sales, 10K+ orders)
- Resellers testimonials carousel (pending — Oscar to send Instagram handles + follower counts)

### Pricing Section
- **Lite — $179** — white card, gray "LITE" pill badge, 1 store license, dark button
- **Pro — $379** — blue gradient card, diamond logo icon, "SAVE $200" badge, 5 store licenses, blue button
- Designed to match Kenso (usekenso.com) pricing layout

### Docs Page
- 29 full articles across 6 categories
- Categories: Getting Started, License & Domain, Theme Customization, Feature Guides, Troubleshooting, Plans & Policies
- Floating chat widget bottom-left (name, phone, message → posts to /api/support/ticket on server)

### License Panel
- Customers can view their license key, product, and expiry
- Shown only to logged-in customers with a valid license

### Loader (assets/loader.js)
- Runs on every page load
- Pings the backend to validate the license
- On 403 (invalid): blurs content, shows notice, injects footer HTML from server response
- On success: renders all licensed sections

## Changelog

### March 15 2026
- Added floating chat widget to docs page
- Updated pricing cards to match Kenso layout
- Fixed loader.js 403 handler to inject footer HTML on invalid license

### March 10 2026
- Rebuilt docs page with 29 articles
- Added license panel section
- Pricing section redesigned (Lite + Pro cards)

## Still to do
- Resellers carousel — Oscar to send Instagram handles + follower counts
- Update homepage stats to $300K / 10K orders
- New diamond logo SVG — white diamond, transparent background
- Support page redesign (match Kenso support page style)
- Changelog section visible to customers in theme
- Footer copyright business name
