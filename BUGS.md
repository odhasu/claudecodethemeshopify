# Theme — Bugs & Todo

## Active / verification
- Verify the live OGSELL storefront after the GitHub-connected theme sync; the theme no longer requires a license key, but the storefront should be checked for section rendering and loader reveal.
- Shopify editor settings remain out of sync with `v2`'s `templates/index.json` after the GitHub update (for example, Product Grid still displays "Go to product page" and no info button). The runtime currently forces the rendered BUY NOW link to direct checkout. Reconcile the saved editor values with GitHub deliberately; editor saves can rewrite unrelated homepage settings.
- Verify cart add + checkout flow on the target Shopify theme preview; checkout depends on valid Shopify variants and storefront configuration.
- The reference uses a populated review feed; this theme's dialog now matches its appearance but does not persist or moderate submissions. Submit explicitly reports that reviews are unavailable, and media upload is disabled. Connect a review app for production reviews.
- Add the store's testimonial images, customer avatars, logo, and social links in Shopify Customize. Reference assets and product catalog imagery were intentionally not copied.
- Three of four current OGSELL products have empty descriptions. Their info controls now link to product pages; add store-owned descriptions to populate reference-style dialogs.

## Todo — Content
- Upload more testimonial screenshots
- Add real social URLs to footer

## Fixed
- Header cart glyph — now matches the reference's cart icon while retaining the `/cart` destination
- 404 and empty cart layout — matched reference typography, spacing, buttons, and footer start on desktop/mobile; cart Continue Shopping now links home
- Empty product detail popup — now shows the product title and a product-page link when description content is missing; populated descriptions render in the dialog
- Desktop/mobile homepage alignment — headline, grid width/gaps, mobile spacing, continuous glow, and mobile header controls matched against current reference screenshots
- License gate — removed key/server validation, the invalid-license page, and footer tamper lock from the v2 theme while preserving the shell renderer
- BUY NOW and footer CTA styling — matched the reference's compact shapes, typography, flat green fill, inset/glow shadows, and footer new-tab behavior while keeping OGSELL's checkout variants and footer URL
- Reference layout pass — compact header/hero, product card actions/badge placement, FAQ-before-reviews order, single-column reviews, 44px trust bar and footer structure aligned; store content/integrations remain store-owned
- Per-section spinners — removed, full-page loader handles everything now
- Testimonials spinner stuck — no more per-section spinners, content loads behind full-page loader
- Header nav clutter — removed HOME/CATALOG/CONTACT bar entirely
- Footer too many settings — stripped to essentials (brand/social/CTA/copyright only)
- Hero not centered — added CSS overrides for centered content + buttons
- Previous license-protection implementation — superseded by the 2026-09-24 removal
- Hero missing features — added bg image, gradient overlay, 2 CTA buttons (matching Luke's)
- Product cards — added inline description text (2-line clamp)
- Validate endpoint — Vercel env var was overriding Supabase anon key with wrong project's service role key
- 3s page lag — removed license validation blocking window.load
- Google Fonts bloat — replaced 12 fonts with Fontshare (Clash Grotesk + Satoshi)
- Sticky header broken — rebuilt as full-width bar with correct urgency bar offset
- Buttons inconsistent — all sections standardized to #19d400
- Color split (#39ff14 vs #19d400) — unified to #19d400
- FAQ first item not open — now opens on DOMContentLoaded
- Section order wrong — now matches Luke's
- Trust badges position — moved to footer group
- Header pill — replaced with full-width fixed header
- Buy button radius — was hardcoded 50px, now uses btn_radius setting
- Header background — was transparent, now dark gradient by default
