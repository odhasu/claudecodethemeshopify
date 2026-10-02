# Theme — Bugs & Todo

## Lin replica — active / verification
- The 11 imported products are drafts. Supply store-owned vendor delivery files/links and configure a digital delivery app before activation. Preview purchase controls are disabled.
- Actual Shopify admin editor reload still needs an authenticated Chrome profile. DOM tests and section unload/load events in the real storefront preview passed.
- Theme Check has 10 warnings and zero errors. Existing account-route, remote-asset, preload and settings-count warnings remain. The undefined product form and its hardcoded add route are resolved on `linresell-replica`.
- Reference font assets failed to load. The replica uses the observed system fallback; appearance can vary across operating systems.

## Historical Vexel verification
- The reference uses a populated review feed; this theme's dialog now matches its appearance but does not persist or moderate submissions. Submit explicitly reports that reviews are unavailable, and media upload is disabled. Connect a review app for production reviews.
- Add suitable store-owned customer portraits and real social links in Shopify Customize. Shopify Files has no clearly suitable hero portraits; its “OG’S SUPPLIERS” and older “Recuerdos Vividos” logos do not match the current OGSELL text wordmark. Reference assets and product catalog imagery were intentionally not copied.
- Three of four current OGSELL products have empty descriptions. The local information dialog now uses editable Product Grid delivery/refund text for these products; add store-owned product descriptions for product-specific details. This fix is available in the local development preview but has not been published to the live theme.

## Todo — Content
- Add real social URLs to footer

## Fixed
- Urgency bar on `linresell`: restored the pink “verified” highlight, white icons, correct plain reseller-count text and reference divider colors. Highlight and colors remain editable; repeated timer/viewer values stay synchronized. Chrome 375px/1440px and preview section reload checks passed; live publication remains pending.
- Cart/product follow-up on `linresell-replica`: unsuccessful Cart API responses no longer report success or redirect to checkout; error text, control recovery, retries and draft guards are covered by regression tests and development-preview checks. Product quantity/accelerated payments use a native Shopify form; product review submission no longer claims persistence. Cart requests and purchase redirects respect Shopify's locale root. Live theme unchanged.
- Settings/performance pass: 93 additional controls; previously masked width/color/columns/glow and numeric-zero settings now work. Client-rendered sections refresh with scoped data/styles and release listeners/timers on editor unload. Cart unload restores scrolling.
- Removed artificial loading wait, duplicate review/cart code, and unused runtime carousel; minified loader is 49% smaller (54% smaller gzip). Desktop and 375px development previews checked; live theme unchanged.
- Homepage background glow reduced from 22% to 10% in the development preview; dedicated settings now control enable/disable, color, size, overall strength, and three individual glows. Live theme unchanged.
- Abrupt scroll chrome — urgency bar no longer reads layout and writes header offset on every scroll event; header motion uses a transform and its scrolled appearance eases in
- Loader reveal race — the runtime renderer no longer bypasses the balanced minimum intro; reveal now waits for rendered shells, with a 3s safety fallback
- Removed the unwanted storefront chatbot, its settings, and its unused theme styles
- Homepage background now uses three broad, theme-adjustable green glows like the current reference; Products links and a Shopify URL redirect send `/collections/all` home
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

## Audit follow-ups — 2026-10-01
- Cart rejection handling, native product form and honest product-page review status are resolved on `linresell-replica`. Browser checks used mocked 422/success responses; actual inventory failures, accelerated checkout transactions and delivery remain untested.
- Renderer shell lifecycle and instance scoping are fixed and covered by DOM tests. A visual reload in the actual Shopify admin editor remains to be checked; conventional Liquid section scripts are outside this runtime lifecycle.
- Resolved on `linresell-replica`: source/build/lock are repo-local; `npm run build` generates both assets. The earlier Vexel checkpoint retains its external runtime.
- Check urgency/header height after loading reveal, presentment currency/remaining localized navigation routes, loader-failure fallback, and dialog focus handling outside the tested product information dialog.
- The original audit and priorities are in `../docs/PROJECT_AUDIT.md`; current branch fixes and evidence are recorded above and in `docs/LIN_REPLICA.md`.
