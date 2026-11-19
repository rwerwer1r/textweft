---
description: "검토 가능한 커밋 단위, Conventional Commit 메시지와 세션 체크포인트를 정할 때 읽습니다."
---
# Commits

커밋은 파일 수나 세션 길이가 아니라 **함께 이해·검토·검증·되돌릴 수 있는 하나의 목적**으로 묶습니다. 하나의 목적에 필요한 코드·테스트·문서는 함께 커밋할 수 있고, 독립 목적은 분리합니다.

## Prepare

- git status --short, git diff, git diff --cached를 확인하고 무관하거나 다른 작업자의 변경을 포함하지 않습니다.
- 의도한 경로·hunk만 stage하고 git diff --cached와 git diff --cached --check를 확인합니다.
- 관련 테스트·검사를 실행하고 미실행 항목을 성공으로 기록하지 않습니다.

## Message

[.gitmessage](../../../.gitmessage)가 프로젝트의 Conventional Commits 형식과 타입을 안내합니다.

    type(scope): concise summary

간단한 변경은 제목만으로 충분합니다. diff·PR·Spec에서 복원하기 어려운 이유, 중요한 결정, 실제 검증 한계, 다음 확인 조건이 있을 때만 본문을 추가합니다. 고정된 체크포인트 필드나 커밋 SHA를 미리 기입하지 않습니다. 비밀·개인정보·민감 대화는 메시지에 남기지 않습니다.

## Checkpoints

장기 작업은 의미 있는 진척·위험 단계·인계 시점에 작업 branch에 체크포인트를 남깁니다. 미완료 변경은 미완료·미검증 상태임을 명확히 합니다. 다른 세션에서 복원하려면 조회 가능한 원격 ref에 커밋을 반영하고 재조회합니다. 자세한 절차는 [Routine Loop](../../development/workflows/routine-loop.md#commit-checkpoints)와 [Inbox](../../../.inbox/README.md)를 따릅니다.

공유된 커밋은 후속 커밋으로 수정하는 것을 우선합니다. 게시된 이력의 amend·split·rebase는 소유자와 downstream 의존성을 확인하고 명시적으로 조정한 경우에만 수행합니다.
