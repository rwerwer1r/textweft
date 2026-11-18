---
description: "Rulesync source, target, lockfile, generated projection과 Agent Skill routing을 관리할 때 읽습니다."
---
# Rulesync Tooling

Rulesync는 Rule·Skill·Subagent를 AI 도구별로 생성하는 개발 도구이며 게임 런타임 의존성이 아닙니다. 버전과 명령은 [mise.toml](../../../mise.toml)이 소유합니다.

## Ownership

| 경로 | 책임 |
| --- | --- |
| `AGENTS.md`·`CHATBOT.md` | Git 추적 공통 진입점, 자동 생성·덮어쓰기 금지 |
| `.rulesync/rules/`·`.rulesync/skills/` | Rule·Skill 정본 |
| `.rulesync/subagents/` | Autopilot·Work Worker·리뷰 Agent 정본 |
| `rulesync.jsonc`·`rulesync.lock` | 외부 source·target·revision·integrity |
| `.agents/route/*.jsonl` | 원본에서 생성하는 Git 추적 발견 색인 |
| 도구별 생성 파일 | 로컬 projection, 정본 아님 |

## Lifecycle

```sh
mise install
mise run rulesync:install
mise run rulesync:generate
mise run rulesync:check
mise run routes:check
```

최초 lock 생성·갱신은 별도 검토 작업에서 `mise run rulesync:resolve`로 수행합니다. 일반 재설치는 `rulesync install --frozen`으로 기존 lock을 변경하지 않습니다. `rulesync generate`는 target-native projection과 프로젝트 Rule/Skill 색인을 갱신합니다.

## Routing

[ROUTE](../../../.agents/route/ROUTE.md)는 작업 의도에 맞는 Skill을 선택합니다. `.rulesync/skills/workflow-*/SKILL.md`가 프로젝트 Workflow의 정본이며 `.agents/route/skills.jsonl`은 파생 색인입니다. 외부 curated Skill은 Rulesync가 설치하며 프로젝트 route 색인에 중복 등록하지 않습니다.

Subagent 정의는 target별로 생성되지만 직접 선택·위임 제한·병렬 실행·workspace 격리는 런타임마다 다릅니다. 실제 동작은 [Agent Harness Verification](../ai-agent/harness.md)에서 확인합니다.

CI는 `npm ci`, `npm test`, `npm run typecheck`만 수행합니다. Rulesync frozen install·projection·실제 에이전트 자동 로딩은 CI 성공으로 추정하지 않습니다.
