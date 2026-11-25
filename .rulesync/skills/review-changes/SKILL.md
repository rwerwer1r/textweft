---
name: review-changes
description: >-
  Use for focused evidence-based review of a Textweft commit, PR, or diff. Not for authoring changes, deciding approvals, or running an entire workflow.
targets:
  - copilot
  - copilotcli
  - codexcli
  - claudecode
  - antigravity-ide
  - antigravity-cli
  - androidstudio
---

# Change Review

## Inputs

변경 범위와 기준 SHA, 기대 동작·수용 조건, 영향을 받는 코드·테스트·문서, 사용 가능한 검증 근거.

## Review

1. 정확한 base/head와 변경 파일을 확인하고 호출자·사용 경로, 관련 계약부터 읽습니다.
2. 기능·회귀·보안/권한·실패 복구·입력 경계·문서/구성 드리프트를 영향도 순서로 탐색합니다. 검증 여부가 모호한 주장은 finding이 아니라 확인 과제로 분류합니다.
3. 의미 있는 finding에는 **경로/위치·재현 가능한 조건·영향·실측 또는 코드 근거·최소 수정 방향**을 포함합니다. 동일 원인의 중복 finding은 합칩니다.
4. 수정 뒤 변경된 diff와 해당 테스트를 다시 확인합니다. 한 모델이 관점을 바꿔 반복한 검토는 독립 리뷰가 아닙니다. 별도 Agent 실행이 검증되면 [Agent Roles](../../../docs/development/ai-agent/agents.md)에서 선택합니다.
5. 검증하지 못한 실행 환경과 잔여 위험을 구분합니다. PR 댓글 템플릿은 [GitHub review aids](../../../.github/templates/README.md)를 사용할 수 있습니다.

## Boundary

이 Skill은 판정 근거를 제공할 뿐 구현·상태 전이·승인·병합을 소유하지 않습니다. 전체 리뷰 단계는 [workflow-review](../workflow-review/SKILL.md)가 담당합니다.
