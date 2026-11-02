# Textweft Project Workflows

이 디렉터리는 **프로젝트 업무 흐름**의 Git 추적 정본입니다. 에이전트 역할이나 권한을 정의하지 않습니다. 공통 권한·승인은 [AGENTS.md](../../AGENTS.md), 요청 단계는 [Workflow Selection](../../docs/development/workflows/choosing.md), 일상 작업 최소 기준은 [Routine Loop](../../docs/development/workflows/routine-loop.md)가 소유합니다.

## Select by Outcome

사용자의 의도와 허용 범위에 해당하는 **주 Workflow 하나**를 선택하고 해당 `WORKFLOW.md`만 읽습니다. 필요한 경우에만 다른 Workflow를 보조로 호출합니다.

| 요청·상황 | 선택할 Workflow | 선택하지 않을 경우 |
| --- | --- | --- |
| 사용자가 직접 선택한 자율 작업자가 목표에서 다음 일을 고르고 진행 | [Autopilot](autopilot/WORKFLOW.md) | 일반 에이전트의 자동 위임이나 단순한 작업 요청 |
| 사실 조사·설계·대안 비교·계획이 최종 결과 | [Investigation](investigation/WORKFLOW.md) | 구현이 이미 승인되어 결과물이 변경인 경우 |
| 코드·문서·설정·테스트를 수정하고 인계 | [Delivery](delivery/WORKFLOW.md) | 리뷰·조사 결과만 요청한 경우 |
| 변경·구조·문서·하네스의 문제점과 근거 평가 | [Review](review/WORKFLOW.md) | 기존 Finding에 따른 수정을 주로 요청한 경우 |
| 반복 문제를 찾아 에이전트·규칙·절차·CI 개선 | [Harness Improvement](harness-improvement/WORKFLOW.md) | 순수한 하네스 동작 평가만 필요한 경우 |
| 에이전트 선택·위임·권한·작업 품질의 실제 평가 | [Harness Evaluation](harness-evaluation/WORKFLOW.md) | 정적 설정/Markdown 형식 검사만 필요한 경우 |
| 실패한 CI·검증·도구 실행의 원인 규명과 복구 | [Failure Recovery](failure-recovery/WORKFLOW.md) | 실패 없이 새 기능을 구현하는 경우 |
| 이전 실행·세션·작업 주체로부터 안전한 작업 이어가기 | [Resumption](resumption/WORKFLOW.md) | 현재 상태만으로 충분한 짧은 작업 |
| **명시적인** PR 병합 요청 | [Integration](integration/WORKFLOW.md) | PR 생성·리뷰 또는 CI 통과만 한 경우 |

## Composition and Boundaries

- **Workflow**는 단계·결과·중단 경계를 소유합니다. **Skill**은 전문 작업법, **Subagent**는 별도 실행 단위, **Command**는 해당 런타임의 진입점입니다. 이 파일들은 Rulesync 생성 대상이 아닌 프로젝트 문서로, 자동 발견·호출을 보장하지 않습니다.
- Autopilot은 직접 선택된 최상위 실행에서만 목표와 다음 작업을 조정합니다. 일반 에이전트는 부여받은 작업 범위에서 전문 Workflow를 직접 선택할 수 있지만, 위임 호출로 Autopilot의 권한을 얻지 못합니다.
- 복잡한 작업의 반복 방법이 필요하면 기존 `mols-loops` Skill을 사용합니다. Workflow마다 새 범용 루프·로그·검증 엔진을 만들지 않습니다.
- 요청이 **준비·리뷰** 단계라면 Workflow를 선택했다는 이유로 구현이나 병합으로 이동하지 않습니다. 별도 허용된 수정도 [AGENTS.md](../../AGENTS.md)의 권한 범위 안에서만 수행합니다.
- 필수 근거·도구·승인이 없으면 해당 동작을 중단하거나 한계를 밝히고 인계합니다. 긴 작업의 기록은 [Inbox](../../.inbox/README.md)의 기존 작업 상태를 재사용합니다.
- **현재 개발 우선순위** P0 하네스 → P1 MVP 설정 → P2 MVP 구현은 [Development](../../docs/development/README.md)가 소유합니다. 이 목록은 새로운 제품 결정을 뜻하지 않습니다.

## Minimal Workflow Contract

각 `<name>/WORKFLOW.md`는 적용·제외 조건, 필요한 입력, 작업 흐름, 확인 가능한 종료 기준, 차단·인계를 설명합니다. 공통 정책은 링크로 참조하며 중복 복제하지 않습니다. 특정 Workflow에 실제 별도 자료가 필요할 때만 하위 파일을 추가합니다.

**검증 수준:** Markdown·링크·CI 성공은 정적 구성의 증거입니다. 실행 라우팅·위임 거절·에이전트 독립성·자율 선택의 성능은 [Harness Evaluation](harness-evaluation/WORKFLOW.md)에 따라 실제 런타임에서 별도 관찰해야 합니다.
