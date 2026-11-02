---
name: workflow-integration
description: >-
  Use only after explicit human approval and request to merge a particular PR, checking current review, CI, and permission gates. Not for PR creation or review alone.
targets:
  - copilot
  - copilotcli
  - codexcli
  - claudecode
  - antigravity-ide
  - antigravity-cli
  - androidstudio
---

# Integration

## When / Not When

사용자가 특정 PR의 **병합을 명시적으로 승인하고 요청**한 경우에만 선택합니다. PR 작성, CI 성공, 리뷰 요청, 자율 작업 선정은 병합 승인이 아닙니다.

## Inputs

정확한 PR·대상 저장소·계정, 사용자 승인, 최신 HEAD와 base, 플랫폼 권한·보호 규칙, 필수 리뷰·CI 근거.

## Execute

1. 요청한 PR과 변경 범위, 현재 head/base, 관련 승인·체크를 원격에서 재확인합니다.
2. 필수 검사·리뷰·승인·충돌 여부를 평가합니다. 브랜치 보호 규칙이 없더라도 [AGENTS.md](../../../AGENTS.md)의 **명시적 인간 승인**을 별도로 확인합니다.
3. 모든 조건이 실제 충족된 경우에만 허용된 방법으로 병합하고, 병합 결과·새로운 `main` ref를 다시 조회합니다.
4. 근거가 없거나 실패했다면 강제 push·체크 우회·계정 전환 없이 중단합니다.

## Exit / Handoff

실제로 관찰한 병합 여부·커밋과 잔여 작업을 반환합니다. 성공하지 않은 병합 시도나 준비된 PR을 통합 완료라고 보고하지 않습니다.
