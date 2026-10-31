# Rulesync Tooling

Rulesync는 Rule·Skill을 AI 도구별로 생성하는 **개발 도구**이며 게임 런타임 의존성이 아닙니다. 버전·설치·명령은 [mise.toml](../../../mise.toml)의 정본을 따릅니다. 자체 바이너리 다운로드·해시 래퍼는 사용하지 않습니다.

## Ownership

| 경로 | 책임 |
| --- | --- |
| [AGENTS.md](../../../AGENTS.md)·[CHATBOT.md](../../../CHATBOT.md)·[CLAUDE.md](../../../CLAUDE.md)·[GEMINI.md](../../../GEMINI.md) | 직접 관리하는 진입점, 자동 생성·덮어쓰기 금지 |
| [`.rulesync/rules/`](../../../.rulesync/rules/typescript.md)·[`.rulesync/skills/`](../../../.rulesync/skills/README.md) | Rule·Skill 원본 |
| [rulesync.jsonc](../../../rulesync.jsonc)·[rulesync.lock](../../../rulesync.lock) | 네 가지 선별 외부 Skill 의존성 선언 및 설치 후 잠금. 현재 원격 lock은 아직 빈 상태 |
| [rules.jsonl](../../../.agents/route/rules.jsonl)·[skills.jsonl](../../../.agents/route/skills.jsonl) | 원본에서 생성하는 Git 추적 라우팅 색인, 직접 편집 금지 |
| `.github/instructions/` 등 도구별 투영 | 로컬 생성물, Git 무시 |

## Targets

설정의 타깃은 [rulesync.jsonc](../../../rulesync.jsonc)가 소유합니다. Codex CLI(`codexcli`)는 Skill만, Claude Code(`claudecode`)는 루트 Rule을 제외하여 직접 관리하는 진입점을 보호합니다. Antigravity IDE·CLI, Gemini in Android Studio, GitHub Copilot·CLI를 지원합니다. Gemini CLI는 직접 관리하는 `GEMINI.md`를 사용하고, 런타임이 제한된 챗봇은 [CHATBOT.md](../../../CHATBOT.md)를 사용합니다. ChatGPT 전용 Rulesync 타깃은 없습니다.

## Lifecycle

```sh
mise install
mise run rulesync:generate
mise run rulesync:check
mise run routes:check
```

Rulesync CLI 바이너리는 mise가 고정 버전으로 설치합니다. `rulesync:generate`는 도구별 복사본과 프로젝트 직접 저작 Rule·Skill 라우팅 색인을 갱신합니다. `rulesync:check`는 Rulesync 자체 진단, `routes:check`는 **Textweft 고유 파생 색인의 정합성**만 검사합니다.

## External Skill Adoption

[선택한 자산과 일회성 하네스 절차](agent-assets.md)에 지속 사용 Skill 4개와 문서로 흡수한 일회성 참고 4개를 구분합니다. `rulesync.jsonc`는 upstream 커밋·경로·선택 목록을 지정합니다. `.rulesync/skills/.curated/`는 `rulesync install`이 설치하는 외부 의존성(직접 작성 원본이 아님)입니다. 프로젝트가 직접 작성하는 Skill용 `skills.jsonl`에 외부 의존성을 중복 수동 등록하지 않습니다.

최초 잠금은 설치 가능한 환경에서 `mise run rulesync:resolve`로 생성하고 `rulesync.lock`의 변경·출처·선택·무결성을 검토 후 커밋합니다. 잠금 파일이 완성된 이후의 재설치는 `mise run rulesync:install`(`rulesync install --frozen`)로 고정 상태를 확인하고 `mise run rulesync:generate`로 대상별 투영을 만듭니다. `mise run bootstrap`과 `mise run update`는 도구·npm·Git 훅 다음에 frozen Skill 설치와 투영까지 동기화합니다. 잠금이 아직 비어 있으면 **정상적으로 실패**하므로, 최초에는 먼저 `mise run rulesync:resolve`로 lock을 작성·검토·커밋해야 합니다. 부분 실패 후에는 원인을 수정한 뒤 `mise run update`를 재실행합니다.

현재는 **외부 선언만 반영**했고 잠금 생성·설치·Rulesync 투영·실제 AI 에이전트 로딩은 미실행입니다. 설치/업데이트 전에 외부 출처·권한·지원 파일/target 동작을 검토합니다. 다른 저장소 계정이나 외부 서비스에는 프로젝트 데이터를 쓰지 않습니다. **정적 검사 성공은 실제 에이전트가 지침을 로드했다는 증거가 아닙니다.**
