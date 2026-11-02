---
description: 프로젝트 운영 Workflow 개선 결과와 검증·인계 상태
updated: 2026-11-02T21:06:42.681Z
---

# Workflow Harness Improvement

- **Goal:** 개발·리뷰·조사·하네스 자기개선·평가·복구·세션 재개·병합 게이트의 프로젝트 Workflow를 하나의 진입점으로 선택하고 안전하게 수행하도록 구성.
- **Scope:** `rwerwer1r/textweft`, 브랜치 `feat/workflow-harness-20261103`, PR #10. 기존 PR #9의 Agent 파일이나 외부 계정·저장소에는 쓰기 없음. 병합·배포·권한 변경 제외.
- **State:** handoff. PR #10의 적응형 RPI 하네스를 기존 고정 `mols-loops` Rulesync Skill에 위임하는 형태로 단순화했다. Textweft는 프로젝트 Workflow 선택, Delivery의 Spec → 테스트 설계 → 테스트 구현 → 실제 구현, AGENTS 승인, 기존 검증·인박스만 소유한다. 병합/배포는 제외.
- **Review loops:** 첫 설계의 범위·권한과 기존 정본 중복을 자체 검토. 1차 실질 Finding은 승인 없는 병합 사례의 모호한 입력으로 교정. 2차 Finding은 평가 사례의 기대 Workflow가 명시되지 않은 점으로, 라우팅 기대 경로 열과 평가 전용 near-miss를 추가. 3차 정적 검사에서 9개 문서의 필수 섹션과 상대 링크, 주요 근거를 확인했다. 독립된 두 번째 에이전트 리뷰는 수행하지 않았다.
- **Evidence:** `rulesync.jsonc`에서 `mols-loops` source 고정 리비전 `4885018f6aa5a3ea7c4a7dd227a4b9609dc0d8b9` 확인; 해당 리비전 Skill 원본의 Prepare → RPI Main Loop → Finalize/Recursive Resolution 직접 확인. Workflow + 관련 문서 14개 Git tree 상대 링크 누락 0, 오래된 앵커 0 정적 확인. 이전 HEAD CI 기록은 이 변경의 검증을 대신하지 않는다. 최종 HEAD CI는 별도 확인하며, 실제 에이전트 동작 평가는 미실행.
- **Limitations:** 실제 Autopilot 직접 선택, Subagent의 위임 거절, 실행 시 Workflow 라우팅·독립 리뷰의 행동 평가는 미실행. 그 평가 시나리오는 아직 테스트 계획이며 성공 근거가 아님. `main` 보호 규칙은 강제 적용으로 확인되지 않았다.
- **Integration risk:** PR #9와 본 PR이 모두 `docs/development/README.md`·`mise.toml`을 수정하므로 하나를 병합한 뒤 다른 PR의 최신 diff·CI·충돌 여부를 반드시 재확인한다.
- **Next:** 이 인계 커밋의 최신 CI와 PR diff를 확인한다. Skill의 실제 설치·선택·재귀 실행·Spec-first 행동은 타깃 에이전트 런타임에서 평가해야 하며 Markdown/CI만으로 증명할 수 없다. 병합은 명시적 승인과 최신 충돌/CI 확인 후 진행한다.
