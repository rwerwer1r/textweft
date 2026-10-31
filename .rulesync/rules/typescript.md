---
targets: ["*"]
description: "TypeScript game-framework runtime, example, and test conventions"
globs: ["src/**/*.ts", "tests/**/*.ts", "examples/**/*.ts"]
---

# TypeScript Framework Conventions

- Textweft는 특정 게임이 아닌 **바이브코더용 게임 제작 프레임워크**입니다. 게임별 서사·장르·전투 규칙을 코어 엔진에 하드코딩하지 않습니다.
- `src/`의 공개 타입과 계약을 지키고 변경 시 `tests/`와 관련 예제를 함께 검토합니다.
- 선택 전이의 원자성, 시드 난수의 재현성, 스냅샷 호환성 및 동기 훅 제약을 지킵니다.
- 검증에 `mise run test`와 `mise run typecheck`를 사용하고 미실행을 통과로 보고하지 않습니다.
