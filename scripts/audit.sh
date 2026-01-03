#!/usr/bin/env bash
set -euo pipefail

# =========================
# Config
# =========================
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPORT_DIR="${ROOT_DIR}/audit-report"
TS_CONFIG="${TS_CONFIG:-tsconfig.json}"          # override: TS_CONFIG=tsconfig.app.json ./scripts/audit.sh
ESLINT_TARGETS="${ESLINT_TARGETS:-src}"          # override: ESLINT_TARGETS="src apps" ...
MADGE_ENTRY="${MADGE_ENTRY:-src}"                # override if monorepo
NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=8192}"

mkdir -p "$REPORT_DIR"

echo "== Audit started: $(date) =="
echo "Repo: $ROOT_DIR"
echo "Report dir: $REPORT_DIR"
echo

cd "$ROOT_DIR"

# =========================
# 0) System / versions
# =========================
{
  echo "### Versions"
  node -v
  npm -v || true
  yarn -v || true
  pnpm -v || true
  git rev-parse --short HEAD || true
  echo
} | tee "$REPORT_DIR/00-versions.txt"

# =========================
# 1) Install (deterministic)
# =========================
echo "== Installing deps (prefers lockfile-based installs) =="
if [ -f package-lock.json ]; then
  npm ci
elif [ -f pnpm-lock.yaml ]; then
  pnpm install --frozen-lockfile
elif [ -f yarn.lock ]; then
  yarn install --frozen-lockfile
else
  echo "WARN: No lockfile found. Running npm install (less deterministic)."
  npm install
fi

# =========================
# 2) Lint (ESLint)
# =========================
echo "== ESLint =="
# You should have ESLint configured; if not, this will still try.
# Output both human + json for later sorting.
npx eslint "$ESLINT_TARGETS" \
  -f stylish | tee "$REPORT_DIR/10-eslint.txt" || true

npx eslint "$ESLINT_TARGETS" \
  -f json -o "$REPORT_DIR/10-eslint.json" || true

# =========================
# 3) Formatting drift (Prettier)
# =========================
echo "== Prettier (check) =="
npx prettier --check . | tee "$REPORT_DIR/11-prettier.txt" || true

# =========================
# 4) Typecheck (if TS exists)
# =========================
if ls *.ts *.tsx >/dev/null 2>&1 || [ -d src ]; then
  if [ -f "$TS_CONFIG" ]; then
    echo "== TypeScript typecheck ($TS_CONFIG) =="
    npx tsc -p "$TS_CONFIG" --noEmit | tee "$REPORT_DIR/12-tsc.txt" || true
  else
    echo "INFO: No $TS_CONFIG found, skipping tsc step."
  fi
fi

# =========================
# 5) Tests (if present)
# =========================
echo "== Tests (if configured) =="
npm test --silent 2>&1 | tee "$REPORT_DIR/13-tests.txt" || true

# =========================
# 6) Build (catches a ton)
# =========================
echo "== Build (if configured) =="
npm run build --silent 2>&1 | tee "$REPORT_DIR/14-build.txt" || true

# =========================
# 7) Unused dependencies / files
# =========================
echo "== Depcheck (unused deps) =="
npx depcheck --json > "$REPORT_DIR/20-depcheck.json" || true
npx depcheck | tee "$REPORT_DIR/20-depcheck.txt" || true

# Optional: find big obvious dead zones
echo "== Quick dead-code signals (large comment blocks, TODO piles) =="
rg -n --hidden --glob '!.git/*' \
  -e 'TODO\(|FIXME\(|HACK\(' \
  -e 'TODO:' -e 'FIXME:' -e 'HACK:' \
  . | tee "$REPORT_DIR/21-todos.txt" || true

# =========================
# 8) Dependency graph / circular deps
# =========================
echo "== Madge (circular dependencies + graph) =="
# Graph output requires graphviz to render svg/png, but circular check works without it.
npx madge "$MADGE_ENTRY" --circular | tee "$REPORT_DIR/30-madge-circular.txt" || true

# Try generating an SVG if graphviz is available
if command -v dot >/dev/null 2>&1; then
  npx madge "$MADGE_ENTRY" --image "$REPORT_DIR/31-deps-graph.svg" || true
else
  echo "INFO: graphviz not found; skipping dep graph image." | tee "$REPORT_DIR/31-deps-graph.txt"
fi

# =========================
# 9) Security: dependency vulnerabilities
# =========================
echo "== npm audit (dependency vulns) =="
npm audit --json > "$REPORT_DIR/40-npm-audit.json" || true
npm audit | tee "$REPORT_DIR/40-npm-audit.txt" || true

# =========================
# 10) Security: Semgrep (fast SAST)
# =========================
echo "== Semgrep (security + correctness patterns) =="
# "p/ci" is a solid default ruleset.
# Add --config p/react to focus more on frontend patterns if desired.
npx semgrep --config p/ci --json -o "$REPORT_DIR/50-semgrep.json" || true
npx semgrep --config p/ci | tee "$REPORT_DIR/50-semgrep.txt" || true

# =========================
# 11) Bundle / performance quick check (optional)
# =========================
echo "== Bundle analysis (optional, if using Vite/Webpack) =="
# This is intentionally light because setups vary.
# You can add your specific analyzer plugin later.
echo "TIP: If you use Vite, consider 'rollup-plugin-visualizer'. If Webpack, 'webpack-bundle-analyzer'." \
  | tee "$REPORT_DIR/60-bundle-tip.txt"

# =========================
# 12) Summarize results (simple)
# =========================
echo "== Summary =="
{
  echo "### Key outputs"
  echo "- ESLint:  $REPORT_DIR/10-eslint.txt (and .json)"
  echo "- Prettier: $REPORT_DIR/11-prettier.txt"
  echo "- TSC:     $REPORT_DIR/12-tsc.txt"
  echo "- Tests:   $REPORT_DIR/13-tests.txt"
  echo "- Build:   $REPORT_DIR/14-build.txt"
  echo "- Depcheck:$REPORT_DIR/20-depcheck.txt (and .json)"
  echo "- Madge:   $REPORT_DIR/30-madge-circular.txt"
  echo "- npm audit:$REPORT_DIR/40-npm-audit.txt (and .json)"
  echo "- Semgrep: $REPORT_DIR/50-semgrep.txt (and .json)"
  echo
  echo "### Triage order (usually best ROI)"
  echo "1) Build errors  2) Type errors  3) ESLint errors  4) Circular deps  5) Unused deps  6) Security findings"
} | tee "$REPORT_DIR/99-summary.txt"

echo
echo "== Audit finished: $(date) =="
echo "Open: $REPORT_DIR/99-summary.txt"
