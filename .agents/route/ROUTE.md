# Textweft Agent Asset Route

현재 작업에 필요한 Rule·Skill을 **선택적으로 발견·로드**하는 절차입니다. [AGENTS.md](../../AGENTS.md)의 권한 계약이나 자산 원본의 지침을 대체하지 않습니다.

## Selection

1. 정확한 저장소·ref·대상 경로를 확인하고 적용되는 `AGENTS.md`를 먼저 읽습니다.
2. [rules.jsonl](rules.jsonl)과 [skills.jsonl](skills.jsonl)의 `name`·`description`만으로 필요한 후보를 좁힙니다. 모든 자산 본문을 미리 읽지 않습니다.
3. **Rule:** `path`의 원본을 열고 `globs`·selector·적용 범위가 실제 대상 파일에 해당하는지 확인합니다.
4. **Skill:** 작업 의도에 맞는 `path`의 `SKILL.md` 원본을 열고 실행 조건·절차·제약을 확인합니다.
5. `path`는 저장소 루트 기준 상대 경로입니다. 원본 누락이나 색인 불일치가 있으면 임의 버전으로 대체하지 않고 한계를 보고합니다.
6. 작업 목적이나 대상 경로가 달라지면 선택을 다시 평가합니다.

## Ownership

두 JSONL은 [색인 생성 스크립트](../../scripts/agent-route-index.mjs)가 `.rulesync/rules/`·`.rulesync/skills/` 원본에서 만드는 **Git 추적 파생 색인**입니다. 직접 편집하지 않으며 자동 선택·실행을 보장하지 않습니다.

`npm run agents:index:generate`로 생성하고 `npm run agents:index:check`로 일치성을 확인합니다. Rulesync 타깃별 생성물의 소유권은 [운영 문서](../../docs/development/tooling/rulesync.md)를 따릅니다. Subagent 위임은 현재 두 색인의 범위 밖이며, 별도 계약과 런타임 기능을 확인해야 합니다.
