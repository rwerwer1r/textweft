# Textweft Development

제품 동작은 [README](../../README.md), 목표·역할·언어는 [GOAL](../GOAL.md)·[GLOSSARY](../GLOSSARY.md)·[LANGUAGE](../LANGUAGE.md)를 따릅니다.

## Entry Points

- **권한 정본:** [AGENTS.md](../../AGENTS.md)
- **제한된 챗봇만:** [CHATBOT.md](../../CHATBOT.md)
- **조건부 Rule·Skill:** [ROUTE.md](../../.agents/route/ROUTE.md)
- **단계:** [Workflow Selection](workflows/choosing.md)
- **구현·검증·리뷰:** [Routine Loop](workflows/routine-loop.md)
- **바이브코더·AI 역할:** [Vibe Coding](workflows/vibe-coding.md)
- **중대한 판단:** [Agent Governance](ai-agent/README.md)
- **생성 자산:** [Rulesync](tooling/rulesync.md)
- **복원 상태:** [Inbox](../../inbox/README.md)

## Checks

변경에 따라 `npm test`(런타임), `npm run typecheck`(타입), `npm run harness:check`(하네스 구조·링크·테스트), `npm run rulesync:check`(실제 Rulesync CLI)를 선택합니다. 미실행 항목을 통과로 보고하지 않습니다.
