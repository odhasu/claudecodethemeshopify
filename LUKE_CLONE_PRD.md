# Luke's Vendors — Clone PRD

Reference: https://lukesvendors.com  
Goal: recreate the same store structure, content, and section layout using the Vexel theme.

---

## Section Order (Homepage)

```
1. Urgency Bar
2. Header
3. Hero
4. Product Grid
5. Testimonials
6. Results Carousel
7. FAQ
8. Reviews
9. Trust Badges
10. Footer
```

---

## Section Content

### Urgency Bar
Scrolling marquee with 2–3 rotating messages:
- `⚡ INSTANT DELIVERY — Links sent to your email immediately after purchase`
- `🔥 [X] people checking out right now`
- `✅ 5,000+ Happy Customers — Rated 4.96/5`

### Header
- Logo only, no nav links (Luke removed his nav)
- Cart icon

### Hero
- **Line 1 (heading):** `THE BEST VENDOR`
- **Line 2 (green highlight):** `SUPPLIER LIST`
- **Line 3:** `ON THE MARKET`
- **Body:** `Get instant access to 15+ passing suppliers and 50+ basic suppliers to maximize your reselling profits.`
- **CTA 1:** `GET ACCESS NOW` → `/collections/all`
- **CTA 2:** `SEE ALL BUNDLES` → `/collections/all`
- **Trust badges below CTAs:**
  - `⚡ Instant Delivery`
  - `✅ 5,000+ Happy Customers`
  - `🔒 All Sales Final`
- **Background:** Dark/black image or solid black with green glow

### Product Grid
- 4 columns desktop, 2 mobile
- Shows all products (8–12)
- Each card: image + category overlay (top-left) + title + price + BUY NOW button
- Sale badge on every card showing % discount

### Testimonials
- Horizontal auto-scrolling image carousel
- 10–20 customer screenshot images (DMs, order confirmations, positive reactions)

### Results Carousel
- Same format as testimonials
- 10–20 profit screenshots (eBay sales, PayPal balance, Depop earnings)

### FAQ
| Question | Answer |
|---|---|
| Is this legitimate? | Yes, every supplier is personally verified. 5,000+ satisfied customers since [year]. |
| When will I receive my order? | Instantly. Links are sent to your email as soon as payment confirms. |
| How do I access my order? | Check the email you used at checkout. Links arrive within minutes. Check spam if needed. |
| Do you offer refunds? | All sales are final. Digital product — no refunds. Enter a valid email at checkout. |
| What is a vendor/supplier list? | A curated list of verified wholesale suppliers with prices low enough to flip for profit on eBay, Depop, Facebook Marketplace, etc. |
| How much can I make? | Depends on your effort. Most customers report 2–5x margins on their first flips. |

### Reviews
- Show average rating: **4.96 / 5**
- Show total count: **2,400+ reviews**
- Add 8–12 written reviews — short, casual, enthusiastic tone
- Example: *"bro this actually works, made $200 my first week"* — Jake M.

### Trust Badges
4 badges in a scrolling row:
- `⚡ Instant Delivery`
- `🔒 Secure Checkout`
- `✅ 5,000+ Customers`
- `💯 Verified Suppliers`

### Footer
- Brand name + tagline: `The #1 supplier list for resellers.`
- Social icons: Instagram, YouTube, TikTok
- Links: Refund Policy · Shipping Policy · Privacy Policy · Terms of Service
- Copyright line

---

## Products

| Product | Price | Compare At | Notes |
|---|---|---|---|
| Elite Vendor Bundle | $39.99 | $99.99 | Hero product — 15+ passing + 50+ basic suppliers |
| All Vendor Bundle | $29.99 | $69.99 | Full catalog, lower price |
| Clothing Bundle | $9.99 | $17.99 | Clothing-only |
| Cologne Bundle | $9.99 | $17.99 | Fragrance suppliers |
| Electronics Bundle | $9.99 | $17.99 | Electronics |
| Gold Bundle | $9.99 | $17.99 | Gold/jewelry |
| Moissanite Bundle | $9.99 | $17.99 | Moissanite jewelry |
| Watches Bundle | $9.99 | $17.99 | Watches |
| Shoes Bundle | $9.99 | $17.99 | Footwear |
| Sunglasses Bundle | $9.99 | $17.99 | Eyewear |
| Pearls Bundle | $9.99 | $17.99 | Pearl jewelry |

### Per-product checklist
- [ ] Set compare-at price (triggers discount badge automatically)
- [ ] Upload product image
- [ ] Write description (template below)
- [ ] Mark as digital — no shipping
- [ ] Set `custom.overlay_green` metafield = short category label (e.g. `ELITE`)
- [ ] Set `custom.overlay_white` metafield = subtitle (e.g. `VENDOR BUNDLE`)

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

---

## Photos to Prepare

| Asset | Quantity | Notes |
|---|---|---|
| Logo | 1 | Wide horizontal wordmark, white, PNG transparent |
| Favicon | 1 | 32×32px |
| Hero background | 1 | Dark image or gradient — can be solid black |
| Product images | 1 per product | Dark background, clean |
| Testimonial screenshots | 10–20 | DM screenshots, order confirmations, customer reactions |
| Results screenshots | 10–20 | Profit screenshots, earnings, sales dashboards |

---

## Pages to Create

Go to Shopify Admin → Settings → Policies → Generate from template, then save each as a page:
- Refund Policy — state all sales final, no refunds on digital products
- Shipping Policy — instant digital delivery, no physical shipping
- Privacy Policy
- Terms of Service

---

## Live Sales Notification — Product Names
Update the product names list in Theme Settings → Live Sales Notification to match your actual product names exactly (so the popup shows real names).

---

## Launch Checklist

- [ ] All 11 products created with compare-at prices
- [ ] Product images uploaded
- [ ] Overlay metafields set per product
- [ ] Hero background image uploaded
- [ ] 10+ testimonial screenshots uploaded
- [ ] 10+ results screenshots uploaded
- [ ] FAQ questions written
- [ ] 8+ reviews added
- [ ] Policy pages created
- [ ] Social links filled in
- [ ] Live sales product names updated
- [ ] License key entered in Theme Settings
