# Agent Governance

## Ownership

[AGENTS.md](../../../AGENTS.md) is the directly maintained repository-wide authority contract. [CHATBOT.md](../../../CHATBOT.md) is a chat entrypoint, and [ROUTE.md](../../../.agents/route/ROUTE.md) plus its catalog are **discovery**, not a competing permissions policy. Product behavior remains defined by code, tests and [README](../../../README.md).

Policies in another project—even those used as a template—do not grant Textweft permission, set its architecture, or authorize cross-repository operations.

## Project-local authorization

The only allowed write repository is `rwerwer1r/textweft`, using the verified `rwerwer1r` identity. Routine work explicitly requested by the user authorizes a bounded development branch, necessary code/docs changes, checks, and a PR. It does **not** authorize unrelated issues/comments, other accounts, third-party writes, a merge, release, deployment, or new public exposure.

Humans decide material changes to requirements, public API compatibility, architecture, secrets/security, irreversible operations, and significant cost. The agent may resolve ordinary implementation details inside accepted constraints without repeated approvals. All external/platform/tool confirmations remain required.

## Product-specific constraints

- Preserve the headless, renderer-neutral scene/choice runtime design unless requested otherwise.
- Treat choice-transition atomicity, seed-based RNG reproducibility, snapshots, and synchronous hook limitations as contracts to verify when changing `src/`.
- Use tests to support behavioral claims; do not infer target-runtime validation from syntax checks.
- This is an early prototype: prefer small reversible improvements, not premature governance frameworks or mandatory generators.

## Evidence and review

Track what was inspected, what was changed, commands **actually executed** and their results, work not executed, risks, and requested human decisions. Diff review should challenge scope drift, security, tests, contradictory docs, and accidental project-wide assumptions. An LLM's second pass is a self-review unless independent execution occurred.

Resumable, noncanonical notes live in [inbox/](../../../inbox/README.md), while durable decisions belong in code or the appropriate project document. The [routine loop](../workflows/routine-loop.md) owns execution sequence.
