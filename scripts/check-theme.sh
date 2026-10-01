#!/usr/bin/env bash
# Run local checks without authenticating, uploading, or changing store data.
set -euo pipefail

THEME_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

for executable in node python3 shopify; do
  if ! command -v "$executable" >/dev/null 2>&1; then
    echo "Required command not found: $executable" >&2
    exit 1
  fi
done

node --check "$THEME_ROOT/assets/theme.js"
node --check "$THEME_ROOT/assets/scaled-loader-current.js"
node --check "$THEME_ROOT/assets/scaled-loader.js"

if ! cmp -s "$THEME_ROOT/assets/scaled-loader-current.js" "$THEME_ROOT/assets/scaled-loader.js"; then
  echo "Loader mirrors differ. Rebuild and copy the same runtime output to both assets." >&2
  exit 1
fi

python3 - "$THEME_ROOT" <<'PY'
import json
import pathlib
import sys

root = pathlib.Path(sys.argv[1])
count = 0
for directory in ("config", "locales", "templates", "sections"):
    for path in sorted((root / directory).rglob("*.json")):
        text = path.read_text().lstrip()
        # Shopify-generated templates may contain a leading block comment.
        while text.startswith("/*"):
            end = text.find("*/")
            if end == -1:
                raise ValueError(f"Unclosed JSON header comment: {path}")
            text = text[end + 2:].lstrip()
        try:
            json.loads(text)
        except json.JSONDecodeError as error:
            raise ValueError(f"Invalid JSON: {path.relative_to(root)}: {error}") from error
        count += 1
print(f"JavaScript syntax, loader mirrors, and {count} JSON files passed.")
PY

shopify theme check --path "$THEME_ROOT"
