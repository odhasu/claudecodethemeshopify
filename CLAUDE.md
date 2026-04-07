# Vexel Shopify Theme

This is the actual Shopify theme product that resellers install on their stores. Oscar sells it through the Vexel store. Resellers use it to run stores like keanusvendors.com.

Repo: github.com/odhasu/claudecodethemeshopify
Push to: main branch

## What it is

A full Shopify theme with 45 sections, 36 snippets, and 12+ settings groups. License-protected — loader.js checks with the Vexel server on every page load. Valid license = content loads. Invalid = blurred + upgrade notice.

## Rules

- Every visual element must have a theme editor setting. Nothing hardcoded.
- After every change: git add → commit → push to main
- No placeholder text — write real copy
- The footer is not deletable by resellers (protects the license link back to Vexel store)
- Resellers can change almost everything else from the theme editor (colors, fonts, text, etc.)
- Don't add things Oscar didn't ask for

## What's in the theme

- 45 sections (hero, product grid, product modals, bundle builder, FAQ, reviews, live sales, chatbot, etc.)
- 36 snippets (cart drawer, mega menu, product cards, variant pickers, etc.)
- 14 templates (homepage, product page, customer accounts, support, legal, affiliate dashboard)
- Full customer accounts (login, register, orders, addresses)
- Loading spinner on page load
- Product detail modals ("DETAILS +" button)
- Bundle builder with discount tiers
- AI chatbot
- Live sales notifications (glassmorphic)
- Image marquee for testimonials
- The footer links back to the Vexel store — this link is not editable

## Theme editor settings (13 groups)

Colors (14), Typography (8), Buttons (13), Cards (6), Layout (4), Header (13), Announcement Bar (7), Product Cards (21), Footer (13), Social Media (7), Cart (4), Animations (5), Custom Code (6)

## Reference stores (all use Kenso's theme — we match these)

- keanusvendors.com (primary reference)
- flippavendors.com
- resellersrealm.shop
- piaresells.com

## License flow

1. Page loads → loader.js shows spinner
2. Sends license key + domain to Vexel server (/api/validate)
3. Valid → spinner gone, all sections render
4. Invalid (403) → content blurred, notice shown, footer HTML injected from server

## What needs work

- Diamond logo SVG: white diamond, transparent background
- Footer copyright business name
