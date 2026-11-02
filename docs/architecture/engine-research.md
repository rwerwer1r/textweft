# Engine Architecture Research

- **상태:** P1 설계 제안 및 조사 기록(2026-11-02). Rust 코어 언어 결정은 [Architecture Decision](../architecture.md)을 따름.
- **목표:** 바이브코더가 웹앱 형태로 실행되는 서사·선택 중심 게임을 만들되, 텍스트에 한정하지 않고 멀티미디어·2D 연출·선택적 MOD까지 확장 가능하게 설계.
- **근거 범위:** 제품 요구 및 공식 기술 문서. 기존 v0.1 TypeScript 초안 구현의 구조·훅 설계를 신규 엔진의 제약으로 삼지 않음.
- **경계:** 아래의 권장 인터페이스·도구는 **채택 완료된 구현 규격이 아님**. 기능의 최종 MVP 포함 여부는 P1에서 결정.

## Capability Requirements

| ID | 장기 제품 요구 | 게임 개발자의 선택권 | 상태 |
| --- | --- | --- | --- |
| CAP-01 | 브라우저에서 앱처럼 실행되는 게임 제작 | 게임별 UI·배포·연출 방식 | 요구 확정 |
| CAP-02 | 텍스트·정적 이미지·외부 생성 이미지 사용 | 이미지 없는 텍스트 게임도 가능 | 요구 확정 |
| CAP-03 | 효과음(SFX)과 배경음악(BGM) | 오디오 사용 여부·자산 | 요구 확정 |
| CAP-04 | 게임 내 동영상·컷신 | 동영상 사용 여부·재생 방식 | 요구 확정 |
| CAP-05 | **Spine 계열 2D 스켈레탈 컷아웃 애니메이션**: 본 계층·슬롯·이미지 부착·키프레임으로 인물·소품·배경을 표현 | 아트 제작 파이프라인·렌더러 | 요구 확정 |
| CAP-06 | **Darkest Dungeon은 분리된 그림 파츠와 본을 조립·애니메이션하는 시각적 접근성의 참고 사례** | 일러스트레이터·MOD 제작자의 에셋 제작 및 가져오기 방식 | 요구 확정 |
| CAP-07 | MOD 가능한 게임을 만들 수 있는 확장 구조 | **MOD 지원 활성화·허용 범위는 게임 개발자 선택** | 요구 확정 |
| CAP-08 | ComfyUI 등의 이미지 생성 API 선택적 연동 | 사전 생성 또는 런타임 생성 | 요구 방향 확정, 연동 방식 미결정 |

CAP-05/06은 **Spine 계열의 2D 스켈레탈 컷아웃(종이인형) 애니메이션**을 말한다. 머리·몸통·팔·다리 등의 이미지 파츠를 본(Bone)의 부모-자식 계층에 슬롯(Slot)·부착 이미지(Attachment)로 연결해 이동·회전·크기·겹침·키프레임을 제어한다. 단순한 경우 한 이미지당 한 본으로 충분할 수 있으며 복잡한 메시 변형·IK·물리 시뮬레이션까지 기본 구현할 필요는 없다. 배경은 분리된 레이어를 조합·애니메이션한다. Darkest Dungeon을 예시로 들었다고 해당 게임의 실제 내부 기술·제작툴·전투 시스템을 확정하거나 결과물 품질을 보장한다는 뜻은 아니다.

## Architecture Recommendation

**Rust의 작은 headless 게임 코어 + 웹 호스트(TypeScript 우선) + 선택형 렌더러/미디어/생성 API/MOD 어댑터**를 권장한다. 모듈형 모놀리스로 시작하되 브라우저에만 종속되는 코드를 코어로 끌어오지 않는다.

```text
Game author / AI agent
  | game definition, asset manifest, optional mods
  v
Authoring + validation + packaging
  |
  v
TypeScript web SDK / game host
  | UI, input, save storage, asset loading, media, rendering, integrations
  | command <-> view + presentation cues
  v
WebAssembly adapter
  |
  v
Rust headless core
  | game model, validation, rules, state transitions, deterministic RNG, snapshot
  |
  +--> native CLI / test harness (future option)
```

