# Agent Asset Route

`.agents/route/`는 챗 에이전트가 필요한 Rule·Skill만 찾는 경량 탐색 진입점입니다.

| 파일 | 역할 |
| --- | --- |
| [ROUTE.md](ROUTE.md) | 자산을 선택하고 원본을 확인하는 절차 |
| [rules.jsonl](rules.jsonl) | 경로별 Rule의 Git 추적 파생 색인 |
| [skills.jsonl](skills.jsonl) | 작업별 Skill의 Git 추적 파생 색인 |

색인의 각 줄은 `name`·`path`·`description`을 가진 JSON 객체입니다. 생성물은 직접 고치지 않고 [Rulesync 운영 문서](../../docs/development/tooling/rulesync.md)에 따라 갱신·검증합니다.
