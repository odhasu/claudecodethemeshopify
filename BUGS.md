# Theme — Bugs & Todo

## Active
- Cart drawer — needs testing on live store
- Hero bg image — setting exists, needs image upload in Shopify admin
- Footer Instagram URL — placeholder, needs real URL
- Testimonials — few images uploaded, supports up to 20 (upload in Shopify admin)
- Store admin settings still show "OGSELL" — update brand name/nav links in Shopify Customize

## Todo — Content (Shopify Admin)
- Upload hero background image
- Upload more testimonial screenshots
- Add real social URLs to footer
- Upload logo image for header
- Update menu items (currently HOME/CATALOG/CONTACT — Luke's uses Home/Products)

## Fixed
- Full native Liquid rebuild — removed loader dependency, all sections render server-side
- Testimonials loading spinner — section hides when no images configured
- Color inconsistency (#39ff14 remnants) — unified ALL defaults to #19d400
- Hero font — Clash Grotesk 110px (was Satoshi 28px)
- Hero font options — cleaned to only loaded fonts
- Product cards — descriptions OFF, info button OFF, glassmorphic OFF (flat like Luke's)
- Header nav — 14px weight 400, normal case, tighter spacing (matches Luke's)
- Product grid buy button — 50px radius (fully rounded)
- License protection — moved to odhasu/vexel-loader (separate repo)
