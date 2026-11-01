# Agent Asset Route

**작업별 선택 지침:** [ROUTE.md](ROUTE.md). Rule·Skill 후보를 골라 **필요한 원본만** 읽습니다.

[Rule 색인](rules.jsonl)·[Skill 색인](skills.jsonl)은 Git 추적 생성물이며, 정본/생성 절차는 [Rulesync 운영](../../docs/development/tooling/rulesync.md)을 따릅니다.

`.agents/`에는 공통 라우팅 정본 `route/`와 `rules/`·`agents/`·`skills/`·`commands/` 디렉터리를 유지합니다.
후자의 `.gitkeep`만 Git으로 추적하며, 도구별 Rulesync 생성 파일은 로컬에만 둡니다.
원본 Rule·Skill·Command는 `.rulesync/`에서 관리합니다. `commands/`는 현재 빈 구조이며, Antigravity의 Command 출력은 `.agents/skills/`로 생성됩니다.
