---
status: done
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

- [x] 문서 진입점과 소유권이 템플릿의 계층형 구조를 따르고 기존 정본을 중복하지 않는다.
- [x] 일반 docs Markdown의 description과 생성 인덱스가 일치하고 테스트로 drift를 탐지한다.
- [x] Agent-driven / parallel / spec-driven / test-driven 절차가 구체적인 실행·중단·검증 기준을 가진다.
- [x] 각 소프트웨어 Work의 Spec → 테스트 설계 → 테스트 구현 → 구현 순서와 가능한 Red/Green 증거가 정의된다.
- [x] 병렬 쓰기는 독립 Work, 계약, 파일 소유권, 격리된 workspace가 확인될 때만 허용된다.
- [x] Worker Agent와 coordinator의 권한·책임·handoff가 분리된다.
- [x] Issue/Inbox 템플릿이 프로젝트의 언어·보안·메타데이터 계약을 따른다.
- [x] Git branch/worktree·commit·integration·recovery 가이드가 병렬 격리와 승인 경계를 보존한다.
- [x] GitHub review/comment 템플릿이 수동 작성 보조임을 명시하고 GitHub 승인 상태를 대체하지 않는다.
- [x] Rulesync preview는 읽기 전용이며 외부 revision 변경은 manifest SHA 수정과 명시적 lock resolution을 요구한다.
- [x] Parallel Workflow는 Skill 지원 타깃에 노출되며 Worker 타깃·실제 격리 지원과 혼동하지 않는다.
- [x] 정적 검사와 실제 런타임 관찰을 구분하고 기존 경량 CI를 유지한다.
- [x] 변경 diff, 라우팅 색인, 문서 인덱스, 관련 테스트 및 GitHub CI를 확인하고 잔여 미검증 사항을 기록한다.

## Completion Evidence

- PR #14는 `d95d88c703842202634e6149b39b826e6d13d9ba`로 main에 병합되었습니다. PR #16은 main을 base로 동기화했고, 현재 비교는 26 commits ahead / 0 behind이며 GitHub가 mergeable로 보고합니다.
- PR #16은 [열린 상태](https://github.com/rwerwer1r/textweft/pull/16)로 유지합니다. 병합은 요청되지 않았습니다.
- GitHub Actions [CI run #147](https://github.com/rwerwer1r/textweft/actions/runs/44352842791)은 head `bfd3b907aff936d4a206e970609d8c1e16fa674e`에서 `npm ci`, `npm test`(27 tests pass), `npm run typecheck`를 성공적으로 완료했습니다.
- 해당 테스트 실행에는 docs index, route/Agent metadata, Issue Forms, Inbox metadata 테스트가 포함됩니다. docs index의 committed output 비교도 테스트합니다.
- Self-review에서 dangling index symlink 테스트 fixture의 이중 이스케이프를 수정하고, 전체 docs tree 검증이 이미 symlink를 차단하므로 중복된 사후 lstat 검사를 제거했습니다.
- Inbox bundle README 템플릿의 아직 생성되지 않은 자식 문서 링크를 파일명 placeholder로 바꿔 템플릿 자체의 잘못된 상대 링크를 제거했습니다.
- PR 변경 Markdown 64개 파일의 상대 링크 경로를 검사했고, 위 템플릿 링크를 수정했습니다. 제품 런타임·의존성·CI 정의는 변경하지 않았습니다.

## Remaining Limitations

- 로컬 `mise run check`, rumdl, Biome, Rulesync preview/generation 및 전체 부트스트랩 재현은 이 세션에서 실행하지 않았습니다.
- 실제 target runtime에서 Skill 자동 로딩, Worker 호출, 동시 실행, workspace 격리와 병렬 write behavior를 관찰하지 않았습니다. 지원 여부를 추정하지 않으며 해당 기능의 실제 운영 검증은 별도 작업입니다.

## Next Actions

- PR #16의 사람 리뷰와 명시적 병합 승인만 남았습니다. 이 Work는 구현·문서·테스트·CI 증거 기준으로 완료되었습니다.
- 지원되는 런타임이 확보되면 실제 Skill loading 및 isolated Worker smoke probe를 별도로 수행할 수 있습니다.
