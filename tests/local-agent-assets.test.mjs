import { test } from 'node:test';
import assert from 'node:assert/strict';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { parseDocument } from 'yaml';
import { buildIndexes } from '../scripts/agent-route-index.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const skills = ['agent-asset-design', 'chatbot-continuity', 'review-changes',
  'stdd-management', 'test-design', 'workflow-iteration'];
const agents = ['textweft-autopilot', 'textweft-work-unit-worker',
  'textweft-review', 'textweft-review-verifier', 'textweft-review-challenger'];

test('all reusable agent capabilities have project-owned Skill sources', () => {
  for (const name of skills) {
    const path = join(root, '.rulesync/skills', name, 'SKILL.md');
    assert.ok(existsSync(path), name);
    const source = readFileSync(path, 'utf8');
    const front = /^---\n([\s\S]*?)\n---\n/.exec(source);
    assert.ok(front, name + ': frontmatter');
    const document = parseDocument(front[1], { uniqueKeys: true });
    assert.deepEqual(document.errors, [], name + ': yaml');
    const data = document.toJS();
    assert.equal(data.name, name);
    assert.ok(typeof data.description === 'string' && data.description.trim());
    assert.ok(Array.isArray(data.targets) && data.targets.includes('codexcli'));
  }

  const expected = buildIndexes()['.agents/route/skills.jsonl'];
  const actual = readFileSync(join(root, '.agents/route/skills.jsonl'), 'utf8');
  assert.equal(actual, expected, 'Skill routing index must match source');
  const names = actual.trim().split('\n').map(line => JSON.parse(line).name);
  assert.deepEqual(skills.filter(name => !names.includes(name)), []);
});

test('Rulesync only projects local assets; bootstrap never installs remote Skills', () => {
  const config = JSON.parse(readFileSync(join(root, 'rulesync.jsonc'), 'utf8'));
  assert.deepEqual(config.sources ?? [], []);
  assert.equal(existsSync(join(root, 'rulesync.lock')), false);
  const update = readFileSync(join(root, 'mise-tasks/update'), 'utf8');
  assert.doesNotMatch(update, /rulesync:install|rulesync:resolve/);
  for (const name of agents) {
    assert.ok(existsSync(join(root, '.rulesync/subagents', name + '.md')), name);
  }
});

test('tracked project sources have no legacy external identity references', () => {
  const paths = execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' })
    .split('\0').filter(Boolean);
  const forbidden = new RegExp('mo' + 'ls', 'i');
  const references = [];
  for (const path of paths) {
    if (forbidden.test(path)) references.push(path + ' (path)');
    const body = readFileSync(join(root, path), 'utf8');
    if (forbidden.test(body)) references.push(path + ' (content)');
  }
  assert.deepEqual(references, []);
});

test('legacy curated Skill cache blocks update before re-projecting external assets', () => {
  const temporary = mkdtempSync(join(tmpdir(), 'textweft-legacy-curated-'));
  try {
    const oldSkill = join(temporary, '.rulesync/skills/.curated/old-skill/SKILL.md');
    mkdirSync(join(temporary, 'mise-tasks'), { recursive: true });
    mkdirSync(join(temporary, '.rulesync/skills/.curated/old-skill'), { recursive: true });
    copyFileSync(join(root, 'mise-tasks/update'), join(temporary, 'mise-tasks/update'));
    writeFileSync(join(temporary, 'package-lock.json'), '{}');
    writeFileSync(oldSkill, '# old local cache');
    execFileSync('git', ['init', '-q'], { cwd: temporary });

    const result = spawnSync('bash', ['mise-tasks/update'], { cwd: temporary, encoding: 'utf8' });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /stale external agent assets/);
    assert.match(result.stderr, /\.rulesync\/skills\/\.curated/);
    assert.ok(existsSync(oldSkill), 'legacy cache must not be deleted automatically');
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});
