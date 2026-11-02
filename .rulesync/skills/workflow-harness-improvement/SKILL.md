---
name: workflow-harness-improvement
description: >-
  Use when recurring agent, Rulesync, Skill, workflow, or CI friction requires improvement and re-evaluation. Not for evaluation-only requests.
targets:
  - copilot
  - copilotcli
  - codexcli
  - claudecode
  - antigravity-ide
  - antigravity-cli
  - androidstudio
---

# Harness Improvement

## When / Not When

에이전트 선택·권한·진입점·컨텍스트 비용·중복 지침·개발환경·CI에서 **관찰 가능한 문제를 고치거나 개선**할 때 사용합니다. 동작을 평가만 한다면 [Harness Evaluation](../workflow-harness-evaluation/SKILL.md), 제품 자체 기능 구현이 주목적이면 Delivery를 사용합니다.

## Inputs

현재 실패/마찰 증거 또는 명확한 개선 목표, 영향을 받는 기존 정본, 비교 가능한 기존 동작, 변경 가능한 범위.

## Execute

1. **Observe:** 빈번한 실패, 과도한 로딩·토큰 비용, 사용자 개입, CI/검사 공백 등의 실제 징후와 baseline을 확보합니다. 증거가 없으면 가설로 표시합니다.
2. **Diagnose:** 저장소 정본·에이전트 정의·Skill·Workflow·도구·런타임 중 문제의 실제 owner를 결정합니다. 런타임 한계를 프롬프트 장문으로 우회하지 않습니다.
3. **Improve:** 기존 owner와 네이티브 검증을 먼저 재사용하고 최소 변경을 진행합니다. 실행 가능한 동작을 바꾼다면 [Delivery](../workflow-delivery/SKILL.md)의 Spec → 테스트 설계 → 테스트 구현 → 실제 구현 순서를 따릅니다. 새 Rule·Skill·Subagent·Workflow는 독립 재사용·발견 이익이 분명할 때만 추가합니다.
4. **Evaluate:** [Harness Evaluation](../workflow-harness-evaluation/SKILL.md)에서 영향 받는 시나리오를 **변경 전후 동일한 조건**으로 비교합니다. 자신이 수정한 기준만으로 통과를 선언하지 않습니다.
5. **Review:** 계약·보안·회귀·성능·유지보수 비용을 다시 확인합니다. 재진입·재귀·중단은 `mols-loops`에 맡기고, 실패한 개선은 근거를 남겨 원복하거나 인계합니다.

## Exit / Handoff

변경된 owner, 문제와 해결 근거, baseline 대비 관찰된 결과, 미검증/회귀 위험을 반환합니다. 권한·보안·검증·CI 변경은 영향을 받은 검사 자체와 독립된 검증 근거를 확보하고 [AGENTS.md](../../../AGENTS.md) 승인을 지킵니다. 개선을 위한 무제한 반복은 허용되지 않습니다.
