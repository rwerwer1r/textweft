---
name: chatbot-continuity
description: >-
  Use for Textweft tasks that genuinely span sessions or depend on scheduled/event triggers. Not for a one-time answer, simple reminder, or unconfigured background execution.
targets:
  - copilot
  - copilotcli
  - codexcli
  - claudecode
  - antigravity-ide
  - antigravity-cli
  - androidstudio
---

# Chatbot Continuity

## When

중단 이후의 재개, 예약 트리거, 외부 이벤트 반응이 실제로 필요한 작업에만 적용합니다. 단순 작업의 진행 기록은 [Routine Loop](../../../docs/development/workflows/routine-loop.md#commit-checkpoints)와 [workflow-resumption](../workflow-resumption/SKILL.md)으로 충분합니다.

## Contract

1. 작업 목적·정확한 대상 repo/branch·현재 권한·완료/중단 조건·중복 실행 위험을 확인합니다.
2. 트리거와 실행 수단의 **실제 가용성**을 확인합니다. 자동화/이벤트 도구가 없다면 백그라운드 작업을 예약한 것처럼 말하지 않고, 다음 세션에 실행할 명시적 재개 조건만 남깁니다.
3. 지속할 상태는 가장 가까운 정본에 둡니다: Change는 `stdd/`, 실행·검증 체크포인트는 Git/PR, 비정본 재개 증거는 승인된 기록 위치 또는 PR의 최소 근거. 개인 대화 기억을 상태 DB로 사용하지 않습니다.
4. 트리거 시 현재 원격 ref·승인·CI·선행 작업을 다시 확인하고, 중복·만료·취소된 실행을 피합니다. 권한이 바뀌면 중단합니다.
5. 결과를 실제 수행/미실행·현재 상태·다음 재개 조건으로 보고합니다. 병합·배포·외부 기록은 별도 승인 범위를 넘지 않습니다.

## Safety

자격 증명이나 개인 식별 정보를 작업 기록에 보존하지 않습니다. 실행 주체가 확인되지 않은 위임·스케줄을 성공으로 선언하지 않습니다.
