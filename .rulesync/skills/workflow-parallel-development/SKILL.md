---
name: workflow-parallel-development
description: >-
  Use when planning or coordinating multiple independent Work units;
  concurrent writes require verified delegated agents and isolated workspaces.
  Not for sequential work or shared-write workspaces.
targets:
  - copilot
  - copilotcli
  - codexcli
  - claudecode
  - antigravity-ide
  - antigravity-cli
  - androidstudio
---
# Parallel Agentic Development

## When / Not When

서로 독립적으로 수용 가능한 Work가 여러 개이고 실제 위임 Agent와 write-isolated workspace를 사용할 수 있을 때 선택합니다. 순차 의존성, 공유 파일·fixture, 불안정한 interface, 단일 shared workspace, 또는 런타임의 위임·격리 기능이 확인되지 않은 경우에는 쓰기 병렬화를 하지 않습니다.

## Ownership

- `mols-loops`는 outer Run/RPI/재귀/반복 예산을 소유합니다.
- `mols-stdd`는 Change와 Spec 상태를 소유합니다.
- `workflow-delivery`는 각 Work의 Spec → 테스트 설계 → 테스트 구현 → 구현 → Review 순서를 소유합니다.
- 이 Skill은 독립 Work의 병렬 분해·dispatch·격리·결과 회수·통합 경계만 소유합니다.
- 부모 Goal·Scope·Acceptance·권한·승인·완료 판정은 coordinator가 소유합니다.

## Inputs

현재 Change/Plan, 독립 수용 조건, dependency graph, 안정된 interface/spec, 파일·테스트 소유권, base ref, 실제 사용 가능한 Agent·workspace 기능, 검증 명령.

## Execute

1. **Assess benefit:** 병렬화의 시간·품질 이익이 context 전달·통합·충돌 비용보다 큰지 판단합니다. 적절한 Work가 하나뿐이면 직접 실행합니다.
2. **Decompose:** 파일 수가 아니라 독립적으로 검증·완료할 수 있는 결과로 Work를 나눕니다. 선행 관계를 DAG로 기록하고 공유 계약·API·스키마는 먼저 결정합니다.
3. **Assign ownership:** 각 Work의 Change/Work ID, Goal, Acceptance, dependency, 관련 Spec, base SHA, writable paths, read-only paths, out-of-scope, tests, output format을 지정합니다.
4. **Verify isolation:** 동시에 쓰는 Worker는 별도 worktree/branch 또는 동등한 runtime isolation과 disjoint write paths를 가져야 합니다. 같은 checkout을 공유하면 read-only 작업만 병렬화하고 writes는 직렬화합니다.
5. **Dispatch:** 필요한 최소 지침·Spec·계약만 전달하고 `mols-work-unit-worker` 또는 확인된 동등 Agent를 호출합니다. Worker는 자신의 Work에 `workflow-delivery`를 적용합니다.
6. **Track safely:** 실행·종료 상태를 확인합니다. timeout, incomplete response, partial write는 unknown입니다. 종료를 확인하지 못한 Worker를 재할당하지 않습니다.
7. **Integrate:** 단일 coordinator가 실제 변경 ref·diff·테스트·제한을 회수하고 충돌·중복·계약 불일치를 해결합니다. 통합된 상태에서 cross-Work tests와 부모 Acceptance를 다시 검증합니다.
8. **Reconcile Change:** 하나의 STDD `work.md`만 갱신합니다. 완료 조건·테스트·Review·Spec 반영이 확인되지 않으면 `done`으로 표시하지 않습니다.

## Stop Conditions

- 공통 파일·fixture·public contract를 동시에 수정해야 하는 경우 owner를 하나 정하고 순서를 계획합니다.
- worker workspace가 격리됐는지 확인할 수 없는 경우 병렬 쓰기를 중단합니다.
- worker가 부모 Scope를 넓히거나 승인·외부 쓰기·병합을 요구하면 해당 Work를 멈추고 coordinator에게 반환합니다.
- integration conflict나 통합 테스트 실패가 있으면 영향을 받는 Work만 재계획합니다. 개별 성공으로 전체 완료를 선언하지 않습니다.
- 실제 독립 Agent 실행이 아닌 순차적인 역할 분리는 parallel execution이라고 보고하지 않습니다.

## Exit / Handoff

Work별 실제 Agent·workspace·ref, 변경 파일, 수행한 테스트, 실패·미실행·unknown, 통합 결과, 부모 Acceptance의 상태와 다음 행동을 반환합니다. PR 생성은 병합이 아니며 승인 경계는 [AGENTS.md](../../../AGENTS.md)를 따릅니다.
