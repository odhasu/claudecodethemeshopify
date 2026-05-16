# Luke's Vendors — Clone PRD

Step-by-step setup guide to replicate lukesvendors.com using the Vexel theme.
You handle: photos, colors, your brand name, real social links.
This file covers: every section setting, every field value, exact section order.

---

## Theme Settings (Shopify Customize → Theme Settings)

### Colors
| Setting | Value |
|---|---|
| Accent color | `#19d400` |
| Accent hover | `#16bb00` |
| Page background | `#000000` |
| Card background | `#111111` |
| Card elevated | `#1a1a1a` |
| Borders | `#333333` |
| Primary text | `#ffffff` |
| Muted text | `#9ca3af` |
| Subtle text | `#6b7280` |
| Star rating color | `#fbbf24` |
| Success color | `#22c55e` |
| Error color | `#ef4444` |

### Typography
| Setting | Value |
|---|---|
| Heading font | `Satoshi` (closest available to Clash Grotesk) |
| Body font | `Inter` |

> Luke uses Clash Grotesk (headings) + Satoshi (body) from Fontshare. If you add custom CSS, you can load them via Fontshare: `api.fontshare.com`

### Layout
| Setting | Value |
|---|---|
| Max page width | `1200px` |
| Section spacing | `60px` |
| Grid gap | `16px` |
| Card border radius | `12px` |
| Button border radius | `999px` ← pill shape, important |

### Branding
| Setting | Value |
|---|---|
| Favicon | Upload your favicon |
| Logo | Upload your logo (Luke uses a wide horizontal wordmark, ~400px wide, white) |
| Brand name | Your brand name |

### Social Links
| Setting | Value |
|---|---|
| Instagram | Your Instagram URL |
| TikTok | Your TikTok URL |
| YouTube | Your YouTube URL |
| Twitter/X | Your Twitter URL |

### Live Sales Notification
| Setting | Value |
|---|---|
| Enable live sales popup | ✅ On |
| Notification background | `rgba(20,20,20,0.85)` |
| Text color | `#ffffff` |
| Buyer name color | `#19d400` |
| Buyer names | `Alex,Jordan,Sarah,Mike,Emily,Chris,Taylor,Sam,Morgan,Casey,Jake,Aiden` |
| Product names | Match your actual product names (e.g. `Elite Vendor Bundle,All Vendor Bundle,Clothing Bundle`) |
| Initial delay | `5` seconds |
| Show duration | `6` seconds |
| Min interval | `10` seconds |
| Max interval | `25` seconds |

### AI Chatbot
| Setting | Value |
|---|---|
| Enable Chatbot | ✅ On |
| Chat Mode | `Built-in (keyword matching)` |
| Chatbot Name | `[Your Brand] Assistant` |
| Greeting message | `yooo whats good! u looking to start reselling? lmk if u need help picking the right suppliers 🔥` |
| Input placeholder | `Ask me anything...` |
| Button color | `#19d400` |
| Button size | `60px` |
| Chat window width | `380px` |
| Window background | `#111111` |
| Bottom offset | `24px` |
| Right offset | `24px` |

---

## Section Order (Homepage)

Add these sections in this exact order in Shopify Customize:

```
1. Header Group
   └── Urgency Bar
   └── Header

2. (main content)
   └── Hero
   └── Product Grid
   └── Testimonials
   └── Results Carousel
   └── FAQ
   └── Reviews

3. Footer Group
   └── Trust Badges
   └── Footer
```

---

## Section Settings

---

### 1. Urgency Bar

| Setting | Value |
|---|---|
| Enable | ✅ On |
| Messages | `⚡ INSTANT DELIVERY — Links sent to your email immediately after purchase` / `🔥 [X] people checking out right now` / `✅ 5,000+ Happy Customers — Rated 4.96/5` |
| Background color | `#19d400` |
| Text color | `#000000` |
| Scroll speed | `30` |
| Show countdown timer | ✅ On (optional — Luke uses urgency timer) |
| Show live viewer count | ✅ On |

---

### 2. Header

| Setting | Value |
|---|---|
| Logo | Upload your logo |
| Logo width desktop | `200px` (adjust to your logo) |
| Logo width mobile | `120px` |
| Background | `#000000` |
| Show cart icon | ✅ On |
| Sticky header | ✅ On |
| Nav links | None (Luke removed his nav bar) |

---

### 3. Hero

| Setting | Value |
|---|---|
| Headline | `THE BEST VENDOR` (line 1) |
| Headline highlight word | `VENDOR` (renders in green) |
| Subheadline | `SUPPLIER LIST ON THE MARKET` |
| Body text | `Get instant access to 15+ passing suppliers and 50+ basic suppliers to maximize your reselling profits.` |
| Primary CTA text | `GET ACCESS NOW` |
| Primary CTA link | `/collections/all` |
| Primary CTA color | `#19d400` |
| Secondary CTA text | `SEE ALL BUNDLES` |
| Secondary CTA link | `/collections/all` |
| Secondary CTA style | Outline / ghost |
| Background image | Upload a dark background image (subtle texture or gradient — Luke uses dark black) |
| Background overlay | Dark gradient, ~70% opacity |
| Show green glow | ✅ On |
| Content alignment | Center |

