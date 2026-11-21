---
description: "Rulesync source, target, generated projection과 Agent Skill routing을 관리할 때 읽습니다."
---
# Rulesync Tooling

Rulesync는 Textweft가 **직접 작성한** Rule·Skill·Subagent를 AI 도구별로 투영하는 개발 도구이며 게임 런타임 의존성이 아닙니다. 버전과 명령은 [mise.toml](../../../mise.toml)이 소유합니다.

## Ownership

| 경로 | 책임 |
| --- | --- |
| [AGENTS.md](../../../AGENTS.md) · [CHATBOT.md](../../../CHATBOT.md) | Git 추적 공통 진입점; 자동 덮어쓰기 금지 |
| `CLAUDE.md` · `GEMINI.md` | 로컬 진입점; `mise run update`가 파일이 없을 때만 생성 |
| [`.rulesync/rules/`](../../../.rulesync/rules/typescript.md) · [`.rulesync/skills/`](../../../.rulesync/skills/README.md) · `.rulesync/commands/` | Textweft 직접 작성 Rule·Skill·Command 정본 |
| [`.rulesync/subagents/`](../../../.rulesync/subagents/textweft-autopilot.md) | 사용자 선택형 Autopilot, 위임형 Worker·Review Agent 정본 |
| [rulesync.jsonc](../../../rulesync.jsonc) | 생성 target·outputRoots; 외부 `sources` 없음 |
| [rules.jsonl](../../../.agents/route/rules.jsonl) · [skills.jsonl](../../../.agents/route/skills.jsonl) | 소스에서 파생한 Git 추적 발견 색인 |
| `.github/instructions/` · `.github/prompts/` 등 | 벤더별 로컬 투영; Git 무시 |
| `.agents/commands/` | 디렉터리 골격. 현재 Command 실제 출력 경로는 아님 |
| `.agents/rules/` · `.agents/agents/` · `.agents/skills/` | Git 추적 골격; 런타임 투영은 로컬 Git exclude에서 제외 |

## Target Behavior

지원 대상은 [rulesync.jsonc](../../../rulesync.jsonc)가 소유합니다. Copilot·Claude Code·Antigravity IDE/CLI에는 프로젝트 Command가 활성화되어 있으며 Codex CLI는 프로젝트 Skill·Subagent만 사용합니다. Copilot CLI·Android Studio는 Command를 지원하지 않습니다. Claude Code는 루트 Rule을 제외합니다. Antigravity 및 Gemini in Android Studio를 지원합니다. 실제 사용 가능 여부는 런타임별 확인이 필요합니다.

현재 정의된 Command는 없습니다. 향후 원본은 `.rulesync/commands/*.md`, 투영은 Copilot `.github/prompts/`, Claude Code `.claude/commands/`, Antigravity `.agents/skills/`입니다. Claude Code·Gemini CLI의 로컬 루트 진입점은 `mise run update`가 없을 때만 만들고 기존 파일은 보존합니다. 제한된 챗봇은 [CHATBOT](../../../CHATBOT.md)을 따릅니다.

## Lifecycle

```sh
mise install
npm ci
mise run rulesync:preview
mise run rulesync:generate
mise run routes:check
mise run rulesync:check
```

- `rulesync:preview`: strict 진단 + `rulesync generate --dry-run`, 파일을 변경하지 않음.
- `rulesync:generate`: 프로젝트 원본에서 벤더별 투영을 생성하고 Rule·Skill 파생 색인을 갱신.
- `rulesync:check`: Rulesync 자체 strict 진단. `routes:check`: Textweft 파생 색인 드리프트 검사.
- `mise run update`, `rulesync:generate`, `rulesync:preview`, `rulesync:check`는 공통 `scripts/check-agent-cache.sh`를 먼저 실행합니다. 원시 `rulesync generate` 직접 실행은 이 보호를 우회하므로 프로젝트 진입점을 사용합니다.
- `mise run bootstrap`·`mise run update`: mise 도구 → `npm ci` → Lefthook → 로컬 Rulesync 투영 → 로컬 진입점. npm 잠금이 없으면 설치 전에 중단.

다른 저장소의 Skill을 설치할 필요가 없으므로 `rulesync install`, frozen Skill lock, upstream SHA resolve 단계는 제거했습니다. **기존 클론의 1회 마이그레이션:** Rulesync v40.2.0은 manifest의 `sources`가 없어도 로컬 `.rulesync/rules/.curated/`·`.rulesync/skills/.curated/`·`.rulesync/subagents/.curated/`에 남은 외부 자산을 생성에 포함할 수 있습니다. 프로젝트의 업데이트·생성·미리보기·검사 작업은 이 경로의 잔여 파일이나 심볼릭 링크를 감지하면 **외부 자산 재투영 전에 중단**합니다. 사용자가 내용을 확인한 뒤 더 이상 필요 없는 캐시만 수동 정리하고 다시 실행하세요. 업데이트가 이 경로를 자동 삭제하지는 않습니다. 이전 버전에서 이미 생성한 벤더별 투영 파일도 이름 변경으로 모두 제거된다고 가정하지 말고, 각 실제 런타임의 발견 경로에서 오래된 에이전트/Skill 파일을 별도 확인·정리해야 합니다. 생성/검사 실행과 실제 에이전트 적용 여부를 구분합니다.

[CI](../../../.github/workflows/ci.yml)는 Node 테스트·타입 검사와 Rulesync v40.2.0의 진단·실제 파일 생성을 검증합니다. rumdl·Biome, 전체 `mise run check`, mise 부트스트랩 및 실제 Skill/Agent 자동 선택은 별도 명시적 런타임 검증으로 남겨 둡니다. 프로젝트 범위 외의 서비스·저장소에 쓰지 않습니다.
