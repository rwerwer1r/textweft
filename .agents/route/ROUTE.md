# Textweft Agent Asset Route

[AGENTS.md](../../AGENTS.md)를 확인한 뒤 현재 작업에 필요한 Rule·Skill만 읽습니다.

1. [rules.jsonl](rules.jsonl)·[skills.jsonl](skills.jsonl)에서 **이름·설명만** 보고 후보를 고릅니다. 관련 항목이 없으면 여기서 멈춥니다.
2. 선택한 `path`(저장소 루트 상대 경로)의 **원본**을 열고 Rule의 `globs`/대상 경로나 Skill의 작업 조건을 확인해 적용합니다.
3. 대상이 바뀌면 다시 고릅니다. 없는 파일·오래된 색인을 추측하지 않습니다.

JSONL은 원본의 **Git 추적 파생 색인**이며 별도 권한·행동 지침이 아닙니다. `npm run agents:index:check`로 검사하고 생성물 관리는 [Rulesync](../../docs/development/tooling/rulesync.md)를 따릅니다. Subagent는 별도 계약·실행 기능 확인이 필요합니다.
