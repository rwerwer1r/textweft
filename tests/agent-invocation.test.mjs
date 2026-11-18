import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseDocument } from 'yaml';

function agentMetadata(name) {
  const text = readFileSync(new URL(`../.rulesync/subagents/${name}.md`, import.meta.url), 'utf8');
  const end = text.indexOf('\n---\n', 4);
  assert.ok(text.startsWith('---\n') && end > 4, `invalid frontmatter: ${name}`);
  const doc = parseDocument(text.slice(4, end), { uniqueKeys: true });
  assert.deepEqual(doc.errors, []);
  return doc.toJS();
}

test('user-selected autopilot is selectable but not delegated', () => {
  const agent = agentMetadata('mols-autopilot');
  for (const target of ['copilot', 'copilotcli']) {
    assert.equal(agent[target]['user-invocable'], true);
    assert.equal(agent[target]['disable-model-invocation'], true);
  }
  assert.equal(agent['antigravity-ide'].mainAgent, true);
  assert.equal(agent['antigravity-ide'].subagent, false);
});

test('review coordinator and workers are hidden but model-invocable', () => {
  for (const name of [
    'mols-review-dualvantage',
    'mols-review-dualvantage-verifier',
    'mols-review-dualvantage-challenger',
  ]) {
    const agent = agentMetadata(name);
    for (const target of ['copilot', 'copilotcli']) {
      assert.equal(agent[target]['user-invocable'], false, `${name}: ${target}`);
      assert.equal(agent[target]['disable-model-invocation'], false, `${name}: ${target}`);
    }
  }
});
test('work unit worker is delegated and bounded', () => {
  const agent = agentMetadata('mols-work-unit-worker');
  assert.deepEqual(agent.targets, ['claudecode', 'copilot', 'copilotcli', 'antigravity-ide', 'antigravity-cli']);
  for (const target of ['copilot', 'copilotcli']) {
    assert.equal(agent[target]['user-invocable'], false, target);
    assert.equal(agent[target]['disable-model-invocation'], false, target);
  }
  assert.ok(agent.claudecode.tools.includes('Edit'));
  assert.equal(agent['antigravity-ide'].mainAgent, false);
  assert.equal(agent['antigravity-ide'].subagent, true);
  assert.ok(agent.description.includes('bounded'));
  const source = readFileSync(new URL('../.rulesync/subagents/mols-work-unit-worker.md', import.meta.url), 'utf8');
  assert.match(source, /writable paths/);
  assert.match(source, /shared workspace/);
  assert.match(source, /PR 생성\/병합/);
});

test('autopilot delegates parallel work only with verified isolation', () => {
  const source = readFileSync(new URL('../.rulesync/subagents/mols-autopilot.md', import.meta.url), 'utf8');
  assert.match(source, /workflow-parallel-development/);
  assert.match(source, /verified workspace isolation/);
});
