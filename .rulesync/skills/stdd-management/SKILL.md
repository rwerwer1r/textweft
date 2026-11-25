---
name: stdd-management
description: >-
  Use to create, update, resume, or dispatch Textweft STDD Changes and spec deltas. Not for ordinary edits without persistent Change state.
targets:
  - copilot
  - copilotcli
  - codexcli
  - claudecode
  - antigravity-ide
  - antigravity-cli
  - androidstudio
---

# Textweft STDD Management

## Source of truth

[STDD Workspace](../../../stdd/README.md)의 `stdd/changes/<change-id>/work.md`가 Change 상태의 유일한 정본입니다. PR과 승인된 작업 기록은 재개 증거이며 상태 복제본이 아닙니다.

## Change Lifecycle

1. **Open:** 지속 상태가 필요한 독립 변경인지 판단합니다. 기존 Change가 있다면 재사용하고, 필요할 때만 새 `work.md`를 만들며 Goal/Scope/Acceptance/Out of Scope를 구체화합니다.
2. **Specify:** 제품 동작·공개 계약 변경이 있을 때만 `stdd/changes/<id>/specs/<domain>/spec.md`에 기존 Spec 대비 delta를 작성합니다. 기존 도메인 정본과 중복시키지 않습니다.
3. **Status:** `todo | doing | done | cancelled`만 저장합니다. `ready`는 미완료 선행 의존성이 없고 외부 차단이 없는 todo일 때만 계산합니다. 미완료/취소된 선행 Change는 blocked, 누락·순환·조회 실패는 unknown입니다. unknown을 ready로 추정하지 않습니다.
4. **Execute:** Work별 Spec/테스트 설계/테스트/구현은 [Delivery](../workflow-delivery/SKILL.md)에 맡깁니다. 실제 분리 Agent와 쓰기 격리 없이는 병렬 dispatch하지 않습니다.
5. **Close:** 모든 수용 조건과 전체 통합 검증을 확인한 뒤 `done`으로 전이하고, 검증된 delta를 필요 시 도메인 명세에 반영합니다. PR 병합은 별도 인간 승인입니다.

## Handoff

Change ID, 상태, 선행 차단, 현재 ref·검사·미검증, 다음 행동만 기록합니다. 추정된 자동 실행/스케줄링을 완료로 보고하지 않습니다.
