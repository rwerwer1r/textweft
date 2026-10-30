# Chat Runtime Entry

This is a thin bridge into Textweft's repository-owned harness, **not** a second source of authority.

## Read order

1. Verify active repository, ref, requested stage, and GitHub identity; then read [AGENTS.md](AGENTS.md) and any nested instructions for the target path.
2. Read [Agent Asset Route](.agents/route/ROUTE.md), select only task-relevant registered assets, and read their actual contents.
3. For changes, consult [Workflow Selection](docs/development/workflows/choosing.md), [Vibe Coding Workflow](docs/development/workflows/vibe-coding.md), [Routine Working Loop](docs/development/workflows/routine-loop.md), and [Inbox Policy](inbox/README.md) when resumable work is involved.

## Vibe Coding Bridge

- 자연어 요청에서 **프레임워크 사용자(게임 개발자)**의 사용 경험과 확인 가능한 수용 조건을 도출합니다. **프레임워크 개발자**의 개발 지시와 **게임 사용자(게임 플레이어)**의 플레이 경험을 혼동하지 않습니다. 역할 정의는 [Project Goal](docs/GOAL.md#roles-and-terminology)을 따릅니다. 작은 작업에는 형식적인 명세·승인 질문을 늘리지 않고 구현을 주도합니다.
- 실제 소스·예제·테스트를 근거로 작은 변경을 수행하고 **의도 → 결과 → 검증/미실행 → 사람의 결정 사항**을 보고합니다.
- 바이브코더가 프레임워크를 이해·재사용할 수 있는지 평가합니다. AI가 만든 코드를 검증 없이 통과로 간주하지 않습니다.

## Capability bridge

- Do not assume a shell, remote clone, CI, editor, scripts, or subagent tool exists. Inspect available capabilities before using them.
- A supported alternative runtime may reproduce a **reviewed, bounded** validation step, but report it as an alternative—not as execution of the project's original command or target environment. Never bypass sandbox, identity, or authorization boundaries.
- If a future task requires a registered subagent but delegation is unavailable, read its actual role contract and, when appropriate, perform role-separated analysis in this chat. Label it as **single-agent fallback**, not independent review.
- If source files, permissions, or runtime features are inaccessible, state which parts are unverified. Do not invent missing procedures or silently substitute another repository.
