---
description: "Git 브랜치·Worktree·커밋·통합·복구 지침을 선택할 때 읽습니다."
---
# Git

작업 ref와 현재 상태를 먼저 확인하고, 목적에 맞는 지침만 읽습니다.

| 작업 | 가이드 |
| --- | --- |
| 브랜치·Worktree·병렬 작업 공간 | [Branches and Worktrees](branches.md) |
| 커밋 경계·메시지·체크포인트 | [Commits](commits.md) |
| PR·merge·rebase·충돌 통합 | [Integration](integration.md) |
| 작업 상태 조사·복구 | [Recovery](recovery.md) |

## Local commit template

[.gitmessage](../../../.gitmessage)는 커밋 편집기에서 사용하는 저장소 템플릿입니다. [Routine Loop](../../development/workflows/routine-loop.md)가 체크포인트의 목적과 검증 한계를 소유합니다. GitHub Issue·PR·리뷰 작성 보조 자료는 [GitHub templates](../../../.github/templates/README.md)를 참조합니다.

Git의 로컬 설정은 해당 clone에만 적용됩니다. 템플릿 파일이 커밋 메시지를 강제하거나 git commit -m을 검사하지 않습니다.
