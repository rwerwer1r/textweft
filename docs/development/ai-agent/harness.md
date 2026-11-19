---
description: "에이전트 런타임이 프로젝트 지침과 Skill을 발견하고 실제 작업에 적용하는지 검증할 때 읽습니다."
---
# Agent Harness Verification

선택한 런타임에서 지침과 Skill이 실제로 도달 가능하고 적용되는지 확인합니다.

## Trace the Loading Path

1. 실제 런타임·버전·저장소·ref·작업 경로·권한을 확인합니다.
2. 해당 작업에 적용되는 root instruction, path-scoped Rule, Workflow Skill, Subagent를 확인합니다.
3. Rulesync source/selector → lock → generated projection → runtime discovery의 각 경계를 구분합니다.
4. 런타임이 실제로 읽은 파일과 적용 범위를 관찰하고 대표 작업의 행동을 기대 계약과 대조합니다.

## Evidence Levels

| 수준 | 확인할 내용 | 증명하지 않는 것 |
| --- | --- | --- |
| Configured | source, selector, target, pinned revision 선언 | 런타임이 파일을 읽을 수 있음 |
| Reachable | 실제 런타임이 해당 작업에 맞는 원본을 발견·로드함 | 작업에서 지침을 준수함 |
| Observed Applied | 대표 작업이 지침·권한·검증 경계를 따르는 것을 관찰함 | 테스트하지 않은 런타임·작업 전체의 호환성 |

## Smoke Probe

가능한 런타임 하나에서 별도 작업 브랜치 또는 격리된 workspace를 사용합니다. `main`에서 파괴적 bootstrap을 실행하지 않습니다.

1. 실제 진입점이 `AGENTS.md`를 네이티브하게 찾는지, 확인된 런타임 포인터를 통해 `CHATBOT.md`를 찾는지 관찰합니다. 파일 존재만으로 첫 진입을 증명하지 않습니다.
2. 문서 수정 같은 작은 승인된 작업을 선택하고 해당 Rule/Skill의 실제 로드 경로를 추적합니다.
3. 허용된 변경을 수행하고 diff와 관련 검사를 확인합니다. 적용된 instruction, source authority, write boundary 준수를 관찰합니다.
4. 런타임·ref·실제 로드된 파일·작업 결과·실행 명령·증거 수준·미확인 항목을 기록합니다. 다른 런타임은 별도로 검증하지 않으면 unverified로 둡니다.

정적 Rulesync 검사와 실제 runtime evaluation을 혼동하지 않습니다. 여러 관점의 순차 검토는 독립 Agent 실행이 아니며, 별도 실행과 격리가 확인된 경우에만 병렬·독립 리뷰라고 표현합니다.
