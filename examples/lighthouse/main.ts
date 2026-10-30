import { readFileSync } from 'node:fs';
import { defineGame, createRuntime, parseGameYaml } from '../../src/index.ts';

interface State {
  hasChart: boolean;
  supplies: number;
  [key: string]: boolean | number;
}

const source = readFileSync(new URL('./game.yaml', import.meta.url), 'utf8');
const game = defineGame<State>(parseGameYaml<State>(source), {
  conditions: {
    canDepart: ({ state }) => state.hasChart && state.supplies > 0,
  },
  effects: {
    consumeSupply: ({ state }) => ({ ...state, supplies: state.supplies - 1 }),
  },
  routes: {
    decideWeather: ({ random }) => random() < 0.2 ? 'storm' : 'sunny',
  },
});

const runtime = createRuntime(game, { seed: 42 });
console.log(runtime.start());
console.log(runtime.choose('search'));
console.log(runtime.choose('back'));
console.log(runtime.choose('sail'));
console.log(runtime.snapshot());
