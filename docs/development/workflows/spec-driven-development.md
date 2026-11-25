---
description: "STDD Change, 도메인 Spec, 변경 delta와 구현·테스트 추적성을 관리할 때 읽습니다."
---
# Spec-driven Development

행동 계약이 바뀌는 작업은 **Spec을 먼저 정하고, 테스트와 구현을 그 Spec에 연결**합니다. Textweft의 Change/Spec 저장 위치와 상태 소유권은 [STDD Workspace](../../../stdd/README.md) 및 [stdd-management](../../../.rulesync/skills/stdd-management/SKILL.md)이 소유합니다.

## Canonical Ownership

- `stdd/changes/<change-id>/work.md`: Change의 유일한 진행 상태, 목표, 완료 조건, 다음 행동.
- `stdd/changes/<change-id>/specs/<domain>/spec.md`: 해당 Change에서 바뀌는 요구사항 delta.
- `stdd/specs/<domain>/spec.md`: 검증되어 반영된 도메인 명세.
- 코드와 테스트: 기존 프로젝트 소유 경로. Spec이나 세션 기록에 복제하지 않습니다.
- 승인된 세션 복구·조사 증거: Change 상태나 도메인 Spec의 정본이 아닙니다.

## Spec Delta

행동 변경이 있을 때만 Spec을 작성합니다. 최소한 다음을 명확히 합니다.
- 변경 전 기준: 기존 Spec revision/내용 또는 기존 정본이 없음을 확인한 근거.
- Added / Changed / Removed: 요구사항 변화와 영향받는 도메인.
- Observable behavior: 입력·출력·상태 전이·오류·경계 조건.
- Acceptance: 성공·실패를 구별할 수 있는 관찰 가능한 시나리오.
- Constraints / Non-goals: 호환성, 권한, 성능, 제외 범위.

## Traceability

| 단계 | 질문 | 증거 |
| --- | --- | --- |
| Spec | 무엇이 참이어야 하는가? | 승인된 Change delta |
| Test Design | 어떤 사례가 계약을 판별하는가? | 테스트 oracle·경계 설계 |
| Test Implementation | 계약을 실제로 보호하는가? | 실행 가능한 테스트 |
| Implementation | 최소 구현이 Spec을 만족하는가? | 코드 diff·Green 결과 |
| Review | 모든 변경 요구가 반영됐는가? | Spec/Test/Code 대조 |
| Finalize | 도메인 정본 반영이 안전한가? | 최신 baseline·검증·반영 근거 |

Spec이 바뀌면 영향을 받는 테스트 설계·테스트 코드·구현을 재검토합니다. 테스트나 현재 구현을 정답의 유일한 근거로 삼지 않습니다. 검증 전 delta를 도메인 정본에 반영하지 않고, 충돌·stale baseline·부분 반영은 완료를 차단합니다.

## Lightweight Cases

오타·포맷·문서 링크처럼 행동 계약이 변하지 않는 작업에는 Change/Spec을 강제하지 않습니다. 작은 변경을 위해 가짜 명세나 별도 상태를 만들지 않습니다.
