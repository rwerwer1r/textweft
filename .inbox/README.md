# Inbox

`.inbox/`는 세션 간 조사·계획·검증·리뷰·인계를 Git에 보존하는 비정본 작업 공간입니다. 제품·권한·개발 계약의 정본은 코드·테스트·[AGENTS.md](../AGENTS.md)·[docs](../docs/README.md)·[STDD](../stdd/README.md)에 있습니다.

## Routing

| 상황 | 위치 |
| --- | --- |
| PR·Issue 작업 | `.inbox/github-<number>-<slug>/001-workstate.md` |
| PR 없는 branch 작업 | `.inbox/branch-<slug>/001-workstate.md` |
| 번호 없는 조사 | `.inbox/YYYY-MM-DD/001-<slug>.md` |

같은 작업에는 활성 workstate 하나를 갱신합니다. 추가 독립 문서는 `002-review.md`처럼 3자리 순번을 사용합니다. 여러 파일이 함께 읽혀야 할 때는 `003-<slug>/README.md`를 진입점으로 하는 문서 번들을 사용합니다. 작은 일회성 작업·읽기 전용 답변에는 별도 기록을 강제하지 않습니다.

재사용 구조와 이름은 [Organization](.configs/guides/organization.md), 번들·작업 기록의 템플릿은 `.configs/templates/`를 참고합니다.

## Frontmatter

새로 작성하거나 수정하는 작업 기록 Markdown에는 필수 `description`과 `updated`(실제 수정 시각의 timezone 포함 ISO 8601)가 필요합니다. `.inbox/README.md`, `.inbox/AGENTS.md`, `.inbox/.configs/`의 지침·템플릿은 작업 기록이 아니므로 예외입니다. 자세한 기준은 [Frontmatter](.configs/guides/frontmatter.md)를 따릅니다.

```yaml
---
description: 현재 작업을 식별하는 한 줄 설명
updated: 2026-11-19T00:37:27+09:00
---
```

예시 시각을 그대로 사용하지 않습니다. 변경된 작업 기록만 `mise run inbox:check -- <paths...>`로 검사합니다. `node scripts/check-inbox.mjs --stdin0`는 NUL 구분 경로를 받으며 메타데이터만 검증합니다.

## Checkpoint and Recovery

복원 가치가 있는 복잡한 다단계 작업은 첫 의미 있는 상태가 생긴 뒤 다음 장시간·위험 단계 전에 작업 브랜치에 기록·커밋·원격 반영하고 같은 ref에서 다시 확인합니다. 중요 상태가 달라질 때만 갱신하며 호출마다 메모를 만들지 않습니다.

**Workstate 최소 내용:** 목표/제외 범위, 정확한 저장소·계정·branch·PR·Change, 상태(`active`/`blocked`/`handoff`/`complete`), 실제 파일·커밋·검사 근거와 미실행 항목, 위험/승인, 다음 행동.

재개 시 현재 ref·PR·diff·검사·권한을 다시 확인해 기록과 대조하고 현재 원격 증거를 우선합니다. 이미 실행한 비가역 작업을 반복하지 않습니다. 원격 재조회 전에는 보존을 주장하지 않고, 수용 조건·승인 충족 전에는 `complete`로 표시하지 않습니다. 자동 재시작이나 백그라운드 지속은 제공하지 않습니다.

## Retention

비밀·개인정보·자격 증명·민감 로그·프롬프트 전문을 기록하지 않습니다. PR·Change와 정본으로 승격할 결정만 이동합니다. 진행 중 기록·필수 증거는 무단 삭제하지 않습니다. 자동 정리나 `main` 직접 쓰기 권한은 없습니다. 보존·아카이브 기준은 [Lifecycle](.configs/guides/lifecycle.md)을 따릅니다.
