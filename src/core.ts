export type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };
export type GameState = Record<string, JsonValue>;

export type Condition = { path: string; equals?: JsonValue; gte?: number } | { call: string; args?: JsonValue };
export type Effect = { set: Record<string, JsonValue> } | { add: Record<string, number> } | { call: string; args?: JsonValue };
export type Route = string | { call: string; args?: JsonValue };

export interface Choice {
  id: string;
  label: string;
  when?: Condition;
  effects?: Effect[];
  to: Route;
}
export interface Scene {
  text: string;
  choices?: Choice[];
  onEnter?: Effect[];
  end?: boolean;
}
export interface GameDefinition<S extends GameState> {
  schema: 1;
  id: string;
  version: string;
  start: string;
  state: S;
  scenes: Record<string, Scene>;
}
export interface HookContext<S extends GameState> {
  readonly state: Readonly<S>;
  readonly args?: JsonValue;
}
export interface Hooks<S extends GameState> {
  conditions?: Record<string, (ctx: HookContext<S>) => boolean>;
  effects?: Record<string, (ctx: HookContext<S> & { random: () => number }) => S>;
  routes?: Record<string, (ctx: HookContext<S> & { random: () => number }) => string>;
}
export interface Game<S extends GameState> {
  readonly definition: GameDefinition<S>;
  readonly hooks: Hooks<S>;
}
export interface GameView {
  sceneId: string;
  text: string;
  choices: Array<{ id: string; label: string }>;
  ended: boolean;
}
export interface Snapshot<S extends GameState> {
  schemaVersion: 1;
  gameId: string;
  gameVersion: string;
  sceneId: string;
  state: S;
  rngState: number;
  history: Array<{ sceneId: string; choiceId: string }>;
}

const object = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
const copy = <T>(value: T): T => structuredClone(value);
const has = (value: object, key: string) => Object.prototype.hasOwnProperty.call(value, key);
const validJson = (value: unknown): boolean => {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return true;
  if (typeof value === 'number') return Number.isFinite(value);
  if (Array.isArray(value)) return value.every(validJson);
  return object(value) && Object.entries(value).every(([key, item]) =>
    key !== '__proto__' && key !== 'constructor' && key !== 'prototype' && validJson(item));
};
const nonempty = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;