### Ownership Boundary

| 책임 | 권장 소유자 | 이유 |
| --- | --- | --- |
| 규칙·상태·전이·난수·진행 이력·스냅샷 | Rust core | 플랫폼 독립성과 정합성 |
| 게임 정의 검증·리소스 참조 검증 | Core + 저작/패키징 도구 | 잘못된 게임을 배포 전에 발견 |
| WASM 바인딩·데이터 변환 | 별도 adapter | 코어가 브라우저에 종속되지 않음 |
| 입력·화면·애니메이션 시계·오디오·동영상 | TypeScript web host | 브라우저·GPU·미디어 API 활용 |
| 정적 이미지·오디오·동영상·애니메이션 에셋 로딩 | Host asset adapter | 포맷/캐시/디코딩/오류 처리 분리 |
| ComfyUI 작업 요청·결과 수집 | 선택형 외부 연동 서비스/어댑터 | 큐·비용·자격 증명·실패의 비결정성 격리 |
| MOD 해석·검증·로드 정책 | 게임 설정 + 패키지 로더 + 코어 검증 | 게임별 opt-in, 명시적 권한 및 호환성 |

### Minimal Engine Modules

초기 Rust **코어 단일 크레이트** 안에서 model, validation, rules, runtime, random, snapshot을 모듈로 나누고, **WASM adapter는 별도 크레이트**로 둔다. 크레이트·플러그인·이벤트 버스를 게임 기능 수만큼 미리 세분화하지 않는다.

- **Definition:** 공유 가능한 불변 게임 정의와 자원 ID 참조.
- **Session:** 게임/플레이어별 가변 진행 상태와 RNG.
- **Dispatch:** 명령 입력 -> 작업 상태에서 규칙 평가 -> 결과 검증 -> 원자적 확정.
- **Output:** 렌더러 중립의 현재 보기(view)와 명시적 presentation cue(예: 애니메이션 시작, SFX 재생 요청).
- **Snapshot:** 정의 버전, 적용 MOD 집합, 진행 상태를 포함하는 복원 계약. 정확한 필드는 P1 결정.

**중요:** 애니메이션 재생 프레임, 브라우저 오디오 타이밍, ComfyUI 작업 진행은 게임 규칙의 결정적 상태와 혼합하지 않는다. 연출 cue를 소비하는 호스트가 재생을 수행하고, 게임 결과에 영향을 줄 경우에만 명시적인 명령으로 엔진에 되돌린다. 실패한 전이는 세션 상태·난수·진행 위치를 부분 커밋하지 않는다. 외부 API와 실제 미디어 출력까지 자동 롤백된다고 약속하지 않는다.

## Media and 2D Presentation

- **정적 이미지:** 로컬/번들/원격 이미지 에셋 ID 참조. 장면 배경, 인물, 카드, UI, 레이어 합성을 지원할 수 있는 자원 계약.
- **2D 연출(기본 목표):** Spine 방식의 **본 계층, 슬롯과 이미지 부착(attachment), 스킨 교체, 키프레임 기반 본 변형, 그리기 순서**를 지원할 수 있는 시각 표현 계약. 신체·소품 이미지와 배경 레이어를 조립해 움직이며, 기본적인 패럴랙스·카메라·이펙트와 합성한다. **메시 변형, 복잡한 IK·물리 시뮬레이션은 선택형 고급 기능**이며 전용 상용 편집기 도입과는 별개다.
- **SFX/BGM:** 효과음과 배경음악의 독립 채널·볼륨·중지·페이드·루프. 브라우저 사용자 제스처 이후에 소리가 시작될 수 있도록 설계.
- **동영상:** 컷신 또는 게임 화면 내 비디오 레이어. 브라우저별 코덱/자동재생 차이·폴백·자막/접근성 고려.
- **에셋 계약:** 논리적 ID, 타입, 위치/버전/해시(선택), 실패 시 대체 자원, 지연/사전 로딩 정책. 실제 바이너리 자산을 Rust 스냅샷에 저장하지 않음.

