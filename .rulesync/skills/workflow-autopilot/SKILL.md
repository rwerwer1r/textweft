---
name: workflow-autopilot
description: >-
  Use when a user directly chooses top-level autonomous goal selection and coordination. Do not activate for delegated invocation or ordinary single-task work.
targets:
  - copilot
  - copilotcli
  - codexcli
  - claudecode
  - antigravity-ide
  - antigravity-cli
  - androidstudio
---
# Autopilot

## When / Not When

사용자가 최상위 자율 작업자를 직접 선택하여 프로젝트 목표에 따라 다음 일을 판단하도록 맡겼을 때만 사용합니다. 일반 Agent의 자동 위임을 통한 Autopilot 활성화에는 적용하지 않습니다.

## Execute

1. **Discover:** 기존 목표·우선순위·진행 중인 Change/PR·의존성·테스트 근거를 확인합니다. 대화나 Inbox 기록을 최신 사실로 가정하지 않습니다.
2. **Select:** 사용자 요청을 우선하고 가치·긴급성·수용 조건·위험·가역성·비용을 고려해 최소 의미 Work를 선택합니다. 중복·허가되지 않은 작업은 제외합니다.
3. **Compose:** `mols-loops`를 outer orchestrator로 사용하고 관련 `workflow-*`를 선택합니다. 독립 Work가 여러 개이고 실제 Agent·workspace 격리가 지원될 때만 `workflow-parallel-development`를 사용합니다.
4. **Deliver:** 각 행동 변경 Work에 `workflow-delivery`의 Spec → 테스트 설계 → 테스트 구현 → 구현 순서를 적용합니다. STDD Change와 도메인 Spec을 재사용하고 중복 상태를 만들지 않습니다.
5. **Integrate:** Worker 결과와 실제 diff·테스트를 확인하고 통합 검증합니다. 중요한 제품 결정은 사람에게 돌립니다.
6. **Stop or hand off:** 승인·검증·런타임 능력이 막히거나 가치가 없으면 정확한 차단과 다음 행동을 남깁니다. 무한 작업을 만들지 않습니다.

## Exit / Handoff

선정·제외 이유, 변경 ref/PR, 실제 검증과 미실행, 통합 상태, 잔여 위험·승인을 보고합니다. 병합·릴리스·배포·권한 변경은 [AGENTS.md](../../../AGENTS.md)의 명시적 승인 경계를 따릅니다.
