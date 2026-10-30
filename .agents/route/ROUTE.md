# Textweft Agent Asset Route

현재 작업에 필요한 Rule·Skill을 **적은 맥락으로 발견하고 선택하는 라우터**입니다. 저장소 권한·승인 계약은 [AGENTS.md](../../AGENTS.md)가, 실제 지침은 각 원본이 소유합니다.

## Selection

1. 현재 저장소·ref·작업 의도·대상 경로를 확인하고 적용되는 `AGENTS.md`를 먼저 읽습니다.
2. [rules.jsonl](rules.jsonl)과 [skills.jsonl](skills.jsonl)의 `name`·`description`을 통해 관련 후보만 고릅니다. 모든 자산 본문을 미리 읽지 않습니다.
3. **Rule:** 후보 `path`의 원본을 열어 `globs`·selector·적용 범위가 실제 대상 파일에 맞는지 확인합니다.
4. **Skill:** 후보 `path`의 `SKILL.md` 원본을 열어 작업 의도·트리거·절차를 확인합니다.
5. 작업 목적·대상 파일이 바뀌면 선택을 다시 평가합니다. 누락된 원본·색인 불일치·미지원 실행은 추측하거나 다른 버전으로 대체하지 않습니다.

## Ownership and Verification

- JSONL 한 줄은 `name`·`path`·`description` 필드를 담습니다. `path`는 저장소 루트 상대 경로입니다.
- 두 색인은 `node scripts/agent-route-index.mjs generate`로 생성하고 `node scripts/agent-route-index.mjs check`로 정본 원본과 비교합니다. **수동으로 편집하지 않습니다.**
- Rule·Skill 원본은 [Rulesync 로컬 저작 자산](../../.rulesync/rules/typescript.md)에 있고, 도구별 생성 복사본은 Git에서 무시합니다. 루트 `AGENTS.md`·`CHATBOT.md`는 직접 관리하는 정본입니다.
- 초기 구성에는 프로젝트가 작성한 TypeScript Rule 하나와 등록된 Skill 0개가 있습니다. **외부 Skill 및 Subagent는 설치하지 않았습니다.**
- 생명주기·바이너리 버전·권한 경계는 [Rulesync 운영 문서](../../docs/development/tooling/rulesync.md)를 참조합니다. JSONL은 자산 자동 적용이나 독립 Subagent 위임을 보장하지 않습니다.
