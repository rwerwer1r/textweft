# Rulesync Tooling

Rulesync는 **Rule·Skill 원본을 AI 도구별 형식으로 생성**하는 개발 도구이며 게임 런타임 의존성이 아닙니다. 직접 관리하는 [AGENTS.md](../../../AGENTS.md)·[CHATBOT.md](../../../CHATBOT.md)·[CLAUDE.md](../../../CLAUDE.md)·[GEMINI.md](../../../GEMINI.md)를 생성·덮어쓰지 않습니다.

## Ownership

| 자산 | 소유권 |
| --- | --- |
| [`.rulesync/rules/`](../../../.rulesync/rules/typescript.md), [`.rulesync/skills/`](../../../.rulesync/skills/README.md) | 프로젝트 저작 Rule·Skill **원본** |
| [`rulesync.jsonc`](../../../rulesync.jsonc), [`rulesync.lock`](../../../rulesync.lock) | 타깃·잠금 **정본** (외부 소스 0개) |
| [`rules.jsonl`](../../../.agents/route/rules.jsonl), [`skills.jsonl`](../../../.agents/route/skills.jsonl) | Git 추적 **파생 색인**; 수동 편집 금지 |
| `.github/instructions/`, `.agents/rules/`, 도구별 Skill 사본 | 로컬 **생성물**; Git 무시·직접 수정 금지 |

## Targets

| 환경 | 연결 방식 |
| --- | --- |
| 런타임이 제한된 **ChatGPT 등의 챗봇** | Rulesync 네이티브 `chatgpt` 없음. [CHATBOT.md](../../../CHATBOT.md)로 코딩 하네스의 판단·검증을 가능한 범위에서 재현 |
| Codex CLI | `codexcli`: Skill만; 루트 `AGENTS.md`는 직접 관리 |
| Claude Code | `claudecode`: 경로 Rule·Skill, `includeRoot: false`; `CLAUDE.md` 직접 관리 |
| Gemini CLI | Rulesync 직접 타깃 없음; `GEMINI.md` 직접 관리 |
| Google Antigravity | `antigravity-ide`·`antigravity-cli`: Rule·Skill |
| Gemini in Android Studio | `androidstudio`: Skill |
| GitHub Copilot·CLI | `copilot`·`copilotcli`: Rule·Skill |

Rulesync 40.2.0에는 `geminicli`가 없고 `agentsmd`는 루트 정본 충돌 위험으로 사용하지 않습니다. 각 AI 도구의 실제 자동 로딩은 별도 확인이 필요합니다. [지원 타깃](https://rulesync.dyoshikawa.com/reference/supported-tools.html).

## Commands and Guarantees

```sh
npm run agents:index:generate  # 원본 → Git 추적 JSONL
npm run agents:index:check     # 색인 최신성(네트워크 불필요)
npm run harness:check         # 필수 파일·링크·색인·하네스 테스트
bash scripts/rulesync-assets install
bash scripts/rulesync-assets generate
bash scripts/rulesync-assets check
```

`scripts/rulesync`는 Rulesync **v40.2.0**을 다운로드해 **SHA-256을 검증**하고 `.cache/rulesync/`에 캐시합니다. CLI 실행은 네트워크·셸·Git·Node·curl 및 적절한 권한이 필요합니다. `rulesync-assets check`는 진단·실제 생성·색인·생성물 Git 소유권 및 직접 관리 문서 **무변형**을 점검합니다. `update`는 외부 소스 승인·잠금 검토 전까지 **비활성화**합니다.

Rule은 대상 `globs`·`targets`를 명시하고, 필요한 경우에만 `.rulesync/skills/<name>/SKILL.md`를 추가합니다. 현재 프로젝트 Skill·외부 소스·Subagent는 없습니다. 외부 자산 도입은 출처·권한·라이선스·잠금·변경 이력을 별도 리뷰합니다.

**정적 검사 통과는 Rulesync CLI 실행이나 AI 도구의 실제 규칙 적용 증거가 아닙니다.** 자산 선택은 [ROUTE](../../../.agents/route/ROUTE.md), 권한은 `AGENTS.md`만 소유합니다.
