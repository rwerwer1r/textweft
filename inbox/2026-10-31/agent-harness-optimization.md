---
description: KISS·DRY·SRP 기반 문서·하네스 최적화 작업 인계
updated: 2026-10-31T17:00:27.849Z
---

# Harness Optimization Workstate

## Goal / Scope
- `rwerwer1r/textweft`, `docs/optimize-agent-harness-kiss-dry-srp`, [Draft PR #4](https://github.com/rwerwer1r/textweft/pull/4).
- 진입 문서의 불필요한 로드, 반복 지침, 중복 테스트 제거. 권한·승인·검증·인박스 복원·Rulesync 소유권 유지. 게임 코어 변경 없음.

## State / Evidence
- 상태: `active`. 기존 하네스 최적화에 선별 외부 Skill 의존성과 일회성 절차 문서화를 추가 검토 중. Draft PR #4 유지.
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
- 다음 행동: manifest·문서·mise 진입점 적용과 원격 재조회; 로컬/CI에서 `rulesync install`로 `rulesync.lock` 작성·리뷰 후 `rulesync install --frozen`, `rulesync generate`, `mise run check`를 실행하고 PR에 증거 반영. 승인 전 병합 불가.
