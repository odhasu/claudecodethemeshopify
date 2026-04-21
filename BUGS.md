# Theme — Bugs & Todo

## Active bugs
- Cart — no cart drawer, clicking cart icon goes to /cart page (Shopify default)
- Hero bg image — setting exists but Oscar needs to upload an image in Shopify admin for Luke's image-banner look
- Footer Instagram URL — currently set to "h" (placeholder), needs real URL

## Todo
- Upload real hero background image (Admin → Theme → Hero section → Background Image)
- Upload customer testimonial screenshots (need more than 3)
- Add real social links to footer
- Cart drawer — build a cart drawer instead of redirect
- Results carousel section — not yet placed on homepage

## Completed bugs (for reference)
- ✅ 3s lag fix — removed license validation system blocking window.load
- ✅ 12 Google Fonts → Fontshare (Clash Grotesk + Satoshi)
- ✅ Urgency bar overlapping header — fixed with --urgency-bar-height CSS var
- ✅ Sticky header broken — rebuilt as full-width header, correct offset from urgency bar
- ✅ Buttons inconsistent — all sections now use #19d400, standardized
- ✅ Color inconsistency — #39ff14 vs #19d400 — unified to #19d400 everywhere
- ✅ FAQ first item not open — fixed, opens on DOMContentLoaded
- ✅ Section order wrong — now matches Luke's (hero → products → testimonials → faq → reviews)
- ✅ Trust badges in wrong place — moved to footer group (before footer, like Luke's)
