# Textweft Agent Asset Route

This file selects optional, repository-local agent Rules and Skills. Authority and permission remain with [AGENTS.md](../../AGENTS.md), not this router.

## Selection

1. Verify current repository/ref, target paths, and task intent. Read applicable `AGENTS.md` files first.
2. Inspect only the `name` and `description` entries in [catalog.json](catalog.json). Select candidates relevant to this task; do not bulk-load every asset.
3. For a selected **Rule**, open its repository-relative `path` and check any globs, selectors, and actual target-path applicability before applying it.
4. For a selected **Skill**, open its repository-relative `path` (normally `SKILL.md`) and follow its actual scope and procedure.
5. When the task/target changes, reconsider selection. Missing files, uncertain provenance, or unsupported execution must be reported, not guessed.

## Catalog contract

`catalog.json` is a manually maintained discovery index with `version: 1`, `rules: []`, and `skills: []`. Each future entry has `name`, `description`, and a **repository-relative** `path`. The source file itself owns behavior; the catalog does not. New entries must point to files committed to this repository and pass `npm run harness:check`.

The initial catalog is intentionally empty: Textweft has no project-installed Rule, Skill, or subagent yet. Do not assume the reference project's asset manager, external Skills, or generated target projections have been installed here.
