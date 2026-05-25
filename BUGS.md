# Theme — Bugs & Todo

## Active
- Cart drawer — needs testing on live store
- Hero bg image — setting exists, needs image upload in Shopify admin
- Footer Instagram URL — placeholder, needs real URL
- Testimonials — few images uploaded, supports up to 20 (upload in Shopify admin)
- Store admin still shows old brand name/nav links — update in Shopify Customize

## Todo — Content (Shopify admin)
- Set homepage section order (see BUILD.md order)
- Upload hero background image
- Upload product photos for all 11 products (see LUKE_CLONE_PRD.md)
- Upload testimonial screenshots
- Add real social URLs to footer
- Set up 11 products with prices + compare-at prices

## Fixed this session
- urgency_bar_height no longer needs manual sync — header auto-detects actual UB height via JS + CSS custom property
- Header sliding behind urgency bar on scroll — both now fixed, header offset = urgency bar height, adjusts top on UB toggle event
- Urgency bar/header z-index conflict — urgency bar z-index 201, header z-index 200
- Header was pill shape — rebuilt as full-width black bar matching Luke's layout (logo left, nav center, cart right)
- Theme changes not visible — was not pushing to GitHub (Shopify deploys from v3 branch)
- Sticky behavior missing — added 3-mode behavior select to both urgency bar and header

## Fixed (previous sessions)
- Per-section spinners — removed, full-page loader handles everything
- License protection — Kenso shell model fully working
- Hero missing features — bg image, gradient overlay, 2 CTA buttons
- Color split (#39ff14 vs #19d400) — unified to #19d400
- FAQ first item not open — now opens on DOMContentLoaded
- Buy button radius — was hardcoded, now uses btn_radius setting
- Header background — was transparent, now dark by default
- 3s page lag — removed license validation blocking window.load
