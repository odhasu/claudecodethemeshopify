# lukesvendors.com — Design Reference

Full section-by-section breakdown of the lukesvendors.com homepage.
Used as the design reference for Vexel theme v2.

---

## Page Order

1. Urgency Bar
2. Header / Nav
3. Hero
4. Product Grid
5. Testimonials (screenshot carousel)
6. FAQ
7. Reviews
8. Footer

Plus: Purchase toast notifications, AI chatbot, Trust badges bar (floating/overlaid)

---

## 1. Urgency Bar

- Fixed at very top of page, above header
- 3-message carousel with auto-scroll (35px speed):
  - "Private suppliers not found anywhere else" — shield icon
  - "All suppliers personally verified" — check icon
  - "Rated 4.96/5 by 2,400+ resellers" — star icon
- Right side: countdown timer "Price goes up in [HH:MM:SS]" counting to next hour
- Right side: "45 people viewing right now" live viewer count
- Dividers between items: asterisk `*`
- Colors: accent green (#19d400) for icons/highlights, white text, dark bg
- Height: 44px bar

---

## 2. Header / Nav

- Fixed position, top of page (below urgency bar)
- Logo: Fixed.png — 400px desktop, 200px mobile
- Nav links: Home (`/`) · Products (`/collections/all`)
- Background: transparent (no fill)
- Z-index: 100
- Transitions: top 0.25s ease-out (moves down when urgency bar visible)
- CSS: `kenso-shell--header`

---

## 3. Hero Section

**Copy:**
- Headline: "Start Your Reselling Journey Today"
- Highlighted word: "Reselling" (accent green gradient)
- No visible subtitle in this version

**Visual:**
- Hero image: `herov2lucas.png` — 1200px wide, centered below headline
- Background: Black with subtle radial gradient behind text (40% strength)
- Card style: flat (no shadow on image container)

**Typography:**
- Font: Clash Grotesk
- Size: 110px (massive)
- Letter-spacing: -0.02em
- Weight: 700
- Color: #ffffff, highlight #19d400

**CTAs (side by side):**
- Button 1: "BUY NOW" — green bg (#19d400), black text, goes to checkout
- Button 2: "ADD TO CART" — ghost/outlined, goes to product description

**Layout:** Full-width centered, text above image

---

## 4. Product Grid

**Products (11 bundles, in order):**

| Product | Sale Price | Original |
|---------|-----------|---------|
| Elite Vendor Bundle | $39.99 | $99.99 |
| All Vendor Bundle | $29.99 | $69.99 |
| Cologne Vendor Bundle | $9.99 | $17.99 |
| Clothing Vendor Bundle | $14.99 | $29.99 |
| Electronic Vendor Bundle | $9.99 | $17.99 |
| Gold Vendor Bundle | $9.99 | $17.99 |
| Moissanite Vendor Bundle | $9.99 | $17.99 |
| Moissanite Watch Bundle | $9.99 | $17.99 |
| Pearl Vendor Bundle | $9.99 | $17.99 |
| Shoes Vendor Bundle | $9.99 | $39.99 |
| Sunglasses Vendor Bundle | $9.99 | $17.99 |

**Card anatomy:**
- Product image: 500px wide, 250px height card
- Title
- Description (truncated)
- Current price (accent green) + original price (strikethrough, muted)
- "SALE" badge: bottom-right corner of image, semi-transparent dark bg

**Layout:**
- Responsive grid, max-width 1200px
- Gap: 16px (var(--spacing-md))
- Click action: opens product description view (not direct checkout)
- Font: Satoshi

---

## 5. Testimonials (Screenshot Carousel)

- Headline: "What Our Customers Say"
- Auto-scrolling horizontal carousel — infinite loop, no pause buttons shown
- Speed: 35px per animation cycle
- Max width: 900px, centered
- 17 customer screenshots mixed in
- Image heights: 250px
- Aspect ratios vary (0.46 to 2.56) — authentic feel, not uniform
- Edge fade: linear-gradient mask (transparent → black → black → transparent)
- Hover pauses scroll

---

## 6. FAQ

- Headline: "Frequently Asked Questions"
- Accordion style: click to expand, one open at a time
- First item open by default
- Toggle icon: chevron (rotates 180deg when open)
- Border: 1px #333333, glows accent green when open
- Font: Satoshi weight 700 for question

**Questions:**
1. "Is this legit?" — mentions $500k+ earnings, real screenshots as proof
2. "How long does supplier take to ship?" — 2-7 days typical
3. "What if I can't find my order?" — instant email delivery, Discord support for issues

**Spacing:** 16px between items

---

## 7. Reviews

- Headline: "Customer Reviews"
- Subtitle: "See what our customers are saying"
- Layout: card grid (default 3 columns)
- Shows: 10 reviews per page, sorted newest
- Cards have: avatar (initials), name, date, star rating, review text, optional photo
- "Write a Review" button: green pill button, opens modal

**Modal:**
- Star selector (click to rate)
- Name input
- Review textarea
- Submit button (green)
- Photo upload allowed

---

## 8. Purchase Toast Notifications

- Type: floating toast, bottom-left or bottom-right
- Shows: "{Name} purchased {Product}"
- Duration: 7 seconds visible
- Delay between: 8–20 seconds random
- First appears: 5 seconds after page load
- Products rotated: all 11 bundles

---

## 9. AI Chatbot

- Name: "Lucas' Assistant"
- Position: bottom-right corner
- Greeting: "Hey! Got questions? I'm here to help you decide."
- Pulse animation on avatar
- Conversational support widget

---

## 10. Trust Badges Bar

- Horizontal scrolling strip (auto-animate, 30px speed)
- Height: 44px
- Background: transparent
- Separator between badges: enabled
- 4 badges (loop repeats):
  1. "5,000+ Happy Customers" — users icon
  2. "Verified Seller" — shield icon
  3. "24/7 Support" — headset icon
  4. "Instant Access" — bolt icon
- Icon color: accent green (#19d400)

---

## 11. Footer

- Background: dark (#000 or near-black)
- Brand name: "Lukes Vendors" (text, no logo)
- Policy links: Refund · Shipping · Privacy · Terms
- Copyright: © 2026
- Social links: Instagram, YouTube (TikTok/Discord/Twitter empty)
  - Instagram: instagram.com/lucasresellzz
  - YouTube: youtube.com/@lucasresellz
- Accent color: #19d400
- Text: muted #9ca3af, links white on hover
- CSS: `kenso-shell--footer`
- Min height: 120px

---

## Global Design System

### Colors
| Token | Value |
|-------|-------|
| Background | #000000 |
| Card BG | #111111 |
| Elevated BG | color-mix(#000 90%, #fff) |
| Accent | #19d400 |
| Text | #ffffff |
| Text Muted | #9ca3af |
| Border | #333333 |
| Success | #22c55e |
| Error | #ef4444 |

### Typography
| Role | Font | Weights |
|------|------|---------|
| Heading | Clash Grotesk | 400–700 |
| Title | Satoshi | 400–900 |
| Body | Satoshi | 400–700 |

### Spacing
| Name | Value |
|------|-------|
| XS | 4px |
| SM | 8px |
| MD | 16px |
| LG | 24px |
| XL | 32px |
| 2XL | 48px |
| 3XL | 64px |
| 4XL | 96px |

### Border Radius
| Name | Value |
|------|-------|
| SM | 8px |
| MD | 12px |
| LG | 16px |
| Full | 9999px |

### Shadows / Glow
- SM: `0 1px 2px rgba(0,0,0,0.5)`
- MD: `0 4px 12px rgba(0,0,0,0.5)`
- LG: `0 8px 24px rgba(0,0,0,0.5)`
- Glow: `0 0 20px color-mix(#19d400 30%, transparent)`

### Animations
- Spin: kenso-spin keyframe 0→360deg
- Shimmer: background-position shift
- Transitions: 0.2s–0.5s ease / ease-out

### Page Loader
- Full-screen overlay shown during hydration
- Hidden after max 5 seconds
- Body class: `is-loading` while loading

---

## Key Differences vs Vexel v2

| Feature | lukesvendors | Vexel v2 |
|---------|-------------|-------------|
| Accent color | #19d400 | #19d400 ✅ |
| Heading font | Clash Grotesk | Clash Grotesk ✅ |
| Body font | Satoshi | Satoshi ✅ |
| Buttons | Flat green, outline border | Flat green, outline border, glow ✅ |
| Hero image | Yes (product shot) | Image picker added, off by default |
| Trust badges bar | Separate scrolling section | Separate scrolling section ✅ |
| Trust row | Text above, avatars below | Text above, avatars below ✅ |
| Footer | Brand, links, socials, copyright | Brand, links, socials, copyright ✅ |
| Purchase toasts | Yes | Already in `live-sales-notification` snippet ✅ |
| AI chatbot | Yes | `chat-widget` snippet exists |
| Stats bar | No | No (hidden by default) ✅ |
