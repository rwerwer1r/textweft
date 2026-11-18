---
status: doing
---
# Agent-driven parallel development harness

## Goal

Template의 문서 구조와 에이전트 중심 개발 운영 방식을 Textweft에 맞게 흡수한다. Agent-driven, parallel agentic, spec-driven, test-driven 개발이 하나의 일관된 하네스에서 작동하도록 한다.

## Scope

- 문서 탐색 구조, 문서 소유권 및 frontmatter 기반 인덱스 도입
- Agent harness의 configured / reachable / observed-applied 검증 기준
- Agent-driven 개발, 병렬 Work 분해·격리·통합, STDD/Spec, TDD 절차 명문화
- 기존 RPI/mols-loops, STDD, workflow-delivery, Rulesync를 연결하는 선택형 Workflow Skill
- 병렬 Work 전용 위임 Agent의 범위·파일 소유권·통합 경계 정의
- Issue 및 Inbox용 최소 작성 템플릿 도입
- Git branch/worktree·commit·integration·recovery 절차와 GitHub review/comment authoring aids 도입
- Rulesync read-only preview와 명시적 pinned-source lock resolution 경로 추가
- 기존 경량 CI와 승인·계정·저장소 경계 유지

## Out of Scope

- 게임 런타임 또는 제품 기능 변경
- 다른 저장소·서비스에 쓰기
- CI를 무겁게 만들거나 별도 테스트 프레임워크 도입
- 실제로 지원·검증되지 않은 런타임의 병렬 Agent 기능 보장
- PR #14의 STDD 기반을 재작성하거나 독립적으로 병합

## Acceptance

- [ ] 문서 진입점과 소유권이 템플릿의 계층형 구조를 따르고 기존 정본을 중복하지 않는다.
- [ ] 일반 docs Markdown의 description과 생성 인덱스가 일치하고 테스트로 drift를 탐지한다.
- [ ] Agent-driven / parallel / spec-driven / test-driven 절차가 구체적인 실행·중단·검증 기준을 가진다.
- [ ] 각 소프트웨어 Work의 Spec → 테스트 설계 → 테스트 구현 → 구현 순서와 가능한 Red/Green 증거가 정의된다.
- [ ] 병렬 쓰기는 독립 Work, 계약, 파일 소유권, 격리된 workspace가 확인될 때만 허용된다.
- [ ] Worker Agent와 coordinator의 권한·책임·handoff가 분리된다.
- [ ] Issue/Inbox 템플릿이 프로젝트의 언어·보안·메타데이터 계약을 따른다.
- [ ] Git branch/worktree·commit·integration·recovery 가이드가 병렬 격리와 승인 경계를 보존한다.
- [ ] GitHub review/comment 템플릿이 수동 작성 보조임을 명시하고 GitHub 승인 상태를 대체하지 않는다.
- [ ] Rulesync preview는 읽기 전용이며 외부 revision 변경은 manifest SHA 수정과 명시적 lock resolution을 요구한다.
- [ ] Parallel Workflow는 Skill 지원 타깃에 노출되며 Worker 타깃·실제 격리 지원과 혼동하지 않는다.
- [ ] 정적 검사와 실제 런타임 관찰을 구분하고 기존 경량 CI를 유지한다.
- [ ] 변경 diff, 라우팅 색인, 문서 인덱스, 관련 테스트 및 GitHub CI를 확인하고 잔여 미검증 사항을 기록한다.

## Next Actions

- 문서·Skill·Agent 책임 경계를 설계하고 기존 PR #14의 STDD branch 위에 변경을 누적한다.
- 템플릿에서 필요한 구조만 가져와 문서, 자동 인덱스, Issue/Inbox/GitHub authoring scaffolds를 구현한다.
- Git worktree/stacked PR 가이드와 Rulesync preview/refresh 경로를 문서·task에 연결한다.
- route generation, Markdown, docs index, runtime test, PR CI를 확인하고 PR #16의 변경 설명·증거를 최신화한다.