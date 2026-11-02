---
description: 프로젝트 운영 Workflow 개선 결과와 검증·인계 상태
updated: 2026-11-02T21:14:29.012Z
---

# Workflow Harness Improvement

- **Goal:** 개발·리뷰·조사·하네스 자기개선·평가·복구·세션 재개·병합 게이트의 프로젝트 Workflow를 하나의 진입점으로 선택하고 안전하게 수행하도록 구성.
- **Scope:** `rwerwer1r/textweft`, 브랜치 `feat/workflow-harness-20261103`, PR #10. 기존 PR #9의 Agent 파일이나 외부 계정·저장소에는 쓰기 없음. 병합·배포·권한 변경 제외.
- **State:** active. PR #10의 `.agents/workflows/` 문서들을 Rulesync 정본 `.rulesync/skills/workflow-*/SKILL.md`로 마이그레이션한다. 프로젝트 전용 워크플로우의 선택 메타데이터/실제 자동 생성/라벨링을 구현한다. `mols-loops` 의존성, 테스트 우선 절차, 사람 승인·권한 경계 유지.
- **Review loops:** 첫 설계의 범위·권한과 기존 정본 중복을 자체 검토. 1차 실질 Finding은 승인 없는 병합 사례의 모호한 입력으로 교정. 2차 Finding은 평가 사례의 기대 Workflow가 명시되지 않은 점으로, 라우팅 기대 경로 열과 평가 전용 near-miss를 추가. 3차 정적 검사에서 9개 문서의 필수 섹션과 상대 링크, 주요 근거를 확인했다. 독립된 두 번째 에이전트 리뷰는 수행하지 않았다.
- **Evidence:** `rulesync.jsonc`에서 `mols-loops` source 고정 리비전 `4885018f6aa5a3ea7c4a7dd227a4b9609dc0d8b9` 확인; 해당 리비전 Skill 원본의 Prepare → RPI Main Loop → Finalize/Recursive Resolution 직접 확인. Workflow + 관련 문서 14개 Git tree 상대 링크 누락 0, 오래된 앵커 0 정적 확인. 이전 HEAD CI 기록은 이 변경의 검증을 대신하지 않는다. 최종 HEAD CI는 별도 확인하며, 실제 에이전트 동작 평가는 미실행.
- **Limitations:** 실제 Autopilot 직접 선택, Subagent의 위임 거절, 실행 시 Workflow 라우팅·독립 리뷰의 행동 평가는 미실행. 그 평가 시나리오는 아직 테스트 계획이며 성공 근거가 아님. `main` 보호 규칙은 강제 적용으로 확인되지 않았다.
- **Integration risk:** PR #9와 본 PR이 모두 `docs/development/README.md`·`mise.toml`을 수정하므로 하나를 병합한 뒤 다른 PR의 최신 diff·CI·충돌 여부를 반드시 재확인한다.
- **Next:** 9개 스킬과 평가 참고를 이관하고 경로/인덱스/라우팅 테스트/문서 링크를 갱신한다. git diff 자체 검토 후 Rulesync+CI로 검증한다. 원본 경로 삭제는 스킬 전환과 같은 Git 커밋에서만 수행한다.