**Badges to show below headline (trust indicators):**
- `⚡ Instant Delivery`
- `✅ 5,000+ Happy Customers`
- `🔒 Non-Refundable — Links sent to email`

---

### 4. Product Grid

| Setting | Value |
|---|---|
| Collection | Select your main collection |
| Section title | Leave blank (Luke doesn't use a title above his grid) |
| Max products | `8` to `12` |
| Columns desktop | `4` |
| Columns mobile | `2` |
| Glassmorphic cards | ✅ On |
| Card background | `#111111` |
| Card border | `#333333` |
| Card hover border | `#19d400` |
| Image background | `#0a0a0a` |
| Show overlay title on image | ✅ On (shows category in top-left corner of card image) |
| Overlay green color | `#19d400` |
| Overlay white color | `#ffffff` |
| Show sale badge | ✅ On |
| Always show badge | ✅ On (Luke shows badges on all products) |
| Badge text | `SALE` |
| Sale price color | `#19d400` |
| Buy button label | `BUY NOW` |
| Buy button action | `Direct checkout` (sends straight to checkout) |
| Buy button color | `#19d400` |
| Buy button text color | `#000000` |
| Show details button | ✅ On (shows the info modal on click) |
| Show radial glow | ✅ On |
| Glow color | `#19d400` |
| Glow intensity | `30%` |
| Show top fade gradient | ✅ On |

**Product card image setup:**
- Upload a clean product image per product (Luke uses dark cards with minimal product imagery)
- Set `overlay_green` metafield to the category name (e.g. `ELITE`) — shown top-left of card image
- Set `overlay_white` metafield to the subtitle (e.g. `VENDOR BUNDLE`) — shown below in white

---

### 5. Testimonials

| Setting | Value |
|---|---|
| Section title | `WHAT THEY'RE SAYING` |
| Subtitle | `Real results from real resellers` |
| Scroll speed | `25` |
| Card radius | `16px` |
| Image height | `380px` |
| Auto-scroll | ✅ On |

**Images to upload:**
- Upload 10–20 customer DM screenshots, order confirmation screenshots, or testimonial screenshots
- Luke shows 10–15 images in his carousel
- Format: phone screenshot style, portrait orientation works best

---

### 6. Results Carousel

| Setting | Value |
|---|---|
| Section title | `REAL RESULTS` |
| Subtitle | `From resellers using our bundles` |
| Auto-scroll | ✅ On |
| Scroll speed | `30` |
| Image height | `400px` |

**Images to upload:**
- Screenshots of profit screenshots (e.g., eBay/Depop sales, PayPal balance screenshots)
- Before/after reselling results
- Luke uses ~10 images

---

### 7. FAQ

| Setting | Value |
|---|---|
| Section title | `FREQUENTLY ASKED QUESTIONS` |
| Open first item by default | ✅ On |

**Questions to add (Luke's exact FAQs):**

| Question | Answer |
|---|---|
| Is this legitimate? | Yes, every supplier on our list has been personally verified. We've been operating since [year] with 5,000+ satisfied customers. |
| When will I receive my order? | Instantly. As soon as your payment is confirmed, your supplier links are sent directly to the email you used at checkout. |
| How do I access my order? | Check the email you used at checkout — your links arrive within minutes of purchase. Check your spam folder if you don't see it. |
| Do you offer refunds? | All sales are final and non-refundable. Since this is a digital product, we cannot accept returns. Make sure you enter a valid email at checkout. |
| What is a vendor/supplier list? | A curated list of verified wholesale suppliers that offer products at prices low enough to resell for profit on platforms like eBay, Depop, Facebook Marketplace, and more. |
| How much can I make? | It depends on your effort and the products you choose. Many of our customers report 2–5x margins on their first flips. |

---

### 8. Reviews

| Setting | Value |
|---|---|
| Section title | `CUSTOMER REVIEWS` |
| Average rating | `4.96` |
| Total review count | `2,400+` (or your real count) |
| Show write-a-review button | ✅ On |
| Star color | `#fbbf24` |

**Reviews to add:**
- Add 8–12 written reviews with 5-star ratings
- Luke's style: short, casual, enthusiastic (matches the reseller audience)
- Example: *"bro this actually works, made $200 my first week"* — Jake M., ⭐⭐⭐⭐⭐

---

### 9. Trust Badges (Footer Group)

| Setting | Value |
|---|---|
| Badge 1 | `⚡ Instant Delivery` |
| Badge 2 | `🔒 Secure Checkout` |
| Badge 3 | `✅ 5,000+ Customers` |
| Badge 4 | `💯 Verified Suppliers` |
| Icon color | `#19d400` |
| Scroll speed | `20` |

---

### 10. Footer

| Setting | Value |
|---|---|
| Brand name | Your brand name |
| Tagline | `The #1 supplier list for resellers.` |
| Show social icons | ✅ On |
| Instagram URL | Your Instagram |
| YouTube URL | Your YouTube |
| TikTok URL | Your TikTok |
| Policy links | Refund Policy, Shipping Policy, Privacy Policy, Terms of Service |
| Copyright text | `© 2026 [Your Brand]. All rights reserved.` |

---

## Products Setup (Shopify Admin → Products)

### Luke's Product Structure

He runs **1 hero bundle + 9–10 category bundles**:

| Product | Price | Compare At | What it is |
|---|---|---|---|
| Elite Vendor Bundle | $39.99 | $99.99 | Everything — 15+ passing + 50+ basic suppliers |
| All Vendor Bundle | $29.99 | $69.99 | Full catalog, lower price |
| Clothing Bundle | $9.99 | $17.99 | Clothing-only suppliers |
| Cologne Bundle | $9.99 | $17.99 | Cologne/fragrance suppliers |
| Electronics Bundle | $9.99 | $17.99 | Electronics suppliers |
| Gold Bundle | $9.99 | $17.99 | Gold/jewelry suppliers |
| Moissanite Bundle | $9.99 | $17.99 | Moissanite jewelry suppliers |
| Watches Bundle | $9.99 | $17.99 | Watch suppliers |
| Shoes Bundle | $9.99 | $17.99 | Footwear suppliers |
| Sunglasses Bundle | $9.99 | $17.99 | Eyewear suppliers |
| Pearls Bundle | $9.99 | $17.99 | Pearl jewelry suppliers |

### Per-product setup checklist
- [ ] Set compare-at price (higher number = shows the % discount badge automatically)
- [ ] Upload product image (dark background works best)
- [ ] Write product description (short, punchy, bullet points)
- [ ] Set `custom.overlay_green` metafield = category name (e.g. `ELITE`)
- [ ] Set `custom.overlay_white` metafield = subtitle (e.g. `VENDOR BUNDLE`)
- [ ] Set product type = `Digital`
- [ ] Mark as digital delivery (no shipping required)

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

## Collections Setup

| Collection | Handle | Products |
|---|---|---|
| All Products | `all` | All bundles (auto) |
| Featured | `featured` | Elite + All Vendor Bundle |
| Category Bundles | `category-bundles` | All 9 category bundles |

---

## Pages Setup (Shopify Admin → Pages)

Create these policy pages (required for footer links):
- **Refund Policy** — state all sales final, digital product, no refunds
- **Shipping Policy** — instant digital delivery, no physical shipping
- **Privacy Policy** — standard Shopify generated policy works
- **Terms of Service** — standard Shopify generated policy works

Shopify can auto-generate these: Admin → Settings → Policies → Generate from template.

---

## Navigation (Shopify Admin → Navigation)

Luke removed his main nav. Keep it minimal:

**Header navigation:** None (no links in header nav)

**Footer navigation:**
- Refund Policy
- Shipping Policy  
- Privacy Policy
- Terms of Service

---

## Custom CSS (Theme Settings → Custom Code → Custom CSS)

Add this to load Clash Grotesk + Satoshi from Fontshare and set headings:

```css
@import url('https://api.fontshare.com/v2/css?f[]=clash-grotesk@400,500,600,700&f[]=satoshi@400,500,700&display=swap');

:root {
  --font-heading: 'Clash Grotesk', 'Satoshi', sans-serif;
  --font-body: 'Satoshi', 'Inter', sans-serif;
}
```

---

## Checklist — Launch Ready

### Settings
- [ ] Colors set (all accent colors = `#19d400`)
- [ ] Fonts set (Satoshi heading + Inter body, or custom CSS for Clash Grotesk)
- [ ] Logo uploaded
- [ ] Favicon uploaded
- [ ] Brand name set
- [ ] Social links filled in

### Sections
- [ ] Urgency bar — messages set, timer on
- [ ] Header — logo size set, sticky on
- [ ] Hero — headline, subheadline, CTAs, background image
- [ ] Product grid — collection selected, columns 4, glow on, details button on
- [ ] Testimonials — 10+ screenshots uploaded
- [ ] Results carousel — 10+ result screenshots uploaded
- [ ] FAQ — 6 questions added
- [ ] Reviews — 8+ reviews added, 4.96 rating shown
- [ ] Trust badges — 4 badges set
- [ ] Footer — brand, social links, copyright

### Products
- [ ] All 10–11 products created
- [ ] Compare-at prices set (for discount badges)
- [ ] Product images uploaded
- [ ] Descriptions written
- [ ] Overlay metafields set (overlay_green + overlay_white per product)
- [ ] Digital delivery configured (no shipping)

### Pages
- [ ] Refund Policy page created
- [ ] Shipping Policy page created
- [ ] Privacy Policy page created
- [ ] Terms of Service page created

### Other
- [ ] Live sales notification products list updated to match your real product names
- [ ] Chatbot greeting updated to match your brand voice
- [ ] License key entered in Theme Settings
- [ ] Domain connected
