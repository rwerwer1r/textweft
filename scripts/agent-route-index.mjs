import { existsSync, readdirSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, relative, isAbsolute, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const route = resolve(root, '.agents/route');
const slug = /^[a-zA-Z0-9][a-zA-Z0-9._-]*$/;

export function frontmatter(body, path) {
  const lines = body.split(/\r?\n/);
  if (lines[0] !== '---') throw Error(path + ': frontmatter 시작 누락');
  const end = lines.indexOf('---', 1);
  if (end === -1) throw Error(path + ': frontmatter 종료 누락');
  const fields = {};
  for (const line of lines.slice(1, end)) {
    const match = /^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/.exec(line);
    if (!match || !['name', 'description'].includes(match[1])) continue;
    if (match[1] in fields) throw Error(path + ': 중복 ' + match[1]);
    const value = match[2].trim();
    fields[match[1]] = value.startsWith('"') ? JSON.parse(value) :
      value.startsWith("'") && value.endsWith("'") ? value.slice(1, -1) : value;
  }
  if (typeof fields.description !== 'string' || !fields.description.trim())
    throw Error(path + ': 선택용 description 누락');
  return fields;
}

function rulesUnder(path) {
  if (!existsSync(path)) return [];
  return readdirSync(path, { withFileTypes: true }).flatMap(item => {
    if (item.name.startsWith('.')) return [];
    const next = resolve(path, item.name);
    return item.isDirectory() ? rulesUnder(next) :
      item.isFile() && item.name.endsWith('.md') ? [next] : [];
  });
}

function entries(kind) {
  const base = resolve(root, '.rulesync', kind);
  let paths = kind === 'rules' ? rulesUnder(base) : [];
  if (kind === 'skills' && existsSync(base)) {
    paths = readdirSync(base, { withFileTypes: true })
      .filter(item => item.isDirectory() && !item.name.startsWith('.'))
      .map(item => resolve(base, item.name, 'SKILL.md'));
    for (const path of paths) if (!existsSync(path)) throw Error('Skill 원본 누락: ' + path);
  }
  const data = paths.sort().map(path => {
    const name = kind === 'rules' ? basename(path, '.md') : basename(dirname(path));
    if (!slug.test(name)) throw Error('잘못된 자산 이름: ' + path);
    const meta = frontmatter(readFileSync(path, 'utf8'), path);
    if (meta.name && meta.name !== name) throw Error('자산 이름과 경로 불일치: ' + path);
    const pathRelative = relative(root, path).replace(/\\/g, '/');
    if (pathRelative.startsWith('../') || isAbsolute(pathRelative)) throw Error('저장소 밖 경로: ' + path);
    return { name, path: pathRelative, description: meta.description.trim() };
  });
  const unique = new Set();
  for (const entry of data) {
    if (unique.has(entry.name)) throw Error('중복 ' + kind + ' 자산: ' + entry.name);
    unique.add(entry.name);
  }
  return data.sort((a, b) => a.name.localeCompare(b.name, 'en'));
}

export function buildIndexes() {
  const config = JSON.parse(readFileSync(resolve(root, 'rulesync.jsonc'), 'utf8'));
  const lock = JSON.parse(readFileSync(resolve(root, 'rulesync.lock'), 'utf8'));
  if (!Array.isArray(config.sources) || config.sources.length !== 0 ||
      lock.lockfileVersion !== 1 || !lock.sources || Object.keys(lock.sources).length !== 0) {
    throw Error('외부 Rulesync 소스는 아직 지원하지 않습니다. 별도 승인과 잠금 검증이 필요합니다.');
  }
  const encode = items => items.map(item => JSON.stringify(item)).join('\n') + (items.length ? '\n' : '');
  return { 'rules.jsonl': encode(entries('rules')), 'skills.jsonl': encode(entries('skills')) };
}

export function syncIndexes(action) {
  let outOfDate = 0;
  for (const [name, content] of Object.entries(buildIndexes())) {
    const path = resolve(route, name);
    const actual = existsSync(path) ? readFileSync(path, 'utf8') : null;
    if (actual === content) continue;
    if (action === 'generate') {
      mkdirSync(route, { recursive: true });
      writeFileSync(path, content, 'utf8');
      console.log('색인 생성: ' + name);
    } else { outOfDate++; console.error('색인 불일치: ' + name); }
  }
  return outOfDate;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const action = process.argv[2];
  if (!['generate', 'check'].includes(action)) {
    console.error('사용법: node scripts/agent-route-index.mjs generate|check');
    process.exitCode = 2;
  } else {
    try { process.exitCode = syncIndexes(action) ? 1 : 0; }
    catch (error) { console.error(error.message); process.exitCode = 2; }
  }
}
