# Project Skills

`.rulesync/skills/<name>/SKILL.md`는 Textweft가 직접 관리하는 Skill 정본입니다. `workflow-*`는 업무 흐름을 책임지는 선택형 Skill 유형이며 각 `description`의 적용·제외 조건으로 필요한 경우에만 선택합니다.

| 영역 | Owner |
| --- | --- |
| Outer RPI·adaptive loop·재귀 | 외부 `mols-loops` |
| Change·Spec 상태 | 외부 `mols-stdd` |
| Work 구현 순서 | `workflow-delivery` |
| 병렬 Work 분해·dispatch·통합 | `workflow-parallel-development` |
| 요청 단계별 업무 흐름 | 나머지 `workflow-*` |

[Rule·Skill 라우터](../../.agents/route/ROUTE.md)가 [파생 색인](../../.agents/route/skills.jsonl)을 통해 필요한 원본을 찾습니다. Rulesync가 생성하는 도구별 파일은 정본이 아닙니다. 복합 작업은 필요한 전문 Skill·문서·도구를 조합하되 중복 정의하거나 권한을 확대하지 않습니다.

공통 권한·보안·승인 정책은 [AGENTS.md](../../AGENTS.md)가 소유합니다. Skill 선택·설치·실제 자동 로딩은 서로 다른 검증 대상입니다.
