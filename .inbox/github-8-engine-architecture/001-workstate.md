---
description: Rust 코어 결정 및 멀티미디어·2D 연출·선택형 MOD 아키텍처 문서화
updated: 2026-11-02T23:03:59+09:00
---

# PR 8 Engine Architecture Workstate

- **대상:** `rwerwer1r/textweft`, `docs/rust-core-decision-20261102`, Draft PR #8.
- **상태:** handoff.
- **목표:** 기존 초안 구현과 별도로 Rust headless 코어 결정의 연구 근거 및 게임별 선택 가능한 정적/생성 이미지, SFX/BGM, 동영상, 2D 레이어·스켈레탈 연출과 선택적 MOD 요구를 문서화.
- **제외:** 구현 변경, 신규 런타임 기능 완성 주장, 툴 채택 확정, 배포, 병합.
- **확인:** `main`의 `AGENTS.md`, `CHATBOT.md`, `.agents/route/ROUTE.md`, `docs/GOAL.md`, 개발 절차, 작업 브랜치의 기존 설계 문서 및 열린 Draft PR을 읽음. PixiJS·Spine·ComfyUI·MDN·wasm-bindgen 공개 근거 읽기 조사.
- **결과:** `docs/architecture/engine-research.md` 신규, `docs/GOAL.md` 제품 목표 확장, `docs/architecture.md` 경계 보완, 개발 라우터·바이브코딩 문서 정합성 수정. PR #8 본문 갱신.
- **검증:** PR diff에서 문서/인박스 6개만 변경되고 구현 파일은 없음을 확인. 설계 문서의 상대 링크 경로 정적 확인. 테스트·lint·CI는 미실행.
- **위험/승인:** 과도한 핵심 엔진 범위 증가, 유료 애니메이션 런타임 라이선스, ComfyUI 외부 호출의 자격 증명·비용, MOD 실행 권한. 도구 선택·실행 정책은 후속 설계·승인 대상.
- **다음:** 설계 문서 PR #8 리뷰·별도 병합 승인. P1에서 구현 범위·렌더러·MOD 보안/호환성·ComfyUI 운영 정책 결정. 병합 금지.
