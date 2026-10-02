# Lin Resell Shopify replica

The implementation is in `theme/` on `linresell`. GitHub delivery: [odhasu/claudecodethemeshopify, branch linresell](https://github.com/odhasu/claudecodethemeshopify/tree/linresell). It reconstructs the reference homepage using this repository's own runtime and Shopify Liquid. It does not include the reference's proprietary loader, license configuration, tracking identifiers, or checkout IDs.

## Preview and build

- Local preview: http://127.0.0.1:9292/
- Development theme: `204351471957`. On 2026-10-02 the CLI reported GitHub-connected Lin theme `204843778389` live, with previous `v2` theme `196616782165` unpublished.
- Live editor: https://ogsellsz.myshopify.com/admin/themes/204843778389/editor
- Shopify preview: https://ogsellsz.myshopify.com/?preview_theme_id=204351471957
- Editor: https://ogsellsz.myshopify.com/admin/themes/204351471957/editor
- Run `npm ci`, `npm run build`, `npm test`, and `npm run check` inside `theme/`.
- Verify the target's current role, then start a local preview with `shopify theme dev --store ogsellsz.myshopify.com --theme 204351471957 --path . --port 9292 --nodelete`.
- Commands, remote comparison and delivery workflow: [SHOPIFY_CLI.md](SHOPIFY_CLI.md).

Edit `runtime/loader.js`, then rebuild. The build generates both `assets/scaled-loader-current.js` and `assets/scaled-loader.js`. The latter is a mirror, not another network request. The current bundle is 71,302 bytes, or 19,282 bytes gzip. Fonts are local system fallbacks; no font requests are required with the saved configuration. There is no artificial minimum loading wait.

## Merchant controls

In Shopify Customize, edit the development theme, not the live theme.

- **Product Grid** has 67 controls: Lin/legacy layout, integrated headline/highlight/scale, spacing, collection or ordered product selection, maximum products, desktop/mobile columns, coming-soon catalog and label, card shape/colors/style/hover, image ratio, sale badge, prices, information fallback, purchase and secondary-button actions/destinations, stacked buttons, and section glow color/strength.
- **Header** has 26 controls: uploaded or bundled reference logo, separate desktop/mobile width and height, navigation links/menu, spacing, colors, scroll threshold and blur. An uploaded logo takes precedence over the bundled logo.
- **FAQ** has 35 controls: questions/answers, first-open and multiple-open behavior, desktop/mobile typography, width, heading gap, answer gap, card padding/gap, borders, colors and toggle appearance.
- **Lin supplier access** has 38 controls: copy, destination, desktop/mobile typography, alignment, width, section/card spacing, colors, button size, radius and hover appearance.
- **Footer** has 39 controls: brand or logo, links, social destinations, copyright, colors, spacing and attribution button.
- Global Theme Settings control fonts, palette, page gutters/width, grid gaps, product typography/image zoom, buttons, information dialog, header/footer sizing, loading appearance and optional sales notifications. The merchant's latest editor settings enable the pale-pink global glow alongside the Product Grid glow; these settings were preserved during the catalog fix.

The active homepage uses Product Grid, FAQ and Lin supplier access. Urgency/header and footer remain section groups. Existing Vexel sections and the legacy grid are available for later merchant use.

## Products and delivery

All 11 reference products were imported as **DRAFT**, with images processed successfully. The original nine products remain unchanged; the store contains 20 products. Authoritative destination IDs and source data are in `imports/linresell/`. Do not import the prepared CSV again without checking for duplicates.

The Product Grid's **Show Lin catalog as coming soon** control (setting ID `replica_preview`) supplies the saved ordered eleven-product snapshot on development, editor and published storefronts. Image/title/info controls work; purchases stay disabled and display an editable Coming Soon label. This explicit setting no longer depends on the theme role. Real purchase actions use this store's published variant IDs when the saved catalog is turned off.

Before selling, supply the store's vendor files/links and configure digital delivery. The imported descriptions promise instant email access, but this project has no delivery files or delivery app. After fulfillment is ready, activate the intended products, make them available to the Online Store, select them in Product Grid or a collection, and turn off the saved coming-soon catalog. The theme is already live; product publication and digital delivery remain separate store setup tasks.

Policy links route to this store's Shopify policies. Policy text, payment options, taxes and checkout settings remain the destination store's configuration. Copied vendor fulfillment, foreign checkout and customer/order data are not part of the replica.

## Checkpoint and old theme

- Commit: `cdb48051ac92cb3914336665242ee708acc1bb4e`
- Tag: `checkpoint/ogresell-before-linresell-2026-10-01`
- Backup: `../checkpoints/ogresell-2026-10-01-before-linresell/`
- The backup contains local source, previous external runtime, live theme, the selected removed theme, and all nine original Admin products. All 386 manifest hashes were verified on 2026-10-02.
- Selected old theme `194628288853` was backed up and deleted. Other old themes were preserved.

The earlier reconstruction branch `linresell-replica` is preserved locally. GitHub delivery uses `linresell`; Shopify now reports its connected theme as live. The agent did not issue a publication command. Pushing theme-file changes to this branch can update the live storefront, so authorization must cover that effect.

## Verification

Native Chrome comparisons use the same responsive viewport for reference and preview. Assets comprise one reference logo and eleven product images. Three component specs cover the grid, shared layout and access section. Screenshots and public computed styles are under `docs/design-references/linresell/` and `docs/research/linresell/`.

| Measurement at scroll zero | Reference and replica, 1440px | Reference and replica, 375px |
| --- | --- | --- |
| Headline top | 112px | 112px |
| First card top | 226.0703125px | 235.75px |
| First card width × height | 274 × 435.3984375px | 165.5 × 327px |
| FAQ heading top | 1692.265625px | 2306.75px |
| Access heading top | 2473.015625px | 3218.5px |

All eleven images loaded. No horizontal overflow at 375, 768 or 1440px. All 33 image/title/info triggers opened the correct product dialog. FAQ and mobile menu worked. Changing maximum products to two and enabling stacked controls worked after section unload/load; restoring settings returned eleven cards. Automated source/bundle tests also cover Escape/backdrop closing, focus trapping/return, scroll restoration, safe descriptions, scoped settings and lifecycle cleanup.

`npm run build` and `npm test` passed. Theme Check found zero errors and 10 warnings across six files after the cart/product follow-up. Warnings include existing account routes, preload/remote assets and settings counts. Actual Shopify admin editor verification is still pending: the selected Chrome profile reached the login page. Section events were verified in the actual storefront preview, and lifecycle behavior is covered by DOM tests.

The 2026-10-02 follow-up adds checked Cart API requests, visible error text, retryable controls and checkout redirects only after successful adds. Requests use Shopify's locale root, following the [Cart API guidance](https://shopify.dev/docs/api/ajax/reference/cart). Hero checkout skips drafts; grid draft controls remain disabled. The conventional product page now uses a native Shopify product form with the selected quantity and accelerated payment markup. Its review submission explicitly reports that nothing was sent or saved.

`scripts/test-cart.cjs` covers source/bundle HTTP rejection, invalid JSON, network failures, locale paths, repeated clicks, retries, draft guards, product quantity and review status. Chrome checks at 375px and 1440px verified the existing homepage, grid unload/load, purchase failures, drawer rejection/retry, successful checkout redirects and conventional product controls. Cart requests and checkout destinations were intercepted with browser mocks; the checks did not mutate the real cart, create orders or test digital delivery. Evidence: `product-cart-error-375.png`, `product-cart-error-1440.png`, `cart-drawer-error-375.png` and `cart-drawer-error-1440.png` under `docs/design-references/linresell/`. Shopify changes synced to the existing development theme only; no live publication. GitHub delivery uses `linresell`.

Urgency bar follow-up: “verified” now uses the pink accent (`#ff86dd`), with an editable highlight word. Saved colors and new-section defaults match the observed reference: white icons, plain white reseller total, gray dividers and the green viewer dot. Both marquee copies update their countdown/viewer values together. Chrome checks at 375px and 1440px passed for colors, changed settings, blank highlights, section reloads and timer synchronization. Screenshots: `urgency-colors-375.png` and `urgency-colors-1440.png`. Development preview synced; GitHub delivery uses `linresell`. No live publication.

Published catalog visibility fix: the live homepage supplied `[]` for the product grid while the public Shopify catalog returned zero products. The saved catalog setting was enabled, but the old theme-role condition suppressed it after publication. The setting now displays all eleven cards as Coming Soon on published themes, with disabled purchases in both layouts. Development Chrome checks at 375px and 1440px passed for cards, images, dialogs and label sizing. Live verification follows the GitHub delivery.

The reference's font files failed to load, so the replica matches its visible system fallback. Font rendering can vary by operating system. This is a close responsive reconstruction with measured geometry, not a claim of identical pixels across every environment.
