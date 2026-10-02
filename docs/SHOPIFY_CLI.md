# Shopify CLI workflow

Checked on 2026-10-02 with installed Shopify CLI `4.8.3`. Use `shopify <command> --help` to check flags after upgrading. Run commands inside this repository; the parent workspace also contains the independent `kenso/` repository.

## Store, repository and themes

| Item | Current value |
| --- | --- |
| Working directory | `/Users/oscargraafmans/Desktop/ogresell main/theme` |
| Shopify store | `ogsellsz.myshopify.com` |
| GitHub repository | [odhasu/claudecodethemeshopify](https://github.com/odhasu/claudecodethemeshopify) |
| Active Git branch | `linresell` |
| GitHub-connected live theme | `204843778389` — `claudecodethemeshopify/linresell` |
| Development preview | `204351471957` — `Development (1ab02b-mac)` |
| Previous Vexel theme | `196616782165` — `claudecodethemeshopify/v2`, now unpublished |
| Before-Lin checkpoint | tag `checkpoint/ogresell-before-linresell-2026-10-01` |

Theme IDs and roles above were verified with `shopify theme list`, not inferred from the Git branch. Recheck before uploads: roles can change and development themes can expire.

- [Live Linresell editor](https://ogsellsz.myshopify.com/admin/themes/204843778389/editor)
- [Development editor](https://ogsellsz.myshopify.com/admin/themes/204351471957/editor)
- [Development preview](https://ogsellsz.myshopify.com/?preview_theme_id=204351471957)
- Local preview: `http://127.0.0.1:9292/` while `theme dev` runs.

## Inspect before work

```bash
cd "/Users/oscargraafmans/Desktop/ogresell main/theme"
git status --short
git branch --show-current
shopify version
shopify theme list --store ogsellsz.myshopify.com --json
shopify theme info --store ogsellsz.myshopify.com --theme 204351471957 --json
```

Existing local edits and Shopify editor settings can belong to another session. Inspect them before replacing files. Pass `--store` and an explicit theme target rather than relying on remembered CLI defaults.

## Build and check

Run `npm ci` when setting up a checkout or when locked dependencies change. For renderer changes:

```bash
npm run build
npm test
npm run check
```

Edit `runtime/loader.js`. The build writes `assets/scaled-loader-current.js` and its mirror `assets/scaled-loader.js`; never edit those generated files directly. Liquid shells supply the renderer's JSON. Merchant controls belong in section/global settings and must be serialized into that JSON to reach the renderer.

`npm run check` runs JavaScript syntax checks, mirror equality, JSON validation and Shopify Theme Check. Last recorded result: zero errors and 10 warnings. Visual/runtime changes also need checks at 375px and 1200px or wider, affected interactions and section reloads. Record actual admin editor checks separately from simulated section events in a storefront preview.

## Development preview

After confirming the saved development ID still has the development role:

```bash
shopify theme dev --store ogsellsz.myshopify.com --theme 204351471957 --path . --port 9292 --nodelete
```

This command uploads and watches files; it is not a read-only local server. `--nodelete` prevents remote deletions, but local files can still overwrite matching remote files. Stop the watcher with Ctrl+C when finished. If port 9292 is occupied, inspect the existing process before starting another watcher:

```bash
lsof -nP -iTCP:9292 -sTCP:LISTEN
```

For intentional bidirectional editor settings work, `theme dev` supports `--theme-editor-sync --reconciliation-strategy abort`. Inspect settings differences before committing. See the [theme dev reference](https://shopify.dev/docs/api/shopify-cli/theme/theme-dev).

Development themes are hidden from the normal theme library, expire after seven days of inactivity, and are deleted by `shopify auth logout`. Open the direct editor/preview links to find one. An unpublished theme is the persistent alternative. See [development themes](https://shopify.dev/docs/storefronts/themes/tools/cli#development-themes).

## Inspect remote files without overwriting this checkout

Pull into a separate directory, then compare the affected files:

```bash
LIN_RESELL_PULL_DIR=$(mktemp -d /tmp/linresell-theme.XXXXXX)
shopify theme pull --store ogsellsz.myshopify.com --theme 204351471957 --path "$LIN_RESELL_PULL_DIR" --nodelete
```

Pulling into this repository can overwrite local work. `--only` can narrow the download, for example `--only "sections/header-group.json"`. See the [theme pull reference](https://shopify.dev/docs/api/shopify-cli/theme/theme-pull).

## GitHub pushes and Shopify uploads

`git push origin linresell` sends commits to GitHub. Shopify's live `linresell` theme is now connected to that branch, so pushing theme-file changes can also update the live storefront. Confirm user authorization covers that effect; an earlier push request does not authorize later publication. Documentation-only changes do not change storefront theme files.

`shopify theme push` uploads directly to Shopify. Target the verified development ID for preview work. Creating a persistent draft is a separate store write; when requested, use:

```bash
shopify theme push --store ogsellsz.myshopify.com --path . --unpublished --theme "Lin Resell Review" --nodelete --strict --json
```

Record the returned theme ID and role. This creates an unpublished theme; it does not connect that theme to GitHub. Live uploads, `--publish`, theme publication/deletion and product activation require authorization for the specific store change. See the [theme push reference](https://shopify.dev/docs/api/shopify-cli/theme/theme-push).

## Authentication and handoff

Store access commands prompt for Shopify login when needed. CLI authentication and the browser's Shopify admin login are separate: CLI success does not establish that editor verification is possible in the selected browser profile. Credentials, tokens, `.env` files and `.shopify/` state stay outside committed notes.

Keep [BUILD.md](../BUILD.md) and [BUGS.md](../BUGS.md) factual: branch/commit, target ID and role, checks performed, whether uploaded/pushed/published, and anything still unverified. [LIN_REPLICA.md](LIN_REPLICA.md) records the catalog, merchant controls and reference evidence. The explicit “Show Lin catalog as coming soon” setting can display the saved eleven cards on live themes, with purchases disabled. Turn it off to use published Shopify products. Shopify product availability and digital delivery are separate from theme deployment.
