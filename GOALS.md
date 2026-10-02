# Theme — Goals

## Active user direction

Reconstruct https://linresell.com/ on `linresell`, preserve the prior store checkpoint and original catalog, and import the eleven reference products as drafts. The homepage and merchant controls are implemented and previewed. User-requested GitHub branch delivery is complete. Shopify now reports the GitHub-connected Lin theme `204843778389` as live; the agent did not issue a publication command. Further theme-file pushes or store changes must follow the active user's authorization. Digital delivery setup and actual admin editor verification remain outstanding. See `docs/LIN_REPLICA.md` and `docs/SHOPIFY_CLI.md`. The goals below describe the earlier Vexel storefront.


## What we're building
Vexel — a Shopify theme for resellers that closely matches lukesvendors.com while keeping OGSELL's own products, images, copy, and destinations.

## Current direction
- Keep the client-side shell renderer, but do not require a license key or validation server to display the storefront.
- Maintain the GitHub-connected `v2` theme; leave `main` untouched.
- Continue matching the reference's theme controls and responsive layouts, while keeping content store-owned.
- The 2026-09-24 reference pass covered the homepage, header/cart icon, 404 and empty cart pages, review dialog, and product description dialog. Check the live reference and preview before assuming those details remain current.

## Content tasks
- Upload the store's hero and customer testimonial images.
- Add real social links to the footer.
- Connect a production reviews app if review submissions must persist.
- Add store-owned product descriptions for products whose info controls currently link to their product pages.

## What success looks like
- The storefront renders without a license key or license-server availability.
- The loader reveals all sections quickly and works in the Shopify editor.
- Mobile and desktop layouts are consistent with the reference.
- Every section remains configurable through Shopify theme settings.
