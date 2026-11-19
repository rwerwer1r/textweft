---
status: done
---
# Local-first Textweft agent assets

## Goal

Textweft가 에이전트 Skill과 Subagent를 직접 소유하고, 다른 저장소에서 Skill을 설치하거나 원본을 읽어야 하는 운영 의존성을 없앤다.

## Scope

- 외부 Skill 여섯 개의 역할을 Textweft 전용 Skill 계약으로 재작성
- Rulesync remote sources, frozen Skill 설치 및 불필요한 lock 제거
- 에이전트 이름·라우팅·검증·운영 문서를 프로젝트 전용으로 정리
- 기존 승인·계정·테스트 우선·세션 복구·병렬 격리 계약 유지

## Out of Scope

- Git 이력 재작성, 다른 계정·저장소에 쓰기, 제품 런타임 수정
- 병합·릴리스·배포, 네이티브 런타임에서 검증하지 않은 자동 Skill 호출 주장

## Acceptance

- [x] 외부 Skill fetch 없이 자체 Rulesync 원본만으로 Skill 경로를 구성한다.
- [x] 선택된 여섯 기능에 프로젝트 전용 원본과 발견 색인이 존재한다.
- [x] 활성 Subagent가 프로젝트 고유 이름과 기존 권한·호출 경계를 보존한다.
- [x] 현재 추적 파일에 이전 자산 소유자 이름이 남지 않고 문서 링크가 유효하다.
- [x] CI 테스트 및 타입 검사가 통과하고 미검증 런타임 범위를 기록한다.

## Evidence

- Baseline: `main` d419b08f0d7a7dd6b18921ca1aee4f27ace2470f
- Test design: local source metadata, routes, bootstrap, identity reference, role invariants
- PR #17의 head `e3de2b79496f5ed2c7bade5207c414b7d63f4989`에서 GitHub Actions [CI #152](https://github.com/rwerwer1r/textweft/actions/runs/44500509753)가 성공했다. 30개 테스트 통과, 타입 검사 성공.
- 앞선 CI #151에서 이름 참조 2건을 발견했고 코드와 검증 시나리오를 수정하여 #152에서 통과했다.
- PR 변경 중 신규·운영 문서 및 Agent 정의 33개에서 상대 Markdown 링크를 정적 확인했고 미해결 경로를 발견하지 못했다.
- `tests/local-agent-assets.test.mjs`는 모든 Git 추적 파일에서 이전 에이전트 자산 식별자 참조를 차단한다.
- 실제 Rulesync 생성·`mise run check`·새 클론 부트스트랩·각 대상 런타임의 Skill 자동 로딩/Agent 호출은 이 세션에서 **미실행**이다.
- 원격 Git 이력 자체는 바꾸지 않았다. PR 병합은 별도 사용자 승인 전까지 보류한다.
