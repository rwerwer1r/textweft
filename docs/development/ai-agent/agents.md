# Agent Roles and Delegation

에이전트 자산의 **작성 유형**과 **실제 실행 역할**을 구분합니다. 공통 권한·승인 정책은 [AGENTS.md](../../../AGENTS.md), 일상 절차는 [Routine Loop](../workflows/routine-loop.md), 지속 상태는 [Inbox](../../../.inbox/README.md)가 소유합니다. 이 문서는 역할·호출·위임·검증 경계만 다룹니다.

## Main Agent: User-Selected Autopilot

[`mols-autopilot`](../../../.rulesync/subagents/mols-autopilot.md)은 사용자가 **직접 선택**해야 시작하는 최상위 자율 작업자입니다. 현재 프로젝트 목표·실제 마일스톤·권한·ref에서 가치 있는 범위 내 작업을 선택하고 검증·리뷰·PR 준비까지 조정할 수 있습니다.

- 다른 에이전트가 호출하여 권한을 확대하는 용도로 사용하지 않습니다. 위임 호출을 받았다면 작업을 수행하지 않습니다.
- 자율성은 작업 선정과 조정에 관한 것이지 병합·배포·고위험 변경 승인이나 무기한 백그라운드 실행을 허가하지 않습니다.
- **Agent는 실행 주체**, [workflow-autopilot](../../../.rulesync/skills/workflow-autopilot/SKILL.md)은 프로젝트의 선택형 작업 절차입니다. 작업 의미에 맞는 Skill을 로드해도 Agent의 직접 선택 제한이나 `AGENTS.md` 권한은 바뀌지 않습니다.
- 선택할 가치가 있는 일이 없거나 필수 승인·검사가 막힌 경우 중단 또는 인계할 수 있습니다.

## Delegated Review

[`mols-review-dualvantage`](../../../.rulesync/subagents/mols-review-dualvantage.md)는 **필요할 때만 호출**하는 검토 전용 에이전트입니다. [Verifier](../../../.rulesync/subagents/mols-review-dualvantage-verifier.md)와 [Challenger](../../../.rulesync/subagents/mols-review-dualvantage-challenger.md)가 각각 현재 근거와 반례를 조사합니다. Root가 중복·반증을 판정하고 결과를 호출자에게 반환하며, 수정·병합·최종 승인은 소유하지 않습니다.

- 두 specialist는 서로의 결론을 초기에 전달받지 않아야 합니다. 각 호출에서 최대 1회씩, 합계 2회까지만 자동 호출합니다.
- 실제 병렬·독립 실행은 런타임 기능과 실행 증거가 있을 때만 주장합니다.
- [workflow-review](../../../.rulesync/skills/workflow-review/SKILL.md)가 리뷰 업무의 수용·검증 절차를 소유하며 DualVantage는 필요할 때 호출하는 전문 실행 단위입니다. Reviewer의 결론은 변경·승인·병합 권한을 만들지 않습니다.
- 일반적인 작은 변경에는 [기존 자체 리뷰](../workflows/routine-loop.md)만으로 충분할 수 있습니다. 중요한 변경에서 독립 리뷰가 필요한지는 위험과 비용으로 판단합니다.

## Runtime and Provenance

네 Agent 정의는 Rulesync의 [프로젝트 추적 원본](../../../.rulesync/subagents/mols-autopilot.md)에 있으며, 재사용 자산의 `162aaa38c77adf382f9ba06b099ea1c5624c0924` revision을 기준으로 채택했습니다. 원본은 [Agent Library](https://github.com/mols3131d/mols-agent-assets/tree/162aaa38c77adf382f9ba06b099ea1c5624c0924/src/rulesync/.rulesync/subagents)에 있습니다. **외부 자료는 읽기 전용**이며, 현재 프로젝트 파일의 후속 수정은 Textweft가 소유합니다. 외부 저장소의 루트 라이선스가 명시되지 않았으므로 공개 재배포 권한을 가정하지 않습니다.

[Rulesync](../tooling/rulesync.md)가 지원 대상의 네이티브 에이전트 파일을 로컬 생성합니다. 메타데이터의 직접 선택·호출 제한은 런타임에 따라 다르며, 특히 Claude Code에서 비위임 제한을 네이티브로 강제한다고 가정하지 않습니다. `mols-autopilot`이 지원하지 않는 타깃에서는 하위 Agent 실행으로 우회하지 않습니다. 제한된 챗봇에는 [CHATBOT.md](../../../CHATBOT.md)가 적용됩니다.

## Acceptance Checks

1. 지원하는 환경에서 Autopilot을 사용자가 직접 선택할 수 있으며, 다른 에이전트의 위임 시도가 차단되거나 명시적으로 거절되는지 관찰합니다.
2. Rev·계정·하네스·현재 승인 범위를 확인하고, 유의미한 작업이 없을 때 불필요한 커밋이나 이슈를 만들지 않는지 확인합니다.
3. 요청한 리뷰에서 Verifier와 Challenger의 분리된 근거가 실제 확보되는지, 검증 실패가 누락 없이 보고되는지 확인합니다.
4. 병합 승인 부족, 검증 불가, 중단·재개 시 인박스 기록과 최신 Git 근거가 일치하는지 확인합니다.

정적 Rulesync 진단과 CI는 **정의·생성의 기계적 검사**입니다. 위 선택·위임·실행 시나리오는 실제 대상 런타임에서 별도로 평가해야 합니다.
