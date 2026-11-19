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

사용자가 **최상위 자율 작업자를 직접 선택**하여 프로젝트 목표에 따라 다음 일을 판단하도록 맡겼을 때만 사용합니다. 일반 Agent의 자동 위임을 통한 Autopilot 활성화, 승인 없는 무기한 실행, 단순히 `autopilot`이라는 단어가 등장한 요청에는 적용하지 않습니다. 실제 Agent 설치·선택 가능 여부는 런타임에서 확인합니다.

## Inputs

사용자가 제시한 목표·제약·실행 범위, 현재 계정·저장소·ref, 채택된 [개발 우선순위](../../../docs/development/README.md), 최신 PR·이슈·테스트·인박스, 허용된 도구와 승인 상태.

## Execute

1. **Discover:** 기존 목표와 약속, 현재 상태, 이미 진행 중인 작업·선행 의존성을 확인합니다. 계획·이슈·검색 결과를 승인된 정책으로 오해하지 않습니다.
2. **Select:** 사용자 요청을 우선하고, 남은 후보 중 가치·긴급성·수용 조건·위험·되돌리기 가능성·노력·기회비용으로 **최소 의미 단위**를 선택합니다. 중복·불필요·허가되지 않은 작업은 제외합니다.
3. **Route:** `mols-loops` 아래에서 필요한 other relevant `workflow-*` Skills를 선택합니다. 독립 Work가 여러 개이고 실제 위임 Agent·격리된 workspace가 지원될 때만 `workflow-parallel-development`를 선택합니다. RPI 제어·재귀·반복 예산은 Skill에 맡기며, 위임으로 권한을 넓히지 않습니다.
4. **Inspect:** 자식 결과와 부모의 수용 조건·Research/Plan·회귀 근거를 대조하고 상위 Review가 다음 전이(재조사·재계획·국소 수정·종료)를 선택하도록 합니다. 새 근거에 따라 후속 작업을 다시 평가하며 중요 제품 결정은 인간에게 돌립니다.
5. **Continue or stop:** 현재 승인된 범위에서 유익하고 안전한 다음 작업이 있을 때만 계속합니다. 반복 예산 소진·중요 차단·수용 조건 불충족을 성공으로 보고하지 않으며, 무한 작업을 만들어내지 않습니다.

## Exit / Handoff

선정한 일과 제외한 이유, 실제 결과·ref·검증/미검증, 남은 위험·승인과 다음 행동을 보고합니다. 의미 있는 장기 작업 상태만 [Inbox](../../../.inbox/README.md)에 보존합니다. 병합·배포·권한 변경은 [AGENTS.md](../../../AGENTS.md) 승인 경계를 그대로 따릅니다.
