# Textweft

> 말로 세계를 엮다.

**Textweft**는 선택 중심 텍스트 게임을 만들기 위한 초기 단계의 **장르 중립 프레임워크**입니다. 선언형 **YAML/JSON 콘텐츠**와 게임별 규칙을 위한 선택적 **TypeScript 훅**을 결합합니다. 런타임은 headless 방식이므로 웹·CLI·사용자 정의 렌더러가 같은 게임을 사용할 수 있습니다.

이 저장소는 공개 npm 패키지나 안정된 API가 아닌 **v0.1 프로토타입**입니다. **주 사용자는 AI 코딩 도구로 게임을 만드는 바이브코더**입니다. Textweft의 개발 대상은 개별 게임이 아니라 재사용 가능한 프레임워크입니다. 역할은 [용어집](docs/GLOSSARY.md), 프레임워크 개발 방식은 [AI 주도 바이브코딩 워크플로](docs/development/workflows/vibe-coding.md)를 참조합니다.

## Quick start

개발 도구의 버전·설치·검증은 [mise](https://mise.jdx.dev/)의 [mise.toml](mise.toml)에서 관리합니다. mise 설치 후:

```sh
mise run bootstrap   # 최초 1회: 도구·의존성·Lefthook·로컬 Git 템플릿
mise run check
mise run example
```

**P0 작업 브랜치는 아직 초기 잠금 설정 단계입니다.** `package-lock.json`이 없고 `rulesync.lock`이 비어 있어 현재 `mise run bootstrap`은 실행을 차단합니다. 유지보수자는 아래 **최초 한 번만** 잠금을 생성·리뷰·커밋한 뒤 위 Quick start를 사용합니다.

```sh
mise install
npm install --package-lock-only --ignore-scripts
mise run rulesync:resolve
# package-lock.json과 rulesync.lock을 검토·커밋
```

상세한 잠금·권한·검증 기준은 [선택형 Agent Asset 가이드](docs/development/tooling/agent-assets.md)를 따릅니다. 최종 병합 전 두 잠금 파일의 생성·frozen 재설치를 실제로 확인해야 합니다.

mise CLI가 먼저 설치되어 있어야 합니다. [부트스트랩](mise-tasks/bootstrap)은 Node.js·Biome·rumdl·Rulesync·Lefthook, 잠금된 npm 및 외부 Skill 의존성을 준비하고 `.gitmessage`를 **이 저장소에만** 등록합니다. 기존 클론은 `mise run update`로 잠금된 환경과 훅을 재동기화합니다. 잠금이나 도구 버전을 조용히 갱신하지 않습니다.

예제는 `examples/lighthouse/game.yaml`과 `examples/lighthouse/main.ts`에 있으며, 조건부 선택지와 무작위 경로가 포함된 짧은 항해를 정의합니다.

## Authoring model

- **Scene:** 텍스트와 선택지를 담습니다. 종료 장면은 `end: true`로 표시합니다.
- **Choice:** 고유 `id`, 표시용 `label`, 선택적 `when`·`effects`, 목적지 `to`로 구성합니다.
- **State:** 게임이 소유하는 JSON 직렬화 가능 최상위 키·값 변수입니다.
- **Conditions:** `{ path: "count", equals: 2 }`, `{ path: "count", gte: 1 }`, `{ call: "myCondition" }` 형태를 사용합니다.
- **Effects:** `{ set: { flag: true } }`, `{ add: { count: 1 } }`, `{ call: "myEffect" }` 형태를 사용합니다.
- **Routes:** 목적지 장면 ID 또는 `{ call: "myRoute" }` 형태를 사용합니다.

고급 규칙은 TypeScript의 조건·효과·경로 훅으로 등록합니다. 콘텐츠에서 임의 코드를 실행하거나 등록되지 않은 훅을 호출할 수는 없습니다.

```ts
const game = defineGame(parseGameYaml(source), {
  conditions: { canContinue: ({ state }) => state.ready === true },
  effects: { spend: ({ state }) => ({ ...state, tokens: Number(state.tokens) - 1 }) },
  routes: { choosePath: ({ random }) => random() < 0.5 ? 'left' : 'right' },
});

const runtime = createRuntime(game, { seed: 42 });
const first = runtime.start();
const next = runtime.choose(first.choices[0].id);
const save = runtime.snapshot();
const resumed = createRuntime(game, { snapshot: save });
```

## Execution contract

1. `start()`는 초기 장면에 한 번만 진입합니다. 반복 호출해도 `onEnter`를 다시 실행하지 않습니다.
2. `view()`는 게임을 진행시키지 않고 렌더러 중립의 `{ sceneId, text, choices, ended }`를 반환합니다.
3. `choose(id)`는 선택지의 유효성을 확인하고 효과를 적용한 뒤, **갱신된 상태**로 목적지를 결정하고 대상 장면의 `onEnter`를 실행하여 전이를 확정합니다.
4. 잘못된 선택지·없는 목적지·예외를 던지는 훅이 발생해도 런타임 상태·이력·난수 상태는 변경되지 않습니다.
5. `snapshot()`은 장면·상태·난수·선택 이력·게임/스키마 버전을 저장합니다. 복원은 호환성을 검사하며 `onEnter`를 다시 실행하지 않습니다.

재현성과 롤백 안전성을 보장하려면 훅은 **동기식**이어야 하고 외부 상태 변경에 의존하지 않아야 합니다. 시드 기반 무작위성에는 런타임이 제공하는 `random()`을 사용합니다. `conditions`는 순수해야 하며 난수를 소비하면 안 됩니다.

## Layout

```text
src/core.ts                Headless 엔진, 스키마, 유효성 검사
src/yaml.ts                YAML 로더 (`yaml` 사용)
src/index.ts               공개 내보내기
examples/lighthouse/      간단한 하이브리드 게임 예제
tests/runtime.test.ts      엔진 동작 테스트
```

## Scope

**현재 포함:** 정적 장면, 조건부 선택지, 선언형·사용자 정의 효과, 사용자 정의 경로, 결정적인 시드 난수, 스냅샷·복원, 게임 정의 검증, 실행 가능한 예제.

**아직 포함하지 않음:** 비주얼 에디터, 자유 텍스트 입력 파서, 인벤토리·전투 시스템, 동적 장면 생성, 렌더링 프레임워크, 영속 저장 어댑터, 세이브 마이그레이션, 패키지 배포, 자동 이벤트·타임라인 엔진. 이는 코어의 필수 개념이 아니라 게임별 기능 또는 후속 확장 후보입니다.

## Ownership and release

저장소 소유자: **[rwerwer1r](https://github.com/rwerwer1r)**. 현재 비공개 프로토타입이며 공개 소스 라이선스를 선언하지 않았습니다. npm 배포도 설정되어 있지 않습니다.

## Development and agent harness

개발은 [AGENTS.md](AGENTS.md)를 기준으로 하며, 작업별 상세 문서는 [개발 문서 라우터](docs/development/README.md)에서 고릅니다. [ROUTE](.agents/route/ROUTE.md)는 관련 Rule·Skill만 선택합니다. 실행이 없는/제한된 챗봇만 [CHATBOT.md](CHATBOT.md)를 사용합니다.

문서 상대 링크·제목은 `mise run lint:md`(rumdl), JS·TS는 `mise run lint:code`(Biome), 프로젝트 고유 라우팅 계약은 `mise run routes:check`로 검사합니다. 커밋할 때 [Lefthook](lefthook.yml)은 스테이징된 Markdown·JS/TS/JSON과 관련 인박스·라우팅만 검사합니다. Git 훅은 부트스트랩 또는 `mise run hooks:install`을 실행한 로컬 클론에서만 활성화되며, 전체 검증은 `mise run check`입니다. 실행하지 않은 검사를 통과로 보고하지 않습니다.
