---
name: workflow-harness-evaluation
description: >-
  Use to evaluate observed agent, Skill, workflow routing, permission, or quality behavior. Not for Markdown formatting or static config checks alone.
targets:
  - copilot
  - copilotcli
  - codexcli
  - claudecode
  - antigravity-ide
  - antigravity-cli
  - androidstudio
---

# Harness Evaluation

## When / Not When

Agent/Skill/Workflow의 라우팅, 다른 Agent 호출 차단, 도구 사용, 결과 품질, 실패·복구·승인 준수를 **관찰 가능한 시나리오**로 검증할 때 사용합니다. 파일 형식과 링크 검사만 필요하면 현재 `mise run check` 또는 관련 네이티브 도구를 사용합니다.

## Inputs

평가할 정본·기준 ref·런타임·도구·권한·모델, baseline과 변경 후보, [대표 시나리오](references/scenarios.md), 관찰 가능한 성공·실패 기준.

## Execute

1. 실제 평가 가능한 범위와 시나리오 종류(긍정, 제외, 경합, 우회, 장애)를 선택합니다. 가능한 한 동일 조건에서 baseline을 확인합니다.
2. **정적 확인**(문서·설정·생성), **시뮬레이션**(사고 실험), **실행 관찰**(실제 런타임 호출·행동)을 분리합니다.
3. 지원되는 런타임에서 선택·호출·권한·종료·최종 결과를 관찰합니다. 불가한 런타임은 `not-run`, 시뮬레이션은 `simulated`로 명시합니다.
4. 기대/관찰 차이, 잘못 선택한 경우, 불필요한 위임·기록, 사람의 개입, 회귀를 비교합니다. 실패 조건의 실제 근거 없이 성공률을 추정하지 않습니다.
5. 발견한 문제를 기존 자산 owner에게 반환하고 필요하면 [Harness Improvement](../workflow-harness-improvement/SKILL.md)로 인계합니다.

## Exit / Handoff

실제 실행된 시나리오와 각 결과, 실행하지 못한 항목, baseline 대비 변화, 수용/차단 여부를 제시합니다. **CI의 Markdown/Rulesync 검사가 성공했다는 이유로 실제 에이전트 선택·독립성·비위임 강제를 검증했다고 주장하지 않습니다.**
