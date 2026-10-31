# Textweft Development

**공통 계약은 [AGENTS.md](../../AGENTS.md).** 이 문서는 작업에 필요한 세부 문서를 **하나씩 선택하기 위한 라우터**입니다. 관련 없는 링크는 따라가지 않습니다.

## Execution Priorities

현재 실행 순서는 **P0 개발 환경·하네스 구축 → P1 MVP 설정 → P2 MVP 구현**입니다. 다음 단계는 앞 단계의 완료 조건과 검증 근거를 확인한 뒤 진행합니다. 기존 v0.1 런타임 계약은 보존하되 P0 동안 MVP 기능 확장을 앞당기지 않습니다.

| 단계 | 작업 범위 | 다음 단계 진입 조건 |
| --- | --- | --- |
| **P0 — 개발 환경·하네스 구축** | mise 기반 버전·의존성 관리, 부트스트랩/업데이트, rumdl·Biome·Lefthook, Rulesync·에이전트 라우팅, 재현 가능한 검증 체계 | 새 클론에서 `mise run bootstrap`과 `mise run check`를 실제로 실행·기록하고 `mise run update` 재실행을 확인. npm 잠금 파일 등 재현성 문제를 해결하고 변경을 리뷰·승인된 정본에 반영 |
| **P1 — MVP 설정** | 바이브코더의 최소 사용 시나리오, MVP 범위·비목표, 핵심 API/콘텐츠 계약, 초기 구성·실행 경로, 수용 조건과 테스트 계획 | 구현 가능한 최소 수직 기능 범위와 중요한 제품 결정을 확정하고 검토 가능한 설정·명세 확보 |
| **P2 — MVP 구현** | 합의된 범위만 코드·예제·테스트·문서에 구현하고 사용 흐름을 검증 | 자연어 의도 → 게임 정의 → 실행 → 수정 경로를 재현하고 관련 테스트·타입·실행 검증 근거 확보 |

**현재 초점은 P0**입니다. P1·P2에 필요한 선행 조사나 초안은 가능하지만, P0의 미검증 사항을 건너뛰어 MVP 구현으로 전환하지 않습니다. 단계 전환도 [AGENTS.md](../../AGENTS.md)의 병합·릴리스·중요 결정 승인 요건을 대체하지 않습니다.

## Route by Task

| 작업 | 우선 읽을 문서 |
| --- | --- |
| 게임 런타임·API·예제 | [README](../../README.md) 및 관련 코드·테스트 |
| 제품 목표·역할·문서 언어 | [GOAL](../GOAL.md) · [GLOSSARY](../GLOSSARY.md) · [LANGUAGE](../LANGUAGE.md) 중 필요한 것 |
| 준비·구현·리뷰·병합 단계 판단 | [Workflow Selection](workflows/choosing.md) |
| 실제 변경·검증·리뷰 | [Routine Loop](workflows/routine-loop.md) |
| AI 주도 개발·바이브코더 저작 경험 | [Vibe Coding](workflows/vibe-coding.md) |
| 중요한 사람 결정·리뷰 근거 | [Agent Governance](ai-agent/README.md) |
| Rule·Skill 선택 | [ROUTE](../../.agents/route/ROUTE.md) |
| Rulesync 설정·생성·잠금 | [Rulesync](tooling/rulesync.md) |
| 외부 Skill 선택·일회성 하네스 절차 | [Selective Agent Assets](tooling/agent-assets.md) |
| 장기 작업의 원격 체크포인트·재개 | [Inbox](../../inbox/README.md) |
| **런타임이 없거나 제한된 챗봇만** | [CHATBOT](../../CHATBOT.md) |

## Checks

**[mise.toml](../../mise.toml)이 도구 버전과 검사 작업의 정본**입니다. [개발 환경 초기화](../../mise-tasks/bootstrap)는 `mise run bootstrap`, 기존 환경 [동기화](../../mise-tasks/update)는 `mise run update`를 사용합니다. 초기화는 Git 로컬 커밋 템플릿·Lefthook·고정된 외부 Skill도 설치합니다. 두 잠금 파일은 Git에 고정되어 있으며 갱신은 [선택형 자산 가이드](tooling/agent-assets.md)에서 별도로 관리합니다. 부트스트랩과 CI의 실제 성공은 실행 결과로만 판단합니다. `mise run check`로 전체 검사, 변경 범위에 따라 `mise run lint:md`(rumdl·링크), `mise run lint:code`(Biome), `mise run routes:check`, `mise run test`, `mise run typecheck`를 선택합니다. Rulesync 진단은 `mise run rulesync:check`를 사용합니다. [Lefthook](../../lefthook.yml)은 `mise run hooks:install`로 로컬 Git 훅에 한 번 설치하며 스테이징된 파일만 검사합니다. 훅 통과는 `mise run check`나 CI 성공을 뜻하지 않습니다. **미실행 검사를 통과로 보고하지 않습니다.**

[CI](../../.github/workflows/ci.yml)는 PR/main에서 잠금 재현과 `mise run check`를 수행하도록 구성했습니다. CI 실행 결과·브랜치 보호 적용·실제 개발 환경 부트스트랩은 각각 별도 증거가 필요합니다.
