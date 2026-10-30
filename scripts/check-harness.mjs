import { existsSync, readFileSync } from 'node:fs';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const required = [
  'AGENTS.md',
  'CHATBOT.md',
  '.agents/route/ROUTE.md',
  '.agents/route/catalog.json',
  'docs/GOAL.md',
  'docs/LANGUAGE.md',
  'docs/development/README.md',
  'docs/development/ai-agent/README.md',
  'docs/development/workflows/choosing.md',
  'docs/development/workflows/routine-loop.md',
  'docs/development/workflows/vibe-coding.md',
  'inbox/README.md',
  '.github/pull_request_template.md',
];
const docs = ['README.md', ...required.filter((path) => path.endsWith('.md'))];
const errors = [];

function insideRepo(path) {
  const rel = relative(root, path);
  return rel === '' || (rel !== '..' && !rel.startsWith('..' + sep) && !isAbsolute(rel));
}

for (const path of required) {
  if (!existsSync(resolve(root, path))) errors.push('Missing required file: ' + path);
}

for (const path of docs) {
  const absolute = resolve(root, path);
  if (!existsSync(absolute)) continue;
  const source = readFileSync(absolute, 'utf8');
  for (const match of source.matchAll(/\]\(([^\s)]+)(?:\s+["'][^"']*["'])?\)/g)) {
    const link = match[1].split('#', 1)[0];
    if (!link || /^[a-z][a-z0-9+.-]*:/i.test(link) || link.startsWith('/')) continue;
    let target;
    try { target = resolve(dirname(absolute), decodeURIComponent(link)); }
    catch { errors.push('Invalid local link in ' + path + ': ' + link); continue; }
    if (!insideRepo(target) || !existsSync(target)) errors.push('Broken local link in ' + path + ': ' + link);
  }
}

const catalogPath = resolve(root, '.agents/route/catalog.json');
if (existsSync(catalogPath)) {
  try {
    const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
    if (catalog.version !== 1) errors.push('Unsupported asset catalog version');
    const seen = new Set();
    for (const kind of ['rules', 'skills']) {
      if (!Array.isArray(catalog[kind])) { errors.push('Expected catalog array: ' + kind); continue; }
      for (const entry of catalog[kind]) {
        if (!entry || ['name', 'description', 'path'].some((key) => typeof entry[key] !== 'string' || !entry[key].trim())) {
          errors.push('Invalid ' + kind + ' catalog entry'); continue;
        }
        const key = kind + ':' + entry.name;
        if (seen.has(key)) errors.push('Duplicate catalog name: ' + key);
        seen.add(key);
        const target = resolve(root, entry.path);
        if (isAbsolute(entry.path) || !insideRepo(target) || !existsSync(target)) errors.push('Missing or external catalog path: ' + entry.path);
      }
    }
  } catch (error) { errors.push('Invalid catalog JSON: ' + error.message); }
}

if (errors.length) {
  for (const error of errors) console.error('ERROR:', error);
  process.exitCode = 1;
} else {
  console.log('Agent harness structure and local link paths OK (not a behavior or CI check).');
}
