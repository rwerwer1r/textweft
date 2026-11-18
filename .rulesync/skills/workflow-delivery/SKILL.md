---
name: workflow-delivery
description: >-
  Use for scoped code, tests, documentation, or configuration implementation through specification, test design, tests, implementation, and PR handoff. Not for investigation-only or standalone review.
targets:
  - copilot
  - copilotcli
  - codexcli
  - claudecode
  - antigravity-ide
  - antigravity-cli
  - androidstudio
---
# Delivery

## When / Not When

범위가 정해진 기능·버그·테스트·문서·설정 변경을 수행할 때 선택합니다. 조사·리뷰만 요청된 경우 해당 Workflow를 우선하며 하네스 개선이 주목적이면 `workflow-harness-improvement`를 선택합니다.

## Inputs

목표·수용 조건·제외 범위, 현재 기준 ref·관련 계약, 실제 쓰기 권한, 승인 상태.

## Execute

이 Workflow는 `mols-loops` 아래의 Work 단위입니다. 단계 재진입·재귀·종료 판단은 `mols-loops`가 소유합니다.

**관찰 가능한 소프트웨어 동작을 변경하는 각 최소 Work 단위:**

1. **Spec:** 현재 계약과 Plan에서 행동·입출력·오류/경계·비목표·수용 조건을 명세합니다. 중요한 제품·보안 결정이 필요하면 먼저 판단을 받습니다.
2. **테스트 설계:** Spec의 행동을 판별할 최소 사례·oracle·테스트 경계·회귀 위험을 정합니다. 기대값은 Spec과 독립 근거에서 도출하고 현재 구현을 정답의 유일한 근거로 삼지 않습니다. 중요한 설계 문제에서는 `mols-test-design`을 사용합니다.
3. **테스트 구현:** 실제 코드 수정 전에 사례를 테스트로 작성하거나 기존 테스트가 동일 계약을 충분히 보호함을 확인합니다. 가능한 경우 변경 전 실패(Red)가 의도한 결함 때문인지 관찰하고 fixture·환경 문제와 구별합니다.
4. **실제 구현:** Spec을 만족하는 최소 코드를 수정하고 새·기존 테스트를 통과시킵니다(Green). 필요하면 리팩터링 후 재검증합니다. 테스트 통과만을 위해 Spec·oracle을 사후 변경하지 않습니다.
5. **Review:** Spec ↔ 테스트 설계 ↔ 테스트 코드 ↔ 제품 코드와 실제 검증 결과를 대조합니다. Spec·oracle 결함이면 해당 단계를 먼저 바로잡고 구현을 재검토합니다. 중요한 새 가정·범위 변경은 Work를 멈추고 RPI Review → Research/Plan으로 돌립니다.

독립 Work를 병렬화할 때는 [workflow-parallel-development](../workflow-parallel-development/SKILL.md)를 사용합니다. 각 Worker는 이 동일한 테스트 우선 순서를 따르며 coordinator는 통합 후 cross-Work 검증을 다시 수행합니다. 병렬화는 공유 파일 동시 쓰기를 허용하지 않습니다.

**비동작 변경:** 문서 오타·포맷 등 실행 동작이 변하지 않는 작업은 무의미한 테스트를 만들지 않고 관련 Markdown/구성 검증을 사용합니다. 테스트 코드 작성·실행이 불가능하면 미실행을 표시하고 완료를 주장하지 않습니다.

검증·인계는 [Routine Loop](../../../docs/development/workflows/routine-loop.md)와 [mise 검사](../../../docs/development/README.md#checks)를 따릅니다. PR 생성은 병합이 아닙니다.
