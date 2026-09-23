# Theme — Bugs & Todo

## Active / verification
- Verify cart add + checkout flow on the target Shopify theme preview; checkout depends on valid Shopify variants and storefront configuration.
- The reference uses a populated review feed; this theme's review form is presentational and does not persist or moderate submissions. Connect a review app for production reviews.
- Add the store's testimonial images, logo, and social links in Shopify Customize. Reference assets and product catalog imagery were intentionally not copied.

## Todo — Content
- Upload more testimonial screenshots
- Add real social URLs to footer

## Fixed
- Reference layout pass — compact header/hero, product card actions/badge placement, FAQ-before-reviews order, single-column reviews, 44px trust bar and footer structure aligned; store content/integrations remain store-owned
- Per-section spinners — removed, full-page loader handles everything now
- Testimonials spinner stuck — no more per-section spinners, content loads behind full-page loader
- Header nav clutter — removed HOME/CATALOG/CONTACT bar entirely
- Footer too many settings — stripped to essentials (brand/social/CTA/copyright only)
- Hero not centered — added CSS overrides for centered content + buttons
- License protection — Kenso shell model fully working (Supabase RPC + Vercel + CDN loader)
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
