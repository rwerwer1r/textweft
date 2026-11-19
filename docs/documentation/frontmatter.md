---
description: "일반 docs Markdown의 description 메타데이터와 예외 범위를 정할 때 읽습니다."
---
# Markdown Frontmatter

일반 `docs/**/*.md` 문서는 파일을 열기 전에 선택할 수 있도록 YAML `description`을 가집니다.

## Contract

- 모든 `docs/**/*.md` 파일은 첫 줄에 YAML frontmatter를 두고, 비어 있지 않은 문자열 `description`을 선언합니다. 디렉터리 `README.md`도 포함합니다.
- 저장소 루트 [README](../../README.md), `AGENTS.md`, `CHATBOT.md`, Rulesync 자산, GitHub Issue/PR 템플릿은 각자의 계약을 따릅니다.
- 문서의 H1 제목을 반복하지 말고 **언제 이 문서를 선택해야 하는지** 한 문장으로 설명합니다.
- 추가 필드는 명확한 소비자와 소유자가 있을 때만 사용합니다.

```yaml
---
description: "에이전트가 실제로 프로젝트 지침을 로드했는지 확인할 때 읽습니다."
---
```

## Verification

`mise run docs:index`는 문서의 description을 사용해 인덱스를 생성합니다. `mise run docs:index:check`는 모든 Markdown 메타데이터와 인덱스 drift를 읽기 전용으로 검사합니다. 생성 파일을 직접 수정하지 말고 원본 문서를 수정한 뒤 인덱스를 다시 생성합니다.
