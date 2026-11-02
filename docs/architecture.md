# Core Architecture Decision

- **결정:** 게임 실행 코어는 **Rust**로 구현한다(2026-11-02, 프레임워크 개발자 결정).
- **적용 범위:** 새 코어 설계. 기존 TypeScript 프로토타입의 구조·훅 계약은 설계를 구속하지 않는다.
- **상태:** 설계 결정 기록. 구현·배포·병합 승인을 의미하지 않는다.

## Rationale

Rust의 타입·소유권·컴파일러·Clippy 피드백은 AI 주도 엔진 개발에서 오류를 조기에 발견하고 불변식을 표현하는 데 유용하다. **Rust 자체가 게임 규칙의 정확성이나 바이브코딩 생산성을 보장하지는 않는다.** 실행·계약 테스트로 검증해야 한다.

## Boundaries

| 계층 | 책임 | 결정 상태 |
| --- | --- | --- |
| Rust headless core | 게임 정의 검증, 규칙, 상태 전이, 난수, 스냅샷 | 코어 언어 확정 |
| 웹 플레이어 | 텍스트·정적 이미지 표시, 사용자 입력, 브라우저 기능 | 분리 원칙 확정 |
| 연결 계층 | 코어 명령/결과를 웹에 노출 | TypeScript + WebAssembly 우선 검토 |

게임 개발자는 Rust를 직접 작성·컴파일하지 않고 공개 게임 저작 계약으로 작업할 수 있어야 한다. 웹 플레이어의 프레임워크·WASM 바인딩·패키지 구조는 아직 확정하지 않았다.

## Open Decisions

- 게임 정의와 명령·결과·오류·저장 형식의 최소 공개 계약
- 게임별 규칙의 확장 범위와 검증 방식
- 웹 계층·WASM 연결 및 초기 실행·배포 경로

현재 **제품 목표와 집중 범위**는 [Project Goal](GOAL.md), 초기 설계·수용 조건은 [Engine Design Research](architecture/engine-research.md)에서 관리한다. **기존 구현 상태는 [README](../README.md)와 코드·테스트**에서 확인한다. **P0 개발 하네스 → P1 MVP 설정 → P2 구현** 순서는 [Development Guide](development/README.md)를 따른다.
