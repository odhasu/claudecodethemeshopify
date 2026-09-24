# Theme — Bugs & Todo

## Active / verification
- `ogresells.com` displayed Shopify's "This store is unavailable" page on 2026-09-24. Shopify Domains lists `www.ogresells.com` as connected but omits the bare domain, although its A record points to Shopify. Connect the bare domain after store-setting approval.
- The reference uses a populated review feed; this theme's dialog now matches its appearance but does not persist or moderate submissions. Submit explicitly reports that reviews are unavailable, and media upload is disabled. Connect a review app for production reviews.
- Find suitable store-owned customer avatars and a logo, then add them with real social links in Shopify Customize. Reference assets and product catalog imagery were intentionally not copied.
- Three of four current OGSELL products have empty descriptions. Their info controls now link to product pages; add store-owned descriptions to populate reference-style dialogs.

## Todo — Content
- Add real social URLs to footer

## Fixed
- Restored ten existing OGSELL testimonial images from Shopify Files to the live homepage carousel; verified that the live storefront displays them and Shopify's homepage template matches `v2`
- Live homepage settings synced — Shopify's `templates/index.json` now matches `v2`, including the preserved 20px Product Grid top padding
- Header cart icon now follows `/cart` like the reference; the drawer's empty-cart Continue shopping link returns home
- Live loader/checkout verification — `ogsellsz.myshopify.com` rendered sections without a license key, and BUY NOW added a valid variant and reached Shopify checkout; the test cart was emptied afterward
- Product description popup styling — aligned backdrop, card radius, close control, and body typography; decoded literal HTML entities in store descriptions
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
