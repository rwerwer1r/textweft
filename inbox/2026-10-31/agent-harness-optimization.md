---
description: KISS·DRY·SRP 기반 문서·하네스 최적화 작업 인계
updated: 2026-10-31T17:05:30.319Z
---

# Harness Optimization Workstate

## Goal / Scope
- `rwerwer1r/textweft`, `docs/optimize-agent-harness-kiss-dry-srp`, [Draft PR #4](https://github.com/rwerwer1r/textweft/pull/4).
- 진입 문서의 불필요한 로드, 반복 지침, 중복 테스트 제거. 권한·승인·검증·인박스 복원·Rulesync 소유권 유지. 게임 코어 변경 없음.

## State / Evidence
- 상태: `handoff`. 재사용 Skill 4개는 Rulesync source에 선언, 일회성 Skill 4개는 운영 가이드로 하네싱. 잠금 생성과 도구 실행 검증 전까지 완료 아님. Draft PR #4 유지.
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

## Lefthook Integration

- `mise.toml`에서 Lefthook `2.2.2` 버전과 `hooks:install`·`hooks:validate` 작업을 고정함.
- `lefthook.yml`: pre-commit에서 스테이징된 Markdown은 rumdl, JS/TS/JSON은 Biome, 인박스는 메타데이터 검사, 라우팅 자산은 색인 일치 검사로 조건부 실행. 자동 수정·무거운 pre-push 검사는 도입하지 않음.
- `mise run check`에 Lefthook 설정 검증을 추가함. **mise·Lefthook 설치, Git 훅 등록·실행, lint/테스트/CI는 이 GitHub 도구 환경에서 미실행.**

## Development Environment

- `.editorconfig`: UTF-8·LF·2칸 들여쓰기와 Markdown 개행 보존.
- `.gitmessage`: Conventional Commits의 한국어 안내 템플릿. Git 설정은 `git config --local`만 사용.
- `.gitignore`: 민감 환경 파일·mise 로컬 설정·에디터 임시 파일 제외.
- 실행 가능한 mise 파일 작업 `mise-tasks/bootstrap`·`mise-tasks/update`: 첫 구성과 재동기화 분리. 프로젝트에 버전이 고정된 도구 사용, Lefthook 등록; 최초 bootstrap에만 이 저장소의 커밋 템플릿 설정.
- 현재 저장소에는 `package-lock.json`이 없어 최초 `npm install` 후 생성할 수 있음. 잠금 파일이 있다면 `npm ci` 사용. **실제 셋업/업데이트·훅·검사는 미실행.**

## Next Action
- **현재 실행 경로:** `mise install` → `mise run deps` → `mise run check`. Rulesync 진단은 `mise run rulesync:check`; 프로젝트 고유 인박스 검사는 `mise run inbox:check -- <paths...>`.
- 위 명령을 실제 개발 환경에서 실행하고 설치·린트·테스트 결과를 기록합니다. 실패 시 규칙 완화보다 원인 수정 우선.
- 실패 시 수정·재검증 후 사람 리뷰. 승인 전 병합·배포 금지.

## Selective Agent Asset Adoption (2026-11-01)
- 사용자가 지정한 8개 후보 가운데 반복 사용 4개(`mols-agent-asset`, `review-changes`, `mols-test-design`, `mols-loops`)는 Rulesync 선언형 외부 의존성으로 지정하고, 나머지 4개(`mols-chatbot-bootstrap`, `mols-dev-env-bootstrap-design`, `mols-ci-design`, `check-dependencies`)는 일회성 참조를 Textweft 소유 문서에 최소 반영.
- 외부 `mols3131d/mols-agent-assets`는 **읽기 전용**으로만 접근, 모든 쓰기는 `rwerwer1r/textweft`의 기존 PR 브랜치로 한정. 외부 자산 원문 복사·자동 설치는 하지 않고 선택된 upstream SHA를 명시.
- 확인: Rulesync 공식 declarative source 선택 구문 및 frozen lock 정책. 현재 연결 환경에는 실행 가능한 Rulesync/미리 설치된 mise가 없어 설치·lock 갱신·projection·CI는 미실행.
- 변경: `rulesync.jsonc`에 4개 Skill을 upstream SHA로 지정; `mise.toml`의 `rulesync:resolve`/`rulesync:install`; `mise-tasks/update`의 frozen install+generate; `docs/development/tooling/agent-assets.md`, 개발 가이드·Rulesync 문서·CHATBOT 라우팅 갱신. 프로젝트의 직접 저작 Skill 색인은 비워 둠.
- 원격 정적 확인: 선택한 8개 원본이 고정 upstream SHA에 존재, PR #4 head와 변경 반영 일치, 사용자 게임 `src/`·`tests/`·예제 변경 없음.
- 미실행/차단: `rulesync.lock`은 아직 빈 source 상태. 네 Skill의 설치·버전 잠금·타깃 투영·실제 에이전트 발견, `mise run bootstrap`·`mise run update`·`mise run check`는 검증되지 않았으며 현재 frozen 설치는 의도적으로 실패할 것임.
- 다음 행동: 도구가 있는 개발 환경에서 `mise install` → `mise run rulesync:resolve` 후 `rulesync.lock`을 검토·커밋, `mise run bootstrap`·`mise run update` 재실행·`mise run check`, 생성된 타깃 Skill 파일/로드 확인, PR 증거 보강·사람 승인 후 병합.
