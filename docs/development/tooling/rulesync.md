# Rulesync Tooling

Textweft는 Rulesync를 **경로별 Rule·재사용 Skill의 도구별 투영 도구**로 사용합니다. [AGENTS.md](../../../AGENTS.md)와 [CHATBOT.md](../../../CHATBOT.md)는 직접 작성하고 Git으로 추적하는 정본이며 Rulesync가 생성·덮어쓰지 않습니다.

## Ownership

| 자산 | 소유권 |
| --- | --- |
| [`AGENTS.md`](../../../AGENTS.md), [`CHATBOT.md`](../../../CHATBOT.md) | 저장소 계약과 챗 진입점, 직접 관리 |
| [`.rulesync/rules/typescript.md`](../../../.rulesync/rules/typescript.md) | 프로젝트 저작 TypeScript Rule 원본 |
| [`.rulesync/skills/`](../../../.rulesync/skills/README.md) | 필요 시 직접 작성하는 프로젝트 Skill 원본 |
| [`rulesync.jsonc`](../../../rulesync.jsonc), [`rulesync.lock`](../../../rulesync.lock) | 타깃 설정과 외부 소스 버전 고정. 현재 외부 `sources`는 비어 있음 |
| [`rules.jsonl`](../../../.agents/route/rules.jsonl), [`skills.jsonl`](../../../.agents/route/skills.jsonl) | Git 추적 파생 라우팅 색인. **수동 편집 금지** |
| `.github/instructions/`, `.agents/rules/`, 타깃별 Skill 복사본 | 로컬 생성물. Git 무시 및 수동 편집 금지 |

지원되는 타깃과 실제 로딩 방식은 다음처럼 구분합니다.

| 환경 | Rulesync 타깃과 기능 | 프로젝트 진입 |
| --- | --- | --- |
| **도구 실행이 없거나 제한된 ChatGPT 등의 챗봇** | 직접 지원하는 `chatgpt` 타깃 없음 | [CHATBOT.md](../../../CHATBOT.md)로 코딩 에이전트의 규칙·작업 루프·검증 보고를 **가능한 범위에서 재현**. Codex·Claude·Gemini 코딩 에이전트용 진입점과 구분 |
| **Codex CLI** | `codexcli`: Skill | 직접 관리하는 [AGENTS.md](../../../AGENTS.md)와 선택형 Skill |
| **Claude Code** | `claudecode`: 경로별 Rule·Skill, `includeRoot: false` | 직접 관리하는 [CLAUDE.md](../../../CLAUDE.md)가 AGENTS.md를 안내 |
| **Gemini CLI** | Rulesync의 직접 지원 타깃 없음 | 직접 관리하는 [GEMINI.md](../../../GEMINI.md)가 AGENTS.md를 안내 |
| **Google Antigravity** | `antigravity-ide`·`antigravity-cli`: Rule·Skill | 지원되는 프로젝트별 경로별 생성물과 AGENTS.md |
| **Gemini in Android Studio** | `androidstudio`: Skill | 사용 가능한 Skill이 생겼을 때 투영(현재 0개) |
| **GitHub Copilot / CLI** | `copilot`·`copilotcli`: Rule·Skill | 기존 설정 유지 |

Rulesync 9.0.0부터 `geminicli` 타깃이 제거되었으므로 40.2.0 설정에 넣지 않습니다. Gemini CLI는 `GEMINI.md`로 직접 연결하고, Rulesync의 Google 계열 타깃은 Antigravity IDE·CLI와 Android Studio Skill을 사용합니다.

`agentsmd` 타깃과 Codex의 `rules` 투영을 활성화하지 않은 이유는 직접 작성한 `AGENTS.md`를 덮어쓸 수 있기 때문입니다. Claude의 루트 Rulesync 생성도 꺼 두었습니다. `GEMINI.md`와 `CLAUDE.md`는 **생성물이 아닌 경량 진입점**입니다. 현재 각 버전의 자동 로딩·타깃 투영을 실제 실행하지 않았다면 지원 설정만 완료된 것으로 보고합니다.

