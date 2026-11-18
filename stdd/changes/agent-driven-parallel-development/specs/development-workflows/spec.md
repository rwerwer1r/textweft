# Development Workflow Harness — Change Delta

## Baseline

Textweft already has:
- a root agent contract and progressive Rule/Skill routing;
- `mols-loops` as the outer adaptive RPI/recursive orchestration dependency;
- STDD Change/Spec ownership through PR #14;
- `workflow-delivery` with Spec → test design → test implementation → implementation;
- project-managed Autopilot and review subagents;
- a lightweight CI and an Inbox used for durable session evidence.

The current development documentation does not yet provide one discoverable, end-to-end contract for agent-driven work, safe parallel implementation, spec/test traceability, and runtime harness evidence.

## Required Delta

1. **Agent-led execution:** agents own bounded research, planning, specification, test design, implementation, verification, documentation, and review. Humans own product direction, material tradeoffs, and explicitly gated actions.
2. **Specification authority:** a Change has one work-state record. Behavior-changing work records only the necessary spec delta against an existing baseline; verified requirements are promoted to the domain spec. Code and tests remain in their project-owned locations.
3. **Test-first Work:** every behavior-changing Work unit derives a minimal test design and executable test protection from the accepted spec before changing product implementation. Red is observed when meaningful and feasible; a valid existing regression test is not artificially made red. Non-behavior edits do not receive meaningless tests.
4. **Parallel decomposition:** only independently acceptable Work units with explicit dependencies and stable interface contracts may execute concurrently. The coordinator owns decomposition, integration, and parent acceptance.
5. **Write isolation:** concurrent write workers require separate workspaces/branches or an equivalent runtime isolation guarantee, plus disjoint file ownership. Shared files, shared fixtures, public contracts, and unresolved cross-work dependencies are serialized under one owner.
6. **Worker contract:** a worker receives a bounded Change/Work brief, reads applicable instructions and source-of-truth specs, follows the delivery workflow, modifies only assigned paths, and reports actual refs, changed paths, checks, failures, and unknowns. It cannot broaden parent scope or merge.
7. **Integration contract:** one coordinator reconciles worker outputs, validates the combined diff and cross-Work behavior, updates the single Change state, and retains unresolved conflicts as blockers.
8. **Harness evidence:** configured, reachable, and observed-applied are distinct evidence levels. Static manifests and generated files do not prove runtime loading or behavioral compliance.
9. **Progressive documentation:** docs has a short root map, topical directory entrypoints, canonical owners, concise selection metadata, and a deterministic shallow index. Existing document owners and established paths remain stable.
10. **Bounded automation:** existing mise, Rulesync, rumdl, Biome, Lefthook, tests, and CI are reused. No new CI job or custom framework is introduced unless a demonstrated gap requires it.

## Acceptance Scenarios

- A simple typo fix uses the lightest workflow and does not create a Change, Spec, or meaningless test.
- A behavior feature has a reviewed spec delta and test cases before product implementation.
- A bug fix has a test that detects the intended defect before the fix where feasible.
- Two independent Work units can run concurrently only with separate write surfaces and stable contracts; a shared-file task is serialized.
- A worker timeout or partial result is not treated as completion or reassigned until its execution state is known.
- A parent coordinator integrates worker outputs and rechecks combined acceptance before marking the Change done.
- A runtime with only a manifest but no observed load is reported as configured, not reachable or applied.
- A stale or missing docs index fails a read-only check without rewriting files.