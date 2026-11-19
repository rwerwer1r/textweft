---
description: "Inbox 작업 기록을 만들거나 수정하고 보존·정리할 때 적용합니다."
---
# Inbox Agent Instructions

`.inbox/`는 비정본 작업 증거입니다. Root [AGENTS.md](../AGENTS.md)와 현재 Change/PR의 권한·정본이 우선합니다.

- 새 작업 기록·번들 위치는 [Organization](.configs/guides/organization.md)을 따릅니다.
- 작업 문서의 `description`과 `updated`는 [Frontmatter](.configs/guides/frontmatter.md)를 따릅니다.
- 기록의 재사용·승격·보존·정리는 [Lifecycle](.configs/guides/lifecycle.md)를 따릅니다.
- 필요할 때만 `.configs/templates/`의 해당 템플릿을 복사하고 사용하지 않는 placeholder를 제거합니다.
- 증거와 추론을 분리하고 미실행·실패·미확인을 그대로 표시합니다.
- 비밀·개인정보·자격 증명·민감 로그·전체 대화를 기록하지 않습니다.
- `.configs/`는 reusable guidance/scaffolds이며 실제 작업 상태를 저장하지 않습니다.
