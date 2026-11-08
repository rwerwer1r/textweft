# Routine Working Loop

프로젝트의 복잡한 RPI 실행·재귀·재계획은 [mols-loops 의존성](../tooling/agent-assets.md)이 담당합니다. 이 문서는 공통 확인·검증·인계만 소유하고, 동작 변경 Work에는 [workflow-delivery](../../../.rulesync/skills/workflow-delivery/SKILL.md)의 테스트 우선 절차를 적용합니다. 요청 단계의 권한은 [Workflow Selection](choosing.md), AI 협업은 [Vibe Coding](vibe-coding.md)을 따릅니다.

## Common Checks and Handoff

1. **시작:** 현재 저장소·계정·ref·권한·[AGENTS.md](../../../AGENTS.md)와 필요한 [Rule·Skill](../../../.agents/route/ROUTE.md), 기존 PR·코드·테스트를 확인합니다.
2. **범위:** 수용 조건과 검증 방법을 정하고 작은 작업 단위를 유지합니다. 중요한 제품·보안 결정은 사람에게 맡깁니다.
3. **검증:** [mise 작업](../README.md#checks) 중 관련 검사를 실행합니다. 전체는 `mise run check`, 작은 문서 변경은 `mise run lint:md` 등으로 범위를 줄입니다. [Lefthook](../../../lefthook.yml)은 관련 스테이징 파일만 검사하므로 전체 검증을 대체하지 않습니다. **실제 실행/CI/정적 확인/미실행**을 구분합니다.
4. **커밋 체크포인트:** 의미 있는 작업 단위가 검토·복원 가능한 상태가 되면 관련 변경만 묶어 Conventional Commits(`type(scope): 요약`) 형식으로 커밋합니다. 제목으로 작업 결과를 식별하고, 필요하면 본문에 변경 이유·검증 상태·남은 일을 적습니다. 검증되지 않은 상태를 완료로 포장하거나 도구 호출마다 형식적인 WIP 커밋을 만들지 않습니다. 세션을 넘기는 작업은 체크포인트를 작업 브랜치에 원격 반영·재조회하고, 보존한 이력을 불필요하게 재작성하지 않습니다.
5. **리뷰·인계:** 계약 위반·회귀·보안·명세와 테스트의 불일치를 자체 리뷰하고, 결과·검증 증거·위험·필요한 결정을 PR에 남깁니다. **병합은 별도 승인**입니다.

복잡한 다단계 작업만 첫 의미 있는 상태 이후 다음 긴/위험한 단계 **전에** 커밋으로 표현하기 어려운 작업 맥락을 [Inbox](../../../.inbox/README.md)에 최소 기록해 원격 보존·재조회합니다. 도구 호출마다 기록하지 않습니다.
