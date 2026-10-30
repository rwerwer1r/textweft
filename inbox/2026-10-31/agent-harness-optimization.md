---
description: KISS·DRY·SRP 기반 문서·하네스 최적화 작업 인계
updated: 2026-10-30T22:34:53Z
---

# Harness Optimization Workstate

## Goal / Scope
- `rwerwer1r/textweft`, `docs/optimize-agent-harness-kiss-dry-srp`, [Draft PR #4](https://github.com/rwerwer1r/textweft/pull/4).
- 진입 문서의 불필요한 로드, 반복 지침, 중복 테스트 제거. 권한·승인·검증·인박스 복원·Rulesync 소유권 유지. 게임 코어 변경 없음.

## State / Evidence
- 상태: `handoff`. 문서·테스트 최적화 이후 링크/라우팅 개선을 추가하고 Draft PR #4에 반영함.
- 본문 수정 Markdown 13개의 Git blob: 44,549 → 19,722바이트 (55.7% 감소, 실제 모델 토큰 측정 아님).
- 최초 최적화: 수정 Markdown 13개 55.7% 축약 및 중복 라우팅 테스트 1개 통합(이전 작업 근거).
- 링크·라우팅 후속 개선: `docs/development/README.md`를 작업별 문서 라우터로 정리하고, `ROUTE.md`에서는 Rule·Skill 색인을 해당 작업일 때만 선택함.
- `scripts/doc-links.mjs`를 `npm run harness:check`에 연결하고 신규 `tests/doc-links.test.mjs`에 정상/누락/저장소 밖/문서 제목/중복 제목/인박스 하위 문서 사례를 추가함.
- 원격 Markdown 22개·내부 링크 85개·문서별 중복 대상 링크 0개·없는 파일 0개를 확인함. **이는 원격 정적 검토이며 Node 테스트 실행이 아님.**
- **미실행:** Node 테스트·타입 검사·Rulesync CLI/AI 도구 실측·CI. 같은 모델 검토는 독립 리뷰 아님.

## Tooling migration

- 작업 범위 추가: mise를 Node·rumdl·Biome·Rulesync 버전 및 작업 실행의 단일 진입점으로 채택.
- rumdl의 MD051·MD057을 사용하여 직접 구현한 Markdown 링크 검사를 대체. Biome은 JS/TS 린트·포맷 작업 담당.
- 라우팅 색인과 인박스 frontmatter는 프로젝트 고유 규약으로 최소한 유지. 설치·Node·Rulesync 실측은 **미실행**.

## Next Action
- **현재 실행 경로:** `mise install` → `mise run deps` → `mise run check`. Rulesync 진단은 `mise run rulesync:check`; 프로젝트 고유 인박스 검사는 `mise run inbox:check -- <paths...>`.
- 위 명령을 실제 개발 환경에서 실행하고 설치·린트·테스트 결과를 기록합니다. 실패 시 규칙 완화보다 원인 수정 우선.
- 실패 시 수정·재검증 후 사람 리뷰. 승인 전 병합·배포 금지.
