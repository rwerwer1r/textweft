# Inbox: Durable Work Notes

`inbox/` holds **noncanonical** investigation, plans, review notes, validation evidence, and workstate that help another agent or maintainer resume meaningful unfinished work. It is not the source of truth for requirements, code, tests, or permissions.

## When to write

Use a checkpoint for substantial multi-step tasks where losing intermediate decisions would cause significant rework. Skip it for one-shot edits, simple questions, and read-only reviews. Prefer the GitHub PR body for a brief finished summary; do not create a journal per tool call.

Work on a task branch under `inbox/YYYY-MM-DD/<short-task>-workstate.md`; maintain one active workstate per task and avoid needless renaming. Do not commit this task state to another account or repository.

## Minimum workstate

Include **Goal / scope**, **Repository + branch + PR**, **Current state** (`active`, `blocked`, `handoff`, or `complete`), **Verified evidence** (files/commits/check results and unrun checks), **Open risks/approvals**, and **Next action**. Keep it short, sanitized, and free of raw sensitive output, credentials, or private user identifiers.

Commit and push the first useful checkpoint **before** beginning another long or interruption-prone step, then read it back from the remote ref. Update after substantive findings, test results, blockers, and handoff; never assert remote persistence without confirmation.

## Recovery

Re-read the current repository/ref, branch/PR, diff, actual files, checks, and applicable instructions. Reconcile them with the latest saved workstate; a note can be stale and never overrides live evidence. Resume only outstanding, authorized work; do not repeat irreversible operations.

Promote lasting conclusions to their canonical owner, keep an active workstate while work continues, and do not confuse archived notes with approvals or CI evidence.
