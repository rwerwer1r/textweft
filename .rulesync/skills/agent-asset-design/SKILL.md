---
name: agent-asset-design
description: >-
  Use to create or revise Textweft Rule, Skill, Subagent, and routing contracts. Not for product features or documentation formatting alone.
targets:
  - copilot
  - copilotcli
  - codexcli
  - claudecode
  - antigravity-ide
  - antigravity-cli
  - androidstudio
---

# Agent Asset Design

## Scope

Textweft의 에이전트 자산 계약을 설계·검증합니다. `AGENTS.md`의 권한 정책은 변경하지 않으며, `.rulesync/` 원본과 [ROUTE](../../../.agents/route/ROUTE.md) 발견 규칙을 따릅니다.

## Procedure

1. 요구 작업과 호출 런타임을 파악하고 기존 Rule·Skill·Subagent·문서 owner를 찾습니다. 중복 계약보다 기존 자산 수정을 우선합니다.
2. **Rule**은 파일 경로에 따른 공통 지침, **Skill**은 선택 가능한 전문 능력 또는 `workflow-*` 절차, **Subagent**는 별도 실행 주체일 때만 만듭니다. 실제 독립 위임 기능이 없다면 새 Agent로 해결하지 않습니다.
3. 단일 책임·명시적 When/Not When·입력·실행·중단·인계 계약을 작성합니다. 각 자산의 frontmatter 이름, 설명, 대상 런타임과 원본 경로를 맞춥니다.
4. 지침은 Textweft의 실제 경로와 기존 권한·테스트·승인 정본으로 연결합니다. 외부 Skill을 설치하거나 다른 저장소의 런타임 계약을 전제로 하지 않습니다.
5. `mise run routes:generate`로 파생 색인을 생성하고 `mise run routes:check`, 관련 테스트, `mise run rulesync:preview`를 가능한 환경에서 실행합니다. 런타임 자동 로딩·호출 제한은 별도 smoke test 전까지 **미검증**입니다.

## Exit

수정한 owner, 선택 조건, 실제 검사, 권한 경계와 남은 런타임 검증을 반환합니다. 복잡한 개선 반복은 [workflow-iteration](../workflow-iteration/SKILL.md)으로 위임합니다.
