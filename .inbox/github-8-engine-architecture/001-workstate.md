---
description: Rust 코어 결정 및 멀티미디어·2D 연출·선택형 MOD 아키텍처 문서화
updated: 2026-11-02T22:58:15+09:00
---

# PR 8 Engine Architecture Workstate

- **대상:** `rwerwer1r/textweft`, `docs/rust-core-decision-20261102`, Draft PR #8.
- **상태:** active.
- **목표:** 기존 초안 구현과 별도로 Rust headless 코어 결정의 연구 근거 및 게임별 선택 가능한 정적/생성 이미지, SFX/BGM, 동영상, 2D 레이어·스켈레탈 연출과 선택적 MOD 요구를 문서화.
- **제외:** 구현 변경, 신규 런타임 기능 완성 주장, 툴 채택 확정, 배포, 병합.
- **확인:** `main`의 `AGENTS.md`, `CHATBOT.md`, `.agents/route/ROUTE.md`, `docs/GOAL.md`, 개발 절차, 작업 브랜치의 기존 설계 문서 및 열린 Draft PR을 읽음. PixiJS·Spine·ComfyUI·MDN·wasm-bindgen 공개 근거 읽기 조사.
- **검증:** 현재까지는 GitHub 읽기·설계 조사만 수행. 테스트·lint·CI 미실행.
- **위험/승인:** 과도한 핵심 엔진 범위 증가, 유료 애니메이션 런타임 라이선스, ComfyUI 외부 호출의 자격 증명·비용, MOD 실행 권한. 도구 선택·실행 정책은 후속 설계·승인 대상.
- **다음:** 신규 설계 조사 문서 작성, 제품 목표의 범위 정합성 수정, 문서 라우팅 및 PR 자체 리뷰. 병합 금지.
