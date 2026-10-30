# Rulesync Tooling

Rulesync는 Rule·Skill을 AI 도구별로 생성하는 **개발 도구**이며 게임 런타임 의존성이 아닙니다. 버전·설치·명령은 [mise.toml](../../../mise.toml)의 정본을 따릅니다. 자체 바이너리 다운로드·해시 래퍼는 사용하지 않습니다.

## Ownership

| 경로 | 책임 |
| --- | --- |
| [AGENTS.md](../../../AGENTS.md)·[CHATBOT.md](../../../CHATBOT.md)·[CLAUDE.md](../../../CLAUDE.md)·[GEMINI.md](../../../GEMINI.md) | 직접 관리하는 진입점, 자동 생성·덮어쓰기 금지 |
| [`.rulesync/rules/`](../../../.rulesync/rules/typescript.md)·[`.rulesync/skills/`](../../../.rulesync/skills/README.md) | Rule·Skill 원본 |
| [rulesync.jsonc](../../../rulesync.jsonc)·[rulesync.lock](../../../rulesync.lock) | 도구 설정 및 외부 소스 잠금(현재 빈 소스) |
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

Rulesync CLI 바이너리는 mise가 고정 버전으로 설치합니다. `rulesync:generate`는 도구별 복사본과 라우팅 색인을 갱신합니다. `rulesync:check`는 Rulesync 자체 진단, `routes:check`는 **Textweft 고유 파생 색인의 정합성**만 검사합니다.

외부 Skill·Subagent는 아직 설치하지 않았습니다. 소스 도입·업데이트는 출처·라이선스·계정·잠금·변경 범위를 사람과 리뷰한 후 수행합니다. **정적 검사 성공은 실제 에이전트가 지침을 로드했다는 증거가 아닙니다.**
