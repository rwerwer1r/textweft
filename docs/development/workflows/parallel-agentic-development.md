---
description: "여러 Agent가 독립 Work를 병렬 수행할 때 분해·파일 소유권·격리·통합 규칙을 확인합니다."
---
# Parallel Agentic Development

병렬 개발은 Agent 수를 늘리는 방식이 아니라 **독립적으로 수용 가능한 Work를 분리하고 충돌 비용을 통제하는 방식**입니다. 바깥 RPI·재귀·반복 예산은 `mols-loops`, 각 Work의 Spec/TDD 절차는 `workflow-delivery`, 병렬 실행 조정은 [workflow-parallel-development](../../../.rulesync/skills/workflow-parallel-development/SKILL.md)가 소유합니다.

## When Parallelism Pays

병렬화할 수 있는 조건:
- 각 Work의 완료 조건을 독립적으로 검증할 수 있습니다.
- 필요한 선행 계약과 API/interface가 안정되어 있습니다.
- Work 간 dependency가 명시되어 있고 서로의 미완료 결과를 기다리지 않습니다.
- 소유 파일·테스트·fixture가 분리되어 있습니다.
- 실행 Agent와 별도 workspace/branch 또는 동등한 write isolation이 실제 지원됩니다.
- 통합·cross-work 검증 비용을 포함해도 병렬화 이익이 있습니다.

다음은 직렬화합니다: 동일 파일·공유 fixture·공개 API·스키마·공통 테스트의 동시 수정, 아직 결정되지 않은 Spec, 상호 의존적인 순차 단계, 동일 checkout의 동시 write. 격리 없는 런타임에서는 조사·리뷰만 병렬화하고 변경은 순차 수행합니다.

## Decomposition and Dispatch

1. Coordinator가 Goal·Acceptance를 유지하면서 독립 수용 조건 기준으로 Work를 나누고 dependency DAG를 만듭니다. 파일 개수나 임의의 코드 레이어로 쪼개지 않습니다.
2. 공유 경계가 있다면 먼저 Spec·interface·계약·테스트 oracle을 정하고 한 명의 owner를 지정합니다.
3. 각 Worker에 Change ID, Work ID, 목표, acceptance, 관련 Spec, base SHA, 선행 결과, 허용 write paths, 제외 범위, 테스트 명령, 보고 형식을 전달합니다.
4. 실제 격리된 workspace를 만들고 소유권이 겹치지 않는지 확인한 뒤 독립 Work만 dispatch합니다.
5. 각 Worker는 자신의 Work에 Spec → 테스트 설계 → 테스트 구현 → 구현 → Review를 적용합니다.

## Isolation and Coordination

- **하나의 coordinator**만 Work 배분·재배분·통합·부모 수용을 소유합니다.
- 동시에 쓰는 Worker는 별도 worktree/branch 또는 런타임이 보장하는 동등한 격리가 필요합니다. 단순히 다른 Agent 이름이나 다른 대화라는 이유로 격리됐다고 보지 않습니다.
- 각 Worker의 write path와 소유 테스트를 명시합니다. 공통 파일과 통합 테스트는 지정된 owner만 수정합니다.
- 공유 workspace에서 동시 편집하지 않습니다. 격리를 확인할 수 없으면 read-only 병렬 검토 또는 직렬 작업으로 전환합니다.
- Worker가 끝났는지 모르면 재할당하지 않습니다. timeout·중단·부분 성공은 확인 전까지 unknown입니다.
- Worker는 부모 Scope·Acceptance·권한·승인을 확대하지 않습니다. 외부 저장소나 서비스에 쓰지 않습니다.

## Integration

1. Worker별 실제 branch/ref, commit 또는 변경 파일, 테스트 실행과 미실행, 실패·제한을 회수합니다. 응답 문장만으로 성공을 판정하지 않습니다.
2. Coordinator가 현재 base와 각 산출물의 diff를 확인하고 충돌·중복·계약 차이를 해결합니다.
3. 통합된 상태에서 cross-work 계약·회귀·통합 테스트를 실행합니다. 개별 Worker의 통과가 통합 결과의 통과를 의미하지 않습니다.
4. 부모 Spec·Change 수용 조건을 다시 확인하고 필요한 문서·인덱스·라우팅을 갱신합니다.
5. 완료 조건이 충족되지 않으면 부모 Change를 done으로 표시하지 않고 earliest stale prerequisite에서 재계획하거나 인계합니다.

## Evidence

병렬 실행을 주장하려면 서로 다른 Agent 실행, 분리된 context, 독립 workspace, 실제 동시 실행 근거를 확인합니다. 하나의 Agent가 역할을 바꿔 순차 실행한 것은 병렬 Agent 개발이 아닙니다. 런타임이 위임·worktree·동시 실행을 제공하지 않으면 해당 기능을 가정하지 않고 순차 실행합니다.
