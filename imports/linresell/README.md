# Lin Resell reference catalog

The reference catalog contains 11 products. All 11 were imported into
`recuerdos-vividos.myshopify.com` as **DRAFT**, with their titles, descriptions,
prices, comparison prices, digital shipping settings, and images. Each product
has the `linresell-replica` tag. All images finished processing successfully.
The nine existing products remain unchanged; the store now contains 20 products.

- `products.json`: public reference source, including foreign source IDs.
- `products.csv`: prepared draft import; do not import again without checking existing handles.
- `import-result.json`: verified destination records and destination Shopify IDs.
- `preview-products.json`: reference homepage order using destination product and
  variant IDs, destination image URLs, and `available: false`.

Use only destination IDs for storefront actions. Preview records keep purchases
disabled while products are drafts. No product or theme was published.

The copied description promises instant email access. This import does not
contain supplier links/files and does not install a digital delivery app.
Configure the store's own fulfillment content before activating and publishing
these products. Existing live products and fulfillment were preserved.
