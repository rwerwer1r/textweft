import { parse } from 'yaml';
import type { GameDefinition, GameState } from './core.ts';

/** Parsing only: defineGame() checks structure and hook references. */
export function parseGameYaml<S extends GameState = GameState>(source: string): GameDefinition<S> {
  return parse(source) as GameDefinition<S>;
}
