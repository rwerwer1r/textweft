# Workflow Selection

## Request-stage boundaries

Honor the user's stated stage. Do not silently advance to a more consequential stage.

| Request or intent | Allowed work | Stop before |
| --- | --- | --- |
| **PR 준비** | Inspect current state, clarify scope/acceptance, write planning docs as needed, and optionally open a Draft PR containing those docs | Product implementation, claiming tests passed, merge |
| **구현 / 수정 / 하네스 구축 / PR 생성** | Perform the requested bounded changes, run available checks, review diff, commit to a task branch, open or update a PR | Merge, release, deploy |
| **PR 리뷰** | Inspect PR/diff/check evidence; report findings and, if explicitly requested, propose or implement fixes | Merge without instruction |
| **PR 병합** | Recheck current head, requested scope, review and CI evidence, permissions, and approval gates | Merge when required evidence or authorization is absent |

Explicitly scoped requests override generic defaults only within the repository and higher safety/approval constraints. A Draft PR is a review surface, not proof of implementation completeness. Routine changes without a special stage follow [Routine Working Loop](routine-loop.md).

## Work surfaces

- **Canonical behavior:** `src/`, `tests/`, `examples/`, `package.json`, and product documentation.
- **Canonical agent guidance:** root `AGENTS.md`, `CHATBOT.md`, `.agents/route/`, and `docs/development/`.
- **Noncanonical research, reviews, handoff, and transient plans:** [inbox/](../../../inbox/README.md), only when retaining them materially helps.
- **Live change discussion:** GitHub branch/PR and its diff/checks. Avoid duplicating the same state across files.

Textweft does not currently adopt OpenSpec, Rulesync, or any auto-generated instruction layer. If later adopted, define their ownership and validation in a separate, explicitly reviewed change.
