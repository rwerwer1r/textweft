import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildIndexes, frontmatter } from '../scripts/agent-route-index.mjs';

test('Rulesync 원본에서 생성한 Rule·Skill 색인', () => {
  const indexes = buildIndexes();
  const rows = indexes['.agents/route/rules.jsonl'].trim().split('\n').map(JSON.parse);
  assert.deepEqual(rows, [{
    name: 'typescript',
    path: '.rulesync/rules/typescript.md',
    description: 'TypeScript game-framework runtime, example, and test conventions',
  }]);
  assert.equal(indexes['.agents/route/skills.jsonl'], '');
});

test('frontmatter는 정상 입력을 읽고 누락·중복을 거부한다', () => {
  assert.equal(frontmatter('---\ndescription: "Sample local scoped rule"\n---', 'rule').description,
    'Sample local scoped rule');
  assert.throws(() => frontmatter('plain'), /frontmatter/);
  assert.throws(() => frontmatter('---\nname: x\n---'), /description/);
  assert.throws(() => frontmatter('---\ndescription: a\ndescription: b\n---', 'rule'), /중복/);
});
