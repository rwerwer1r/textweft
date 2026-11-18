---
description: "Autopilot, 병렬 Work Worker, 독립 리뷰 Agent의 선택·위임·실행 한계를 확인할 때 읽습니다."
---
# Agent Roles and Delegation

에이전트 자산의 작성 유형과 실제 실행 역할을 구분합니다. 공통 권한은 [AGENTS.md](../../../AGENTS.md), 작업 절차는 [Workflow Skills](../../../.rulesync/skills/README.md), 실제 런타임 증거는 [Harness Verification](harness.md)가 소유합니다.

## Main Agent: User-selected Autopilot

[`mols-autopilot`](../../../.rulesync/subagents/mols-autopilot.md)은 사용자가 직접 선택해야 시작하는 최상위 자율 작업자입니다. 목표·우선순위에서 다음 일을 선택하고 범위 내 작업을 조정할 수 있지만 병합·배포·고위험 결정 권한을 만들지 않습니다. 위임 호출로 자율 역할을 활성화하지 않습니다.

## Work Unit Worker

[`mols-work-unit-worker`](../../../.rulesync/subagents/mols-work-unit-worker.md)는 coordinator가 명시적으로 할당한 독립 Work 하나를 수행하는 위임형 Agent입니다.

- 사용자가 직접 선택하는 독립 메인 Agent가 아닙니다. 상위 coordinator의 Goal·Scope·Acceptance·승인 경계를 상속하며 확대할 수 없습니다.
- 할당된 Change/Work ID, Spec, 의존성, 정확한 write paths, 제외 범위, base ref, 테스트와 보고 형식을 받습니다.
- 자신의 Work에 [workflow-delivery](../../../.rulesync/skills/workflow-delivery/SKILL.md)를 적용합니다. 행동 변경은 Spec → 테스트 설계 → 테스트 구현 → 제품 구현 순서를 따릅니다.
- 다른 Worker와 동시에 쓰려면 별도 worktree/branch 또는 동등한 runtime isolation과 disjoint file ownership이 필요합니다. 공유 workspace에서는 쓰기 병렬화를 하지 않습니다.
- Worker는 자신의 변경·검증 결과를 반환하고, 부모 Change 상태·통합·최종 완료·PR 병합을 소유하지 않습니다.
- 종료 여부를 확인할 수 없는 Worker를 재할당하지 않습니다. timeout이나 성공 메시지를 완료 증거로 간주하지 않습니다.

## Delegated Review

[`mols-review-dualvantage`](../../../.rulesync/subagents/mols-review-dualvantage.md)는 필요할 때만 호출하는 검토 전용 Agent입니다. Verifier와 Challenger가 분리된 증거를 수집하고 Root가 후보를 판정합니다. 수정·병합·최종 승인은 소유하지 않습니다.

## Runtime and Evidence

Rulesync 메타데이터는 target-native Agent 파일을 생성하지만 직접 선택·호출 제한·병렬성·workspace 격리를 모든 런타임에서 보장하지 않습니다. 실제 기능은 [Harness Verification](harness.md)으로 평가합니다. 여러 역할을 한 모델이 순차 수행하면 독립 병렬 실행으로 보고하지 않습니다.
