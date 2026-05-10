# Theme — Goals

## What we're building
Vexel — a premium Shopify theme product for resellers. Replicates lukesvendors.com design. License-protected using the Kenso shell model (obfuscated loader + server validation).

## Current sprint — License Protection (Kenso Shell Model)
1. Convert all 10 sections to shells (empty div + JSON data)
2. Build obfuscated loader that validates license + renders sections client-side
3. Set up Railway server (POST /api/validate + serve loader JS)
4. Update theme.liquid (VexelConfig, loading states, loader script)
5. Build pipeline (obfuscate loader, package theme ZIP)

## Content tasks (after protection is done)
- Upload hero background image in Shopify admin
- Upload more customer testimonial screenshots
- Add real social links to footer
- Results carousel section on homepage
- Mobile polish pass

## What success looks like
- Page loads fast (< 2s first load, < 500ms cached)
- Without valid license: nothing renders, shows error page
- Footer removal = loading screen forever
- Obfuscated code — resellers can't easily bypass
- Every section configurable through Shopify theme editor
- Mobile looks as good as desktop
- Distributed as ZIP, customers install on their Shopify store
