---
description: Rust 코어 결정 및 멀티미디어·2D 연출·선택형 MOD 아키텍처 문서화
updated: 2026-11-02T23:15:23+09:00
---

# PR 8 Engine Architecture Workstate

- **대상:** `rwerwer1r/textweft`, `docs/rust-core-decision-20261102`, Draft PR #8.
- **상태:** handoff.
- **목표:** 사용자 최신 결정에 따라 Rust headless 코어의 **텍스트·정적 이미지 웹 게임 우선** 설계 범위만 문서화. 나머지 미디어·애니메이션·MOD 기능은 현재 구체화하지 않음.
- **제외:** 구현 변경, 신규 런타임 기능 완성 주장, 툴 채택 확정, 배포, 병합.
- **확인:** `main`의 `AGENTS.md`, `CHATBOT.md`, `.agents/route/ROUTE.md`, `docs/GOAL.md`, 개발 절차, 작업 브랜치의 기존 설계 문서 및 열린 Draft PR을 읽음. PixiJS·Spine·ComfyUI·MDN·wasm-bindgen 공개 근거 읽기 조사.
- **결과:** `docs/architecture/engine-research.md`를 텍스트·정적 이미지 우선 설계와 초기 수용 시나리오로 축소; `docs/GOAL.md`, `docs/architecture.md`, 개발 라우터 정합화. 미래 기술 조사 세부사항은 Git 이력에만 남기고 현재 계획에서 제외.
- **검증:** PR diff에서 문서/인박스 6개만 변경되고 구현 파일은 없음을 확인. 설계 문서의 상대 링크 경로 정적 확인. 테스트·lint·CI는 미실행.
- **위험/승인:** 미래 기능에 대한 성급한 스키마·도구·정책 결정을 방지. Rust 코어는 확정하되, 공개 API·웹 구현 세부는 추후 P1 의사결정 대상.
- **다음:** PR #8의 문서 범위 자체 리뷰 및 별도 병합 승인. P1에서는 텍스트·정적 이미지 게임의 최소 수직 기능만 정한다. 병합 금지.
