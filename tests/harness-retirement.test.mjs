import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' });

test('retired inbox has no tracked files', () => {
  assert.equal(git('ls-files', '--', '.inbox/'), '');
});

test('retired inbox is ignored for local files', () => {
  assert.equal(git('check-ignore', '--no-index', '--', '.inbox/retired-record.md').trim(), '.inbox/retired-record.md');
});
