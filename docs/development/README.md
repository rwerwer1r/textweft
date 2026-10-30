# Textweft Development

**공통 계약은 [AGENTS.md](../../AGENTS.md).** 이 문서는 작업에 필요한 세부 문서를 **하나씩 선택하기 위한 라우터**입니다. 관련 없는 링크는 따라가지 않습니다.

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
| 장기 작업의 원격 체크포인트·재개 | [Inbox](../../inbox/README.md) |
| **런타임이 없거나 제한된 챗봇만** | [CHATBOT](../../CHATBOT.md) |

## Checks

**[mise.toml](../../mise.toml)이 도구 버전과 검사 작업의 정본**입니다. `mise install` 후 `mise run check`로 전체 검사, 변경 범위에 따라 `mise run lint:md`(rumdl·링크), `mise run lint:code`(Biome), `mise run routes:check`, `mise run test`, `mise run typecheck`를 선택합니다. Rulesync 진단은 `mise run rulesync:check`를 사용합니다. **미실행 검사를 통과로 보고하지 않습니다.**
