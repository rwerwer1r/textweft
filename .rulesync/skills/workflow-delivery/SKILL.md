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

범위가 정해진 기능·버그·테스트·문서·설정 변경을 수행할 때 선택합니다. 검토·조사만 요청된 경우 해당 Workflow를 우선하며, 하네스 자체 개선이 주목적이면 [Harness Improvement](../workflow-harness-improvement/SKILL.md)를 선택합니다.

## Inputs

목표·수용 조건·제외 범위, 현재 기준 ref·관련 계약, 실제 쓰기 권한, 승인 상태.

## Execute

이 Workflow는 `workflow-iteration` 아래의 **Work 단위**입니다. 부모나 자식이 호출해도 아래의 테스트 우선 순서는 동일합니다. 단계 재진입·재귀·종료 판단은 `workflow-iteration`가 소유합니다.

**관찰 가능한 소프트웨어 동작을 변경하는 각 최소 Work 단위:**

1. **Spec:** 유효한 Plan과 현재 계약에서 행동·입출력·오류/경계·비목표·수용 조건을 명세합니다. 중요한 제품·보안 결정이 필요하면 먼저 판단을 받습니다. 기존 Issue·PR·계획의 관련 부분을 재사용할 수 있습니다.
2. **테스트 설계:** Spec의 행동을 판별할 최소 사례·oracle·테스트 경계·회귀 위험을 정합니다. 기대값은 Spec과 상위 계약·독립적인 근거에서 도출하고, 현재 구현을 정답의 유일한 근거로 삼지 않습니다. 중요한 설계 문제에서는 `test-design`을 사용합니다.
3. **테스트 구현:** **실제 코드 수정 전에** 사례를 테스트로 작성하거나 기존 테스트가 동일한 계약을 충분히 보호함을 확인합니다. 가능한 경우 변경 전 실패(Red)가 **의도한 결함 때문에** 발생하는지 관찰하고, 환경/fixture 문제와 구별합니다. 이미 통과하는 유효한 회귀 테스트를 억지로 실패시키지 않습니다.
4. **실제 구현:** 명세를 만족하는 최소한의 코드를 수정하고 새/기존 테스트를 통과시킵니다(Green). 필요하면 리팩터링 후 재검증합니다. 테스트 통과만을 위해 Spec·oracle을 사후 변경하지 않습니다.
5. **Review / Dispatch:** Spec ↔ 설계 ↔ 테스트 ↔ 제품 코드와 실제 검증 결과를 대조합니다. 명세·테스트가 틀렸으면 해당 단계를 바로잡은 뒤 구현을 재검토하고, 새로운 가정·범위·중요 접근 변경이면 **영향 Work를 멈추고 RPI Review → Research/Plan**으로 돌립니다. 국소 결함은 기존 유효한 명세/테스트에 근거해 재시도합니다. 필요하면 [Failure Recovery](../workflow-failure-recovery/SKILL.md)를 호출합니다.

서로 독립적인 Work 단위는 각자의 **Spec → 테스트 설계 → 테스트 구현 → 실제 구현**을 순서대로 지킨 범위에서 선택적으로 병행·반복할 수 있습니다. 자식 Work의 결과만으로 부모 전체 수용을 선언하지 않으며, 부모 Review에서 계약·회귀·통합을 다시 검사합니다. 실제 병렬 위임·workspace 격리·파일 소유권·통합 절차는 [workflow-parallel-development](../workflow-parallel-development/SKILL.md)를 따르며, shared workspace의 동시 write는 허용하지 않습니다.

**비동작 변경:** 문서 오타·포맷 등 실행 동작이 변하지 않는 작업은 무의미한 테스트를 만들지 않고 관련 Markdown/구성 검증을 사용합니다. 테스트 코드의 작성/실행이 불가능하면 어떤 단계를 실제로 수행하지 못했는지 표시하고, 완료를 주장하지 않습니다. 구현 전에 유효한 테스트 보호 근거도 확보하지 못했다면 구현을 강행하지 않고 차단·인계합니다.

**검증·인계:** [Routine Loop](../../../docs/development/workflows/routine-loop.md)와 [mise 검사](../../../docs/development/README.md#checks)에 따라 관련 테스트/전체 검사, diff 자체 리뷰, 미실행 사항과 실제 PR 근거를 기록합니다. RPI 단계의 추가 반복·종료는 이 Workflow가 아니라 상위 `workflow-iteration`가 결정합니다.

## Exit / Handoff

실제 변경 ref/PR, 수용 조건별 증거, 미확인 위험, 필요한 승인을 전달합니다. **PR 생성은 병합이 아닙니다.** 현재 작업이 단순하면 새 계획서·체크포인트를 의례적으로 만들지 않습니다.
