# Clone PRD — Luke's Vendors

Reference: https://lukesvendors.com (Kenso V3 theme)
Rebuild target: Vexel theme with your own colors/fonts.

---

## Section Order (Homepage)

```
1.  Urgency Bar
2.  Header
3.  Product Grid         ← hero headline lives inside this section
4.  Divider
5.  Secondary Product Grid
6.  Bundle Builder
7.  Testimonials
8.  Trust Bar
9.  Reviews
10. FAQ
11. Footer
```

Live Sales Notification and AI Chat are floating widgets — always on, no position in the section order.

---

## Each Section — What It Contains

---

### 1. Urgency Bar

Scrolling marquee with 3 rotating messages and icons.

| # | Icon | Message | Highlight word |
|---|---|---|---|
| 1 | Shield | `Private suppliers not found anywhere else` | — |
| 2 | Checkmark | `All suppliers personally verified` | `verified` |
| 3 | Star | `Rated 4.96/5 by 2,400+ resellers` | `4.96/5` |

Also shows:
- **Countdown timer** — mode: "midnight tonight" — label: `Price goes up in`
- **Live viewer count** — base: ~40 people — label: `people viewing right now`

---

### 2. Header

- Logo only (no nav links — Luke removed them)
- Cart icon
- Style: Full-width sticky bar

---

### 3. Product Grid

This section has two parts: a **hero headline** at the top, then the **product cards** below.

**Hero headline (top of section):**
- Line 1: `START YOUR`
- Line 2 (accent color): `RESELLING JOURNEY`
- Line 3: `TODAY`
- Optional background image behind the hero text

**Product cards:**
- Card style: 3D Glass (glassmorphic inset glow)
- Button layout: Two buttons side-by-side
  - Button 1 (primary, accent color): `VIEW PRODUCT` → goes to product page
  - Button 2 (secondary, dark): `ADD TO CART` → adds to cart
- Sale badge: `SALE` — top-right corner
- Shows: title, price, compare-at (strikethrough), image

---

### 4. Divider

A visual separator between the two product grids.
- Style: Gradient glow (fades out to both sides, accent color glow)
- Full width

---

### 5. Secondary Product Grid

Same card layout as the primary grid.

**Headline:**
- `More Products You'll Love`

Same button layout, same card style, same badge.

---

### 6. Bundle Builder

Interactive section where customers pick 2+ products and get a discount.

| Setting | Value |
|---|---|
| Title | `Build Your Bundle` |
| Subtitle | `Select 2 or more products to unlock bundle discounts` |
| Minimum products | 2 |
| 2-product discount | 10% off |
| 3+ product discount | 15% off |
| Discount code (2 products) | `BUNDLE10` |
| Discount code (3+ products) | `BUNDLE15` |
| CTA button text | `Checkout Bundle` |

Products listed: all bundles added individually as blocks.

---

### 7. Testimonials

Auto-scrolling horizontal image carousel.

| Setting | Value |
|---|---|
| Headline | `What Our Customers Say` |
| Image height | `250px` |
| Scroll speed | `20s` |
| Images | 10–20 customer screenshots |

Images to prepare: DM screenshots, order confirmation screenshots, reaction screenshots from happy customers.

---

### 8. Trust Bar

Auto-scrolling row of 4 badges.

| Badge | Icon |
|---|---|
| `5,000+ Happy Customers` | Users icon |
| `Verified Seller` | Shield icon |
| `24/7 Support` | Headset icon |
| `Instant Access` | Bolt icon |

---

### 9. Reviews

| Setting | Value |
|---|---|
| Title | `Customer Reviews` |
| Subtitle | `See what our customers are saying` |
| Layout | Cards |
| Average rating | `4.96 / 5` |
| Show "Write a Review" button | On |
| Show rating distribution | On |
| Reviews per page | `10` |

Add 10–15 written reviews, short and casual. Example:
> *"bro this actually works, made $200 my first week flipping on Depop"* — Jake M. ⭐⭐⭐⭐⭐

---

### 10. FAQ

| Setting | Value |
|---|---|
| Title | `Frequently Asked Questions` |
| Layout | Minimal |
| Open first by default | On |

Questions:

| Question | Answer |
|---|---|
| Is this legit? | Yes. I personally use these suppliers and have made over $50,000 with them. You'll see real screenshots and testimonials from other customers. |
| When do I receive my order? | Instantly — links are sent to your email as soon as your payment confirms. Check spam if you don't see it. |
| How do I access my suppliers? | After purchase, open the email you used at checkout. Your supplier links are there. |
| Do you offer refunds? | All sales are final. Since this is a digital product we can't accept returns. Make sure you enter a valid email at checkout. |
| What is a supplier list? | A curated list of verified wholesale suppliers priced low enough to flip for profit on eBay, Depop, Facebook Marketplace, and more. |
| How much can I make? | Depends on your effort. Most customers report 2–5x margins on their first flips. |