/** Validate both JSON/YAML definitions and their references to registered hooks. */
export function validateGame<S extends GameState>(input: unknown, hooks: Hooks<S> = {}): string[] {
  const errors: string[] = [];
  if (!object(input)) return ['Game must be an object'];
  if (input.schema !== 1) errors.push('schema must be 1');
  if (!nonempty(input.id)) errors.push('id is required');
  if (!nonempty(input.version)) errors.push('version is required');
  if (!nonempty(input.start)) errors.push('start must be a scene ID');
  if (!object(input.state) || !validJson(input.state)) errors.push('state must be a JSON object');
  if (!object(input.scenes) || Object.keys(input.scenes).length === 0) {
    errors.push('scenes must be a nonempty map');
    return errors;
  }
  const scenes = input.scenes;
  const initialState = object(input.state) ? input.state : {};
  if (!has(scenes, String(input.start))) errors.push(`unknown start scene: ${String(input.start)}`);

  function checkCall(value: Record<string, unknown>, kind: keyof Hooks<S>, at: string): void {
    if (!nonempty(value.call) || !(value.call in (hooks[kind] ?? {}))) errors.push(`${at}: unknown ${kind} hook ${String(value.call)}`);
    if (has(value, 'args') && !validJson(value.args)) errors.push(`${at}: args must be JSON`);
  }
  function checkCondition(value: unknown, at: string): void {
    if (!object(value)) return void errors.push(`${at}: invalid condition`);
    if (has(value, 'call')) return checkCall(value, 'conditions', at);
    if (!nonempty(value.path) || !has(initialState, value.path))
      errors.push(`${at}: unknown state path ${String(value.path)}`);
    if (has(value, 'equals') === has(value, 'gte')) errors.push(`${at}: use exactly one of equals or gte`);
    if (has(value, 'equals') && !validJson(value.equals)) errors.push(`${at}: invalid equals value`);
    if (has(value, 'gte') && (typeof value.gte !== 'number' || !Number.isFinite(value.gte))) errors.push(`${at}: invalid gte value`);
  }
  function checkEffects(value: unknown, at: string): void {
    if (value === undefined) return;
    if (!Array.isArray(value)) return void errors.push(`${at}: expected effect array`);
    value.forEach((effect, index) => {
      const loc = `${at}[${index}]`;
      if (!object(effect)) return void errors.push(`${loc}: invalid effect`);
      if (has(effect, 'call')) return checkCall(effect, 'effects', loc);
      const operation = has(effect, 'set') ? 'set' : has(effect, 'add') ? 'add' : null;
      if (!operation || !object(effect[operation])) return void errors.push(`${loc}: invalid effect operation`);
      for (const [key, item] of Object.entries(effect[operation])) {
        if (!has(initialState, key)) errors.push(`${loc}: unknown state key ${key}`);
        if (operation === 'set' && !validJson(item)) errors.push(`${loc}: invalid JSON value`);
        if (operation === 'add' && (typeof item !== 'number' || !Number.isFinite(item) || typeof initialState[key] !== 'number')) errors.push(`${loc}: add expects numeric state and delta`);
      }
    });
  }
  for (const [sceneId, value] of Object.entries(scenes)) {
    if (!nonempty(sceneId) || !object(value)) { errors.push(`${sceneId}: invalid scene`); continue; }
    if (typeof value.text !== 'string') errors.push(`${sceneId}: text must be a string`);
    if (has(value, 'end') && typeof value.end !== 'boolean') errors.push(`${sceneId}: end must be a boolean`);
    checkEffects(value.onEnter, `${sceneId}.onEnter`);
    if (value.end === true && Array.isArray(value.choices) && value.choices.length) errors.push(`${sceneId}: ending scene cannot have choices`);
    if (value.end !== true && (!Array.isArray(value.choices) || value.choices.length === 0)) errors.push(`${sceneId}: non-ending scene needs choices`);
    if (!has(value, 'choices')) continue;
    if (!Array.isArray(value.choices)) { errors.push(`${sceneId}: choices must be an array`); continue; }
    const ids = new Set<string>();
    value.choices.forEach((choice, index) => {
      const at = `${sceneId}.choices[${index}]`;
      if (!object(choice)) return void errors.push(`${at}: invalid choice`);
      if (!nonempty(choice.id) || ids.has(String(choice.id))) errors.push(`${at}: missing or duplicate choice ID`);
      else ids.add(choice.id);
      if (!nonempty(choice.label)) errors.push(`${at}: label required`);
      if (choice.when !== undefined) checkCondition(choice.when, `${at}.when`);
      checkEffects(choice.effects, `${at}.effects`);
      if (typeof choice.to === 'string') {
        if (!has(scenes, choice.to)) errors.push(`${at}: unknown target ${choice.to}`);
      } else if (object(choice.to) && has(choice.to, 'call')) {
        checkCall(choice.to, 'routes', `${at}.to`);
      } else errors.push(`${at}: invalid route`);
    });
  }
  return errors;
}

export function defineGame<S extends GameState>(definition: GameDefinition<S>, hooks: Hooks<S> = {}): Game<S> {
  const errors = validateGame(definition, hooks);
  if (errors.length) throw new Error(`Invalid game:\n${errors.join('\n')}`);
  return { definition: copy(definition), hooks };
}

