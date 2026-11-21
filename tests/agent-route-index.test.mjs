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
  const skills = indexes['.agents/route/skills.jsonl'].trim().split('\n').map(JSON.parse);
  assert.deepEqual(skills.map(x => x.name), [
    'agent-asset-design',
    'chatbot-continuity',
    'review-changes',
    'stdd-management',
    'test-design',
    'workflow-autopilot',
    'workflow-delivery',
    'workflow-failure-recovery',
    'workflow-harness-evaluation',
    'workflow-harness-improvement',
    'workflow-integration',
    'workflow-investigation',
    'workflow-iteration',
    'workflow-parallel-development',
    'workflow-resumption',
    'workflow-review',
  ]);
  assert.ok(skills.every(x => x.path === `.rulesync/skills/${x.name}/SKILL.md`));
  assert.ok(skills.every(x => x.description && !x.description.includes('undefined')));
  assert.equal(new Set(skills.map(x => x.name)).size, 16);
});

test('frontmatter는 정상 입력을 읽고 누락·중복을 거부한다', () => {
  assert.equal(frontmatter('---\ndescription: "Sample local scoped rule"\n---', 'rule').description,
    'Sample local scoped rule');
  assert.throws(() => frontmatter('plain'), /frontmatter/);
  assert.throws(() => frontmatter('---\nname: x\n---'), /description/);
  assert.throws(() => frontmatter('---\ndescription: a\ndescription: b\n---', 'rule'), /중복/);
  assert.deepEqual(frontmatter('---\nname: my-skill\ndescription: >-\n  Multi-line skill\n  description\ntargets:\n  - copilot\n---'), {
    name: 'my-skill',
    description: 'Multi-line skill description',
  });
  assert.throws(() => frontmatter('---\nname: 123\ndescription: okay\n---'), /name\/description/);
  assert.throws(() => frontmatter('---\ndescription: [not-a-string]\n---', 'rule'), /name\/description/);
});
