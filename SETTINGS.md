# Theme customization

Open the unpublished development theme editor:
https://ogsellsz.myshopify.com/admin/themes/204351471957/editor?hr=9292

The local storefront is http://127.0.0.1:9292/ while Shopify theme dev is running.

## Theme settings

- **Product card details:** desktop/mobile title size, price sizes, image fit/zoom, description lines, card borders, and information-button colors/radius.
- **Buttons:** desktop/mobile purchase-button height and label size, shadows, hover lift, hero padding/type, and footer CTA size/padding. Section settings still own button colors, labels, destinations, and purchase behavior.
- **Header appearance:** content width, wordmark/navigation sizes, navigation opacity/position, optional mobile cart, and initial background color/opacity. Header section settings still control logos, menus, dimensions, and scrolled appearance.
- **Dialogs:** product/review widths and blur, shared corner radius, padding, backdrop darkness, title/body sizes, and surface/border colors.
- **Forms:** review dialog input radius, background, and borders.
- **Motion and accessibility:** decorative motion, smooth scrolling, scrollbars, reveal duration/distance, and moving testimonial/trust strips. Reduced-motion system preferences are respected.
- **Background glow:** enable, color, size, total intensity, and individual glow strength.
- **Loading screen:** minimum display, fallback wait, fade, spinner size, and color. Minimum 0ms reveals as soon as rendering completes; fallback is a safety timeout rather than a fixed delay.

## Section controls

Hero, Product Grid, Testimonials, FAQ, Reviews, Results Carousel, and Bundle Builder now include **Extra appearance controls** for background, heading alignment, heading scale, and custom mobile spacing. Footer includes background and mobile spacing. Choose **Custom mobile spacing** to enable the mobile top/bottom values; **Use section spacing** preserves existing behavior. Leave the extra background empty to use existing section/global colors.

Existing controls continue to manage copy, imagery, product collections, grid columns, card styling, FAQ behavior, review content, footer links, header navigation, and cart drawer appearance.

Saving editor settings affects the selected development theme. Publishing remains a separate action. The bundled review form requires a reviews service to store submissions.
