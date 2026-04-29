# Theme — Bugs & Todo

## Active
- Button radius setting — fixed (was hardcoded 50px, now uses theme setting)
- Header bg — fixed (was transparent, now dark gradient)
- Cart drawer — newly built, needs testing on live store
- Hero bg image — setting exists, needs image upload in Shopify admin
- Footer Instagram URL — placeholder, needs real URL
- Testimonials — only 3 images, needs more

## Todo — License Protection
- Convert 10 sections to Kenso shell model
- Build obfuscated loader (client-side rendering engine)
- Set up Railway server (validation endpoint + loader serving)
- Update theme.liquid with VexelConfig + loading states
- Build pipeline (obfuscation + ZIP packaging)

## Todo — Content
- Upload hero background image
- Upload more testimonial screenshots
- Add real social URLs to footer

## Fixed
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
