---
description: "독립 작업 브랜치와 격리된 Git Worktree를 만들고 병렬 작업을 배치할 때 읽습니다."
---
# Branches and Worktrees

병렬 작업의 기본 단위는 Agent 수가 아니라 **독립적으로 수용 가능한 Work와 분리된 쓰기 공간**입니다. 병렬 Work의 분해·파일 소유권·통합은 [Parallel Agentic Development](../../development/workflows/parallel-agentic-development.md)가 소유합니다.

## Branch boundaries

- 쓰기 전에 저장소·계정·기준 ref·권한·현재 작업 상태를 확인합니다. 공유 기본 브랜치에서 직접 작업하지 않습니다.
- 하나의 branch는 하나의 관련 Goal/Change를 소유합니다. 독립 Work는 서로 다른 branch와 workspace를 사용하고, 각 Worker에 base SHA·write paths·테스트·Acceptance를 명시합니다.
- 같은 checkout에서 Agent가 동시에 branch를 전환하거나 파일을 수정하지 않습니다. 서로 다른 대화나 Agent 이름은 파일시스템 격리를 뜻하지 않습니다.
- 공통 Spec·API·스키마·fixture는 먼저 정하고 단일 owner에게 배정합니다. 공유 경로는 직렬화합니다.

## Worktree isolation

동일 로컬 저장소에서 별도 작업 디렉터리가 필요하면, 기준 SHA를 확인한 뒤 별도 branch와 worktree를 만듭니다.

    git worktree add -b feat/<work-id> ../textweft-<work-id> <base-sha>
    git worktree list

각 Worker는 할당된 worktree를 작업 디렉터리로 사용하고 지정된 write paths만 수정해야 합니다. Git worktree만으로 Agent의 다른 경로 접근이나 동일 파일 소유권 충돌까지 막지는 않으므로 런타임 격리와 disjoint write paths도 확인합니다. 지원 여부가 확인되지 않으면 읽기 전용 검토만 병렬화하고 쓰기는 직렬 수행합니다.

## Stacked pull requests

선행 PR에 의존하는 변경은 그 PR branch를 base로 하는 stacked PR로 제안할 수 있습니다. 부모 PR이 병합되기 전에는 자식 PR의 diff가 부모 변경을 포함하는지 구분합니다. 부모가 병합되면 자식 PR의 base를 기본 브랜치로 전환하고 최신 비교·CI·리뷰를 다시 확인합니다. PR 생성은 병합 승인이 아닙니다.

## Cleanup

git worktree list와 각 작업의 git status --short를 확인합니다. 변경이 깨끗하고 산출물이 보존·통합되었으며 의존 작업이 없을 때만 worktree와 branch를 정리합니다. 미확인 작업에 force 옵션을 사용하지 않습니다.
