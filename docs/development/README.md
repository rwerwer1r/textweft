# Textweft Development

Textweft is a private v0.1 TypeScript prototype, not a published package. Start with the root [README](../../README.md) for runtime behavior and local commands.

## Agent and contributor guidance

- [Root agent contract](../../AGENTS.md): repository boundary, identity, approvals, and entrypoints
- [Chat runtime entry](../../CHATBOT.md): capability-aware chat bridge
- [Asset route](../../.agents/route/ROUTE.md): optional Rule/Skill discovery
- [Agent governance](ai-agent/README.md): decision and authorization boundaries
- [Workflow selection](workflows/choosing.md): preparation, implementation, PR and merge scope
- [Routine working loop](workflows/routine-loop.md): development, evidence, review, completion
- [Inbox policy](../../inbox/README.md): minimal resumable workstate

## Project checks

Run `npm test` and `npm run typecheck` after installing dependencies. Run `npm run harness:check` for agent-document structure and registered asset paths. These commands validate different things; do not claim the harness check proves game runtime correctness.
