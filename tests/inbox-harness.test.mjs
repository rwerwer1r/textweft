import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateText } from '../scripts/check-inbox.mjs';

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
