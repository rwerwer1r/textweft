# Textweft Agent Asset Route

현재 ref의 [AGENTS.md](../../AGENTS.md)를 먼저 확인합니다. **여기는 Rule·Skill 선택용이며 문서 작업 라우터가 아닙니다.** 문서·작업 절차는 [개발 문서 라우터](../../docs/development/README.md)에서 고릅니다.

1. **대상 파일에 Rule이 관련될 때만** [rules.jsonl](rules.jsonl)의 `name`·`description`으로 후보를 찾습니다. **재사용 Skill이 필요한 작업일 때만** [skills.jsonl](skills.jsonl)을 읽습니다. 관련 후보가 없으면 중단합니다.
2. 후보의 `path`(저장소 루트 상대 경로)에서 **원본**을 읽고 Rule의 `globs`·대상 경로, Skill의 작업 조건을 확인합니다. 일치할 때만 적용합니다.
3. 대상·작업이 바뀌면 다시 선택합니다. 원본 누락·색인 불일치는 추측하지 않습니다.

두 JSONL은 Git 추적 **발견용 파생 색인**입니다. `mise run routes:check`로 검증하며 생성·소유권은 [Rulesync](../../docs/development/tooling/rulesync.md)를 따릅니다. Subagent 위임은 별도 계약과 실행 기능이 필요합니다.
