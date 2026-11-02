---
name: workflow-investigation
description: >-
  Use when the requested result is research, comparison, design, or planning evidence. Not when the requested result is code implementation.
targets:
  - copilot
  - copilotcli
  - codexcli
  - claudecode
  - antigravity-ide
  - antigravity-cli
  - androidstudio
---

# Investigation

## When / Not When

질문에 답하거나 아키텍처·의존성·MVP 범위의 대안을 조사하고 **판단 자료**를 제공할 때 선택합니다. 실행 결과를 바꾸는 구현·배포가 요구된 경우 [Delivery](../workflow-delivery/SKILL.md)를 선택합니다.

## Inputs

구체적 질문 또는 목표, 현재 기준 ref와 제품·아키텍처 계약, 비교 기준, 확인 가능한 소스, 사람의 결정을 필요로 하는 항목.

## Execute

요청된 결과가 RPI Research 또는 Plan 단계 자체이면 `mols-loops`의 종료 깊이를 따릅니다. 별도 조사·설계 문서가 Work 산출물이라면 상위 RPI를 생략하지 않습니다. 조사 요청만으로 구현 권한을 추론하지 않습니다.

1. 확정된 요구사항과 추정, 근거가 필요한 핵심 질문을 분리합니다. 해당 부분의 코드·문서·검사만 점진적으로 읽습니다.
2. 가능한 선택지를 목적·복잡도·운영 비용·회귀·호환성 관점에서 비교하고 결정적인 반례를 살핍니다.
3. 가장 작은 실행 가능한 권고와 비목표·가정·미확인 근거를 제시합니다. 설계가 구현 단계로 넘어갈 준비가 됐는지는 수용 조건으로 판단합니다.

## Exit / Handoff

결론, 주요 근거, 권고·보류된 결정, 필요하다면 구현 가능한 다음 범위를 반환합니다. **조사 요청만으로 코드·설정·기존 PR을 변경하지 않으며**, 구현 승인이나 병합 권한을 추론하지 않습니다.
