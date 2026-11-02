---
description: 프로젝트 운영 Workflow 개선 결과와 검증·인계 상태
updated: 2026-11-02T20:59:53.441Z
---

# Workflow Harness Improvement

- **Goal:** 개발·리뷰·조사·하네스 자기개선·평가·복구·세션 재개·병합 게이트의 프로젝트 Workflow를 하나의 진입점으로 선택하고 안전하게 수행하도록 구성.
- **Scope:** `rwerwer1r/textweft`, 브랜치 `feat/workflow-harness-20261103`, PR #10. 기존 PR #9의 Agent 파일이나 외부 계정·저장소에는 쓰기 없음. 병합·배포·권한 변경 제외.
- **State:** active. PR #10의 RPI 후속 개선을 재개한다. 목표는 기존 선형 설명을 `mols-loops`의 Prepare → 적응형 RPI Review 전이/재귀적 부분 문제 → Finalize로 보강하고 구현 단위의 Spec → 테스트 설계 → 테스트 구현 → 실제 구현 순서를 유지하는 것이다. 병합/배포는 범위 밖이다.
- **Review loops:** 첫 설계의 범위·권한과 기존 정본 중복을 자체 검토. 1차 실질 Finding은 승인 없는 병합 사례의 모호한 입력으로 교정. 2차 Finding은 평가 사례의 기대 Workflow가 명시되지 않은 점으로, 라우팅 기대 경로 열과 평가 전용 near-miss를 추가. 3차 정적 검사에서 9개 문서의 필수 섹션과 상대 링크, 주요 근거를 확인했다. 독립된 두 번째 에이전트 리뷰는 수행하지 않았다.
- **Evidence:** 이전 검증된 PR HEAD `eaca4a7ea98e6aeae212e3a75820935e49e23a8d`에 대한 [GitHub Actions 41523405508](https://github.com/rwerwer1r/textweft/actions/runs/41523405508) `verify` 성공: 부트스트랩·업데이트 재실행, 저장소 계약 검사. 변경된 8개 문서의 Git tree 상대 링크 정적 확인에서 누락 0개. 이 인계 파일을 갱신한 **최종 HEAD CI는 별도 확인이 필요**하다. 실제 에이전트 행동 평가는 미실행.
- **Limitations:** 실제 Autopilot 직접 선택, Subagent의 위임 거절, 실행 시 Workflow 라우팅·독립 리뷰의 행동 평가는 미실행. 그 평가 시나리오는 아직 테스트 계획이며 성공 근거가 아님. `main` 보호 규칙은 강제 적용으로 확인되지 않았다.
- **Integration risk:** PR #9와 본 PR이 모두 `docs/development/README.md`·`mise.toml`을 수정하므로 하나를 병합한 뒤 다른 PR의 최신 diff·CI·충돌 여부를 반드시 재확인한다.
- **Next:** 현재 PR #10의 정본 Workflow를 최소 수정하고 단계 복귀/재귀/범위 제한/공유 루프 예산/인계와 Spec-first 수용 조건을 평가 사례로 연결한다. 정적 링크·diff와 최신 CI를 검증하며 에이전트 런타임 행동 평가는 미실행으로 구분한다.
