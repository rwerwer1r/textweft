# Chat Runtime Entry

This is a thin bridge into Textweft's repository-owned harness, **not** a second source of authority.

## Read order

1. Verify active repository, ref, requested stage, and GitHub identity; then read [AGENTS.md](AGENTS.md) and any nested instructions for the target path.
2. Read [Agent Asset Route](.agents/route/ROUTE.md), select only task-relevant registered assets, and read their actual contents.
3. For changes, consult [Workflow Selection](docs/development/workflows/choosing.md), [Routine Working Loop](docs/development/workflows/routine-loop.md), and [Inbox Policy](inbox/README.md) when resumable work is involved.

## Capability bridge

- Do not assume a shell, remote clone, CI, editor, scripts, or subagent tool exists. Inspect available capabilities before using them.
- A supported alternative runtime may reproduce a **reviewed, bounded** validation step, but report it as an alternative—not as execution of the project's original command or target environment. Never bypass sandbox, identity, or authorization boundaries.
- If a future task requires a registered subagent but delegation is unavailable, read its actual role contract and, when appropriate, perform role-separated analysis in this chat. Label it as **single-agent fallback**, not independent review.
- If source files, permissions, or runtime features are inaccessible, state which parts are unverified. Do not invent missing procedures or silently substitute another repository.
