---
description: "Inbox 작업 단위 디렉터리와 번호가 있는 문서 번들을 선택할 때 읽습니다."
---
# Inbox Organization

## Work-unit Containers

| 작업 유형 | 위치 |
| --- | --- |
| GitHub Issue/PR | `.inbox/github-<number>-<slug>/` |
| PR 없는 branch 작업 | `.inbox/branch-<slug>/` |
| 안정된 식별자가 없는 조사 | `.inbox/YYYY-MM-DD/` |

기존 작업 단위가 맞으면 재사용합니다. PR이 열렸다는 이유만으로 branch 디렉터리를 이동하거나 중복 기록을 만들지 않습니다. `.configs/`는 재사용 지침·템플릿이며 work unit이 아닙니다.

## Standalone and Bundled Documents

작업 단위는 개별 Markdown 문서와 문서 번들을 함께 가질 수 있습니다. 작은 작업은 단일 파일로 유지합니다.

```text
.inbox/branch-example/
. 001-workstate.md
. 002-review.md
. 003-investigation/
    README.md
    findings.md
    evidence.md
```

독립 기록은 `001-<type>-<slug>.md`처럼 3자리 번호를 사용합니다. 문서 번들은 `003-<slug>/README.md`를 필수 진입점으로 사용하고 자식 문서는 의미 있는 이름을 가집니다. 번들 안에 또 다른 번들을 중첩하지 않습니다. 기존 번호는 안정적으로 유지하며 무관한 문서를 일괄 rename하지 않습니다.

`README.md`는 번들의 목적과 관련 자식 문서 링크만 소유하고 내용을 복제하지 않습니다.
