# Agent Governance

## Ownership

[AGENTS.md](../../../AGENTS.md) is the directly maintained repository-wide authority contract. [CHATBOT.md](../../../CHATBOT.md) is a chat entrypoint, and [ROUTE.md](../../../.agents/route/ROUTE.md) plus its catalog are **discovery**, not a competing permissions policy. Product behavior remains defined by code, tests and [README](../../../README.md).

Policies in another project—even those used as a template—do not grant Textweft permission, set its architecture, or authorize cross-repository operations.

## Project-local authorization

The only allowed write repository is `rwerwer1r/textweft`, using the verified `rwerwer1r` identity. Routine work explicitly requested by the user authorizes a bounded development branch, necessary code/docs changes, checks, and a PR. It does **not** authorize unrelated issues/comments, other accounts, third-party writes, a merge, release, deployment, or new public exposure.

Humans decide material changes to requirements, public API compatibility, architecture, secrets/security, irreversible operations, and significant cost. The agent may resolve ordinary implementation details inside accepted constraints without repeated approvals. All external/platform/tool confirmations remain required.

## Vibe Coding Ownership

Textweft 자체는 **바이브코딩**으로 개발합니다. 사람은 제품 목표·제약·피드백을 주고, AI는 변경·테스트·예제·문서·검증 근거를 주도합니다. 주 대상은 바이브코더이며, 개별 게임 제작이나 플레이어 서비스는 이 저장소의 제품 목표가 아닙니다. 역할 명칭은 [Glossary](../../../docs/GLOSSARY.md), 개발 절차는 [Vibe Coding Workflow](../workflows/vibe-coding.md)를 따릅니다.

이 위임은 제품·보안의 중요 결정이나 병합 승인을 AI에게 넘기지 않습니다. AI 생성 결과도 실제 테스트와 사용 시나리오로 검증하며, 바이브코더를 위한 프레임워크가 AI 런타임에 반드시 의존해야 한다고 가정하지 않습니다.

## Product-specific constraints

- Preserve the headless, renderer-neutral scene/choice runtime design unless requested otherwise.
- Treat choice-transition atomicity, seed-based RNG reproducibility, snapshots, and synchronous hook limitations as contracts to verify when changing `src/`.
- Use tests to support behavioral claims; do not infer target-runtime validation from syntax checks.
- This is an early prototype: prefer small reversible improvements, not premature governance frameworks or mandatory generators.

## Evidence and review

Track what was inspected, what was changed, commands **actually executed** and their results, work not executed, risks, and requested human decisions. Diff review should challenge scope drift, security, tests, contradictory docs, and accidental project-wide assumptions. An LLM's second pass is a self-review unless independent execution occurred.

Resumable, noncanonical notes live in [inbox/](../../../inbox/README.md), while durable decisions belong in code or the appropriate project document. The [routine loop](../workflows/routine-loop.md) owns execution sequence.
