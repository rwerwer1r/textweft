---
description: "사람의 방향 결정과 에이전트의 연구·명세·테스트·구현 책임을 정할 때 읽습니다."
---
# Agent-driven Development

Textweft의 개발은 **Agent가 실행을 주도하고 사람이 방향과 중요한 결정을 소유하는 방식**을 기본으로 합니다. Agent-driven은 무검토 자동화나 인간의 책임 제거를 뜻하지 않습니다.

## Responsibility Contract

| 주체 | 소유 책임 |
| --- | --- |
| 사람 | 제품 목표·우선순위·제약·수용 기준의 최종 의미, 중요한 제품·아키텍처·보안·비용 결정, 명시적 승인 |
| Coordinator Agent | 목표 구체화, Research/Plan, Change 관리, Work 분해·할당, 결과 통합, 검증·리뷰·PR 준비와 인계 |
| Work Agent | 할당된 Work의 근거 확인, 테스트 설계·구현, 코드·문서 수정, 자체 검증과 증거 반환 |
| Review Agent | 요청된 범위의 독립적 결함·반례 탐색과 근거 반환 |

## Development Contract

1. 요청을 관찰 가능한 Goal, In Scope, Out of Scope, Acceptance로 구체화합니다. 중요한 모호성은 사람에게 질문하고 기술 세부를 임의로 제품 결정으로 승격하지 않습니다.
2. 실제 계약과 기존 STDD Change를 확인합니다. 행동 변경이면 필요한 Spec delta를 작성하고 기준 정본을 명시합니다.
3. `mols-loops`가 선택되면 Prepare → RPI → Finalize와 재귀·반복을 제어합니다. 도메인 Work는 필요한 `workflow-*`와 도구를 조합합니다.
4. 각 행동 변경 Work는 [Delivery](../../../.rulesync/skills/workflow-delivery/SKILL.md)의 Spec → 테스트 설계 → 테스트 구현 → 구현 순서를 따릅니다.
5. 독립 Work에만 [병렬 개발 절차](parallel-agentic-development.md)를 적용합니다.
6. 결과를 Spec·테스트·구현·문서와 대조하고 실행/정적 확인/CI/미실행을 분리해 보고합니다.

## Agent-first Repository Design

- 지침과 capability는 발견 가능한 정본·라우팅으로 관리하고 전체 문서를 모든 Agent에 주입하지 않습니다.
- 반복 절차는 재사용 가능한 Skill, 경로별 규칙은 scoped instruction, 장기 상태는 STDD/Inbox, 사실은 코드·테스트에 둡니다.
- 작업은 독립 수용 가능한 단위로 나누고 각 단위의 완료 조건과 소유 파일을 명시합니다.
- 도구·런타임 능력은 실제 사용 가능한 경우에만 계획에 포함합니다. 부족하면 대체 방식과 미검증을 밝힙니다.
- 사람의 개입을 최소화하되 중요한 결정·승인과 불확실성은 숨기지 않습니다.

## Completion

완료는 결과물의 존재가 아니라 Change의 수용 조건, 필요한 테스트, Review, Spec 반영과 증거로 판정합니다. PR 생성은 병합이 아니며 모든 승인 경계는 [AGENTS.md](../../../AGENTS.md)를 따릅니다.
