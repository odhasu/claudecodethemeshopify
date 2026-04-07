# Vexel Theme — How Things Work

## Folder structure

| Folder | What |
|--------|------|
| sections/ | 45 page sections (hero, products, FAQ, reviews, etc.) |
| snippets/ | 36 reusable components (cart drawer, menus, product cards) |
| assets/ | CSS, JS (includes loader.js) |
| layout/ | theme.liquid — base HTML wrapper |
| templates/ | Page templates (homepage, product, accounts, support, legal) |
| config/ | settings_schema.json — all theme editor settings |

## Adding a new section

1. Create `sections/your-section.liquid`
2. Write HTML + Liquid
3. Add `{% schema %}` block with all settings (colors, text, sizes, URLs)
4. Add to template in `templates/`
5. Push to main

## Key sections

| Section | What it does |
|---------|-------------|
| hero-section.liquid | Hero banner with CTA |
| product.liquid | Product grid with "DETAILS +" modals |
| custom-landing-page.liquid | Full landing page (profits, sales, features, testimonials, FAQ, reviews) |
| customer-reviews.liquid | Reviews with ratings |
| faq-section.liquid | FAQ accordion |
| ai-bot.liquid | AI chatbot widget |
| live-sales-glass.liquid | Live sales notifications |
| image-marquee.liquid | Scrolling testimonials/images |
| header-pill.liquid | Glassmorphic pill navigation |
| custom-footer.liquid | Footer (not deletable by resellers, links to Vexel) |

## The footer rule

The footer contains a link back to the Vexel store. Resellers cannot delete it or change the link. If the footer is removed, the theme protection kicks in. This is how new customers discover Vexel.

## What resellers can customize

Almost everything via the theme editor:
- All colors (14 settings)
- Fonts and sizes
- Button styles
- Card styles
- Header/nav layout
- Announcement bar
- Product card appearance
- Social media links
- Animations
- Custom CSS/JS

What they can't change: the footer link to Vexel store, the license validation.