**렌더러 후보:** PixiJS는 스프라이트·텍스처·레이어·필터 등을 제공한다. **Spine 공식 런타임과 PixiJS의 통합도 가능하므로 실제 Spine 에셋을 지원하는 방안을 우선 검토**한다. 다만 Spine 에디터/런타임은 라이선스·저작 도구·게임 제작자 및 MOD 제작자 배포 조건이 중요하다. 'Spine 계열 표현 방식'의 요구와 'Spine 런타임/에셋 포맷 채택'을 분리해 결정한다. 특정 벤더를 Rust 코어 계약에 고정하지 않는다.

**성능 원칙:** 모바일 브라우저를 주요 검증 대상에 포함하되 초기 로드, 텍스처 메모리, 배치·GPU 자원, 프레임 유지율 목표는 P1 실측 예산으로 결정한다. 특정 프레임률이나 'Darkest Dungeon과 동일한 품질'을 미검증 상태에서 보장하지 않는다.

### Cutout Authoring Contract

게임 개발자·일러스트레이터가 **그림 파츠를 제작하고 Spine 등 시각적 애니메이션 저작 도구에서 리깅·키프레임을 편집한 결과물**을 게임 및 MOD로 가져올 수 있는 경로를 우선 검토한다. 아트 중심 제작자는 Rust·WebAssembly·TypeScript 코드를 수정할 필요가 없어야 한다. 직접 설정 파일을 손으로 편집하는 방식만을 쉬운 제작 경험으로 간주하지 않는다.

- **이미지 파츠:** `body.png`, `head.png`, `arm_front.png`, `arm_back.png` 등 투명 이미지와 배경 레이어. 파츠별 이름·파일 참조.
- **리깅:** 본(Bone)의 부모-자식 계층, 기준점·변형, 슬롯(Slot), 이미지 Attachment 및 그리기 순서(draw order). 부모 본을 움직이면 하위 본과 부착 이미지에 변형이 전파.
- **움직임:** 유휴(idle), 공격, 피격 같은 클립에서 본의 위치·회전·크기 및 슬롯의 표시 여부·색상·그리기 순서를 키프레임으로 제어. 기본 본 변형을 우선하며 메시 가중치 변형과 고급 IK는 필수 아님.
- **배경:** 전경·중경·후경 이미지를 분리하고 레이어별 패럴랙스·카메라 이동 또는 간단한 루프 동작을 설정.
- **아트 MOD:** 게임에서 허용한 캐릭터·배경·스켈레톤·스킨·클립 슬롯에 이미지/리깅/애니메이션 데이터를 교체·추가. 누락된 Attachment, 본 참조, 순환 계층, 파일 포맷·에셋 버전 호환성을 패키징 단계에서 검증.
- **제작 지원:** **시각적 리깅/타임라인 편집 및 미리보기 도구로 제작된 에셋을 가져오는 경로**를 우선 검증. 우리 자체 에디터를 처음부터 만들 필요는 없지만, 일러스트레이터가 프레임워크 내부 코드를 수정하지 않고 결과를 확인하고 교체할 수 있어야 한다.

다음은 내부 개념을 설명하기 위한 **의사 YAML이며 확정 스키마나 아티스트의 필수 편집 형식은 아니다**.

```yaml
character:
  bones:
    root: {}
    head: { parent: root }
    arm: { parent: root }
  slots:
    face: { bone: head, attachment: head.png }
    hand: { bone: arm, attachment: arm.png }
  clips:
    idle:
      bones:
        head:
          rotation: [[0, -2], [500, 2], [1000, -2]]
```

**수용 관점:** 일러스트레이터가 그림 파츠를 시각적 저작 도구에서 본으로 리깅하고 idle·attack 같은 키프레임 클립을 만들어 웹에서 미리볼 수 있는가? MOD 활성 게임에서는 그림·스킨·클립을 프레임워크 코드 수정 없이 교체할 수 있는가? 직접 YAML 작성만 가능하다면 아티스트 친화성이 검증된 것으로 보지 않는다.

## Generated Image Integration

ComfyUI는 **필수 엔진 의존성이 아니라 선택형 ImageProvider**로 설계한다.

