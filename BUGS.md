# Theme — Bugs & Todo

## Active
- Cart — no cart drawer, clicking cart goes to default Shopify /cart page
- Hero bg image — setting exists in code, Oscar needs to upload image in Shopify admin (Customize > Hero > Background Image)
- Footer Instagram URL — set to placeholder "h", needs real URL
- Testimonials — only 3 images uploaded, needs more real customer screenshots

## Todo
- Build cart drawer
- Upload hero background image (ideally a product/lifestyle photo like Luke's)
- Upload more testimonial screenshots
- Add real social URLs to footer

## Fixed
- 3s page lag — removed license validation blocking window.load
- Google Fonts bloat — replaced 12 fonts with Fontshare (Clash Grotesk + Satoshi)
- Sticky header broken — rebuilt as full-width bar with correct urgency bar offset
- Buttons inconsistent — all sections standardized to #19d400
- Color split (#39ff14 vs #19d400) — unified to #19d400 across all sections and settings_data
- FAQ first item not open — now opens on DOMContentLoaded
- Section order wrong — now matches Luke's (hero > products > testimonials > faq > reviews)
- Trust badges position — moved from index to footer group (before footer, like Luke's)
- Header pill — replaced with full-width fixed header matching Luke's style
