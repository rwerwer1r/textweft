---
description: Rust 코어 및 텍스트·정적 이미지 우선 설계 문서 정리
updated: 2026-11-02T23:38:00+09:00
---

# PR 8 Engine Documentation Workstate

- **대상:** `rwerwer1r/textweft`, `docs/rust-core-decision-20261102`, Draft PR #8.
- **상태:** active.
- **목표:** 사용자 승인에 따라 PR #8 문서 개선·검토 루프에서 유의미한 잔여 지적이 없어질 때까지 수정하고, 최신 CI·리뷰·권한 확인 후 squash merge한다.
- **변경:** `docs/GOAL.md`(제품 목표·현재 범위), `docs/PRINCIPLES.md`(제품·엔지니어링 판단 원칙), `docs/architecture.md`(Rust 결정·책임 경계), `docs/architecture/engine-research.md`(설계 후보·수용 조건), `docs/development/README.md`(라우팅), `docs/development/workflows/vibe-coding.md`(저작 기준). 기존 코드·하네스 계약은 변경하지 않음.
- **불변 결정:** Rust 코어, 텍스트·정적 이미지 우선, 나머지 미디어/Spine/ComfyUI/MOD 구체화 보류, P0 → P1 → P2.
- **정적 검증:** PR 브랜치 재조회, 상대 링크·제목 언어·문서 역할 분리 및 기존 결정의 유지 확인. 실제 lint·빌드·테스트·CI는 미실행.
- **승인:** 문서 PR 자체 검토는 가능하나 병합은 별도 승인 필요.
- **루프 1 발견:** README가 v0.1 TS 현재 구현과 새 Rust/텍스트+정적 이미지 목표의 구분을 명확히 연결하지 않음; architecture.md가 제품 설계 목표를 '현재 구현 범위'로 잘못 지칭. 수정 후 재검토 예정.
- **승인:** 사용자 명시적 병합 승인 확인. 보호 규칙/검증 게이트는 유지.
- **다음:** 두 문서 문제 수정 → diff·링크·CI 재검증 → 잔여 발견 재리뷰 → 병합.
