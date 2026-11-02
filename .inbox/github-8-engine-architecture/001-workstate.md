---
description: Rust 코어 및 텍스트·정적 이미지 우선 설계 문서 정리
updated: 2026-11-02T23:34:51+09:00
---

# PR 8 Engine Documentation Workstate

- **대상:** `rwerwer1r/textweft`, `docs/rust-core-decision-20261102`, Draft PR #8.
- **상태:** handoff.
- **목표:** `GOAL.md`는 프로젝트 목표와 비전만, `PRINCIPLES.md`는 구체적 계약·절차가 없는 간결한 개발 철학만 소유하도록 정리한다.
- **변경:** `docs/GOAL.md`(제품 목표·현재 범위), `docs/PRINCIPLES.md`(제품·엔지니어링 판단 원칙), `docs/architecture.md`(Rust 결정·책임 경계), `docs/architecture/engine-research.md`(설계 후보·수용 조건), `docs/development/README.md`(라우팅), `docs/development/workflows/vibe-coding.md`(저작 기준). 기존 코드·하네스 계약은 변경하지 않음.
- **불변 결정:** Rust 코어, 텍스트·정적 이미지 우선, 나머지 미디어/Spine/ComfyUI/MOD 구체화 보류, P0 → P1 → P2.
- **정적 검증:** PR 브랜치 재조회, 상대 링크·제목 언어·문서 역할 분리 및 기존 결정의 유지 확인. 실제 lint·빌드·테스트·CI는 미실행.
- **승인:** 문서 PR 자체 검토는 가능하나 병합은 별도 승인 필요.
- **다음:** Draft PR #8 최종 diff·상태를 확인하여 리뷰·병합 승인을 요청한다.
