# Vexel theme instructions

This is the Shopify storefront repository, not the Next.js site in `../kenso`. The active user-authorized reconstruction branch is `linresell-replica`; `v2` and tag `checkpoint/ogresell-before-linresell-2026-10-01` preserve the previous storefront. Preserve existing edits. Do not push or change the connected live theme unless the active user request authorizes it.

Read `AGENT.md`, `CONTEXT.md`, `RULES.md`, `GOALS.md`, `BUILD.md`, and the active items in `BUGS.md` before implementation. Local instructions and the active user request take precedence over historical guidance in `~/Desktop/ogresell/CLAUDE.md`; that external file is optional business context, not current license or deployment policy.

For visual work, read `DESIGN.md` and check the active reference https://linresell.com/. `lukesvendors-reference.md` is historical. The current task authorizes reproducing the reference catalog, copy, and imagery; preserve original OGSELL products in the checkpoint; use Shopify settings for merchant-adjustable values.

For renderer work on this branch, edit `runtime/loader.js` and run `npm run build` (uses `scripts/build-loader.cjs`). The former external runtime is preserved in the checkpoint and should not be modified for this branch. The theme uses client-rendered Liquid shells without a license gate. `assets/scaled-loader-current.js` is served; `assets/scaled-loader.js` is its mirror. Do not edit generated bundles manually. Keep runtime source, its dist output, and both shipped assets synchronized when a renderer change is authorized.

Run `bash scripts/check-theme.sh` after changes. Visual/runtime changes also need preview checks at 375px and 1200px or wider, including affected interactions and Shopify editor reloads. Static checks alone do not establish visual correctness.

Update `BUILD.md` and `BUGS.md` with factual local results. State whether a change was previewed or deployed. Keep reports concise; do not mark unverified behavior as fixed.
