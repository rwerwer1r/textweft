---
description: "프로젝트 스크립트의 책임, 생성·검사 명령과 자동화 변경 기준을 확인할 때 읽습니다."
---
# Script Maintenance

프로젝트 소유 스크립트는 네이티브 CLI나 [mise task](../../../mise.toml)만으로 명확하게 표현할 수 없는 동작에 한정합니다.

## Current scripts

| Script | Responsibility | Write behavior |
| --- | --- | --- |
| [agent-route-index.mjs](../../../scripts/agent-route-index.mjs) | Rulesync Rule·Skill 원본에서 route JSONL 색인 생성 또는 drift 확인 | generate만 기록, check는 읽기 전용 |
| [generate-docs-index.mjs](../../../scripts/generate-docs-index.mjs) | docs frontmatter에서 docs/INDEX.tsv 생성 또는 drift 확인 | mise run docs:index 기록, docs:index:check 읽기 전용 |

## Change contract

- 기존 mise task와 도구의 native 기능을 먼저 확인합니다. 새 script는 독립된 로직과 재사용 이익이 있을 때만 추가합니다.
- 검사·검증 명령은 읽기 전용이어야 합니다. 파일 변경은 명시적 generate·format·update 작업으로 분리합니다.
- CLI 인수·exit code·출력·side effect를 문서화하고, 생성 파일 형식과 호출자를 함께 검토합니다.
- script 변경 시 관련 테스트, task, 의존성, 생성 결과, 문서와 Git diff를 확인합니다.
- 정적 코드 리뷰, 실제 실행, CI 결과를 구분합니다. 실행하지 못한 명령은 통과로 보고하지 않습니다.

전체 문서 인덱스 규칙은 [Indexing](../../documentation/indexing.md), Rule·Skill 색인 소유권은 [Rulesync](rulesync.md)를 따릅니다.
