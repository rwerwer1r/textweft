# Selective Agent Assets

이 문서는 Textweft에서 채택한 외부 Agent Asset의 **선택·사용·검증 경계**만 소유합니다. 저장소·계정·승인 정책은 [AGENTS.md](../../../AGENTS.md), 외부 의존성·생성 절차는 [Rulesync](rulesync.md)를 따릅니다. 자산 출처는 읽기 전용인 [mols-agent-assets](https://github.com/mols3131d/mols-agent-assets)이며 해당 저장소에 쓰지 않습니다.

## Persistent: four external Skills

| Skill | 선택할 작업 |
| --- | --- |
| [mols-agent-asset](https://github.com/mols3131d/mols-agent-assets/blob/4885018f6aa5a3ea7c4a7dd227a4b9609dc0d8b9/src/rulesync/.rulesync/skills/mols-agent-asset/SKILL.md) | Rule·Skill·Subagent·에이전트 동작 계약을 설계·수정·리뷰·평가할 때 |
| [review-changes](https://github.com/mols3131d/mols-agent-assets/blob/4885018f6aa5a3ea7c4a7dd227a4b9609dc0d8b9/src/rulesync/.rulesync/skills/review-changes/SKILL.md) | 범위가 지정된 커밋·PR·diff를 근거 중심으로 검토할 때 |
| [mols-test-design](https://github.com/mols3131d/mols-agent-assets/blob/4885018f6aa5a3ea7c4a7dd227a4b9609dc0d8b9/src/rulesync/.rulesync/skills/mols-test-design/SKILL.md) | MVP 및 프레임워크의 관찰 가능한 동작·실패 경계 테스트를 설계·평가할 때 |
| [mols-loops](https://github.com/mols3131d/mols-agent-assets/blob/4885018f6aa5a3ea7c4a7dd227a4b9609dc0d8b9/src/rulesync/.rulesync/skills/mols-loops/SKILL.md) | 반복 개선이 명시되거나 한 번의 검토로 결정하기 어려운 복합 작업일 때 |

선택 목록과 외부 revision은 [rulesync.jsonc](../../../rulesync.jsonc)가 소유합니다. 실행 환경에서 설치할 때만 원본 Skill과 필요한 부속 파일을 가져오며, 이 저장소의 `.rulesync/skills/`에 동일한 원본을 수동 복제하지 않습니다. Skill의 설명과 적용 조건을 보고 **필요한 경우에만 로드**합니다. 기존 [일상 작업 루프](../workflows/routine-loop.md)와 승인 게이트가 우선하며, 외부 Skill은 새 권한을 부여하지 않습니다.

## Project-managed Agent definitions

[Agent Roles](../ai-agent/agents.md)에 직접 선택형 메인 Agent 1개와 전문 위임형 리뷰 Agent 3개를 채택했습니다. 원본은 `.rulesync/subagents/`에 Git 추적하며 Rulesync가 타깃별로 투영합니다. 고정된 외부 revision `162aaa38c77adf382f9ba06b099ea1c5624c0924`에서 가져온 원본을 프로젝트가 소유하는 스냅샷으로 관리하며, 이후 변경은 프로젝트 검토·승인 범위에서 수행합니다. 이 네 정의는 `rulesync.lock`의 **Skill 의존성**과 별개입니다. 자세한 호출·권한·독립성·실행 검증 한계는 [Agent Roles](../ai-agent/agents.md)를 따릅니다.

## Occasional: four reference-based procedures

다음 자산은 **상시 설치하지 않습니다**. 원본을 읽기 전용으로 참고하여 Textweft가 이미 소유한 절차에 필요한 판단만 반영합니다.

| 참고 자산 | Textweft의 적용 지점과 최소 검토 절차 |
| --- | --- |
| [mols-dev-env-bootstrap-design](https://github.com/mols3131d/mols-agent-assets/blob/4885018f6aa5a3ea7c4a7dd227a4b9609dc0d8b9/src/rulesync/.rulesync/skills/mols-dev-env-bootstrap-design/SKILL.md) | [부트스트랩](../../../mise-tasks/bootstrap)·[업데이트](../../../mise-tasks/update): 선언된 도구 버전·잠금 유지, 재실행 안전성, 부분 실패 시 복구 경계, 전역 Git/쉘 설정 보호를 확인. 설치·실행 근거 없이는 완료라고 하지 않음 |
| [mols-chatbot-bootstrap](https://github.com/mols3131d/mols-agent-assets/blob/4885018f6aa5a3ea7c4a7dd227a4b9609dc0d8b9/src/rulesync/.rulesync/skills/mols-chatbot-bootstrap/SKILL.md) | [CHATBOT.md](../../../CHATBOT.md): 제한된 챗봇에서 실제로 빠진 AGENTS·Rule·Skill 발견 경로만 연결. 보장된 첫 진입점을 확인하고, 기존 [ROUTE](../../../.agents/route/ROUTE.md)를 재사용하며 정책 본문·이중 색인을 복제하지 않음 |
| [mols-ci-design](https://github.com/mols3131d/mols-agent-assets/blob/4885018f6aa5a3ea7c4a7dd227a4b9609dc0d8b9/src/rulesync/.rulesync/skills/mols-ci-design/SKILL.md) | CI를 새로 구성하거나 리뷰할 때: `main` 병합 전 필수 실패 조건과 검사 증거를 연결. 기존 `mise run check`를 재사용하고 경량 변경에는 최소 검사, 영향 불명은 보수적 검증. CI 존재·설치·보호 규칙 적용을 가정하지 않음 |
| [check-dependencies](https://github.com/mols3131d/mols-agent-assets/blob/4885018f6aa5a3ea7c4a7dd227a4b9609dc0d8b9/src/rulesync/.rulesync/skills/check-dependencies/SKILL.md) | 의존성 변경/보안 점검 시: 먼저 `package.json`·`package-lock.json`을 오프라인 검토. 미고정·미조회·오류와 안전 판정을 구분하고, 공개 레지스트리·OSV에 이름/버전을 보내는 온라인 점검은 범위·비밀·승인을 별도 확인 |

여기에 요약한 판단만 프로젝트 운영 지침으로 적용합니다. 위 외부 링크의 변경이나 새 절차가 Textweft의 정책을 자동 수정하지 않으며, 실행할 때는 기존 정책 및 도구의 현재 동작을 확인합니다. 필요가 반복되어 독립 Skill이 유익해지면 별도 리뷰 후 도입 여부를 결정합니다.

## Further on-demand references

다음 자산은 **상시 설치하지 않고** 독립적인 작업에서 필요할 때 원본을 읽어 판단을 반영합니다.

| 참고 자산 | 텍스트위프트의 적용 범위 |
| --- | --- |
| [github-context](https://github.com/mols3131d/mols-agent-assets/blob/162aaa38c77adf382f9ba06b099ea1c5624c0924/src/rulesync/.rulesync/skills/github-context/SKILL.md) | GitHub 작업의 최신 ref·대상·하위 지침을 최소 범위로 재확인. [AGENTS.md](../../../AGENTS.md) 권한 계약을 복제하지 않음 |
| [mols-agent-asset-find](https://github.com/mols3131d/mols-agent-assets/blob/162aaa38c77adf382f9ba06b099ea1c5624c0924/src/rulesync/.rulesync/skills/mols-agent-asset-find/SKILL.md) | 신규 Rule·Skill·Agent 자산 탐색과 사용 가능 상태 판단. 현재 Rulesync의 원본·잠금을 우선 |
| [mols-coding-context](https://github.com/mols3131d/mols-agent-assets/blob/162aaa38c77adf382f9ba06b099ea1c5624c0924/src/rulesync/.rulesync/skills/mols-coding-context/SKILL.md) | Rust 코어 및 현재 TypeScript 코드를 설계·검토할 때 필요에 따라 참조 |
| [mols-documentation](https://github.com/mols3131d/mols-agent-assets/blob/162aaa38c77adf382f9ba06b099ea1c5624c0924/src/rulesync/.rulesync/skills/mols-documentation/SKILL.md) | 문서 구조·정보 소유권·라우팅을 변경할 때 활용 |
| [mols-chatbot-continuity](https://github.com/mols3131d/mols-agent-assets/blob/162aaa38c77adf382f9ba06b099ea1c5624c0924/src/rulesync/.rulesync/skills/mols-chatbot-continuity/SKILL.md) | 실제 예약·이벤트·세션 간 실행 기능을 확인한 뒤에만 무인 재개를 설계 |

[Progressive Context Routing](https://github.com/mols3131d/mols-agent-assets/blob/162aaa38c77adf382f9ba06b099ea1c5624c0924/catalog/patterns/context-engineering/progressive-context-routing.md)의 선택적 로딩은 이미 [Agent Route](../../../.agents/route/ROUTE.md)와 [개발 문서 라우터](../README.md)에 적용 중입니다. [Durable Progress Handoff](https://github.com/mols3131d/mols-agent-assets/blob/162aaa38c77adf382f9ba06b099ea1c5624c0924/catalog/patterns/workflow/durable-progress-handoff.md)와 [Chatbot-Driven Development](https://github.com/mols3131d/mols-agent-assets/blob/162aaa38c77adf382f9ba06b099ea1c5624c0924/catalog/patterns/workflow/chatbot-driven-development.md)는 각각 [Inbox](../../../.inbox/README.md)와 [Vibe Coding](../workflows/vibe-coding.md)의 현재 정본을 보강하는 참고 자료입니다. 같은 워크플로·상태 저장소를 중복 생성하지 않습니다.

## Installation and Evidence

- **선언 확인:** `rulesync.jsonc`의 `sources`에서 위 네 Skill과 고정 source SHA만 지정했는지 확인합니다.
- **최초 잠금 생성(명시적 작업):** 도구가 설치된 개발 환경에서 `npm install --package-lock-only --ignore-scripts`와 `mise run rulesync:resolve`를 사용하여 **`package-lock.json`과 `rulesync.lock` 둘 다** 생성합니다. 출처·선택 목록·integrity·변경을 리뷰하고 각각 커밋합니다. 두 잠금 파일을 프로젝트 CI의 일회성 생성 작업에서 만들고 리뷰 후 Git에 커밋했습니다. 이후에는 `--frozen` 설치만 정상 경로로 허용하며, 변경이 필요할 때만 잠금 생성 명령을 다시 사용합니다. 잠금 존재만으로 부트스트랩·타깃 로딩을 검증했다고 간주하지 않습니다.
- **잠금 후 재현:** `mise run bootstrap` → `mise run update` 재실행 → `mise run rulesync:install` → `mise run rulesync:generate` → `mise run rulesync:check` → `mise run routes:check` → `mise run check`의 실측 결과를 별도로 남깁니다. `rulesync generate` 자체는 외부 source를 fetch하지 않습니다.
- **CI 게이트:** [PR/main CI](../../../.github/workflows/ci.yml)는 새 Linux 환경에서 `mise run bootstrap`과 `mise run update`를 재실행하고, 고정된 npm·Skill 설치, 생성된 라우팅 색인의 Git drift, `mise run check`를 검증합니다. 다른 OS·에이전트의 자동 선택·브랜치 보호 설정은 별도 확인합니다.
- **라우팅 분리:** [skills.jsonl](../../../.agents/route/skills.jsonl)은 직접 작성한 프로젝트 Skill의 파생 색인입니다. Rulesync의 외부 curated Skill을 여기에 임의로 넣지 않습니다. 코딩 에이전트는 실제 생성된 target-native Skill을 선택하며, 제한 런타임 챗봇은 이 문서에서 외부 후보를 발견하고 접근 가능할 때만 원본을 읽습니다.
- **승인·제약:** 외부 저장소는 루트 LICENSE를 선언하지 않았으므로 복사·수정·재배포의 권한을 일반화하지 않습니다. 원본 파일 복제 대신 선택형 의존성·출처 명시를 우선합니다. 설치·lock·AI 도구 자동 로딩은 실제 수행과 확인 전까지 미검증입니다.
