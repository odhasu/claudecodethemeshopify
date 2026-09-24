# Theme work handoff

This file preserves the actionable context from the conversation, not a verbatim chat export.

## User direction

- Match the theme system on `https://lukesvendors.com/` as closely as possible in OGSELL's GitHub-connected Shopify theme. Keep OGSELL's products, prices, images, customer content, and store-specific destinations.
- Work on `odhasu/claudecodethemeshopify` branch `v2` and push completed theme edits there.
- Current focus: replicate the product-card `BUY NOW` control and footer `Get this store design` badge, including shapes, typography, shadows, colors, and link behavior.
- Keep Markdown notes of progress and unresolved items so later work can resume from evidence.

## Authoritative locations

- Theme Git checkout: `/Users/oscargraafmans/Desktop/ogresell main/theme` (`v2`).
- Editable runtime source: `/Users/oscargraafmans/Desktop/ogresell/runtime/work/runtime-theme/src/loader.js`.
- Build from the runtime work directory with `npm run build:loader`, then copy `dist/scaled-loader.js` to both theme assets `assets/scaled-loader.js` and `assets/scaled-loader-current.js`.
- The connected Shopify theme is ID `196616782165` in store `ogsellsz` (admin may show its permanent domain as `recuerdos-vividos.myshopify.com`). The current theme layout loads `scaled-loader-current.js`.

## Button evidence, 2026-09-24

| Control | Luke's reference | OGSELL before this pass |
| --- | --- | --- |
| Product `BUY NOW` | Link to `/cart/add?id=<variant>&return_to=/checkout`; 42px high at the measured mobile viewport; flat `#19d400`; 10px radius; Clash Grotesk, weight 900, responsive font; strong green outer glow plus 3px inset light/dark shadows | Correct checkout URL pattern and 42px mobile height, but 50px saved radius, Satoshi weight 800, and weaker inset shadow |
| Footer `Get this store design` | External link opening a new tab; 34px high; flat `#19d400`; 12px radius; Satoshi 12px/700; 8px × 18px padding; same strong green/inset shadow | External URL was store-owned, but opened in same tab; 50px high, gradient fill, 50px radius, larger padding/text, weaker shadow |

The OGSELL Shopify editor's Product Grid radius was changed from 50px to 10px and saved. Keep the store's own variant IDs and the footer destination `https://vexelthemes.com`; do not copy Luke's referral URL.

Saving that single setting caused Shopify's GitHub integration to commit its older complete `templates/index.json` state as `a7cfa1b`, including unrelated hero, grid, review, and FAQ values. The next theme commit restores the intended `v2` template values while retaining the 10px BUY NOW radius. Treat future Shopify editor saves as full-template syncs and inspect the resulting Git diff before accepting them.

## Verification and boundaries

- Check `git status`, `node --check` on runtime source and both generated assets, JSON section schemas, and `git diff --check` before pushing.
- Verify the synced theme in Shopify's editor and compare computed button styles/links with the reference at the same viewport. Shopify's GitHub log can confirm a theme update; the editor may need a refresh to load the new CDN asset version.
- The public OGSELL storefront is currently blocked by the theme's license check (`invalid_key` from its configured validation server). Do not disable license protection in the distributable theme. A valid owner-store license is needed for public-store verification.
- Customer portraits, testimonial screenshots, product images, catalog/review counts, and OGSELL-specific copy are content, not theme code to copy from the reference.

See `BUILD.md` for implemented systems and `BUGS.md` for outstanding verification.
