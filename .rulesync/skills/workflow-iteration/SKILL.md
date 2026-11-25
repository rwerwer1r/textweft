---
name: workflow-iteration
description: >-
  Use for bounded recursive Research-Plan-Implement-Review loops on complex Textweft tasks or explicit repeated improvement. Not for trivial single-pass edits.
targets:
  - copilot
  - copilotcli
  - codexcli
  - claudecode
  - antigravity-ide
  - antigravity-cli
  - androidstudio
---

# Iterative Work Orchestration

## Ownership

Textweft의 복합 작업에서 **Research → Plan → Implement → Review (RPI)** 재진입·재귀·종료 판단을 소유합니다. 도메인 구현은 `workflow-delivery`, 하네스 개선은 `workflow-harness-improvement`, 독립 Work의 병렬화는 `workflow-parallel-development`가 소유합니다.

## Prepare

1. 목표·완료 조건·제외 범위·사용자 승인·현재 Git/CI 상태를 확인합니다. 불명확한 제품/권한 결정은 멈춰 확인합니다.
2. 제한된 반복 예산(작업 범위, 확인 비용, 다음 체크포인트)을 정하고, 재개에 필요한 경우에만 [STDD](../../../stdd/README.md)의 해당 Change 및 [Routine Loop](../../../docs/development/workflows/routine-loop.md#commit-checkpoints)에 따라 필요한 재개 증거를 남깁니다.
3. 단순 작업이면 별도 루프·재귀·분해 없이 해당 Workflow로 직접 실행합니다.

## Loop

1. **Research:** 사실·가정·현재 계약·실패 증거를 분리합니다. 충분하면 조사에서 바로 Plan으로 진행합니다.
2. **Plan:** 검증 가능한 작은 Work와 순서·의존성·수용 기준·권한을 정합니다. 독립 Work만 조건부 병행합니다.
3. **Implement:** 각 Work에 필요한 원본 Skill만 로드하고, 동작 변경은 Spec → 테스트 설계 → 테스트 구현 → 구현을 지킵니다.
4. **Review:** 산출물과 부모 Goal·Spec·테스트·실제 CI를 대조합니다. 결함은 해당 Work로 재진입하고, 요구·가정 변경은 Research/Plan으로 돌아갑니다. 자식 Work 완료만으로 부모 목표 완료를 선언하지 않습니다.
5. **Decision:** 목표 충족+잔여 위험 명시 → 종료. 재현 가능한 finding+예산 잔여 → 재시도. 반복 무진전·예산 소진·승인 필요·실행 환경 부재 → 중단·인계. 무제한 반복이나 허가 없는 장기 실행을 만들지 않습니다.

## Exit

현재 ref·완료된 Work·실제 테스트와 미실행·남은 문제·재개 조건을 기록합니다. 자동 호출·병합 권한은 [AGENTS](../../../AGENTS.md)를 넘지 않습니다.
