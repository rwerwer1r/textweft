---
description: "Inbox 작업 문서의 description·updated 메타데이터와 템플릿 예외를 확인할 때 읽습니다."
---
# Inbox Frontmatter

작업 기록은 재개 시점을 식별할 수 있도록 실제 내용을 설명하고 실제 수정 시각을 기록합니다.

```yaml
---
description: 현재 작업 기록이 무엇을 다루는지 한 문장 설명
updated: 2026-11-19T00:37:27+09:00
---
```

- `description`: 비어 있지 않은 한 문장. 파일의 제목이나 상태를 반복하지 않습니다.
- `updated`: 해당 파일의 마지막 실질 수정 시각을 timezone이 포함된 ISO 8601로 기록합니다. 예시 시각을 복사하지 않습니다.
- 새 작업 문서와 수정한 작업 문서는 두 필드를 모두 포함합니다. 수정 시 `updated`를 실제 시각으로 갱신합니다.
- `.inbox/README.md`, `.inbox/AGENTS.md`, `.inbox/.configs/`의 안내·템플릿은 작업 기록이 아니므로 `updated`를 요구하지 않습니다.

변경된 작업 기록만 `mise run inbox:check -- <paths...>`로 검사합니다. 이 도구는 제한된 메타데이터 검사이며 YAML 전체의 사실성이나 링크를 검증하지 않습니다.
