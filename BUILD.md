# Theme — Build Status

## Architecture
Native Liquid rendering — all sections render server-side. No loader, no shells, no client-side rendering.
Loader (license protection) moved to separate repo: odhasu/vexel-loader

## Section order (matches Luke's)
1. Urgency bar — header group
2. Header full-width — header group
3. Hero
4. Product grid
5. Testimonials
6. FAQ
7. Reviews
8. Trust badges — footer group
9. Footer — footer group

## Sections — Native Liquid (done)
- Urgency bar — scrolling marquee, countdown timer, live viewer count, pulsing dot, slide-in on scroll
- Header — fixed bar, logo/brand left, nav center-right (14px/400 weight), cart right, mobile hamburger, transparent->dark on scroll
- Hero — Clash Grotesk 110px headline, green highlight, 2 CTA buttons, trust line with avatar stack, bg image with gradient overlay
- Product grid — flat cards (#111), overlay titles, SALE badges, BUY NOW buttons (50px radius), no descriptions by default
- Testimonials — horizontal auto-scroll image carousel, fade edges, pause on hover, hides when no images
- FAQ — accordion, chevron toggle, green border on open, first item open, one-at-a-time
- Reviews — star rating header, write-a-review modal, 3-column card grid, avatar initials
- Trust badges — scrolling marquee, 4 badges with SVG icons, dot separators
- Footer — brand text/logo, social icons, CTA button, policy links, copyright
- Cart drawer — slide-out panel, AJAX quantity controls (native Liquid, unchanged)

## Other done
- Color system — unified to #19d400 everywhere (no more #39ff14)
- Fonts — Clash Grotesk (headings) + Satoshi (body) from Fontshare
- Live sales notification — toast popup
- Chat widget — built-in chatbot

## Still to build
- Results carousel — section exists but not on homepage
- Hero background image — needs upload in Shopify admin
- More testimonial screenshots (up to 20 supported)
- Real social links in footer
- Logo image upload in Shopify admin
- Mobile polish pass

## Last worked on
2026-05-09 — Full native Liquid rebuild: removed loader, rewrote all 9 sections as direct-rendering Liquid, moved loader to odhasu/vexel-loader
