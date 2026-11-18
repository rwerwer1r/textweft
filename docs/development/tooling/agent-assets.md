---
description: "외부 Agent Skill의 선택·출처·고정 revision과 프로젝트 Agent 정의의 사용 경계를 확인할 때 읽습니다."
---
# Selective Agent Assets

이 문서는 외부 Agent Asset의 선택·사용·검증 경계만 소유합니다. 저장소·계정·승인은 [AGENTS.md](../../../AGENTS.md), 외부 의존성과 생성 절차는 [Rulesync](rulesync.md)를 따릅니다. 외부 저장소는 읽기 전용 참고입니다.

## Persistent External Skills

| Skill | 선택할 작업 |
| --- | --- |
| `mols-agent-asset` | Rule·Skill·Subagent·에이전트 동작 계약 설계·수정·리뷰·평가 |
| `review-changes` | 범위가 지정된 커밋·PR·diff를 근거 중심으로 검토 |
| `mols-test-design` | 관찰 가능한 동작·실패 경계의 테스트 설계·평가 |
| `mols-loops` | 명시적 RPI/반복 개선 또는 단일 패스가 불충분한 복합 작업의 adaptive orchestration |
| `mols-stdd` | [STDD](../../../stdd/README.md)의 Change·백로그·상태·Spec delta·완료 근거 관리 |
| `mols-chatbot-continuity` | 여러 실행에 걸친 예약·이벤트 기반 업무의 트리거·재개·중지 설계 |

외부 Skill은 `rulesync.jsonc`와 `rulesync.lock`에 고정된 revision을 사용합니다. 복합 작업의 RPI·재귀·반복은 `mols-loops`, Change 상태와 Spec 수명주기는 `mols-stdd`, 각 Work의 구현 순서는 `workflow-delivery`가 소유합니다. 이 문서는 해당 절차를 재구현하지 않습니다.

## Project-managed Agents

`.rulesync/subagents/`에는 사용자 직접 선택형 `mols-autopilot`, 위임형 `mols-work-unit-worker`, DualVantage 리뷰 Agent가 있습니다. Worker는 독립 Work 단위만 수행하고 coordinator가 통합합니다. Agent 정의는 외부 Skill 잠금과 별개인 프로젝트 소유 파일입니다. 실제 호출·격리·병렬성은 [Agent Roles](../ai-agent/agents.md)와 [Harness Verification](../ai-agent/harness.md)에서 검증합니다.

## Occasional Read-only References

| 자산 | 적용 지점 |
| --- | --- |
| `mols-dev-env-bootstrap-design` | [bootstrap](../../../mise-tasks/bootstrap)·[update](../../../mise-tasks/update)의 재실행 안전성, 잠금, 전역 설정 보호 |
| `mols-chatbot-bootstrap` | [CHATBOT.md](../../../CHATBOT.md)의 제한된 런타임 진입·발견 경로 |
| `mols-ci-design` | CI의 필수 실패 조건과 실제 검증 증거 설계. 기존 경량 CI 우선 |
| `check-dependencies` | 의존성 변경 시 lockfile·출처·취약점 증거 검토 |

일회성 자산은 상시 설치하지 않고 필요한 판단만 프로젝트 문서에 흡수합니다. 추가 외부 자산을 검토할 때는 출처·revision·라이선스·런타임 호환성을 확인하고, 기존 owner와 중복되는 복사본을 만들지 않습니다.

## Installation and Evidence

- `rulesync.jsonc`는 외부 source와 선택 목록, `rulesync.lock`은 고정된 upstream revision과 integrity를 소유합니다.
- 최초 잠금 생성은 명시적 작업으로 수행하고 변경·출처·선택·무결성을 리뷰한 뒤 커밋합니다. 일반 bootstrap/update는 frozen lock을 사용합니다.
- `rulesync install`과 `rulesync generate`의 성공은 설치·생성 증거입니다. 실제 runtime loading과 행동 적용을 증명하지 않습니다.
- [ROUTE](../../../.agents/route/ROUTE.md)의 `skills.jsonl`은 프로젝트가 직접 작성한 Workflow Skill의 색인입니다. 외부 curated Skill을 중복 등록하지 않습니다.
- 외부 저장소는 읽기 전용입니다. 프로젝트 데이터·비밀·개인정보를 승인되지 않은 저장소나 서비스로 보내지 않습니다.
