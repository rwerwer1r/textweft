---
description: "브랜치 통합, stacked PR, merge·rebase와 충돌 해결 시 읽습니다."
---
# Integration

통합 전에 실제 저장소·계정·base·head·작업 트리와 PR 상태를 확인합니다. merge와 rebase는 선택지이며 무조건적인 기본값이 아닙니다.

- **Merge**는 branch ancestry를 보존합니다. **Rebase**는 커밋을 다시 적용해 SHA를 바꿉니다. 공유된 branch의 커밋을 조정 없이 rebase하지 않습니다.
- Stacked PR은 부모 branch를 base로 유지하다가 부모 병합 후 기본 branch로 전환합니다. 전환 뒤에는 base/head diff와 CI를 다시 확인합니다.
- 충돌은 의도한 동작·계약을 기준으로 해결합니다. ours·theirs를 맹목적으로 선택하지 않습니다.
- 해결 후 통합 diff, 변경 경로, 관련 테스트와 검사를 다시 확인합니다. Worker별 성공은 통합 성공을 증명하지 않습니다.
- force-push는 기본 복구 수단이 아닙니다. 공유 이력 변경이 허용된 경우에도 정확한 대상과 force-with-lease 등 보호 장치를 확인합니다.
- CI 통과·clean merge·PR 작성은 병합 권한을 만들지 않습니다. 병합은 [AGENTS.md](../../../AGENTS.md)의 명시적 승인과 GitHub 필수 게이트를 따릅니다.

파괴적 복구 명령이 필요하면 먼저 [Recovery](recovery.md)를 읽습니다.
