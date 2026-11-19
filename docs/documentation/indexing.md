---
description: "문서 지도와 생성된 INDEX.tsv의 선택 기준 및 drift 검증을 확인할 때 읽습니다."
---
# Document Indexing

가장 작은 탐색 경로로 **정본 문서**에 도달하게 합니다. 사람을 위한 선택 기준은 README가, 자동 생성된 `path`·`description` 목록은 `INDEX.tsv`가 소유합니다.

| 상황 | 탐색 수단 |
| --- | --- |
| 문서 소유자를 앎 | 직접 링크 |
| 관련 문서 중 하나를 선택해야 함 | 디렉터리 README |
| docs 아래의 소유자를 모름 | 얕은 `docs/INDEX.tsv` |

## Commands

```sh
mise run docs:index
mise run docs:index:check
mise run test
```

`docs/INDEX.tsv`는 `docs/` 바로 아래의 Markdown 파일과 즉시 하위 디렉터리 README만 나열합니다. 깊은 문서는 해당 영역의 README를 통해 탐색합니다. 스크립트는 YAML frontmatter를 파싱하고 TSV 셀을 이스케이프하며 경로를 결정론적으로 정렬합니다. 심볼릭 링크, 잘못된 YAML, 누락·빈 description은 실패합니다.

`docs:index:check`는 쓰기 없이 drift를 보고합니다. 같은 동작을 테스트에서도 확인하므로 기존 `npm test` CI가 인덱스 불일치를 잡습니다. 별도 CI job이나 문서 전용 런타임을 추가하지 않습니다.
