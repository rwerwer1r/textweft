import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { checkPaths, validateText } from '../scripts/check-inbox.mjs';

test('timezone-aware frontmatter', () => {
  assert.deepEqual(validateText('---\ndescription: 재개 상태\nupdated: 2026-10-31T07:00:00+09:00\n---\n# State'), []);
});

test('invalid metadata', () => {
  const errors = validateText('---\nupdated: 2026-10-31T07:00:00\n---');
  assert.ok(errors.some(e => e.includes('description')));
  assert.ok(errors.some(e => e.includes('updated')));
});

test('duplicate and missing delimiters', () => {
  assert.ok(validateText('description: x').length);
  assert.ok(validateText('---\ndescription: a').length);
  assert.ok(validateText('---\ndescription: a\ndescription: b\nupdated: 2026-10-31T07:00:00Z\n---').some(e => e.includes('중복')));
});

test('hidden inbox path contract', (t) => {
  const base = mkdtempSync(join(tmpdir(), 'textweft-inbox-'));
  t.after(() => rmSync(base, { recursive: true, force: true }));
  const record = '.inbox/github-1-example/001-workstate.md';
  mkdirSync(join(base, '.inbox/github-1-example'), { recursive: true });
  writeFileSync(join(base, record), '---\ndescription: fixture\nupdated: 2026-10-31T07:00:00+09:00\n---\n# State\n');

  assert.deepEqual(checkPaths(['.inbox/README.md', record], base), []);
  assert.ok(checkPaths(['inbox/README.md'], base).some(e => e.includes('.inbox/ 밖 경로')));
  assert.ok(checkPaths(['.inbox/missing.md'], base).some(e => e.includes('ENOENT')));
});

test('reusable Inbox guides and templates are not work records', () => {
  assert.deepEqual(checkPaths(['.inbox/AGENTS.md', '.inbox/.configs/guides/frontmatter.md', '.inbox/.configs/templates/handoff.md']), []);
});
