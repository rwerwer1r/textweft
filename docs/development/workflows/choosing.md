---
description: "요청된 작업 단계와 적합한 Workflow Skill을 선택하고 승인 경계를 확인할 때 읽습니다."
---
# Workflow Selection

요청된 단계만 수행하며 [AGENTS.md](../../../AGENTS.md)의 승인 경계는 항상 유지합니다.

| 요청 | 수행 가능 | 중단 경계 |
| --- | --- | --- |
| 준비 | 조사·설계·계획·필요 시 Draft PR | 승인 없는 구현·병합 |
| 구현/PR | 범위 내 수정·검사·자체 리뷰·PR | 병합·릴리스·배포 |
| 리뷰 | diff·검증·Finding 보고, 요청된 수정 | 별도 승인 없는 수정·병합 |
| 병합 | 최신 ref·리뷰·CI·권한·승인 확인 후 병합 | 필수 조건 미충족 |

## Select a Workflow

| 작업 | Skill |
| --- | --- |
| 자율 목표 선택·조정 | [workflow-autopilot](../../../.rulesync/skills/workflow-autopilot/SKILL.md) — 사용자가 직접 선택한 경우만 |
| 범위가 정해진 구현 | [workflow-delivery](../../../.rulesync/skills/workflow-delivery/SKILL.md) |
| 독립 Work의 실제 병렬 위임 | [workflow-parallel-development](../../../.rulesync/skills/workflow-parallel-development/SKILL.md) |
| 조사·설계·계획 | [workflow-investigation](../../../.rulesync/skills/workflow-investigation/SKILL.md) |
| 독립 리뷰 | [workflow-review](../../../.rulesync/skills/workflow-review/SKILL.md) |
| 실제 CI/test/tool 실패 복구 | [workflow-failure-recovery](../../../.rulesync/skills/workflow-failure-recovery/SKILL.md) |
| 하네스 개선·재평가 | [workflow-harness-improvement](../../../.rulesync/skills/workflow-harness-improvement/SKILL.md) |
| 중단 작업 재개 | [workflow-resumption](../../../.rulesync/skills/workflow-resumption/SKILL.md) |
| 승인된 PR 병합 | [workflow-integration](../../../.rulesync/skills/workflow-integration/SKILL.md) |

일상 변경은 [Routine Loop](routine-loop.md), 행동 변경의 Spec/TDD 순서는 [Spec-driven](spec-driven-development.md)과 [Test-driven](test-driven-development.md)을 따릅니다. 병렬화는 격리와 독립성이 확인될 때만 선택합니다. Skill 선택은 권한을 확대하지 않습니다.
