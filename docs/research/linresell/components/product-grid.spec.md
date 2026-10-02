# Lin product grid specification

Target: `runtime/loader.js` renderProductGrid and `sections/product-grid.liquid`.
Reference observed via native Chrome at1440px and670px. Screenshot in conversation shows desktop1440. Existing global settings control page width1200, desktop gap24, mobile gap12.

Structure: integrated centered headline above product flex grid,4 columns desktop,2 mobile, last row centered. Each card has square image, top-right SALE badge, product title, inline price/compare price, info icon plus full remaining-width BUY NOW. Reference settings name button2 ADD TO CART but observed control is info icon opening description. All image/title/info controls open same dialog. Purchase uses destination-store IDs only.

Exact computed desktop values:
- section padding48px 0; hero padding64px 0 32px; hero margin-bottom24px.
- headline52.8px /58.08px, weight900; PERSONAL pink #ff86dd; full ACCESS MY PERSONAL VENDORS 💕.
- container1200px incl16px horizontal padding. Cards274px width, gap24px.
- card background#111; border1px rgba(255,255,255,.12); radius20px.
- shadow rgba(0,0,0,.04) 0 2px 4px, rgba(0,0,0,.06) 0 6px 16px, rgba(0,0,0,.1) 0 20px 60px, rgba(0,0,0,.08) 0 0 80px -20px.
- content padding18px; flex column gap12px. Title16px weight600 line-height22.4px, uppercase. Price18px700, compare14px400.
- Buy background#ff86dd; height48px; font18px900; radius10px; padding0 24px. Shadow0 18px 40px -15px accent85%, inset0 3px 6px white70%, inset0 -3px 6px black20%.
- Info48x48px, #2a2a2a, radius10px; icon20px.
- Image itself includes pink edge shading; use downloaded assets, do not manufacture extra gradients inside images.
- Page gradient broad pink glows behind cards, strength80 reference setting. Merchant settings retained for glow strength/color.

670px computed: headline36.85px /40.535px900, gap16px, content14px gap10px, title16px60022.4. Verify375px before completion.

Keep existing classes/data-vx-desc for safe singleton dialog. Add merchant controls for integrated headline/highlight/size, card style, click action/custom URL, second-button label/action/custom URL/layout. Preserve existing legacy defaults for other theme instances. Extend renderer only when explicit Lin style selected. Draft preview products show images/prices/info with disabled purchase buttons (same BUY NOW label); no fake checkout IDs.

Existing Liquid products can be replaced by isolated reference-preview JSON only if selected replica_preview setting is enabled AND request.design_mode or theme.role != 'main'. Preview JSON uses mapped OGSELL IDs and local asset URLs. Merchant-selectable product blocks may reference drafted products but public lookup can fail: do not depend on those for preview. Regular collection stays runtime source when preview disabled.

All labels/colors/dimensions must be adjustable using existing controls or new section settings. Keep HTML escaping. Do not embed licensed renderer, foreign tokens, or hardcoded foreign variant IDs. Edit only assigned files. Do not run build until main thread integrates.

Final native Chrome checks (2026-10-02): headline letter-spacing -1px; product title .02em. At375px: headline30.8px, first card165.5 x327px, content14px/gap10px, title15px600/21px. At1440px: first card274 x435.3984375px. All33 information triggers passed; max_products2 and stacked layout passed through section reload. Measured positions and screenshots in docs/LIN_REPLICA.md.
