---
name: delivery
description: 승인된 범위의 코드·문서·설정 변경을 검증하여 PR로 인계
---

# Delivery

## When / Not When

범위가 정해진 기능·버그·테스트·문서·설정 변경을 수행할 때 선택합니다. 검토·조사만 요청된 경우 해당 Workflow를 우선하며, 하네스 자체 개선이 주목적이면 [Harness Improvement](../harness-improvement/WORKFLOW.md)를 선택합니다.

## Inputs

목표·수용 조건·제외 범위, 현재 기준 ref·관련 계약, 실제 쓰기 권한, 승인 상태.

## Execute

1. [Routine Loop](../../../docs/development/workflows/routine-loop.md)의 확인·최소 변경·검증·리뷰·인계를 **공통 절차로 재사용**합니다. 기존 변경·PR을 확인하고 작은 작업 브랜치를 사용합니다.
2. 변경 성격에 맞는 검사를 [mise 작업](../../../docs/development/README.md#checks)에서 선택하고, 실행 결과와 미실행 항목을 구분합니다.
3. 실제 diff를 검토해 회귀·보안·계약 위반을 수정합니다. 심각한 Finding에 별도 반증이 필요하면 [Review](../review/WORKFLOW.md)를 조합합니다.
4. 검증 실패라면 [Failure Recovery](../failure-recovery/WORKFLOW.md)로 원인을 확인한 뒤, 현재 범위와 근거가 유효할 때만 수정·재검증합니다.

## Exit / Handoff

실제 변경 ref/PR, 수용 조건별 증거, 미확인 위험, 필요한 승인을 전달합니다. **PR 생성은 병합이 아닙니다.** 현재 작업이 단순하면 새 계획서·체크포인트를 의례적으로 만들지 않습니다.
