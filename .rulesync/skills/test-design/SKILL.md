---
name: test-design
description: >-
  Use to design observable, deterministic tests for Textweft game-framework contracts and failure boundaries. Not for test command execution alone.
targets:
  - copilot
  - copilotcli
  - codexcli
  - claudecode
  - antigravity-ide
  - antigravity-cli
  - androidstudio
---

# Test Design

## Inputs

수용된 Spec와 관련 공개 API·게임 예제·기존 테스트, 실패 경계 및 테스트 런타임. 제품의 현재 구현을 유일한 정답으로 삼지 않습니다.

## Procedure

1. 요구사항을 입력·관찰 가능한 출력/상태·불변식·오류 처리로 나누고, acceptance와 테스트 사례를 대응시킵니다.
2. 대표 정상 경로, 경계값, 잘못된 입력, 순서·상태 전이, 부분 실패, 회귀 위험 중 필요한 최소 사례를 고릅니다. 모든 조합을 무조건 추가하지 않습니다.
3. **Oracle**은 Spec·상위 계약·독립적인 사용 시나리오에서 도출합니다. 실행한 결과를 보고 예상값을 소급 변경하지 않습니다.
4. 가능한 경우 기존 Node 테스트와 `tests/`·`examples/` fixtures를 재사용합니다. 네트워크·시간·순서에 의존하는 플래키한 검사를 피하고 대체 가능한 작은 fixture를 사용합니다.
5. 실제 구현 변경 전에 테스트를 작성하거나 기존 보호가 충분함을 확인합니다. 결함 수정에서는 원인에 해당하는 Red를 관찰하되 기존 유효한 회귀 테스트를 억지로 실패시키지 않습니다.
6. 테스트와 Spec의 불일치, 미지원 실행 환경, 과도한 테스트 비용을 함께 보고합니다.

## Handoff

테스트 매트릭스, 검증 범위·oracle·실행 명령·Red/Green 또는 미실행 근거를 [workflow-delivery](../workflow-delivery/SKILL.md)에 전달합니다.
