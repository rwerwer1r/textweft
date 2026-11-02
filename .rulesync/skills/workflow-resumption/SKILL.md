---
name: workflow-resumption
description: >-
  Use when restarting interrupted or stale session/PR work by reconciling live Git, CI, and Inbox state. Not for a short task with already verified state.
targets:
  - copilot
  - copilotcli
  - codexcli
  - claudecode
  - antigravity-ide
  - antigravity-cli
  - androidstudio
---

# Resumption

## When / Not When

세션·모델·작업자가 바뀌거나 이전에 중단된 작업을 다시 진행할 때 사용합니다. 기존 ref와 상태를 이미 모두 검증한 짧은 작업에는 별도 재개 의식이 필요 없습니다.

## Inputs

대상 저장소·계정·branch/PR/Issue, 기존 [Inbox](../../../.inbox/README.md) 기록 또는 현재 작업의 최소 인계, 실제 원격 상태를 읽을 도구.

## Execute

1. 현재 권한·ref·PR·diff·CI 상태를 **먼저 다시 읽습니다**. 기존 기록이나 대화의 상태를 최신 사실로 가정하지 않습니다.
2. 기존 workstate의 목표·완료·위험·남은 일과 현재 결과를 대조합니다. 이미 병합·취소·수정된 작업을 재실행하지 않습니다.
3. 최신 근거에서 작은 다음 작업을 선택하고 해당 a relevant `workflow-*` Skill를 연결합니다. 복구할 수 없는 도구·권한·근거는 한계로 보고합니다.
4. 세션을 넘는 변경이 생겼을 때만 인박스 기록을 갱신·원격 재조회합니다. 비밀·전체 대화·긴 도구 로그를 보존하지 않습니다.

## Exit / Handoff

현재 상태 기준 ref, 실제 확인한 결과, 재개 가능한 단계 또는 차단 조건을 인계합니다. 저장된 체크포인트가 있다고 자동 재시작·백그라운드 지속을 주장하지 않습니다.
