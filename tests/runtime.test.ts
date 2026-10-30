import test from 'node:test';
import assert from 'node:assert/strict';
import { createRuntime, defineGame, validateGame, type GameDefinition } from '../src/core.ts';

type State = { count: number; unlocked: boolean };
const definition: GameDefinition<State> = {
  schema: 1, id: 'test', version: '0.1', start: 'start',
  state: { count: 0, unlocked: false },
  scenes: {
    start: { text: 'begin', onEnter: [{ add: { count: 1 } }], choices: [
      { id: 'unlock', label: 'unlock', effects: [{ set: { unlocked: true } }], to: 'start' },
      { id: 'finish', label: 'finish', when: { path: 'unlocked', equals: true }, to: 'end' },
    ] },
    end: { text: 'end', end: true },
  },
};

test('start runs onEnter once and view does not change state', () => {
  const runtime = createRuntime(defineGame(definition));
  assert.equal(runtime.start().sceneId, 'start');
  assert.equal(runtime.start().sceneId, 'start');
  assert.equal(runtime.getState().count, 1);
  runtime.view();
  assert.equal(runtime.getState().count, 1);
});

test('choices use condition, effects, and scene transitions', () => {
  const runtime = createRuntime(defineGame(definition));
  assert.deepEqual(runtime.start().choices.map(c => c.id), ['unlock']);
  assert.throws(() => runtime.choose('finish'), /Unavailable choice/);
  assert.deepEqual(runtime.choose('unlock').choices.map(c => c.id), ['unlock', 'finish']);
  assert.equal(runtime.getState().count, 2);
  assert.equal(runtime.choose('finish').ended, true);
  assert.throws(() => runtime.choose('finish'), /ended/);
});

test('state copies are isolated from callers', () => {
  const runtime = createRuntime(defineGame(definition));
  runtime.start();
  runtime.getState().count = 999;
  const saved = runtime.snapshot();
  saved.state.count = 999;
  assert.equal(runtime.getState().count, 1);
});

test('snapshot restores without re-entering scene', () => {
  const game = defineGame(definition);
  const runtime = createRuntime(game);
  runtime.start(); runtime.choose('unlock');
  const restored = createRuntime(game, { snapshot: runtime.snapshot() });
  assert.equal(restored.view().sceneId, 'start');
  assert.equal(restored.getState().count, 2);
  assert.equal(restored.choose('finish').ended, true);
});

test('hook failure rolls back state and random generator', () => {
  const broken = defineGame({ ...definition, scenes: {
    ...definition.scenes,
    start: { text: 'begin', choices: [{ id: 'fail', label: 'fail', effects: [{ call: 'fail' }], to: 'end' }] },
  } }, { effects: { fail: ({ random }) => { random(); throw new Error('boom'); } } });
  const runtime = createRuntime(broken);
  runtime.start();
  const before = runtime.snapshot();
  assert.throws(() => runtime.choose('fail'), /boom/);
  assert.deepEqual(runtime.snapshot(), before);
});

test('same seed and choices generate identical routes', () => {
  const game = defineGame({ ...definition, scenes: {
    ...definition.scenes,
    start: { text: 'begin', choices: [{ id: 'roll', label: 'roll', to: { call: 'randomRoute' } }] },
  } }, { routes: { randomRoute: ({ random }) => random() < 0.5 ? 'start' : 'end' } });
  const a = createRuntime(game, { seed: 123 });
  const b = createRuntime(game, { seed: 123 });
  a.start(); b.start();
  assert.deepEqual(a.choose('roll'), b.choose('roll'));
  assert.deepEqual(a.snapshot(), b.snapshot());
});

test('broken static reference and hook are rejected', () => {
  const invalid = { ...definition, scenes: { start: { text: 'x', choices: [
    { id: 'x', label: 'X', when: { call: 'missing' }, to: 'missing' },
  ] } } };
  assert.ok(validateGame(invalid).some(e => e.includes('unknown target')));
  assert.ok(validateGame(invalid).some(e => e.includes('unknown conditions hook')));
});
