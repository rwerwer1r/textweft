# Workflow Selection

요청된 단계만 수행하며 [AGENTS.md](../../../AGENTS.md)의 승인 경계는 항상 유지합니다.

| 요청 | 수행 가능 | 중단 경계 |
| --- | --- | --- |
| **준비** | 조사·계획·필요 시 Draft PR | 구현·병합 |
| **구현/PR** | 범위 내 수정·검사·자체 리뷰·PR | 병합·릴리스·배포 |
| **리뷰** | diff·검증·문제 보고, 요청된 수정 | 별도 승인 없는 병합 |
| **병합** | 최신 ref·리뷰·CI·권한·승인 확인 후 병합 | 필수 조건 미충족 |

일상 변경은 [Routine Loop](routine-loop.md)를 따릅니다. Draft PR은 완료 증거가 아닙니다. 작업 기록은 [Inbox](../../../inbox/README.md), Rule·Skill 소유권은 [Rulesync](../tooling/rulesync.md)를 참조합니다.
