---
description: "공통 지침, 경로별 Rule, task-selected Skill, Agent 정의 중 어디에 규칙을 둘지 결정할 때 읽습니다."
---
# Agent Instruction Ownership

**소유권과 런타임 활성화는 별개**입니다. 가장 작은 적용 표면에 규칙을 두고 진입점에서는 링크로 라우팅합니다.

| 적용 조건 | 후보 | 소유 범위 |
| --- | --- | --- |
| 모든 저장소 작업 | root `AGENTS.md` | 권한, 필수 절차, 공통 경계 |
| 특정 하위 경로에서만 | scoped `AGENTS.md` 또는 native path Rule | 해당 경로의 고유 계약 |
| 특정 파일 패턴에서만 | 런타임 path-scoped instruction | 실제 matcher와 precedence가 확인된 범위 |
| 작업 의도에 따라 재사용 | `workflow-*` 또는 전문 Skill | task procedure와 capability |
| 별도 실행 주체가 유익 | Subagent/Agent | 명시적으로 할당된 실행 범위 |
| 사람의 탐색이 필요한 주제 | `docs/` 정본 | 설명·결정·참조 자료 |

- 공통 권한을 여러 Skill이나 문서에 복제하지 않습니다.
- category를 채우려고 scoped rule, Skill, Subagent를 만들지 않습니다. 독립된 재사용·발견 가치가 있어야 합니다.
- 생성된 target-native 파일은 정본이 아닙니다. source framework와 target runtime의 책임을 구분합니다.
- 실제 matcher, precedence, 로딩을 모르면 보장하지 않습니다.

[Harness Verification](harness.md)에서 적용·비적용 작업을 각각 시험합니다. 설정·생성 파일만으로 행동을 추론하지 않습니다.
