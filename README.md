# Textweft

> Weave worlds with words.

**Textweft** is an early-stage, genre-agnostic framework for choice-driven text games. It combines **declarative YAML/JSON content** with optional **TypeScript hooks** for game-specific rules. The runtime is headless, so a web, CLI, or custom renderer can consume the same game.

This repository is a **v0.1 prototype**, not a published npm package or a stable API. **Its primary framework users are game developers—especially vibe coders** creating games with AI coding tools from natural-language requirements. **Game players** use games built with Textweft, not necessarily Textweft itself. See [role definitions](docs/GOAL.md#roles-and-terminology). Textweft builds the reusable framework, not an individual game, and uses an [AI-led vibe coding workflow](docs/development/workflows/vibe-coding.md) for its own development.

## Quick start

Requires Node.js >=22.16 and npm.

```sh
npm install
npm test
npm run typecheck
npm run example
```

The example defines a small voyage with conditional choices and a random route in `examples/lighthouse/game.yaml` and `examples/lighthouse/main.ts`.

## Authoring model

- **Scene**: text and available choices; an ending uses `end: true`.
- **Choice**: unique `id`, visible `label`, optional `when`, optional `effects`, and destination `to`.
- **State**: JSON-serializable, top-level key/value variables owned by the game.
- **Conditions**: `{ path: "count", equals: 2 }`, `{ path: "count", gte: 1 }`, or `{ call: "myCondition" }`.
- **Effects**: `{ set: { flag: true } }`, `{ add: { count: 1 } }`, or `{ call: "myEffect" }`.
- **Routes**: destination scene ID or `{ call: "myRoute" }`.

Advanced rules are registered as TypeScript condition/effect/route hooks. Content cannot execute arbitrary code or name an unregistered hook.

```ts
const game = defineGame(parseGameYaml(source), {
  conditions: { canContinue: ({ state }) => state.ready === true },
  effects: { spend: ({ state }) => ({ ...state, tokens: Number(state.tokens) - 1 }) },
  routes: { choosePath: ({ random }) => random() < 0.5 ? 'left' : 'right' },
});

const runtime = createRuntime(game, { seed: 42 });
const first = runtime.start();
const next = runtime.choose(first.choices[0].id);
const save = runtime.snapshot();
const resumed = createRuntime(game, { snapshot: save });
```

## Execution contract

1. `start()` enters the initial scene once; repeated calls do not re-run `onEnter`.
2. `view()` returns a renderer-neutral `{ sceneId, text, choices, ended }` without advancing the game.
3. `choose(id)` checks availability, applies effects, resolves the target using the updated state, runs target `onEnter`, and commits the transition.
4. Invalid choices, missing destinations, or throwing hooks leave runtime state, history, and RNG unchanged.
5. `snapshot()` saves scene, state, RNG, choice history, and game/schema versions. Restore checks compatibility and does not repeat `onEnter`.

Hooks must be synchronous and must not rely on external mutations if reproducible and rollback-safe behavior is required. Use the runtime-provided `random()` for seeded randomness. `conditions` should be pure and must not consume randomness.

## Layout

```text
src/core.ts                Headless engine, schema, validation
src/yaml.ts                YAML loader (using `yaml`)
src/index.ts               Public exports
examples/lighthouse/      Small hybrid game
 tests/runtime.test.ts     Engine behavior tests
```

## Scope

**Included:** static scenes, conditional choices, declarative and custom effects, custom routes, deterministic seeded RNG, snapshot/restore, definition validation, and a runnable example.

**Not included yet:** visual editor, free-text input parser, inventory/combat systems, dynamic scene generation, rendering framework, persistence adapter, save migrations, package publication, or an automatic events/timeline engine. These remain game-specific or follow-up capabilities rather than mandatory core concepts.

## Ownership and release

Repository owner: **[rwerwer1r](https://github.com/rwerwer1r)**. This prototype is private and has no declared open-source license. No npm publication is configured.

## Development and agent harness

This v0.1 repository has a lightweight, project-local [agent contract](AGENTS.md), [chat entrypoint](CHATBOT.md), and [development guide](docs/development/README.md). Agent Rule/Skill discovery starts with an intentionally empty [catalog](.agents/route/catalog.json).

After installing dependencies, use `npm run harness:check` to validate harness structure and local documentation links. This does not replace `npm test` or `npm run typecheck`.
