# Textweft Agent Asset Route

이 문서는 저장소 내부의 선택형 Rule·Skill을 발견하고 적용할 때 사용하는 라우터입니다. 권한과 승인 기준은 이 문서가 아닌 [AGENTS.md](../../AGENTS.md)가 소유합니다.

## Selection

1. 현재 저장소·ref, 대상 경로, 작업 의도를 확인하고 적용되는 `AGENTS.md`를 먼저 읽습니다.
2. [catalog.json](catalog.json)의 `name`·`description`을 보고 필요한 후보만 고릅니다. 모든 자산 본문을 미리 읽지 않습니다.
3. **Rule:** 후보의 저장소 상대 `path`에서 원본을 읽고 globs·selector·대상 경로 적용 조건을 확인합니다.
4. **Skill:** 후보의 `path`에 있는 원본(일반적으로 `SKILL.md`)을 읽고 적용 범위와 실제 절차를 따릅니다.
5. 작업 목적이나 대상이 달라지면 선택을 다시 평가합니다. 파일 누락·불명확한 출처·지원되지 않는 실행은 추측하지 않고 한계를 알립니다.

## Catalog contract

`catalog.json`은 수동 관리하는 자산 발견용 색인입니다. `version: 1`, `rules: []`, `skills: []` 구조를 사용하며, 향후 항목에는 `name`·`description`·저장소 루트 기준 상대 `path`가 필요합니다. 실제 행동 지침은 **원본 파일**이 소유하고 카탈로그는 이를 대체하지 않습니다. 새 항목은 이 저장소에 커밋된 파일을 가리켜야 하며 `npm run harness:check`로 확인합니다.

초기 카탈로그는 의도적으로 비어 있습니다. 아직 설치된 Rule·Skill·Subagent가 없으며, 참고 프로젝트의 관리 도구·외부 Skill·생성 프로젝션이 설치되었다고 가정하지 않습니다.