1. **기본 권장:** 제작 단계에서 생성 후 게임 에셋으로 고정. 오프라인 재현성·배포·캐시·비용 예측에 유리.
2. **선택형 런타임 생성:** 게임 개발자가 별도로 활성화할 때만 신뢰된 서버/어댑터에서 작업을 큐잉하고 완료된 결과를 에셋 ID로 등록. 지연·실패·취소·비용·캐시·대체 이미지 정의가 필요.
3. **보안·운영:** API 자격 증명을 웹 번들에 노출하지 않으며, 외부 작업의 개인정보·자산 권리·사용 비용·사용자 동의 정책은 게임/서비스 운영자가 명시. 임의 ComfyUI 워크플로를 브라우저에서 무제한 실행하는 기본 기능은 피한다.

ComfyUI 공식 예제는 HTTP `/prompt`로 요청을 큐에 넣고 WebSocket으로 진행을 관찰한 뒤 `/history` 및 `/view`에서 출력을 조회하는 흐름을 보여준다. 이 예제는 구현 참고이며 안정적인 제품용 공용 API 계약을 대신하지 않는다.

## Optional Mod Architecture

**MOD는 엔진의 가능성이지만 각 게임의 필수 기능은 아니다.** 게임 개발자가 MOD 비활성, 데이터만 허용, 스크립트 확장 허용 등 정책을 선택할 수 있도록 설계한다.

| 계층 | 초기 권장 정책 | 비고 |
| --- | --- | --- |
| MOD manifest | ID·버전·대상 게임/엔진 버전·의존성·자원 목록 | 검증 가능한 패키지 단위 |
| Namespacing | 게임 및 MOD별 리소스/규칙 ID 분리 | 충돌 예방 |
| Load resolution | 의존성·우선순위·명시적 재정의 대상 확인 | 결정적인 순서·충돌 오류 |
| Data/asset mod | **우선 지원 후보**: 텍스트, 이미지 파츠, 배경, 본/슬롯·스킨·키프레임 데이터, SFX/BGM, 영상, 허용된 규칙 데이터 | 일러스트레이터가 저작 도구에서 제작한 결과물을 코드 없이 MOD로 가져오는 경로 |
| Executable mod | 후속 정책 결정: 승인된 기능만 호출, 격리·권한·입출력 제한 | 임의 JS 실행을 안전하다고 가정하지 않음 |
| Saves | 활성 MOD ID/버전 또는 지문을 저장·검증 | MOD 제거·변경 시 명시적 오류/복구 정책 |
| Distribution | 게임별 설치/활성·비활성 UI | 자동 공개 마켓·검토 시스템은 별도 제품 |

유효성 검사, 자산 경로 제한, 크기/시간/호출 자원 제한, 신뢰 경계를 정의해야 한다. **WASM 샌드박스는 임의의 JavaScript MOD를 격리하지 않는다.** 사용자 제작 MOD 코드를 임의 실행하는 범용 플랫폼/마켓을 MVP에 포함한다고 해석하지 않는다.

## Alternative Assessment

| 접근 | 적합한 점 | 비용·한계 | 평가 |
| --- | --- | --- | --- |
| Rust headless core + TS web host + 선택형 2D 렌더러 | 독립적인 게임 규칙, 브라우저 미디어 생태계, MOD·외부 API 확장 경계 | 두 언어, WASM 바인딩/테스트 | **권장 설계안** |
| Rust가 직접 웹 렌더링까지 소유 | 단일 언어 | 브라우저 미디어·DOM 통합 난도, 코어-호스트 결합 | 비추천 |
| TS 전체 엔진 | 배포·개발 경계 간소 | 확정된 Rust 코어 언어 선택과 불일치 | 비교 참고 |
| 초기부터 대규모 ECS/플러그인 VM | 고빈도 시뮬레이션·범용 모드 가능 | 텍스트/2D 서사 중심 MVP에 과설계 | 도입 보류 |

## Milestones and Acceptance

현재 **P0 개발 환경·하네스 -> P1 MVP 설정 -> P2 MVP 구현** 순서를 유지한다.

