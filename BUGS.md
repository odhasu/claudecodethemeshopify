# Theme — Bugs & Todo

## Active
- Cart drawer — needs testing on live store
- Hero bg image — setting exists, needs image upload in Shopify admin
- Footer Instagram URL — placeholder, needs real URL
- Testimonials — few images uploaded, supports up to 20 (upload in Shopify admin)
- Store admin settings still show "OGSELL" — update brand name/nav links in Shopify Customize

## Todo — Content
- Upload hero background image
- Upload more testimonial screenshots
- Add real social URLs to footer

## Fixed
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
