---
description: "개발 우선순위, 에이전트 협업, 작업 워크플로, 도구와 검증 경로를 선택할 때 읽습니다."
---
# Textweft Development

**공통 계약은 [AGENTS.md](../../AGENTS.md).** 이 문서는 작업에 필요한 세부 문서를 하나씩 선택하기 위한 라우터입니다. 관련 없는 링크는 따라가지 않습니다.

## Execution Priorities

현재 실행 순서는 **P0 개발 환경·하네스 구축 → P1 MVP 설정 → P2 MVP 구현**입니다. 다음 단계는 앞 단계의 완료 조건과 검증 근거를 확인한 뒤 진행합니다.

| 단계 | 작업 범위 | 다음 단계 진입 조건 |
| --- | --- | --- |
| P0 — 개발 환경·하네스 | mise, Rulesync, 에이전트 라우팅, 검증, 재현 가능한 개발 환경 | 새 클론의 bootstrap·check·update 재실행 근거 |
| P1 — MVP 설정 | 사용자 시나리오, MVP 범위, 핵심 계약, 수용 조건과 테스트 계획 | 구현 가능한 최소 수직 범위와 검토된 명세 |
| P2 — MVP 구현 | 합의된 범위의 코드·테스트·예제·문서 구현 | 실제 게임 제작 흐름과 관련 검증 근거 |

## Route by Task

| 작업 | 우선 읽을 문서 |
| --- | --- |
| 제품 목표·역할·언어·원칙 | [Goal](../goal/README.md) |
| 확정된 코어 결정·초기 설계 | [Architecture](../architecture/README.md) |
| AI 주도 개발 원칙과 역할 | [Agent-driven Development](workflows/agent-driven-development.md) · [Agent Roles](ai-agent/agents.md) |
| 에이전트 로딩·지침 소유권 | [Harness Verification](ai-agent/harness.md) · [Instruction Ownership](ai-agent/rule-ownership.md) |
| 병렬 Work 분해·위임·통합 | [Parallel Agentic Development](workflows/parallel-agentic-development.md) |
| Change·Spec 중심 개발 | [Spec-driven Development](workflows/spec-driven-development.md) · [STDD](../../stdd/README.md) |
| 테스트 우선 개발 | [Test-driven Development](workflows/test-driven-development.md) · [Delivery Skill](../../.rulesync/skills/workflow-delivery/SKILL.md) |
| 준비·구현·리뷰·병합 단계 | [Workflow Selection](workflows/choosing.md) |
| 일상 변경·검증·인계 | [Routine Loop](workflows/routine-loop.md) |
| 바이브코더 저작 경험 | [Vibe Coding](workflows/vibe-coding.md) |
| Rule·Skill 선택 | [ROUTE](../../.agents/route/ROUTE.md) · [Workflow Skills](../../.rulesync/skills/README.md) |
| Rulesync·외부 자산 | [Tooling](tooling/README.md) |
| 세션 복구·증거 | [Inbox](../../.inbox/README.md) |
| 런타임이 없거나 제한된 챗봇만 | [CHATBOT](../../CHATBOT.md) |

## Checks

도구 버전과 task는 [mise.toml](../../mise.toml)이 소유합니다. 최초 설정은 `mise run bootstrap`, 기존 환경 동기화는 `mise run update`입니다. `mise run check`는 관련 Markdown·코드·라우팅·인박스·문서 인덱스·런타임 검사를 수행합니다. 작은 변경은 `mise run lint:md`, `mise run routes:check`, `mise run docs:index:check`, `mise run test` 등으로 범위를 줄입니다.

[CI](../../.github/workflows/ci.yml)는 의도적으로 `npm ci`, `npm test`, `npm run typecheck`만 실행합니다. `npm test`는 런타임과 문서 인덱스의 결정론적 테스트를 포함합니다. Rulesync 설치·실제 에이전트 로딩·로컬 훅·전체 스타일 검사는 CI가 증명하지 않습니다. 실행·정적 확인·CI·미실행을 구분하고 미실행 검사를 통과로 보고하지 않습니다.