공식 타깃과 프로젝트별 기능: [Rulesync Supported Tools](https://rulesync.dyoshikawa.com/reference/supported-tools.html). Gemini CLI의 진입점: [GEMINI.md 안내](https://geminicli.com/docs/cli/gemini-md/).

애플리케이션 런타임은 Rulesync를 필요로 하지 않습니다. 외부 Skill·Subagent는 포함하지 않습니다.

## Lifecycle

저장소 루트에서 다음 명령을 사용합니다.

```sh
bash scripts/rulesync-assets install
bash scripts/rulesync-assets generate
bash scripts/rulesync-assets check
bash scripts/rulesync-assets update
```

- **`install`**: 현재 잠금 파일을 기준으로 설치합니다.
- **`generate`**: 잠금 상태를 설치한 뒤 로컬 타깃 투영과 Git 추적 라우팅 색인을 생성합니다.
- **`check`**: Rulesync 엄격 진단, 라우팅 색인 일치성, 생성물 Git 소유권 및 직접 관리하는 `AGENTS.md`·`CHATBOT.md`·`CLAUDE.md`·`GEMINI.md` 무변형을 검사합니다.
- **`update`**: 외부 소스가 없는 현재 단계에서는 **비활성화**했습니다. 외부 Skill 도입 승인 및 잠금 정책을 마련한 뒤 구현합니다.

`scripts/rulesync`는 **Rulesync v40.2.0**의 지원 플랫폼별 바이너리를 다운로드하고 **SHA-256을 검증**한 뒤 `.cache/rulesync/`에 캐싱하는 실행 래퍼입니다. 실제 설치·투영에는 셸·Git·Node.js·curl·네트워크·적절한 실행 권한이 필요합니다.

```sh
npm run agents:index:generate
npm run agents:index:check
npm run harness:check
npm run harness:test
```

`agents:index:check`는 네트워크 없이 소스와 JSONL의 일치성을 확인합니다. `harness:check`는 필수 파일·문서 링크·잠금 구조·라우팅 색인을 확인합니다. **정적 검사만으로 Rulesync 바이너리 실행, 타깃 투영 성공, AI 에이전트 자동 로딩을 주장하지 않습니다.**

## Rules and Skills

- **Rule:** 경로·확장자별 계약은 `.rulesync/rules/*.md`에서 작성합니다. Rulesync의 `targets`·`globs`를 사용해 적용 범위를 제한하고, 생성 후 해당 파일에 **적용될 사례와 적용되면 안 될 사례**를 확인합니다.
- **Skill:** 반복되는 독립 작업 절차가 생기면 `.rulesync/skills/<name>/SKILL.md`를 추가합니다. 선택용 `name`·`description`을 frontmatter에 둡니다. 현재 등록된 Skill은 없습니다.
- **외부 Skill:** 이번 구축에는 가져오지 않았습니다. 추후 사용자가 승인한 원본만 `rulesync.jsonc`에 선언하고 `rulesync.lock`으로 고정한 다음 원본·라이선스·변경 이력을 검증합니다. 참고 프로젝트의 자산은 자동 상속하지 않습니다.

[에이전트 자산 라우터](../../../.agents/route/ROUTE.md)는 `name`·`description`으로 후보를 좁힌 후 실제 `path`에서 적용 조건을 확인합니다. 생성된 색인이나 투영은 **새 권한을 부여하지 않으며**, 승인·보안·계정 경계는 `AGENTS.md`에 따릅니다.

## Isolation

다른 도구가 소유한 자산을 Rulesync로 덮거나 삭제하지 않습니다. 특히 직접 작성한 `AGENTS.md`, `CHATBOT.md`, `CLAUDE.md`, `GEMINI.md`, `.agents/route/`는 생성 범위에서 보호합니다. 외부 Skill 업데이트는 별도 리뷰 대상으로 취급합니다.
