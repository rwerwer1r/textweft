---
name: workflow-failure-recovery
description: >-
  Use when a CI, test, or tool execution has actually failed and needs evidence-based recovery. Not for new work without a failure.
targets:
  - copilot
  - copilotcli
  - codexcli
  - claudecode
  - antigravity-ide
  - antigravity-cli
  - androidstudio
---

# Failure Recovery

## When / Not When

현재 작업이 검증·환경·도구 오류로 진행되지 못할 때 선택합니다. 실패 증거가 없는데 새로운 구현을 시작하려는 요청은 [Delivery](../workflow-delivery/SKILL.md)로 처리합니다.

## Inputs

실패한 정확한 작업·명령·CI 실행·ref, 실제 로그의 비민감한 관련 부분, 직전 정상 상태와 변경 범위.

## Execute

1. **Locate:** 실제 실패 상태와 첫 원인 후보를 분리합니다. 이전 실행 로그나 과거 성공을 현재 상태로 취급하지 않습니다.
2. **Classify:** 코드/테스트 결함, 환경·잠금 불일치, 외부 서비스/권한 문제, flaky 또는 미확인 문제를 구별합니다.
3. **Act:** 허가된 최소 변경 또는 좁은 재시도를 수행하고 같은 조건에서 재검증합니다. 제품 코드 결함을 수정할 때는 [Delivery](../workflow-delivery/SKILL.md)의 Spec·재현 테스트 설계/작성 → 수정 구현 순서를 따릅니다. 파괴적 reset·권한 변경·계정 우회는 대체 수단이 아닙니다.
4. **Stop:** 재시도가 원인 규명에 기여하지 않으면 무한 반복하지 않고 차단 이유와 필요한 다음 주체를 보고합니다.

## Exit / Handoff

실패 범위·근본 원인(확인/추정/불명), 실행한 복구, 현재 검증 상태, 남은 차단을 반환합니다. 원래 작업의 완료 조건은 해당 Workflow가 판단하며, 이 Workflow의 복구 시도가 완료를 자동 의미하지 않습니다.
