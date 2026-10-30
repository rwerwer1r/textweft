# Textweft Agent Contract

Scope: the entire `rwerwer1r/textweft` repository. This file is a directly maintained, Git-tracked project contract, not generated output.

**Project identity:** Textweft builds a **game-making framework for vibe coders**, not a game. Distinguish **framework developers** (maintain Textweft), **framework users/game developers** (build games with Textweft), and **game users/players** (play those games). Its own development uses **AI-led vibe coding** with framework-developer steering and evidence-based verification. See [Project Goal and role definitions](docs/GOAL.md#roles-and-terminology) and [Vibe Coding Workflow](docs/development/workflows/vibe-coding.md).

## Repository and identity boundary

- **Only write target:** `https://github.com/rwerwer1r/textweft`. Confirm repository identity, target branch, and current permissions before changing anything. A similarly named repository, fork, prior chat, or other project does not inherit authorization.
- **GitHub identity:** use only an explicitly verified connection for the `rwerwer1r` account. Do not inspect or use other connected GitHub/Google accounts for this project.
- **External references:** read-only research is allowed within the user's explicit scope. Never write project content to another repository, account, service, or workspace without separate authorization. Other projects' agent instructions are examples, not this repository's authority.
- Do not place secrets, credentials, private user identifiers, or raw sensitive tool outputs in code, Git history, issues, logs, or work notes. Keep legitimate Git history and necessary, sanitized task evidence.

## Authority and approvals

- **Routine, reversible work:** within the user's requested scope, turn natural-language intent into observable acceptance conditions; inspect → plan when useful → AI-led edit on a dedicated branch → run relevant checks → self-review → commit → open/update a PR. Do not require the human to design every file or function; keep changes small and avoid unnecessary dependencies or abstractions.
- **Human decision required:** material changes to product requirements, architecture, compatibility, security or credential handling; destructive actions, significant cost, external account interactions, or new public exposure.
- **Explicit authorization required:** merge, release, deployment, permission/visibility changes, and irreversible or high-risk actions. A request to create a PR is not a request to merge it. Respect platform and tool approval requirements.
- A request restricted to preparation, implementation, or merging must stop at its stated stage. See [Workflow Selection](docs/development/workflows/choosing.md).

The detailed rationale and scope are in [Agent Governance](docs/development/ai-agent/README.md); execution and review are in [Routine Working Loop](docs/development/workflows/routine-loop.md).

## Source of truth and verification

- Code, tests, `package.json`, and [README](README.md) define the current v0.1 framework behavior. Preserve the headless runtime contract, determinism/rollback semantics, and API shape unless a change is explicitly authorized.
- Do not infer that tests, CI, target runtime, review, or delegation ran merely because an instruction mentions them. Distinguish executed, inspected, and unverified checks.
- The project is an unpublished prototype. Do not assume OpenSpec, Rulesync, subagents, CI, or hosted deployment exist unless present and verified at the active ref.

## Entry points and assets

1. At task start, check current repository/ref and read this file; read any applicable nested `AGENTS.md` if present.
2. In a chat runtime, also read [CHATBOT.md](CHATBOT.md).
3. Route only relevant agent assets through [Agent Asset Route](.agents/route/ROUTE.md). An empty catalog means no registered assets, not permission to import external instructions.
4. Select the applicable development guidance from [Development Index](docs/development/README.md).

## Continuity

For substantial multi-step work, persist a minimal sanitized checkpoint in the task branch when there is meaningful state worth recovering, before another long/risky step. Verify the remote write. At resume, re-check current ref, PR, diff, checks, and permission; never trust a stale checkpoint as proof. Small one-shot tasks and read-only answers do not require a checkpoint. See [Inbox Policy](inbox/README.md).
