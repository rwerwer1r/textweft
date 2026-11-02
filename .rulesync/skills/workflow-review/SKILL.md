---
name: workflow-review
description: >-
  Use for a standalone evidence-backed review of a PR, diff, code, docs, or harness. Not a replacement for routine implementation self-review.
targets:
  - copilot
  - copilotcli
  - codexcli
  - claudecode
  - antigravity-ide
  - antigravity-cli
  - androidstudio
---

# Review

## When / Not When

PR·diff·코드·문서·설계·에이전트 하네스의 품질을 **독립된 결과물로 평가**할 때 사용합니다. 구현만 요청된 경우 Delivery의 범위 내 자체 리뷰를 우선합니다.

## Inputs

정확한 대상과 기준 ref/commit, 주장된 목적·수용 조건, 적용 계약, 허용된 검증 범위.

## Execute

1. 실제 변경과 호출자/사용자 동작 경로, 관련 계약·회귀 위험을 확인합니다. 근거 없는 일반적 우려보다 재현 가능한 결함을 우선합니다.
2. 필요에 따라 기존 `review-changes` 또는 `mols-agent-asset` Skill을 활용합니다. 별도 Agent 실행이 가능하고 가치가 있으면 DualVantage 등의 **진짜 분리 실행**을 선택합니다.
3. Finding마다 위치·영향·재현 조건·근거·확인/반증 방법을 남기고, 스타일 취향이나 미확인 가정을 구별합니다. 실제 검증과 미실행 검증을 구분합니다.
4. 수정이 요청·허용된 경우에만 [Delivery](../workflow-delivery/SKILL.md) 또는 [Harness Improvement](../workflow-harness-improvement/SKILL.md)로 넘겨 변경과 재검토를 수행합니다.

## Exit / Handoff

중요도순 Finding, 없으면 검토한 범위와 잔여 위험, 재검증 가능한 evidence, 후속 행동을 반환합니다. **같은 대화에서 관점을 바꾼 검토는 독립 에이전트 리뷰가 아닙니다.** 리뷰 요청만으로 병합하거나 요구·권한을 변경하지 않습니다.