---

### 11. Footer

- Logo (150px wide)
- Tagline below logo (optional): `The #1 supplier list for resellers.`
- Social icons: Instagram, TikTok, YouTube
- Policy links: Refund Policy · Shipping Policy · Privacy Policy · Terms of Service
- Copyright: `© [year] [Your Brand]. All rights reserved.`

---

### Floating: Live Sales Notification

Shows "*[Name]* just bought *[Product]*" toast bottom-left.

| Setting | Value |
|---|---|
| Names | `Alex, Jordan, Sarah, Mike, Emily, Chris, Taylor, Sam, Morgan, Casey` |
| Products | Match your actual product names |
| First notification after | `5s` |
| Each notification shows for | `6s` |
| Gap between notifications | `10–25s` |

---

### Floating: AI Chatbot

| Setting | Value |
|---|---|
| Name | `[Your Brand] Assistant` |
| Greeting | `yooo whats good! u looking to start reselling? lmk if u need help picking the right suppliers 🔥` |
| Position | Bottom-right |
| Show online pulse | On |

The chatbot automatically knows your products and policies — no manual setup needed beyond the greeting.

---

## Product Page

Luke's product page blocks, in order:

1. Product title
2. Price (with compare-at strikethrough)
3. Buy buttons: `ADD TO CART` + dynamic checkout (Apple Pay, Shop Pay, PayPal)
4. Description accordion — heading: `What's Included`
5. Collapsible tab — `Instant Delivery` — text: `You'll receive access immediately after purchase.`
6. Live counter: `X people checking out now` (cycles 5–15, updates every 5–10s)
7. Social proof badge: `500+ happy resellers`

---

## Products

| Product | Price | Compare At | Notes |
|---|---|---|---|
| Elite Vendor Bundle | $39.99 | $99.99 | Hero — 15+ passing + 50+ basic suppliers |
| All Vendor Bundle | $29.99 | $69.99 | Full catalog |
| Clothing Bundle | $9.99 | $17.99 | — |
| Cologne Bundle | $9.99 | $17.99 | — |
| Electronics Bundle | $9.99 | $17.99 | — |
| Gold Bundle | $9.99 | $17.99 | — |
| Moissanite Bundle | $9.99 | $17.99 | — |
| Watches Bundle | $9.99 | $17.99 | — |
| Shoes Bundle | $9.99 | $17.99 | — |
| Sunglasses Bundle | $9.99 | $17.99 | — |
| Pearls Bundle | $9.99 | $17.99 | — |

### Product description template

```
This bundle includes [X]+ verified suppliers in the [CATEGORY] niche.

What you get:
• [X]+ passing suppliers (high-margin, proven products)
• Step-by-step guide on where to sell
• Multiple reselling methods covered
• Tips to maximize profits

Links are sent instantly to your email after purchase.
All sales are final — no refunds on digital products.
```

### Per-product checklist
- [ ] Set compare-at price (triggers sale badge automatically)
- [ ] Upload product image (dark background)
- [ ] Write description
- [ ] Mark as digital — no shipping required

---

## Photos to Prepare

| Asset | Quantity | Notes |
|---|---|---|
| Logo | 1 | Wide horizontal wordmark, white, transparent PNG |
| Favicon | 1 | 32×32 |
| Hero background | 1 | Dark image or solid black — goes behind the headline text |
| Product images | 1 per product | Clean, dark background |
| Testimonial screenshots | 10–20 | Customer DMs, order confirmations, reactions |
| Results screenshots | 10–20 | Profit screenshots, sales dashboards, earnings |

---

## Pages to Create

Shopify Admin → Settings → Policies → Generate from template, then publish each:
- **Refund Policy** — state all sales final, no refunds on digital products
- **Shipping Policy** — instant digital delivery, no physical shipping
- **Privacy Policy**
- **Terms of Service**

---

## Launch Checklist

**Content**
- [ ] All 11 products created with compare-at prices set
- [ ] Product images uploaded
- [ ] Product descriptions written
- [ ] Hero background image uploaded
- [ ] 10+ testimonial screenshots uploaded
- [ ] 10+ results screenshots uploaded
- [ ] 8–12 reviews written and added
- [ ] All 6 FAQ questions added

**Sections**
- [ ] Urgency bar — 3 messages set, countdown on, viewer count on
- [ ] Header — logo uploaded, no nav
- [ ] Product grid — hero headline set, collection selected
- [ ] Bundle builder — discount codes set, products added
- [ ] Testimonials — images uploaded
- [ ] Trust bar — 4 badges confirmed
- [ ] Reviews — rating set to 4.96
- [ ] FAQ — questions added, first item open

**Store**
- [ ] Policy pages created and published
- [ ] Footer social links filled in
- [ ] Live sales product names match your real product names
- [ ] License key entered in Theme Settings
- [ ] Domain connected
