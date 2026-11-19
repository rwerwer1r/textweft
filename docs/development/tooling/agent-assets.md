---
description: "Textweft가 직접 소유하는 Skill·Subagent의 선택·사용·검증 기준을 확인할 때 읽습니다."
---
# Project Agent Assets

Textweft의 Agent Skill은 **이 저장소가 직접 작성하고 유지**합니다. 작업·권한의 정본은 [AGENTS](../../../AGENTS.md), 자산 발견은 [ROUTE](../../../.agents/route/ROUTE.md), 배포 대상별 생성은 [Rulesync](rulesync.md)를 따릅니다. 타 저장소의 Skill 설치, pinned upstream revision, 외부 Skill lock은 사용하지 않습니다.

## Local Skills

| Skill | 선택 조건 |
| --- | --- |
| [agent-asset-design](../../../.rulesync/skills/agent-asset-design/SKILL.md) | Rule·Skill·Subagent 계약과 라우팅을 설계·정비 |
| [review-changes](../../../.rulesync/skills/review-changes/SKILL.md) | 커밋·PR·diff의 근거 중심 결함 검토 |
| [test-design](../../../.rulesync/skills/test-design/SKILL.md) | Spec 기반 관찰 가능한 테스트와 oracle 설계 |
| [workflow-iteration](../../../.rulesync/skills/workflow-iteration/SKILL.md) | 복잡한 작업의 제한된 RPI·재귀·반복·재진입 제어 |
| [stdd-management](../../../.rulesync/skills/stdd-management/SKILL.md) | STDD Change·Spec delta·상태·위임 관리 |
| [chatbot-continuity](../../../.rulesync/skills/chatbot-continuity/SKILL.md) | 실제 트리거 수단이 있는 다회 실행·세션 재개 작업 |

위 전문 Skill은 [workflow-*](../../../.rulesync/skills/README.md) 절차와 조합할 수 있습니다. `workflow-iteration`이 RPI 전이와 반복 종료를, `workflow-delivery`가 각 Work의 Spec → 테스트 설계 → 테스트 구현 → 구현을, `workflow-parallel-development`가 실제 격리된 병렬 Work를 소유합니다. **작업별 description을 보고 필요한 원본만 선택**하며, 기존 권한을 확대하지 않습니다.

## Locally managed Agents

사용자 직접 선택형 `textweft-autopilot`, 위임형 `textweft-work-unit-worker`, 검토 coordinator·Verifier·Challenger는 [Agent Roles](../ai-agent/agents.md)에서 역할과 호출 제한을 설명합니다. 원본은 `.rulesync/subagents/`에 있으며 자동 선택·위임·워크스페이스 격리의 실제 보장은 런타임별로 확인해야 합니다.

## Ownership and Verification

- **Single source:** 프로젝트 Skill은 `.rulesync/skills/<name>/SKILL.md`, Agent는 `.rulesync/subagents/<name>.md`에 작성합니다. 생성된 벤더 전용 파일은 정본이 아닙니다.
- **Routing:** `mise run routes:generate`로 `skills.jsonl`을 재생성하고 `mise run routes:check`로 드리프트를 확인합니다. 파생 색인을 직접 수정하지 않습니다.
- **Projection:** `mise run rulesync:preview`로 읽기 전용 계획을 보고 `mise run rulesync:generate`로 현재 런타임의 도구별 사본을 만듭니다. 외부 설치·동기화 단계는 없습니다.
- **Validation:** `mise run check`와 [런타임 검증](../ai-agent/harness.md)을 구분합니다. CI 통과는 Skill이 실제로 로드되거나 Subagent가 독립 실행된 증거가 아닙니다.
- **Existing clones:** 과거 `.curated/` 캐시가 남아 있으면 `mise run update`가 재투영을 막기 위해 중단합니다. [로컬 이전 절차](rulesync.md#lifecycle)에 따라 수동 확인·정리하고 재시도합니다. 이미 생성된 이전 Agent 파일도 런타임별로 확인해야 합니다.
- **Bootstrap:** `mise run bootstrap`과 `mise run update`는 mise·npm·Lefthook·프로젝트 자산 투영만 동기화합니다. 외부 코드 다운로드는 선언된 일반 개발 도구·npm 의존성 설치 범위이며, 타 저장소 Skill 소스를 사용하지 않습니다.
