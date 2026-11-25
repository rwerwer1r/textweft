---
description: "staged·unstaged·untracked·conflict·누락된 Git 작업을 조사하고 안전하게 복구할 때 읽습니다."
---
# Recovery

복구 전에 변경의 위치와 소유자를 식별합니다. index, working tree, untracked 파일, branch/ref, committed history는 서로 다른 상태입니다.

1. git status --short, git diff, git diff --cached, git worktree list로 현재 상태를 조사합니다.
2. stage만 잘못되었다면 git restore --staged PATH로 index에서만 해제하고 working-tree 내용은 보존합니다.
3. 커밋 참조를 잃었다면 git reflog와 branch 목록을 먼저 조사합니다. reflog는 백업이나 영구 보존을 보장하지 않습니다.
4. merge/rebase 진행 중이면 충돌 상태와 각 변경의 소유자를 확인한 뒤 계속하거나 중단합니다.
5. 세션 재개 시 승인된 과거 기록·대화보다 최신 원격 ref·PR·diff·검증 결과를 우선하고, 이미 실행된 비가역 작업을 반복하지 않습니다.

git restore PATH, git reset --hard, git clean -fd, force-push는 작업을 버리거나 교체할 수 있습니다. 정확한 대상·영향·권한을 확인하지 않은 채 실행하지 않습니다. 다른 작업자의 변경을 복구 과정에서 덮어쓰지 않습니다. 장기 인계 증거는 [Routine Loop](../../development/workflows/routine-loop.md#commit-checkpoints)를 따릅니다.
