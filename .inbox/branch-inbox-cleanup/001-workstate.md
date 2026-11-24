---
description: "종료된 Inbox 작업 기록의 정본 대조, 테스트 의존성 해소와 정리 작업의 재개 조건을 확인합니다."
updated: 2026-11-25T03:28:38+09:00
---

# Inbox retention cleanup

- Goal: retain reusable Inbox rules and templates; remove only completed, redundant work records after canonical and dependency review.
- Base: PR #17 head `5f69a880d0c448eea7c5d51d567f5f026cb053c4`; separate branch `chore/inbox-retention-cleanup`. No merge authorization.
- Findings: seven records refer to merged PRs #2, #4, #8, #9, #10, #12, #16. Current canonical architecture, workflow, STDD, and tooling already own durable knowledge. No promotion needed.
- PR #17 edits two historical records; base the cleanup on its branch to avoid a modify/delete conflict and leave that PR untouched.
- Scanned 121 nonempty retained text files at the base. The only matching historical record dependency was in `tests/inbox-harness.test.mjs`. In an isolated reproduction using exact original blobs, the old test failed with ENOENT on an empty Inbox; with a temporary independent fixture, all five tests passed on Node 22.16.0.
- Next: verify the test blob, then delete the seven reviewed records and this temporary checkpoint once PR evidence is preserved. Keep all ten reusable files and original Git history. Verify the final diff and current PR/branch state. No production code or policy change.