export function createRuntime<S extends GameState>(game: Game<S>, options: { seed?: number; snapshot?: Snapshot<S> } = {}) {
  const { definition, hooks } = game;
  let state = copy(definition.state);
  let sceneId: string | null = null;
  let rngState = (options.seed ?? 1) >>> 0;
  let history: Snapshot<S>['history'] = [];

  if (options.snapshot) {
    const saved = options.snapshot;
    if (saved.schemaVersion !== 1 || saved.gameId !== definition.id || saved.gameVersion !== definition.version ||
        !has(definition.scenes, saved.sceneId) || !object(saved.state) || !validJson(saved.state) ||
        !Number.isInteger(saved.rngState) || saved.rngState < 0 || saved.rngState > 0xffffffff ||
        !Array.isArray(saved.history) || !saved.history.every(h => object(h) && nonempty(h.sceneId) && nonempty(h.choiceId)))
      throw new Error('Invalid or incompatible snapshot');
    state = copy(saved.state);
    sceneId = saved.sceneId;
    rngState = saved.rngState;
    history = copy(saved.history);
  }

  function condition(value: Condition | undefined, current: S): boolean {
    if (!value) return true;
    if ('call' in value) return hooks.conditions![value.call]({ state: copy(current), args: copy(value.args) });
    if ('equals' in value) return JSON.stringify(current[value.path]) === JSON.stringify(value.equals);
    return typeof current[value.path] === 'number' && (current[value.path] as number) >= value.gte!;
  }
  function transactionEffects(effects: Effect[] | undefined, current: S, random: () => number): S {
    let next = current;
    for (const effect of effects ?? []) {
      if ('call' in effect) next = hooks.effects![effect.call]({ state: copy(next), args: copy(effect.args), random });
      else if ('set' in effect) next = { ...next, ...copy(effect.set) };
      else {
        const changes: Record<string, number> = {};
        for (const [key, delta] of Object.entries(effect.add)) {
          if (typeof next[key] !== 'number') throw new Error(`Non-numeric state: ${key}`);
          changes[key] = (next[key] as number) + delta;
        }
        next = { ...next, ...changes };
      }
      if (!object(next) || !validJson(next)) throw new Error('Effect returned non-JSON state');
    }
    return next;
  }
  function render(currentId: string, currentState: S): GameView {
    const scene = definition.scenes[currentId];
    return {
      sceneId: currentId,
      text: scene.text,
      choices: scene.end ? [] : (scene.choices ?? []).filter(c => condition(c.when, currentState)).map(c => ({ id: c.id, label: c.label })),
      ended: scene.end === true,
    };
  }
  function view(): GameView {
    if (sceneId === null) throw new Error('Call start() first');
    return render(sceneId, state);
  }
  function start(): GameView {
    if (sceneId !== null) return view();
    let localRng = rngState;
    const random = () => ((localRng = (Math.imul(localRng, 1664525) + 1013904223) >>> 0) / 4294967296);
    const next = transactionEffects(definition.scenes[definition.start].onEnter, copy(state), random);
    const result = render(definition.start, next);
    state = next; sceneId = definition.start; rngState = localRng;
    return result;
  }
  function choose(choiceId: string): GameView {
    if (sceneId === null) throw new Error('Call start() first');
    const currentId = sceneId;
    const scene = definition.scenes[currentId];
    if (scene.end) throw new Error('Game has ended');
    const choice = scene.choices?.find(c => c.id === choiceId);
    if (!choice || !condition(choice.when, state)) throw new Error(`Unavailable choice: ${choiceId}`);
    let localRng = rngState;
    const random = () => ((localRng = (Math.imul(localRng, 1664525) + 1013904223) >>> 0) / 4294967296);
    const afterChoice = transactionEffects(choice.effects, copy(state), random);
    const target = typeof choice.to === 'string' ? choice.to : hooks.routes![choice.to.call]({ state: copy(afterChoice), args: copy(choice.to.args), random });
    if (!has(definition.scenes, target)) throw new Error(`Unknown target scene: ${target}`);
    const next = transactionEffects(definition.scenes[target].onEnter, afterChoice, random);
    const result = render(target, next);
    state = next; sceneId = target; rngState = localRng;
    history = [...history, { sceneId: currentId, choiceId }];
    return result;
  }
  return {
    start, view, choose,
    getState: (): S => copy(state),
    snapshot: (): Snapshot<S> => {
      if (sceneId === null) throw new Error('Call start() first');
      return copy({ schemaVersion: 1, gameId: definition.id, gameVersion: definition.version, sceneId, state, rngState, history });
    },
  };
}
