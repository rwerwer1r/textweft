import { test } from 'node:test';
import assert from 'node:assert/strict';
import { frontmatter, buildIndexes } from '../scripts/agent-route-index.mjs';

test('Rule frontmatter is parsed and required', () => {
 const doc='---\ndescription: "Sample local scoped rule"\n---\n# Rule';
 assert.equal(frontmatter(doc,'rule.md').description, 'Sample local scoped rule');
 assert.throws(() => frontmatter('# Rule','bad.md'), /frontmatter/);
});

test('route index matches the checked-in TypeScript rule', () => {
 const indexes=buildIndexes();
 const rules=indexes['rules.jsonl'].trim().split('\n').map(JSON.parse);
 assert.equal(rules.length,1);
 assert.deepEqual(rules[0],{
  name:'typescript',
  path:'.rulesync/rules/typescript.md',
  description:'TypeScript game-framework runtime, example, and test conventions'
 });
 assert.equal(indexes['skills.jsonl'],'');
});
