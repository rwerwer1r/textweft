---
description: "GitHub Issue·PR·댓글·리뷰 작성 보조 템플릿과 적용 경계를 확인할 때 읽습니다."
---
# GitHub Authoring Templates

GitHub는 [Issue Forms](../ISSUE_TEMPLATE/)와 [PR template](../pull_request_template.md)을 네이티브하게 인식합니다. 이 디렉터리의 댓글·리뷰 문서는 **수동 작성 보조 자료**이며 GitHub가 자동 적용하거나 렌더링하지 않습니다. API/Plugin으로 Issue·댓글·리뷰를 작성할 때도 호출자가 해당 템플릿을 명시적으로 읽고 적용해야 합니다.

| GitHub surface | Template | Use |
| --- | --- | --- |
| General Issue | [issue.md](../ISSUE_TEMPLATE/issue.md) | 전용 Issue Form으로 다루지 않는 질문·작업 |
| Pull request | [Native PR template](../pull_request_template.md) | PR 요약·검증·필수 셀프 리뷰 |
| Issue / PR conversation | [comment.md](comment.md) | 결론·근거·다음 행동을 전달 |
| PR review | [pull-request-review.md](pull-request-review.md) | 검토 범위·finding·검증·잔여 위험 |
| PR inline review | [pull-request-inline-comment.md](pull-request-inline-comment.md) | 특정 줄의 단일 actionable finding |

## Authoring rules

- 대괄호 placeholder를 실제 내용으로 바꾸고 사용하지 않는 선택 섹션·주석을 제거합니다. 이 파일들은 템플릿 엔진이 아닙니다.
- 관찰·추론·미확인을 구분하고 경로·line·ref·명령 결과 등 검증 가능한 근거를 연결합니다.
- Inline comment 하나에는 하나의 actionable finding만 둡니다. GitHub가 제공하는 파일·줄 문맥을 반복하지 않습니다.
- GitHub의 approve/request-changes/comment 결정은 실제 리뷰 제출 상태가 소유합니다. 본문 텍스트나 체크박스만으로 승인·병합 준비를 선언하지 않습니다.
- 자격 증명·개인정보·민감 로그·비공개 대화는 포함하지 않습니다.
