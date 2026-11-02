# Project Skills

`.rulesync/skills/<name>/SKILL.md`는 Textweft가 직접 관리하는 Skill 정본입니다. **`workflow-*`는 업무 흐름을 책임지는 Skill 유형**이며, 개별 `description`의 적용/제외 조건을 통해 필요할 때만 선택합니다. 작업 방식은 다른 Skill·문서·지침·도구를 활용할 수 있지만, 이를 중복 정의하거나 권한을 확대하지 않습니다.

[Rule·Skill 라우터](../../.agents/route/ROUTE.md)가 [파생 Skill 색인](../../.agents/route/skills.jsonl)을 통해 필요한 원본을 찾습니다. Rulesync가 여러 에이전트 런타임으로 생성하는 파일은 정본이 아닙니다. `mols-loops`는 별도로 고정한 외부 의존성으로 복합 작업의 RPI·반복·재귀를 제어하고, [workflow-delivery](workflow-delivery/SKILL.md)는 Spec → 테스트 설계 → 테스트 구현 → 실제 구현을 소유합니다.

항상 적용되어야 하는 권한·보안·승인 정책은 [AGENTS.md](../../AGENTS.md)를 따르며, Skill의 선택·설치·실제 자동 로드는 별도 검증 대상입니다.
