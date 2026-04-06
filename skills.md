# OGResell Theme — Skills & How-Tos

Reference for working on this theme. What each part does and how to work on it correctly.

## Shopify Theme Structure

| Folder | What it is |
|--------|------------|
| sections/ | Main page sections (hero, pricing, docs, license panel, etc.) |
| snippets/ | Reusable components used inside sections |
| assets/ | CSS, JS files (including loader.js — the license checker) |
| layout/ | theme.liquid — the base HTML wrapper for every page |
| templates/ | Page templates (which sections load on which pages) |
| config/ | settings_schema.json — all theme editor settings live here |

## How to add a new section

1. Create the file in `sections/` as `your-section-name.liquid`
2. Write the HTML + Liquid inside it
3. Add a `{% schema %}` block at the bottom with all settings
4. Every color, text, size, URL must be a schema setting — nothing hardcoded
5. Add the section to the relevant template in `templates/`
6. Push to GitHub

## How to edit the pricing section

File: `sections/pricing.liquid` (or the relevant section file)
- Lite card: white background, gray "LITE" pill, $179, 1 store license
- Pro card: blue gradient top, diamond logo, "SAVE $200" badge, $379, 5 store licenses
- Both cards have a "Get Started →" button
- Reference design: usekenso.com pricing page

## How loader.js works

File: `assets/loader.js`

1. Page loads → loader shows a spinner
2. Loader reads the license key from a cookie or meta tag
3. Sends a request to the backend server to validate
4. **Valid** → removes spinner, renders all sections marked `data-scaled-section`
5. **403 Invalid** → blurs content, shows upgrade notice, injects footer HTML from the server response
6. **Network error** → shows a generic error state

The backend server URL is set in the theme settings (never hardcode it).

## How to update copy/text

All text that should be editable by Oscar goes in the section's `{% schema %}` as a `text` or `richtext` setting. If it's permanent brand copy, write it directly in the Liquid but still consider making it a setting for flexibility.

## Key files

| File | What it does |
|------|--------------|
| assets/loader.js | License validation on every page load |
| sections/pricing.liquid | Lite + Pro pricing cards |
| sections/docs.liquid | Docs page with 29 articles |
| sections/license-panel.liquid | Customer license management |
| snippets/chat-widget.liquid | Floating support chat (bottom-left) |
| layout/theme.liquid | Base HTML, loads loader.js |

## After every change

```
git add .
git commit -m "short description of what changed"
git push
```

Shopify picks up the changes once pushed (if connected via Shopify CLI or GitHub integration).
