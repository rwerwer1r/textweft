# Engine Architecture Research

- **상태:** P1 초기 범위 설계 조사(2026-11-02). 구현·MVP 계약은 미확정.
- **현재 우선순위:** 바이브코더가 **텍스트와 정적 이미지**를 사용하여 브라우저에서 실행되는 게임을 만드는 프레임워크.
- **확정된 기술 방향:** Rust 게임 코어. [Architecture Decision](../architecture.md) 참고.
- **제약:** 현재 TypeScript 초안 구현에 신규 코어 설계를 종속시키지 않는다. 다른 미디어·MOD는 이번 단계에서 구체화하지 않는다.

## Initial Scope

| 구분 | 현재 검토할 능력 | 경계 |
| --- | --- | --- |
| 게임 저작 | 텍스트·장면·선택지·조건·효과·정적 이미지 참조 | 특정 장르의 규칙을 코어에 고정하지 않음 |
| 게임 실행 | 명령 기반 상태 전이, 게임 진행, 결정적 난수, 저장·복원 | 렌더러/호스팅 환경에서 분리 |
| 이미지 | 게임 패키지에 포함한 정적 이미지의 참조·로딩·표시 | 이미지 생성 API, 애니메이션 파이프라인은 제외 |
| 웹 플레이 | 브라우저에서 텍스트·이미지를 표시하고 선택을 입력 | TypeScript 웹 계층 및 Rust/WASM 연결은 우선 검토 방향 |
| 제작·검증 | 바이브코더/AI가 이해할 수 있는 스키마·오류·예제 | 사용하지 않는 확장점을 미리 정의하지 않음 |

텍스트만 사용하는 게임도 가능해야 하며, 게임 제작자가 이미지 사용 여부와 표시 장면을 결정할 수 있어야 한다.

## Recommended Boundaries

```text
Game author / AI agent
  | game definitions + text + static image assets
  v
Authoring / validation
  |
  v
TypeScript web host (candidate)
  | UI, input, static image loading, browser storage
  | commands <-> renderer-neutral view
  v
WebAssembly adapter (candidate)
  |
  v
Rust headless core
  | definitions, rules, session, transitions, RNG, snapshot
```

코어의 **책임**은 규칙 평가, 상태 전이, 오류 처리와 저장 가능한 게임 진행이다. 이미지 파일의 디코딩·화면 배치는 웹 계층의 책임이다. 게임 상태에는 미디어 바이너리 대신 논리적인 이미지 참조를 두는 방식을 우선 검토한다. 구체적인 에셋 스키마, Rust 타입, 프론트엔드 라이브러리는 P1에서 필요한 만큼만 결정한다.

초기 Rust 구현은 작은 모듈형 모놀리스를 권장한다. 게임 정의, 상태 전이, 검증, 저장의 개념적 경계는 유지하되 가상의 플러그인 요구를 위해 다수의 크레이트·추상화·자체 VM·ECS를 선제 도입하지 않는다. WebAssembly/JavaScript 경계는 적은 횟수의 명령·결과 교환을 우선 검토한다.

## Initial Acceptance Scenarios

1. 바이브코더가 텍스트만으로 게임 정의를 만들고 브라우저에서 시작·선택·종료할 수 있다.
2. 바이브코더가 정적 이미지 파일을 게임에 포함하고 장면 또는 인물에 연결하여 브라우저에서 표시할 수 있다.
3. 존재하지 않는 이미지 참조, 잘못된 장면 연결 등 오류가 게임 제작자에게 식별 가능한 형태로 전달된다.
4. 같은 정의·초기 상태·시드·선택 이력에서 게임 진행 결과를 재현할 수 있고, 실패한 상태 전이는 부분 커밋되지 않는다.
5. 플레이어가 게임 진행을 저장하고 복원할 수 있다.

수용 조건은 설계 후보이며 실제 실행·테스트 통과를 주장하지 않는다.

## Deferred Possibilities

이전 조사에서 고려했던 **SFX/BGM, 동영상, ComfyUI 등 외부 이미지 생성 API, Spine 계열 2D 스켈레탈 컷아웃 애니메이션, 게임 개발자의 선택적 MOD 지원**은 장래 요구 후보로만 남긴다.

- **현재 비범위:** 각 기능의 구현, API·스키마·포맷, 렌더러·저작 도구 선정, 라이선스·배포 모델, MOD 보안·로드 정책, 구현 시기와 완성 기준의 구체화.
- **설계 원칙:** 미래 기능 때문에 현재 텍스트·정적 이미지 경로를 복잡하게 만들지 않는다. 후속 필요가 명확해지면 독립적으로 조사·설계한다.
- **참고 사례:** Darkest Dungeon은 향후 논의할 2D 이미지 파츠 기반 애니메이션의 시각적 사례다. 지금 그 수준을 구현하거나 도구를 도입하는 약속은 아니다.

## Execution Order

**P0 개발 환경·하네스 검증 → P1 텍스트·정적 이미지 MVP 계약 확정 → P2 최소 플레이 가능 게임 구현** 순서를 유지한다. Rust·WASM·웹 연결의 실제 빌드와 시험은 범위 승인 이후 별도 검증한다.

## References

- [Rust WebAssembly interoperability (wasm-bindgen)](https://wasm-bindgen.github.io/wasm-bindgen/) — Rust와 브라우저 계층 분리의 기술적 참고.
- [PixiJS](https://pixijs.com/) — 웹 이미지 렌더링 기술의 참고 후보이며 채택 결정이 아님.

기존 세부 기술 조사·가설은 PR 브랜치의 Git 이력에 남지만, **현재 실행 계획이나 확정 계약으로 간주하지 않는다**.
