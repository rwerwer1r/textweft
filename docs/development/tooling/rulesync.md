---
description: "Rulesync source, target, lockfile, generated projection과 Agent Skill routing을 관리할 때 읽습니다."
---
# Rulesync Tooling

Rulesync는 Rule·Skill을 AI 도구별로 생성하는 **개발 도구**이며 게임 런타임 의존성이 아닙니다. 버전·설치·명령은 [mise.toml](../../../mise.toml)의 정본을 따릅니다. 자체 바이너리 다운로드·해시 래퍼는 사용하지 않습니다.

## Ownership

| 경로 | 책임 |
| --- | --- |
| [AGENTS.md](../../../AGENTS.md)·[CHATBOT.md](../../../CHATBOT.md) | Git 추적 공통 진입점, 자동 생성·덮어쓰기 금지 |
| `CLAUDE.md`·`GEMINI.md` | Git에서 제외하는 로컬 진입점; `mise run update`가 없을 때만 만들며 기존 파일은 보존 |
| [`.rulesync/rules/`](../../../.rulesync/rules/typescript.md)·[`.rulesync/skills/`](../../../.rulesync/skills/README.md)·`.rulesync/commands/` | Rule·Skill·Command 원본 (Command는 아직 정의 없음) |
| [`.rulesync/subagents/`](../../../.rulesync/subagents/mols-autopilot.md) | 사용자 직접 선택형 Autopilot·위임형 Work Unit Worker·전문 리뷰 Agent의 원본. [Agent Roles](../ai-agent/agents.md) 참조 |
| [rulesync.jsonc](../../../rulesync.jsonc)·[rulesync.lock](../../../rulesync.lock) | 여섯 가지 선별 외부 Skill 의존성 선언·고정된 upstream SHA·선택 목록·무결성 잠금 |
| [rules.jsonl](../../../.agents/route/rules.jsonl)·[skills.jsonl](../../../.agents/route/skills.jsonl) | 원본에서 생성하는 Git 추적 라우팅 색인, 직접 편집 금지 |
| `.github/instructions/`·`.github/prompts/` 등 도구별 투영 | 로컬 생성물, Git 무시 |
| `.agents/commands/` | Git에서 디렉터리만 보존 (`.gitkeep`); 현재 타깃의 Command 실제 출력 경로는 아님 |
| `.agents/rules/`·`.agents/agents/`·`.agents/skills/` | 디렉터리 골격만 Git 추적; 생성물 제외는 `mise run update`가 `.git/info/exclude`에 추가 (Antigravity 로딩 호환) |

## Targets

설정 타깃은 [rulesync.jsonc](../../../rulesync.jsonc)가 소유합니다. 프로젝트 Command는 Copilot·Claude Code·Antigravity IDE/CLI에 활성화합니다. 원본은 `.rulesync/commands/*.md`이고, Copilot은 `.github/prompts/`, Claude Code는 `.claude/commands/`, Antigravity는 `.agents/skills/`에 출력합니다. Codex CLI의 Command는 전역 모드만 지원하고 Copilot CLI·Android Studio는 Command를 지원하지 않으므로 활성화하지 않습니다.

Codex CLI는 프로젝트 Skill·Subagent만, Claude Code는 루트 Rule을 제외합니다. Antigravity IDE·CLI, Gemini in Android Studio, GitHub Copilot·CLI를 지원합니다. Claude Code·Gemini CLI의 루트 진입점은 `mise run update`가 로컬에서만 생성하며 공통 [AGENTS.md](../../../AGENTS.md)를 참조합니다. 기존 파일은 덮어쓰지 않습니다. 런타임이 제한된 챗봇은 [CHATBOT.md](../../../CHATBOT.md)를 사용합니다. ChatGPT 전용 Rulesync 타깃은 없습니다.

프로젝트의 Autopilot·Work Unit Worker·DualVantage 리뷰 Agent 타깃별 설정은 [Agent Roles](../ai-agent/agents.md)에 설명합니다. Subagent는 Rule·Skill 파생 색인과 별개로 생성되며 Android Studio에는 만들지 않습니다. 자동 선택·호출 제한·독립 검토는 대상 런타임에서 관찰해야 합니다.

## Lifecycle

```sh
mise install
mise run rulesync:install
mise run rulesync:generate
mise run rulesync:check
mise run routes:check
```

Rulesync CLI 바이너리는 mise가 고정 버전으로 설치합니다. `rulesync:generate`는 도구별 복사본과 프로젝트 직접 저작 Rule·Skill 라우팅 색인을 갱신합니다. `rulesync:check`는 Rulesync 자체 진단, `routes:check`는 **Textweft 고유 파생 색인의 정합성**만 검사합니다.

## External Skill Adoption

[선택한 자산과 일회성 하네스 절차](agent-assets.md)에 지속 사용 Skill 6개와 문서로 흡수한 일회성 참고 4개를 구분합니다. `rulesync.jsonc`는 upstream 커밋·경로·선택 목록을 지정합니다. `.rulesync/skills/.curated/`는 `rulesync install`이 설치하는 외부 의존성(직접 작성 원본이 아님)입니다. 두 `.curated/` 디렉터리는 Git·rumdl에서 제외합니다. 프로젝트가 직접 작성하는 `workflow-*` Skill 정본은 `.rulesync/skills/workflow-*/SKILL.md`이며 해당 `skills.jsonl`은 `mise run routes:generate`로 생성합니다. 외부 의존성은 이 색인에 중복 수동 등록하지 않습니다.

최초 잠금은 설치 가능한 환경에서 `mise run rulesync:resolve`로 생성하고 `rulesync.lock`의 변경·출처·선택·무결성을 검토 후 커밋합니다. 잠금 파일이 완성된 이후의 재설치는 `mise run rulesync:install`(`rulesync install --frozen`)로 고정 상태를 확인하고 `mise run rulesync:generate`로 대상별 투영을 만듭니다. `mise run bootstrap`과 `mise run update`는 npm 잠금 존재를 먼저 확인하고, mise 도구 → frozen Skill 설치 → `npm ci` → Git 훅 → 투영 순으로 동기화합니다. npm 잠금이 없으면 설치 **전에 중단**하고, Rulesync 잠금이 비어 있으면 npm/훅 작업 전에 **중단**합니다. 최초에는 `npm install --package-lock-only --ignore-scripts`와 `mise run rulesync:resolve`로 각각의 lock을 생성·검토·커밋해야 합니다. 부분 실패 후에는 원인을 수정한 뒤 `mise run update`를 재실행합니다.

[CI](../../../.github/workflows/ci.yml)는 PR/main에서 Node 의존성 설치·런타임 테스트·타입 검사만 실행합니다. Rulesync frozen 설치·타깃 투영·부트스트랩 재실행·라우팅 색인 검사는 로컬/명시적 하네스 점검으로 남겨 두며 CI 필수 게이트가 아닙니다. CI 통과는 Rulesync 설치나 에이전트 자동 로딩을 증명하지 않습니다.

과거 P0 CI에서 frozen 재설치·타깃 투영·부트스트랩/업데이트 재실행 및 전체 검사에 성공한 이력은 있습니다. 현재 경량 CI는 이를 재검증하지 않으며, 특정 AI 런타임의 자동 Skill 선택·다른 OS 호환성·브랜치 보호 적용을 보증하지 않습니다. 설치/업데이트 전에 외부 출처·권한·지원 파일/target 동작을 검토합니다. 다른 저장소 계정이나 외부 서비스에는 프로젝트 데이터를 쓰지 않습니다. **정적 검사 성공은 실제 에이전트가 지침을 로드했다는 증거가 아닙니다.**
