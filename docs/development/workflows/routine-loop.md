# Routine Working Loop

The normal path is **inspect → scope/plan → implement → validate → self-review → PR/handoff**, revisiting earlier steps when evidence changes. These are work states, not mandatory ceremonies. Textweft는 **바이브코딩**으로 개발하며, 자연어 요구와 역할 분담은 [Vibe Coding Workflow](vibe-coding.md)에서 구체화합니다. 작업 단계·권한 경계는 그대로 유지합니다.

## 1. Inspect and scope

Verify exact repository, connected account, branch/ref, permissions, the root and applicable nested `AGENTS.md`, and [agent asset routing](../../../.agents/route/ROUTE.md). Read only relevant code and product docs. Check for an existing task branch or PR before starting a duplicate.

State the smallest intended change, acceptance conditions, known risks, and requested stage. 자연어 요구는 사용자 경험과 관찰 가능한 결과로 해석하고, 일반적인 코드 구조 결정을 사용자에게 매번 요구하지 않습니다. If scope includes architecture/security/compatibility changes or destructive external effects, obtain human direction first.

## 2. Change and preserve

Use a dedicated branch for reviewable changes. Prefer small local changes over new dependencies or new project-wide systems. Do not modify another repository as part of a Textweft task.

For nontrivial multi-step work, save the first useful recovery state to a single [inbox workstate](../../../inbox/README.md) on the branch **before the next long/risky step**; verify it was pushed and can be read back. Update when substantial decisions, blockers, or evidence change—not after every tool call.

## 3. Validate

After dependency installation (Node.js >=22.16):

```sh
npm test
npm run typecheck
npm run harness:check
```

Choose checks relevant to the diff. Changes to game runtime contracts should have targeted tests, especially invalid choices, atomicity, deterministic RNG, and restore compatibility when affected. 바이브코더 대상 저작 경험을 바꿀 때는 공개 예제로 생성·실행·오류 수정 경로도 확인합니다. A documentation-only change normally needs links/catalog checks and a focused review; it must not be described as runtime-tested when runtime tests were not executed.

Separate **locally executed**, **CI-reported**, **manually inspected**, **unavailable**, and **not run**. Do not treat them as equivalent evidence.

## 4. Review and publish

Review the actual changed files against scope, privacy, link targets, ownership, contradictory policies, accidental code changes, and test gaps. Fix issues and repeat affected checks.

For an implementation or document change, create/update a PR with summary, validation evidence, limitations, and outstanding decisions. **Do not merge** without an explicit request and required checks/approval. Hand off blocked work with precise next steps, not an invented success claim.

## Completion

A PR is ready for human review when intended changes exist on the correct branch, scoped verification is reported truthfully, known findings are addressed or disclosed, and no unauthorized side effects occurred. Final merge/release remains a distinct gate.
