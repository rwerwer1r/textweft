#!/usr/bin/env bash
# Reject legacy Rulesync cache before any project-owned projection/check.
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)"
cd "$root"

for legacy_cache in .rulesync/rules/.curated .rulesync/skills/.curated .rulesync/subagents/.curated; do
  if [[ -L "$legacy_cache" ]] || [[ -e "$legacy_cache" && ! -d "$legacy_cache" ]] ||
    { [[ -d "$legacy_cache" ]] && [[ -n "$(find "$legacy_cache" -mindepth 1 -print -quit)" ]]; }; then
    printf '오류: stale external agent assets in %s; inspect and remove obsolete local cache before running a Rulesync task.\n' "$legacy_cache" >&2
    exit 1
  fi
done
