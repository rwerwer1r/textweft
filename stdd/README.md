# STDD Workspace

`stdd/`는 Textweft의 **Change 작업 및 명세 관리 정본**입니다. Work root와 Spec root 모두 이 디렉터리를 사용합니다. Git ref는 실제 Change/PR의 작업 ref를 확인해 선택하며, 별도의 STDD 전용 브랜치나 상태 DB를 강제하지 않습니다.

## Layout

```text
stdd/
  changes/<change-id>/work.md                  # 유일한 Change 진행 상태
  changes/<change-id>/specs/<domain>/spec.md   # 행동 요구사항 변경 시 delta
  specs/<domain>/spec.md                       # 검증·반영된 도메인 명세
```

- **Change ID**는 `stdd/changes/` 아래 정규화된 상대 경로입니다. 독립적으로 검증·완료할 수 있는 결과 하나에 ID 하나를 사용합니다.
- `work.md`는 목표·완료 조건·다음 행동과 `status: todo | doing | done | cancelled`를 기록합니다. `depends_on`은 선택 사항입니다. `ready`·`blocked`·`unknown`은 저장하지 않고 계산합니다. 모든 선행 Change가 `done`이고 외부 차단이 없는 `todo`만 `ready`입니다. 미완료·취소된 선행 Change는 `blocked`, 선행 Change의 누락·순환·조회 실패는 `unknown`이며 확인할 수 없는 상태를 `ready`로 추정하지 않습니다.
- 명세 delta는 동작 계약이 바뀔 때만 기록합니다. 이미 정본인 도메인 문서가 있으면 해당 정본을 유지하고 중복 명세를 만들지 않습니다. 제품 코드·테스트는 기존 위치를 사용합니다.
- Change를 발행하는 행위는 GitHub Issue 생성이나 실행 승인과 다릅니다. 첫 도입 단계에서는 빈 Change·가상 티켓·샘플 명세를 만들지 않습니다.

## Execution

[stdd-management](../.rulesync/skills/stdd-management/SKILL.md)에서 Change 발행·진행·재개·위임 절차를 선택하고, 복합 루프는 [workflow-iteration](../.rulesync/skills/workflow-iteration/SKILL.md), 소프트웨어 변경의 테스트 우선 순서는 [workflow-delivery](../.rulesync/skills/workflow-delivery/SKILL.md)가 소유합니다.

승인된 세션 복구 기록은 **비정본 증적**이며 Change 상태를 중복 소유하지 않습니다. PR/CI의 상태도 `work.md`를 대신하지 않습니다. 완료 판정·명세 반영은 실제 검증 근거를 필요로 하며 [AGENTS.md](../AGENTS.md)의 병합 승인과 권한 경계는 그대로 적용됩니다.