- **P0:** Rust/Cargo/Clippy/포매터, 웹 바인딩 빌드 검증을 재현 가능하게 설계. 기존 P0의 부트스트랩·CI 완료 조건은 별도로 충족.
- **P1:** 게임/호스트/에셋/MOD 계약, 각 기능의 MVP·후속 범위, 기본 렌더러 선정 및 라이선스 검토, 보안·저장 호환성, 브라우저 성능/로딩 목표를 확정.
- **P2:** 정적 이미지와 최소 SFX/BGM 및 **본 계층에 이미지 파츠를 붙여 키프레임으로 움직이는 2D 스켈레탈 컷아웃 캐릭터 또는 배경**을 포함하는 게임을 처음부터 끝까지 실행하고 저장·복원한다는 수직 검증 시나리오 후보. 동영상·ComfyUI·전문 스켈레탈 애니메이션·MOD 실제 구현은 P1에서 별도 범위를 승인한 경우에만 포함.

**제품 수용 시나리오(장기, 현재 미구현):** (a) 텍스트만 있는 게임도 정상 실행, (b) 이미지 파츠를 본·슬롯에 부착해 스켈레탈 컷아웃 캐릭터와 움직이는 배경을 표현 가능, (c) SFX/BGM·영상·컷신이 게임 진행과 연결, (d) 외부 생성/실패 시 대체 자산 처리 가능, (e) MOD 비활성 게임과 활성 게임을 모두 제작 가능, (f) **일러스트레이터가 시각적 저작 도구의 이미지·스켈레톤·스킨·클립을 가져와 Rust/TS 코드 작성 없이 MOD를 제작할 수 있음**, (g) MOD 충돌·저장 불일치 시 조용한 데이터 손상 없음.

## Unresolved Decisions

- 주력 장르 범위(서사·선택형 중심)와 실시간 전투/상호작용의 필요 범위.
- 게임별 규칙/스크립트 작성 모델과 실행 권한·샌드박스 정책.
- 스켈레탈 본·슬롯·Attachment·스킨·키프레임 정의 및 아트 MOD 교체·가져오기 계약. Spine 런타임 호환성·라이선스, 기본 2D 렌더러 선택.
- 게임 자산·애니메이션 manifest 포맷 및 명령/표현 cue의 시간 의미.
- MOD 재정의/의존성·로드 순서·보안·배포 책임, 게임별 opt-in 정책의 구체화.
- ComfyUI의 제작 전용 또는 런타임 제공 경로, 비용/비밀/저작권 정책.

## Research References

아래는 기술 가능성에 대한 **외부 읽기 전용 참고**이며, Textweft에서 의존성이나 제품 정책을 채택했다는 뜻은 아니다.

- [wasm-bindgen Guide](https://wasm-bindgen.github.io/wasm-bindgen/) — Rust/JavaScript 바인딩 및 TypeScript 선언 생성.
- [PixiJS Textures](https://pixijs.com/8.x/guides/components/textures) · [Render Layers](https://pixijs.com/8.x/guides/concepts/render-layers) · [Filters](https://pixijs.com/8.x/guides/components/filters) — 2D 이미지·레이어·시각 효과.
- [Spine Pixi Runtime](https://esotericsoftware.com/spine-pixi) — 스켈레탈 애니메이션 연동 및 별도 런타임 라이선스 확인.
- [Spine Basic Concepts](https://esotericsoftware.com/spine-basic-concepts) · [Spine Skins](https://esotericsoftware.com/spine-skins) — 본·슬롯·Attachment와 스킨을 통한 이미지 부착·교체.
- [Spine Licensing](https://esotericsoftware.com/spine-purchase) — 상용 에디터 및 런타임 통합/배포 조건 확인 필요.
- [ComfyUI 공식 WebSocket API 예제](https://github.com/comfyorg/comfyui/blob/master/script_examples/websockets_api_example.py) — 작업 큐·진행 알림·결과 조회 구조.
- [MDN Media Autoplay](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay) · [HTMLVideoElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement) — 브라우저 미디어 자동재생·포맷 차이.

이 문서는 **설계 조사 및 제안**이다. 확정된 코어 언어와 새 제품 요구를 제외하고, 구현 세부 및 MVP 범위는 후속 P1 결정 사항이다.
