---
description: 프로젝트 운영 Workflow 개선 작업의 기준·검증·복구 상태
updated: 2026-11-03T04:18:27+09:00
---

# Workflow Harness Improvement

- **Goal:** 개발·리뷰·조사·하네스 개선·평가·실패 복구·세션 재개·병합 준비를 목표 기반으로 선택하고 안전하게 끝내는 프로젝트 Workflow 체계를 수립한다.
- **Scope:** 오직 `rwerwer1r/textweft`, `feat/workflow-harness-20261103`; `main` 기준 `2332139b0cabe80931cd2d20f5fc0c8f77e1b15f`. `.agents/workflows/`, 선택 라우팅과 lint 연결, 관련 개발 문서·검증 근거만 다룬다. PR #9의 Agent 파일이나 별도 계정·저장소는 변경하지 않는다.
- **Acceptance:** 각 Workflow는 구체적인 진입/제외 조건, 최소 단계, 근거/완료/중단 경계를 가진다. 기존 승인·인박스·Rulesync·CI 정본을 복제하지 않는다. Markdown 링크·CI 검증과 실제 런타임 행동 미검증을 구분한다.
- **Method:** Research → Plan → Work → Review를 실질적 Finding이 남아 있는 동안 반복하며, 기존 `mols-loops`는 상위 개선 루프에만 사용. 새 전용 실행 엔진은 도입하지 않는다.
- **State:** active. 기준 저장소·연결·ref·진입 규칙·기존 CI·PR #9를 확인했다. 구현·변경 후 테스트는 미실행.
- **Risks:** 작업 파일 자체는 코딩 에이전트의 네이티브 자동 발견을 보장하지 않는다. 전역 정책은 AGENTS.md, 병합 승인과 실제 적용·호출 제한은 현재 런타임의 필수 정책이 우선한다.
- **Next:** 9개 역할별 Workflow의 정본과 라우터를 작성, 기존 문서에 연결, 변경 diff 자체 리뷰, CI 확인, PR 인계. 병합은 별도 승인 후에만 진행한다.
